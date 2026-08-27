import { Box, HStack, Text } from "@chakra-ui/react";
import ServicesGrid from "@/features/services/components/servicesGrid";
import OurProcess from "@/features/services/components/ourProcess";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("services");
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

            <ServicesGrid />
            <OurProcess />
        </>
    );
}
