import Reveal from "@/components/ui/reveal";
import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import BrowseCard from "./browseCard";
import { getTranslations } from "next-intl/server";

// TODO: real per-city photos and live listing counts once the backend is wired
const CITIES = [
    { title: "Kenitra", img: "/images/cities/kenitra.png", totalListings: 15, href: "/properties?city=kenitra" },
    { title: "Casablanca", img: "/images/cities/pexels-anouar-12433311.jpg", totalListings: 12, href: "/properties?city=casablanca" },
    { title: "Rabat", img: "/images/cities/pexels-ivan-drazic-20457695-6555997.jpg", totalListings: 9, href: "/properties?city=rabat" },
    { title: "Tanger", img: "/images/cities/pexels-khalil-1413643.jpg", totalListings: 7, href: "/properties?city=tanger" },
    { title: "Marrakech", img: "/images/cities/pexels-anouar-12433311.jpg", totalListings: 6, href: "/properties?city=marrakech" },
];

export default async function BrowseByCity() {
    const t = await getTranslations("home.cities");
    return (
        <Box bg="brand.600" py={{ base: 16, md: 24 }} px={4}>
            <Reveal>
                <HStack justify="center" gap={3} mb={4}>
                    <Box w="36px" h="1px" bg="secondary.500" />
                    <Text
                        color="secondary.500"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        fontWeight="600"
                    >
                        {t("eyebrow")}
                    </Text>
                    <Box w="36px" h="1px" bg="secondary.500" />
                </HStack>

                <Text
                    as="h3"
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="600"
                    color="white"
                    textAlign="center"
                    mb={{ base: 10, md: 14 }}
                >
                    {t("title")}
                </Text>
            </Reveal>

            <SimpleGrid
                columns={{ base: 2, sm: 3, lg: 5 }}
                gap={{ base: 3, md: 4 }}
                maxW="1400px"
                mx="auto"
            >
                {CITIES.map((city, index) => (
                    <Reveal
                        key={index}
                        delay={index * 90}
                        gridColumn={{ base: index === 0 ? "span 2" : undefined, sm: "span 1" }}
                    >
                        <BrowseCard
                            title={city.title}
                            img={city.img}
                            totalListings={city.totalListings}
                            href={city.href}
                        />
                    </Reveal>
                ))}
            </SimpleGrid>
        </Box>
    );
}
