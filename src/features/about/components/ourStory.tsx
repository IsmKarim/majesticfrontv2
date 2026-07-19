import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const IMAGE_DIMS = { maxW: "400px", h: { base: "320px", md: "440px", lg: "560px" } };

export default function OurStory() {
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
                            alt="Villa Majestic Keys"
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
                                Années d&apos;expérience
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
                    Notre Histoire
                </Text>

                <Text
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    mt={2}
                    mb={4}
                >
                    Une vision, un héritage
                </Text>

                <Text
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                >
                    Majestic Keys est née à Kénitra d&apos;une conviction simple :
                    l&apos;immobilier de prestige mérite une approche à la hauteur de
                    son exigence. Loin des transactions standardisées, nous avons
                    construit une agence à taille humaine, où chaque dossier est
                    traité avec la rigueur et la discrétion d&apos;un service
                    véritablement sur-mesure.
                </Text>

                <Text
                    mt={4}
                    color="secondary.300"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="tall"
                >
                    Au fil des années, notre réseau s&apos;est étendu aux quartiers
                    les plus recherchés du royaume, nous donnant accès à des biens
                    rares, souvent invisibles sur le marché ouvert. Cette proximité
                    avec le terrain, alliée à une expertise juridique et fiscale
                    pointue, fait de nous le partenaire de confiance d&apos;une
                    clientèle marocaine et internationale exigeante.
                </Text>

                <Text
                    as="span"
                    display="block"
                    mt={6}
                    color="secondary.500"
                    fontStyle="italic"
                    fontSize={{ base: "md", md: "lg" }}
                >
                    — L&apos;équipe Majestic Keys
                </Text>
            </Flex>
        </Flex>
    );
}
