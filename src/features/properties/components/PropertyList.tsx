import { Stack } from "@chakra-ui/react";
import type { Property } from "@/types/property.type";
import PropertyListItem from "./propertyListItem";

/** Stacked counterpart to PropertyGrid: one listing per row. */
export default function PropertyList({ properties }: { properties: Property[] }) {
    return (
        <Stack gap={4} px={4} py={12} bg="brand.700">
            {properties.map((property) => (
                <PropertyListItem key={property.id} property={property} />
            ))}
        </Stack>
    );
}
