import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Box, Text } from "@chakra-ui/react";

import ViewToolBar from "@/features/properties/components/viewToolbar";
import PropertyResults, {
    PropertyResultsSkeleton,
} from "@/features/properties/components/propertyResults";
import SearchWidget from "@/features/search/searchbar";
import {
    buildPropertyHref,
    parsePropertyQuery,
    parsePropertyView,
} from "@/features/properties/property.query";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
    const { locale: raw } = await params;
    const locale = (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale;
    const t = await getTranslations({ locale, namespace: "properties.list" });
    const query = parsePropertyQuery(await searchParams);

    // The default locale is served unprefixed, so every other locale needs the
    // prefix or its canonical would point at the French page.
    const href = buildPropertyHref(query);
    const prefixed = (l: Locale) => (l === defaultLocale ? href : `/${l}${href}`);

    return {
        title: query.page > 1 ? t("metaTitlePaged", { page: query.page }) : t("metaTitle"),
        description: t("metaDescription"),
        // Each filter combination points back at itself, so paginated and filtered
        // views stay distinct rather than collapsing onto one canonical URL.
        alternates: {
            canonical: prefixed(locale),
            languages: Object.fromEntries(locales.map((l) => [l, prefixed(l)])),
        },
    };
}

/**
 * Reads the URL. `searchParams` is request-time data, so awaiting it in the page
 * body would block the whole route from prerendering — it has to be resolved
 * inside the Suspense boundary instead.
 */
async function Results({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const resolved = await searchParams;
    return <PropertyResults query={parsePropertyQuery(resolved)} view={parsePropertyView(resolved)} />;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("properties.list");

    return (
        <>
            <Box pt={"120px"} bg="brand.700"></Box>

            <Box color="secondary.400" px="6" bg="brand.700">
                <Text as="h2">{t("title")}</Text>
                <Text py="6">{t("subtitle")}</Text>
            </Box>

            <Box bg="brand.700" px="6">
                <Suspense>
                    <SearchWidget />
                </Suspense>
            </Box>

            <Suspense>
                <ViewToolBar />
            </Suspense>

            {/* Only the result set depends on the URL, so only it streams. Everything
                above is prerendered into the static shell and paints immediately. */}
            <Suspense fallback={<PropertyResultsSkeleton />}>
                <Results searchParams={searchParams} />
            </Suspense>
        </>
    );
}
