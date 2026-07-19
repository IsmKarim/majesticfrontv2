import { Box, Flex, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
    BsKeyFill,
    BsBuilding,
    BsAwardFill,
    BsFileEarmarkTextFill,
    BsGraphUpArrow,
    BsCameraVideoFill,
} from "react-icons/bs";

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
}

const SERVICES: Service[] = [
    {
        icon: BsKeyFill,
        title: "Achat & Vente",
        description:
            "Un accompagnement de bout en bout pour acquérir ou céder un bien d'exception, en toute sérénité.",
    },
    {
        icon: BsBuilding,
        title: "Location & Gestion",
        description:
            "Mise en location et gestion locative complète, pour un rendement optimisé sans contrainte.",
    },
    {
        icon: BsAwardFill,
        title: "Accompagnement VIP",
        description:
            "Un service de conciergerie immobilière dédié, pour gérer chaque détail avec la plus grande discrétion.",
    },
    {
        icon: BsFileEarmarkTextFill,
        title: "Conseil Sur-Mesure",
        description:
            "Expertise juridique et fiscale pour sécuriser vos transactions et optimiser votre patrimoine.",
    },
    {
        icon: BsGraphUpArrow,
        title: "Estimation & Valorisation",
        description:
            "Une analyse précise du marché pour révéler la juste valeur de votre bien.",
    },
    {
        icon: BsCameraVideoFill,
        title: "Visites Privées & Virtuelles",
        description:
            "Des visites organisées sur-mesure, en personne ou à distance, pour ne rien laisser au hasard.",
    },
];

export default function ServicesGrid() {
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
                    Notre Offre
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
                Un service pour chaque ambition
            </Text>

            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                gap={{ base: 8, md: 10 }}
                maxW="1200px"
                mx="auto"
            >
                {SERVICES.map((service) => (
                    <Flex key={service.title} gap={4} align="flex-start">
                        <Box
                            flexShrink={0}
                            p={3}
                            border="1px solid"
                            borderColor="secondary.700"
                            color="secondary.500"
                        >
                            <Icon as={service.icon} boxSize={5} />
                        </Box>
                        <Box>
                            <Text
                                fontWeight="semibold"
                                fontSize={{ base: "md", md: "lg" }}
                                color="white"
                                mb={1}
                            >
                                {service.title}
                            </Text>
                            <Text
                                fontSize={{ base: "sm", md: "sm" }}
                                color="secondary.300"
                                lineHeight="tall"
                            >
                                {service.description}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    );
}
