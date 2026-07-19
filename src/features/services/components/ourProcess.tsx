import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";

interface Step {
    number: string;
    title: string;
    description: string;
}

const STEPS: Step[] = [
    {
        number: "01",
        title: "Consultation",
        description:
            "Nous échangeons sur vos besoins, vos ambitions et le profil du bien recherché ou à valoriser.",
    },
    {
        number: "02",
        title: "Sélection",
        description:
            "Notre équipe identifie les opportunités les plus pertinentes, y compris hors marché.",
    },
    {
        number: "03",
        title: "Négociation",
        description:
            "Nous défendons vos intérêts à chaque étape, de l'offre jusqu'à la signature.",
    },
    {
        number: "04",
        title: "Suivi",
        description:
            "Un accompagnement personnalisé se poursuit bien au-delà de la transaction.",
    },
];

export default function OurProcess() {
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
                    Notre Méthode
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
                Un processus maîtrisé
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
                            {step.title}
                        </Text>
                        <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                            {step.description}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
