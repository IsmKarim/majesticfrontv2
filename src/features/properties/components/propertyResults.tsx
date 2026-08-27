import { Box, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { getProperties } from "@/services/properties.service";
import { getTranslations } from "next-intl/server";
import type { PropertyQuery, PropertyView } from "../property.query";
import PropertyGrid from "./PropertyGrid";
import PropertyList from "./PropertyList";
import PropertyPagination from "./propertyPagination";

/**
 * Streamed inside a <Suspense> boundary on /properties. Everything above it —
 * the heading, the search widget, the toolbar — stays in the static shell, so
 * the page paints immediately and only the result set waits on data.
 */
export default async function PropertyResults({
    query,
    view,
}: {
    query: PropertyQuery;
    view: PropertyView;
}) {
    const t = await getTranslations("properties.list");
    const { items, total, page, totalPages } = await getProperties(query);

    if (total === 0) {
        return (
            <VStack gap={3} py={20} px={6} bg="brand.700" textAlign="center">
                <Text as="h2" color="secondary.400" fontSize="lg">
                    {t("emptyTitle")}
                </Text>
                <Text color="secondary.500" fontSize="sm">
                    {t("emptyBody")}
                </Text>
            </VStack>
        );
    }

    return (
        <>
            <Box bg="brand.700" px={6} pt={4}>
                <Text color="secondary.500" fontSize="sm">
                    {t("resultCount", { count: total, page, totalPages })}
                </Text>
            </Box>
            {view === "list" ? (
                <PropertyList properties={items} />
            ) : (
                <PropertyGrid properties={items} />
            )}
            <PropertyPagination query={query} view={view} page={page} totalPages={totalPages} />
        </>
    );
}

/** Fallback shown in the static shell while the results stream in. */
export function PropertyResultsSkeleton({ count = 6 }: { count?: number }) {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} px={4} py={12} bg="brand.700">
            {Array.from({ length: count }, (_, i) => (
                <Skeleton key={i} height="320px" borderRadius="sm" />
            ))}
        </SimpleGrid>
    );
}
