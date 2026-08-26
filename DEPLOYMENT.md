# Deploying Majestic Keys

Next.js 16.3.3, App Router, Cache Components (PPR) enabled. Node **>= 20.9**.

```bash
npm ci
npm run typecheck && npm run lint && npm run build
npm run start          # honours $PORT, defaults to 3000
```

---

## 1. Blockers — do not go live until these are done

These are content and ops decisions, not code. Each one causes real damage in production.

### 1.1 Placeholder business data is being published as structured data

`src/config/site.ts` still carries filler:

| Field | Current value | Problem |
|---|---|---|
| `contact.phone` / `contact.whatsapp` | `+1 (555) 123-4567` | US fictional number for a Moroccan agency |
| `contact.address.street` | `123 Luxury Boulevard` | Not a real address |

This is not cosmetic. `src/app/[locale]/layout.tsx` emits it inside the
`RealEstateAgent` JSON-LD block on **every page**, so Google ingests the fake
phone and address as the business's verified contact details. It also renders in
the footer and on `/contact`. Fix before the first crawl.

### 1.2 Contact and newsletter forms silently discard submissions

Both show a success message and send nothing:

- `src/app/[locale]/contact/page.tsx` — `handleSubmit` fires a success toast, no network call.
- `src/features/newsletter/newsletterSection.tsx` — `handleSubmit` sets `submitted` and clears the input.

A user who fills in the contact form is told "Notre équipe vous recontactera" and
no one is ever notified. Either wire both to a real endpoint (a Server Action
posting to the API is the natural fit) or disable the forms until the backend
exists. Shipping them as-is loses leads and misleads users.

### 1.3 Property imagery is missing and the hero is 12 MB

- **35 of the 38** image paths in `src/types/property.type.ts` have no file in
  `public/`. Only `riad.jpg`, `villa.jpg` and `villa2.jpg` exist, so most listing
  cards and every gallery render broken images today.
- `public/images/properties/hero.png` is **12 MB**, loaded on the landing page
  above the fold. `public/` totals 25 MB across 12 files.

Re-encode the hero to WebP/AVIF at a sane resolution (target under 300 KB)
before launch. This is the single biggest Largest Contentful Paint cost on the
site. `images.formats` already prefers AVIF/WebP for anything routed through
`next/image`.

When real photography moves to a CDN, add its hostname to
`images.remotePatterns` in `next.config.ts` (currently `[]`) or `next/image`
will reject it at runtime.

### 1.4 `/en` serves French content

`src/messages/fr.json` and `en.json` contain **13 keys each**, covering only the
hero and the agency-word block. Everything else — nav, footer, `/about`,
`/services`, `/contact`, all property UI — is hardcoded French.

Meanwhile `sitemap.xml` advertises `hreflang="en"` alternates for every URL and
`layout.tsx` declares `alternateLocale`. Google will fetch the `en` URLs, find
French, and treat them as duplicates of the French pages.

Pick one before launch:

- **Translate the site properly**, or
- **Drop `en`**: remove it from `src/i18n/locales.ts`. The sitemap, alternates
  and `generateStaticParams` all derive from that array and will follow.

### 1.5 Set the environment variables

See `.env.example`. Two are required:

| Variable | Why |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Drives canonicals, hreflang, sitemap, JSON-LD. |
| `NEXT_PUBLIC_API_URL` | Absolute backend base URL. Falls back to relative `/api`. |

`NEXT_PUBLIC_*` values are **inlined at build time**. Changing one requires a
rebuild, not a restart. Never put a secret behind that prefix.

**Preview and staging must override `NEXT_PUBLIC_SITE_URL`.** Otherwise every
preview deploy emits `https://majestickeys.com` canonicals and invites Google to
index the wrong host.

---

## 2. What the data layer expects from the backend

There is no property API yet. Everything is served from `mockProperties` behind
a single seam: **`src/services/properties.adapter.ts`**. Swapping to HTTP touches
that file only — each function already carries a commented `apiGet` call showing
the intended endpoint.

| Endpoint | Returns |
|---|---|
| `GET /properties?<filters>` | `{ items, total, page, pageSize, totalPages }` |
| `GET /properties/featured?limit=` | `Property[]` |
| `GET /properties/:slug` | `Property` (404 maps to `null`) |
| `GET /properties/slugs` | `string[]` |

Query params are defined by `propertyQuerySchema` in
`src/features/properties/property.query.ts`: `transactionType`, `propertyType`,
`city`, `neighborhood`, `priceMin`, `priceMax`, `bedrooms`, `bathrooms`,
`equipped`, `sort`, `page`, `pageSize`.

