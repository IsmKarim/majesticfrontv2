import PropertyGrid from "@/features/properties/components/PropertyGrid";
import SearchWidget from "@/features/search/searchbar";
import { mockProperties } from "@/types/property.type";
import { Box,  Text } from "@chakra-ui/react";

export default function Page() {
    const properties = mockProperties
    return < >
        <Box pt={"120px"} bg="brand.700"></Box>

        <Box color="secondary.400" px='6' bg="brand.700">

            <Text as="h2">Curated Listings</Text>
            <Text py='6'>An exclusive selection of the kingdom's most prestigious architectural marvels,<br />
                from contemporary villas to historic estates.</Text>

        </Box>
        <Box bg="brand.700" px='6'>

            <SearchWidget />

        </Box>

       {/*  <ViewToolBar /> */}
       <PropertyGrid properties={properties}/>
        
    </>;
}