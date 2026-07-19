import { SimpleGrid } from "@chakra-ui/react";
import PropertyCard from "../properties/components/propertyCard";
import Reveal from "@/components/ui/reveal";
import { Property } from "@/types/property.type";

export default function MorePropertiesWrapper({ properties }: { properties: Property[] }) {
    return (
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4} px={4} py={{ base: 6, md: 8 }} bg="brand.600">
            {properties.map((property, index) => (
                <Reveal key={property.id ?? index} delay={(index % 3) * 110}>
                    <PropertyCard property={property} />
                </Reveal>
            ))}
        </SimpleGrid>
    );
}