Two mismatches to settle with the backend team:

1. The mocks store display labels (`"Apartment"`, `"Villa"`) while URLs and
   filters use slugs (`appartment`, `villa`). `CATEGORY_TO_TYPE` in the adapter
   bridges this. Have the API return slugs and delete that map.
2. `transactionType` is `"Rent"`/`"Sale"` in mocks, `rent`/`sale` in the schema.

`Property` requires `createdAt` (ISO 8601, drives `newest`/`oldest`) and
`isFeatured` (drives the landing carousel).

### Cache invalidation

Reads are cached via `use cache` with tags declared in
`src/services/properties.service.ts`:

- `properties` — everything
- `properties:featured`
- `property:<slug>`

When the CMS or admin publishes a change, call `updateTag()` from a Server
Action or Route Handler. Without that, edits take up to `cacheLife('hours')`
(listings) or `cacheLife('days')` (a single listing) to appear.

---

## 3. Hosting

Any Node host works. **Do not** use `output: 'export'` — Cache Components, PPR
streaming and the i18n proxy all require a running server.

- **Vercel** — zero config. PPR and tag revalidation are natively supported.
- **Docker / self-host** — add `output: 'standalone'` to `next.config.ts`, then
  copy `.next/standalone`, `.next/static` and `public/` into the image.

One caveat for multi-replica deployments: `use cache` uses a per-instance
in-memory LRU by default, so each replica caches independently and `updateTag`
only invalidates the instance that handled the call. Configure a shared cache
handler (`cacheHandlers`) backed by Redis if you run more than one instance.

`src/proxy.ts` (next-intl middleware) must run on every request — it performs
locale resolution and redirects.

---

## 4. Already handled

- **Security headers** — `next.config.ts` sets `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and a two-year
  `Strict-Transport-Security`. `poweredByHeader` is off. All verified live
  against `npm run start`.
- **No CSP yet, deliberately.** Chakra emits inline styles and Next injects
  inline bootstrap scripts, so a useful CSP needs nonce plumbing through
  `src/proxy.ts`. Adding a naive `default-src 'self'` will white-screen the app.
- **Dependencies** — `npm audit --omit=dev` reports **0 vulnerabilities**.
  Next moved 16.2.1 → 16.3.3 to clear a HIGH advisory
  ([GHSA-mg66-mrh9-m8jx](https://github.com/advisories/GHSA-mg66-mrh9-m8jx)):
  DoS via connection exhaustion, applying specifically to apps with Cache
  Components enabled. `next-intl` was patched for an open redirect.
- **Error handling** — `src/app/[locale]/error.tsx` (route boundary),
  `src/app/global-error.tsx` (root layout failures, self-contained styles),
  `src/app/[locale]/not-found.tsx`.
- **Status codes verified** — `/properties/nope` and `/totally-bogus-path` both
  return a hard **404**, not a soft 200.

  > A `loading.tsx` under `properties/[slug]` was tried and removed: it flushes
  > the streamed shell with a 200 before `notFound()` runs, turning every
  > delisted listing into a soft 404. Don't add one back to that route.

- **SEO** — per-listing titles, descriptions and canonicals;
  `RealEstateListing` JSON-LD with offers; sitemap including all property URLs
  with hreflang; crawlable `<a>` pagination; `robots: index:false` on
  non-available listings.

---

## 5. Not wired up

- **Analytics.** `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_FB_PIXEL_ID` and
  `NEXT_PUBLIC_HOTJAR_ID` are read into `siteConfig.analytics` but no component
  ever renders a script tag. Setting them does nothing today.
- **Error reporting.** Both error boundaries only `console.error`. Wire Sentry
  or equivalent — otherwise production failures are invisible.
- **`og-image.jpg` does not exist.** `siteConfig.ogImage` points at
  `/og-image.jpg`, which is absent from `public/`. Nothing consumes it today
  (`layout.tsx` uses `/images/properties/riad.jpg`), so no link preview is
  currently broken — but add a real 1200×630 asset before relying on it.
- **No CI, Dockerfile or `vercel.json`.** Minimum useful gate:
  `npm ci && npm run typecheck && npm run lint && npm run build`.
- **Pre-existing lint errors: 9**, all in untouched UI files
  (`glassSelect`, `glassSlider`, `reveal`, `switchInput`, `socialMediaBar`,
  `uncontrolledSelect`, `GalleryCarousel`) — mostly `no-explicit-any` plus two
  React Compiler complaints. `next build` does not fail on them.
