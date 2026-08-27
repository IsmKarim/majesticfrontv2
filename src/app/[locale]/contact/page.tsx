"use client";

import { Box, Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Reveal from "@/components/ui/reveal";
import Iconify from "@/components/ui/iconify";
import ContactForm from "@/features/contact/contactForm";
import { ContactFormValues } from "@/features/contact/contact.schema";
import { siteConfig } from "@/config/site";
import { toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";

const { street, city, country } = siteConfig.contact.address;

// `labelKey` resolves against the `contact` namespace at render time.
const CONTACT_DETAILS = [
    { icon: "mdi:map-marker-outline", labelKey: "addressLabel", value: `${street}, ${city}, ${country}` },
    { icon: "mdi:phone-outline", labelKey: "phoneLabel", value: siteConfig.contact.phone },
    { icon: "mdi:email-outline", labelKey: "emailLabel", value: siteConfig.contact.email },
];

export default function ContactPage() {
    const t = useTranslations("contact");
    // TODO: wire to a real backend endpoint once the API exists
    const handleSubmit = async (values: ContactFormValues) => {
        void values;
        toaster.create({
            title: t("successTitle"),
            description: t("successBody"),
            type: "success",
        });
    };

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
                        {t("eyebrow")}
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
                    {t("titleLead")}{" "}
                    <Text as="span" color="secondary.400" fontStyle="italic">
                        {t("titleAccent")}
                    </Text>
                </Text>

                <Text
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    maxW="640px"
                    mx="auto"
                    lineHeight="tall"
                >
                    {t("body")}
                </Text>
            </Box>

            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                gap={{ base: 10, lg: 16 }}
                maxW="1200px"
                mx="auto"
                px={{ base: 4, md: 8 }}
                py={{ base: 10, md: 16 }}
            >
                {/* ── Contact details ── */}
                <Reveal>
                    <Stack gap={8} color="white">
                        <Text as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                            {t("detailsTitle")}
                        </Text>

                        {CONTACT_DETAILS.map((detail) => (
                            <Flex key={detail.labelKey} align="flex-start" gap={4}>
                                <Flex
                                    align="center"
                                    justify="center"
                                    w="44px"
                                    h="44px"
                                    bg="whiteAlpha.100"
                                    borderRadius="full"
                                    flexShrink={0}
                                >
                                    <Iconify icon={detail.icon} w="20px" h="20px" color="var(--chakra-colors-secondary-500)" />
                                </Flex>
                                <Box>
                                    <Text fontSize="sm" color="secondary.500" textTransform="uppercase" letterSpacing="wide">
                                        {t(detail.labelKey)}
                                    </Text>
                                    <Text color="whiteAlpha.900" mt={1}>
                                        {detail.value}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                </Reveal>

                {/* ── Form ── */}
                <Reveal delay={150}>
                    <Box
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        p={{ base: 6, md: 8 }}
                        color="white"
                    >
                        <ContactForm onSubmit={handleSubmit} />
                    </Box>
                </Reveal>
            </SimpleGrid>
        </>
    );
}
