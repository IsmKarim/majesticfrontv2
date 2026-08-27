import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const IMAGE_DIMS = { maxW: "400px", h: { base: "320px", md: "440px", lg: "560px" } };

export default async function OurStory() {
    const t = await getTranslations("about.story");
    return (
        <Flex
            py={{ base: 8, md: 12 }}
            direction={{ base: "column", lg: "row" }}
            align="stretch"
        >
            {/* ── Left: Image Panel ── */}
            <Box
                flex={1}
                position="relative"
                bg="brand.500"
                p={{ base: 6, md: 8 }}
                boxShadow="md"
            >
                {/* Extra bottom padding on mobile to give badge breathing room */}
                <Box pb={{ base: 14, lg: 0 }}>
                    <Box
                        position="relative"
                        w="100%"
                        maxW={IMAGE_DIMS.maxW}
                        h={IMAGE_DIMS.h}
                        mx="auto"
                        borderRadius="xl"
                        overflow="visible"
                    >
                        <Image
                            src="/images/properties/villa.jpg"
                            alt={t("imageAlt")}
                            fill
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "inherit",
                            }}
                            sizes={`(max-width: 768px) 100vw, ${IMAGE_DIMS.maxW}`}
                        />

                        {/* ── Experience Badge ── */}
                        <Box
                            position="absolute"
                            bottom={{ base: -12, lg: -10 }}
                            right={{ base: "50%", lg: -6 }}
                            transform={{ base: "translateX(50%)", lg: "none" }}
                            zIndex={1}
                            px={{ base: 5, md: 6 }}
                            py={{ base: 6, md: 8 }}
                            bg="brand.900"
                            color="secondary.500"
                            boxShadow="lg"
                        >
                            <Text
                                as="h3"
                                fontSize={{ base: "2xl", md: "3xl" }}
                                fontWeight="bold"
                                textAlign="center"
                            >
                                +15
                            </Text>
                            <Text
                                as="h4"
                                fontSize={{ base: "xs", md: "sm" }}
                                textAlign="center"
                                textTransform="uppercase"
                                letterSpacing="wide"
                            >
                                {t("experienceLabel")}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ── Right: Text Panel ── */}
            <Flex
                flex={1}
                direction="column"
                justify="center"
                pt={{ base: 16, lg: 8 }}
                pb={{ base: 8, lg: 8 }}
                px={{ base: 6, md: 10, lg: 16, xl: 24 }}
                color="white"
            >
                <Text
                    color="secondary.500"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="wide"
                >
                    {t("eyebrow")}
                </Text>

                <Text
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    mt={2}
                    mb={4}
                >
                    {t("title")}
                </Text>

                <Text
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                >
                    {t("body")}
                </Text>

                <Text
                    mt={4}
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                >
                    {t("body2")}
                </Text>

                <Text
                    as="span"
                    display="block"
                    mt={6}
                    color="secondary.500"
                    fontStyle="italic"
                    fontSize={{ base: "md", md: "lg" }}
                >
                    {t("signature")}
                </Text>
            </Flex>
        </Flex>
    );
}
