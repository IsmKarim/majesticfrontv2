import { Box, Stack } from "@chakra-ui/react";
import type { Property } from "@/types/property.type";
import PropertyListItem from "./propertyListItem";

/**
 * Stacked counterpart to PropertyGrid: one listing per row.
 *
 * The background spans the full width while the rows are capped — an
 * uncapped row on a wide monitor stretches the text into an unreadable line
 * and shrinks the image's share of it.
 */
export default function PropertyList({ properties }: { properties: Property[] }) {
    return (
        <Box bg="brand.700" px={4} py={12}>
            <Stack gap={5} maxW="1400px" mx="auto" w="100%">
                {properties.map((property) => (
                    <PropertyListItem key={property.id} property={property} />
                ))}
            </Stack>
        </Box>
    );
}
