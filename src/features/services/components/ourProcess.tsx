import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

// `titleKey`/`bodyKey` resolve against the `services.process` namespace.
const STEPS = [
    { number: "01", titleKey: "step1Title", bodyKey: "step1Body" },
    { number: "02", titleKey: "step2Title", bodyKey: "step2Body" },
    { number: "03", titleKey: "step3Title", bodyKey: "step3Body" },
    { number: "04", titleKey: "step4Title", bodyKey: "step4Body" },
] as const;

export default async function OurProcess() {
    const t = await getTranslations("services.process");
    return (
        <Box bg="brand.600" py={{ base: 14, md: 20 }} px={4}>
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
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="white"
                textAlign="center"
                mb={{ base: 10, md: 14 }}
            >
                {t("title")}
            </Text>

            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 4 }}
                gap={{ base: 10, lg: 8 }}
                maxW="1200px"
                mx="auto"
            >
                {STEPS.map((step) => (
                    <Box key={step.number} textAlign="center" px={4}>
                        <Text
                            fontSize={{ base: "4xl", md: "5xl" }}
                            fontWeight="bold"
                            color="secondary.500"
                            lineHeight={1}
                            mb={3}
                        >
                            {step.number}
                        </Text>
                        <Text
                            color="white"
                            fontWeight="600"
                            fontSize="lg"
                            mb={2}
                            textTransform="uppercase"
                            letterSpacing="wide"
                        >
                            {t(step.titleKey)}
                        </Text>
                        <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                            {t(step.bodyKey)}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
