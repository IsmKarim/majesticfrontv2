import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

// The page itself is a Client Component and cannot export metadata, so it lives
// in this sibling layout.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: "about" });

  // The default locale is served unprefixed (localePrefix: "as-needed"), so the
  // canonical has to carry the prefix for every other locale.
  const prefix = locale === defaultLocale ? "" : `/${locale}`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${prefix}/about`,
      languages: Object.fromEntries(
        locales.map((l) => [l, l === defaultLocale ? "/about" : `/${l}/about`])
      ),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
