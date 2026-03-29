import { Box, Icon, Text } from "@chakra-ui/react";
import SocialSidebar from "./socialMediaBar";
import { getTranslations } from "next-intl/server";
import SearchWidget from "../search/searchbar";

export default async function Hero() {
    const t = await getTranslations('home.hero');
    return (
        <Box
            pt={"120px"}
            h="100vh"
            position="relative"
            bgImage={"url(images/properties/hero.png)"}
            bgSize="cover"
        >
            <Box py={"100px"} >
                <Text as="h1" fontSize="4xl" color="white" textAlign="center">
                    {t('title')} <br/> {t('subtitle')}
                </Text>
            </Box>

     <Box maxW="1200px" mx="auto"><SearchWidget /></Box>
        <Box position="absolute" bottom="8" left="8">
           <SocialSidebar />
           </Box>
        </Box>
    );
}
