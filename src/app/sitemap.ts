import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale } from "@/i18n/locales";

// Routes that actually exist and render real content — keep in sync with src/app/[locale]
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path || "/" : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${localizedPath(defaultLocale, path)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${siteConfig.url}${localizedPath(locale, path)}`])
      ),
    },
  }));
}
