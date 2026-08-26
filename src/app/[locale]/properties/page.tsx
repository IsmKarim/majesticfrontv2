import { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Box, Text } from "@chakra-ui/react";

import ViewToolBar from "@/features/properties/components/viewToolbar";
import PropertyResults, {
    PropertyResultsSkeleton,
} from "@/features/properties/components/propertyResults";
import SearchWidget from "@/features/search/searchbar";
import { buildPropertyHref, parsePropertyQuery } from "@/features/properties/property.query";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
    const query = parsePropertyQuery(await searchParams);

    return {
        title: query.page > 1 ? `Nos biens — page ${query.page}` : "Nos biens",
        description:
            "Parcourez la sélection Majestic Keys : villas, appartements et biens d'exception à la vente et à la location au Maroc.",
        // Each filter combination points back at itself, so paginated and filtered
        // views stay distinct rather than collapsing onto one canonical URL.
        alternates: { canonical: buildPropertyHref(query) },
    };
}

/**
 * Reads the URL. `searchParams` is request-time data, so awaiting it in the page
 * body would block the whole route from prerendering — it has to be resolved
 * inside the Suspense boundary instead.
 */
async function Results({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const query = parsePropertyQuery(await searchParams);
    return <PropertyResults query={query} />;
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

    return (
        <>
            <Box pt={"120px"} bg="brand.700"></Box>

            <Box color="secondary.400" px="6" bg="brand.700">
                <Text as="h2">Curated Listings</Text>
                <Text py="6">
                    An exclusive selection of the kingdom&apos;s most prestigious architectural marvels,
                    <br />
                    from contemporary villas to historic estates.
                </Text>
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
