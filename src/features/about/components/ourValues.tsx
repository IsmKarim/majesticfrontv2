import { Box, Flex, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { BsGem, BsEyeSlash, BsLightningChargeFill } from "react-icons/bs";
import { getTranslations } from "next-intl/server";

// `titleKey`/`bodyKey` resolve against the `about.values` namespace.
const VALUES = [
    { icon: BsGem, titleKey: "excellenceTitle", bodyKey: "excellenceBody" },
    { icon: BsEyeSlash, titleKey: "discretionTitle", bodyKey: "discretionBody" },
    { icon: BsLightningChargeFill, titleKey: "efficiencyTitle", bodyKey: "efficiencyBody" },
] as const;

export default async function OurValues() {
    const t = await getTranslations("about.values");
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
                columns={{ base: 1, md: 3 }}
                gap={{ base: 10, md: 8 }}
                maxW="1100px"
                mx="auto"
            >
                {VALUES.map((value) => (
                    <Box key={value.titleKey} textAlign="center" px={4}>
                        <Flex justify="center" mb={5}>
                            <Box
                                p={4}
                                border="1px solid"
                                borderColor="secondary.700"
                                color="secondary.500"
                            >
                                <Icon asChild boxSize={7}><value.icon /></Icon>
                            </Box>
                        </Flex>
                        <Text
                            color="white"
                            fontWeight="600"
                            fontSize="lg"
                            mb={2}
                            textTransform="uppercase"
                            letterSpacing="wide"
                        >
                            {t(value.titleKey)}
                        </Text>
                        <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                            {t(value.bodyKey)}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
