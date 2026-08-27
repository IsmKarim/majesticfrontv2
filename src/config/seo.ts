import type { Locale } from "@/i18n/locales";

/**
 * Open Graph locale identifiers. These are BCP-47-ish protocol values, not
 * translatable copy, so they stay in code — the actual SEO title, description
 * and keywords live in the message catalogs under the `seo` namespace.
 */
export const ogLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};
