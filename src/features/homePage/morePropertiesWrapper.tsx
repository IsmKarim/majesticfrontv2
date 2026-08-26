import { SimpleGrid } from "@chakra-ui/react";
import PropertyCard from "../properties/components/propertyCard";
import Reveal from "@/components/ui/reveal";
import { getLatestProperties } from "@/services/properties.service";

/** The landing page's second list: the most recently added listings. */
export default async function MorePropertiesWrapper({ limit = 6 }: { limit?: number }) {
    const properties = await getLatestProperties(limit);
    if (properties.length === 0) return null;

    return (
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4} px={4} py={{ base: 6, md: 8 }} bg="brand.600">
            {properties.map((property, index) => (
                <Reveal key={property.id} delay={(index % 3) * 110}>
                    <PropertyCard property={property} />
                </Reveal>
            ))}
        </SimpleGrid>
    );
}
