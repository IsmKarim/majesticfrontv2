import { Box, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { getProperties } from "@/services/properties.service";
import type { PropertyQuery } from "../property.query";
import PropertyGrid from "./PropertyGrid";
import PropertyPagination from "./propertyPagination";

/**
 * Streamed inside a <Suspense> boundary on /properties. Everything above it —
 * the heading, the search widget, the toolbar — stays in the static shell, so
 * the page paints immediately and only the result set waits on data.
 */
export default async function PropertyResults({ query }: { query: PropertyQuery }) {
    const { items, total, page, totalPages } = await getProperties(query);

    if (total === 0) {
        return (
            <VStack gap={3} py={20} px={6} bg="brand.700" textAlign="center">
                <Text as="h2" color="secondary.400" fontSize="lg">
                    Aucun bien ne correspond à votre recherche
                </Text>
                <Text color="secondary.500" fontSize="sm">
                    Essayez d&apos;élargir vos critères — un budget plus large ou une autre ville.
                </Text>
            </VStack>
        );
    }

    return (
        <>
            <Box bg="brand.700" px={6} pt={4}>
                <Text color="secondary.500" fontSize="sm">
                    {total} bien{total > 1 ? "s" : ""} — page {page} sur {totalPages}
                </Text>
            </Box>
            <PropertyGrid properties={items} />
            <PropertyPagination query={query} page={page} totalPages={totalPages} />
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
