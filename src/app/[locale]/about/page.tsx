"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import OurStory from "@/features/about/components/ourStory";
import OurValues from "@/features/about/components/ourValues";
import WhyChooseUs from "@/features/homePage/whyChooseUs";

export default function AboutPage() {
    return (
        <>
            <Box pt="120px" pb={{ base: 12, md: 20 }} px={4} bg="brand.600" textAlign="center">
                <HStack justify="center" gap={3} mb={4}>
                    <Box w="36px" h="1px" bg="secondary.500" />
                    <Text
                        color="secondary.500"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        fontWeight="600"
                    >
                        À Propos
                    </Text>
                    <Box w="36px" h="1px" bg="secondary.500" />
                </HStack>

                <Text
                    as="h1"
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="600"
                    color="white"
                    mb={4}
                >
                    L&apos;art de l&apos;immobilier{" "}
                    <Text as="span" color="secondary.400" fontStyle="italic">
                        d&apos;exception
                    </Text>
                </Text>

                <Text
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    maxW="640px"
                    mx="auto"
                    lineHeight="tall"
                >
                    Depuis plus de 15 ans, Majestic Keys accompagne une clientèle
                    exigeante dans l&apos;acquisition et la valorisation de biens
                    d&apos;exception à Kénitra et au-delà.
                </Text>
            </Box>

            <OurStory />
            <OurValues />
            <WhyChooseUs />
        </>
    );
}
