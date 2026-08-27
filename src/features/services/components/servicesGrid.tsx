import { Box, Flex, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
    BsKeyFill,
    BsBuilding,
    BsAwardFill,
    BsFileEarmarkTextFill,
    BsGraphUpArrow,
    BsCameraVideoFill,
} from "react-icons/bs";
import { getTranslations } from "next-intl/server";

// `titleKey`/`bodyKey` resolve against the `services.grid` namespace.
const SERVICES = [
    { icon: BsKeyFill, titleKey: "saleTitle", bodyKey: "saleBody" },
    { icon: BsBuilding, titleKey: "rentalTitle", bodyKey: "rentalBody" },
    { icon: BsAwardFill, titleKey: "vipTitle", bodyKey: "vipBody" },
    { icon: BsFileEarmarkTextFill, titleKey: "adviceTitle", bodyKey: "adviceBody" },
    { icon: BsGraphUpArrow, titleKey: "valuationTitle", bodyKey: "valuationBody" },
    { icon: BsCameraVideoFill, titleKey: "viewingTitle", bodyKey: "viewingBody" },
] as const;

export default async function ServicesGrid() {
    const t = await getTranslations("services.grid");
    return (
        <Box bg="brand.500" py={{ base: 14, md: 20 }} px={4}>
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
                columns={{ base: 1, sm: 2, lg: 3 }}
                gap={{ base: 8, md: 10 }}
                maxW="1200px"
                mx="auto"
            >
                {SERVICES.map((service) => (
                    <Flex key={service.titleKey} gap={4} align="flex-start">
                        <Box
                            flexShrink={0}
                            p={3}
                            border="1px solid"
                            borderColor="secondary.700"
                            color="secondary.500"
                        >
                            <Icon asChild boxSize={5}><service.icon /></Icon>
                        </Box>
                        <Box>
                            <Text
                                fontWeight="semibold"
                                fontSize={{ base: "md", md: "lg" }}
                                color="white"
                                mb={1}
                            >
                                {t(service.titleKey)}
                            </Text>
                            <Text
                                fontSize={{ base: "sm", md: "sm" }}
                                color="secondary.300"
                                lineHeight="tall"
                            >
                                {t(service.bodyKey)}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    );
}
