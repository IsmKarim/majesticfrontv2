import { Box, SimpleGrid } from "@chakra-ui/react";
import PropertyCard from "../properties/components/propertyCard";
import { Property } from "@/types/property.type";



export default function MorePropertiesWrapper({ properties }: { properties: Property[] }) {
    return (
    
    <Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mt={16} mb={20}>

            {
                properties.map((property: Property) => (
                    <PropertyCard property={property}></PropertyCard>
                ))
            }

        </SimpleGrid>

    </Box>

    )
}