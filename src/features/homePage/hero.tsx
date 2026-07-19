import { Suspense } from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import SocialSidebar from "./socialMediaBar";
import SearchWidget from "../search/searchbar";

// Shared easing for the entrance choreography — one curve, one language
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const rise = (delay: number) => ({
    animation: `hero-rise 0.9s ${EASE} ${delay}s both`,
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});

export default async function Hero() {
    const t = await getTranslations('home.hero');
    return (
        <Box
            position="relative"
            overflow="hidden"
            bg="brand.900"
            // 100dvh tracks the real viewport as mobile browser chrome collapses
            css={{
                minHeight: "100vh",
                "@supports (min-height: 100dvh)": { minHeight: "100dvh" },
                "@keyframes hero-rise": {
                    from: { opacity: 0, transform: "translateY(22px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                "@keyframes hero-settle": {
                    from: { transform: "scale(1.07)" },
                    to: { transform: "scale(1)" },
                },
            }}
        >
            {/* Background photo on its own layer so it can settle slowly into place */}
            <Box
                position="absolute"
                inset={0}
                bgImage={"url(/images/properties/riad.jpg)"}
                bgSize="cover"
                bgPos="center"
                css={{
                    animation: `hero-settle 10s ${EASE} both`,
                    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
            />

            {/* Dark scrim never drops below ~0.55 opacity anywhere, so the
                headline stays legible even if the agency swaps in a light photo */}
            <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(180deg, rgba(5,11,18,0.72) 0%, rgba(13,27,42,0.55) 32%, rgba(13,27,42,0.62) 58%, rgba(5,11,18,0.82) 100%)"
            />

            {/* Gold vignette, echoes the navbar's brand glow */}
            <Box
                position="absolute"
                top="34%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: "320px", md: "620px" }}
                h={{ base: "320px", md: "620px" }}
                borderRadius="full"
                bg="radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0) 70%)"
                pointerEvents="none"
            />

            <Flex
                position="relative"
                zIndex={1}
                direction="column"
                pt="120px"
                pb={{ base: 6, md: 14 }}
                px={4}
                gap={{ base: 6, md: 0 }}
                css={{
                    minHeight: "100vh",
                    "@supports (min-height: 100dvh)": { minHeight: "100dvh" },
                }}
            >
                <Flex
                    flex="1"
                    direction="column"
                    align="center"
                    justify="center"
                    textAlign="center"
                    maxW="900px"
                    mx="auto"
                    py={{ base: 4, md: 0 }}
                >
                    <HStack gap={3} mb={{ base: 4, md: 5 }} css={rise(0.05)}>
                        <Box w="36px" h="1px" bg="secondary.500" />
                        <Text
                            color="secondary.500"
                            fontSize={{ base: "xs", md: "sm" }}
                            textTransform="uppercase"
                            letterSpacing="widest"
                            fontWeight="600"
                        >
                            {t('eyebrow')}
                        </Text>
                        <Box w="36px" h="1px" bg="secondary.500" />
                    </HStack>

                    <Text
                        as="h1"
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                        lineHeight="1.15"
                        fontWeight="600"
                        color="white"
                        css={rise(0.18)}
                    >
                        {t('titleLead')}{" "}
                        <Text as="span" color="secondary.400" fontStyle="italic">
                            {t('titleAccent')}
                        </Text>
                        <br />
                        {t('titleEnd')}
                    </Text>

                    <HStack
                        gap={{ base: 3, md: 5 }}
                        justify="center"
                        mt={{ base: 4, md: 6 }}
                        css={rise(0.32)}
                    >
                        <Text color="whiteAlpha.900" fontSize={{ base: "sm", md: "lg" }} letterSpacing="wide">
                            {t('trait1')}
                        </Text>
                        <Box w="4px" h="4px" borderRadius="full" bg="secondary.500" />
                        <Text color="whiteAlpha.900" fontSize={{ base: "sm", md: "lg" }} letterSpacing="wide">
                            {t('trait2')}
                        </Text>
                    </HStack>
                </Flex>

                <Box w="full" maxW="1200px" mx="auto" css={rise(0.48)}>
                    <Suspense>
                        <SearchWidget />
                    </Suspense>
                </Box>

                <Box
                    position={{ base: "static", md: "absolute" }}
                    bottom={{ md: "8" }}
                    left={{ md: "8" }}
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-start" }}
                    zIndex={1}
                    css={rise(0.65)}
                >
                    <SocialSidebar />
                </Box>
            </Flex>
        </Box>
    );
}
