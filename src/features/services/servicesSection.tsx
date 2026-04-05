import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import ServiceCard from "./serviceCard";
import Iconify from "@/components/ui/iconify";
import ServiceCardVar from "./serviceCardVar";

const SERVICES = [
  {
    title: "Achat/location",
    description:
      "Une sélection rigoureuse de biens d'exceptionrépondant aux standards les plus élevés dumarché international.",
    logo: "/icons/Transaction.svg",
  },
  {
    title: "Accompagnement VIP",
    description:
      "Un service de conciergerie immobilière dédié pourgérer chaque détail de votre installation en toute sérénité.",
    logo: "/icons/VIP.svg",
  },
  {
    title: "Conseil Sur-Mesure",
    description:
      "Expertise juridique et fiscale pour optimiser votrepatrimoine immobilier et sécuriser vos investissements.",
    logo: "/icons/Transaction.svg",
  },
];

export default function ServicesSection() {
  return (
    <>
    <Box  bg="brand.600" pb={8}>

      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 4 }}
        py={16}
        gap={4}
      >
        {SERVICES.map((service, index) => (
          <ServiceCardVar
            key={index}
            title={service.title}
            description={service.description}
            image={service.logo}
          />
        ))}
        <Box w="100%" h="100%" my="auto" minH="200px" boxShadow="md">
          <Flex
            px={12}
            py={16}
            direction={"column"}
            gap={4}
            justify={"center"}
            h="100%"
          >
            <Text
              color="secondary.500"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Expertise
            </Text>

            <Text color="white" as="h4">
              SERVICE PRESTIGIEUX
            </Text>
            <Text color="white" mt={4}>
              Nous vous offrons un service de qualité, personnalisé et sur
              mesure.
            </Text>

            <Flex w="100%" justify={"center"}>
              <Iconify
                icon={"mingcute:left-fill"}
                w="50px"
                h="50px"
                color="secondary.500"
                mt={4}
              />
              <Iconify
                icon={"mingcute:left-fill"}
                w="50px"
                h="50px"
                color="white"
                mt={4}
              />
              <Iconify
                icon={"mingcute:left-fill"}
                w="50px"
                h="50px"
                color="secondary.500"
                mt={4}
              />
            </Flex>
          </Flex>
        </Box>
      </SimpleGrid>

      <Flex justify={"flex-end"} px={4} py={6}>
        <Button color="whiteAlpha.900" cursor="pointer">
          Voir plus
        </Button>
      </Flex>
      </Box>
    </>
  );
}
