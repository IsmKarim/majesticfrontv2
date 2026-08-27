import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale } from "@/i18n/locales";
import { getPropertySlugs } from "@/services/properties.service";

// Routes that actually exist and render real content — keep in sync with src/app/[locale]
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path || "/" : `/${locale}${path}`;
}

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteConfig.url}${localizedPath(defaultLocale, path)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${siteConfig.url}${localizedPath(locale, path)}`])
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Cached alongside the listing data, so the timestamp is stable across the
  // sitemap's own cache lifetime rather than moving on every request.
  "use cache";

  const lastModified = new Date();
  const slugs = await getPropertySlugs();

  return [
    ...ROUTES.map(({ path, priority, changeFrequency }) =>
      entry(path, priority, changeFrequency, lastModified)
    ),
    ...slugs.map((slug) => entry(`/properties/${slug}`, 0.8, "daily", lastModified)),
  ];
}
