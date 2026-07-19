import { Box, Flex, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { BsGem, BsEyeSlash, BsLightningChargeFill } from "react-icons/bs";

interface Value {
    icon: React.ElementType;
    title: string;
    description: string;
}

const VALUES: Value[] = [
    {
        icon: BsGem,
        title: "Excellence",
        description:
            "Une sélection rigoureuse et une exécution irréprochable à chaque étape de votre projet.",
    },
    {
        icon: BsEyeSlash,
        title: "Discrétion",
        description:
            "Vos transactions sont traitées en toute confidentialité, à l'abri des regards indiscrets.",
    },
    {
        icon: BsLightningChargeFill,
        title: "Efficacité",
        description:
            "Un accompagnement réactif, sans détour, pour concrétiser vos ambitions au bon rythme.",
    },
];

export default function OurValues() {
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
                    Nos Valeurs
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
                Ce qui nous définit
            </Text>

            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap={{ base: 10, md: 8 }}
                maxW="1100px"
                mx="auto"
            >
                {VALUES.map((value) => (
                    <Box key={value.title} textAlign="center" px={4}>
                        <Flex justify="center" mb={5}>
                            <Box
                                p={4}
                                border="1px solid"
                                borderColor="secondary.700"
                                color="secondary.500"
                            >
                                <Icon as={value.icon} boxSize={7} />
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
                            {value.title}
                        </Text>
                        <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                            {value.description}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
