import { Property } from "@/types/property.type";
import { SimpleGrid, type SimpleGridProps } from "@chakra-ui/react";
import PropertyCard from "./propertyCard";


export default function PropertyGrid({
    properties,
    columns = { base: 1, md: 2, lg: 3 },
}: {
    properties: Property[];
    columns?: SimpleGridProps["columns"];
}) {

    return(
        <>
        <SimpleGrid columns={columns} gap={4} px={4} py={12} bg="brand.700">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </SimpleGrid>
        </>
    )
}
