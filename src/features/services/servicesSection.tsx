import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Iconify from "@/components/ui/iconify";
import Reveal from "@/components/ui/reveal";
import ServiceCardVar from "./serviceCardVar";

const SERVICES = [
  {
    title: "Achat/location",
    description:
      "Une sélection rigoureuse de biens d'exception répondant aux standards les plus élevés du marché international.",
    logo: "/icons/Transaction.svg",
  },
  {
    title: "Accompagnement VIP",
    description:
      "Un service de conciergerie immobilière dédié pour gérer chaque détail de votre installation en toute sérénité.",
    logo: "/icons/VIP.svg",
  },
  {
    title: "Conseil Sur-Mesure",
    description:
      "Expertise juridique et fiscale pour optimiser votre patrimoine immobilier et sécuriser vos investissements.",
    logo: "/icons/Transaction.svg",
  },
];

export default function ServicesSection() {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 4 }}
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 0 }}
        gap={4}
        bg="brand.600"
      >
        {SERVICES.map((service, index) => (
          <Reveal key={index} delay={150 + index * 120}>
            <ServiceCardVar
              title={service.title}
              description={service.description}
              image={service.logo}
            />
          </Reveal>
        ))}
        <Reveal
          w="100%"
          h="100%"
          my="auto"
          minH="200px"
          boxShadow="md"
          order={{ base: -1, md: 0 }}
        >
          <Flex
            px={{ base: 6, md: 12 }}
            py={{ base: 10, md: 16 }}
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

            {/* Decorative chevrons breathe in sequence — a quiet pulse, not a blink */}
            <Flex
              w="100%"
              justify={"center"}
              css={{
                "@keyframes chevron-breathe": {
                  "0%, 100%": { opacity: 0.35 },
                  "50%": { opacity: 1 },
                },
                "& > *": {
                  animation: "chevron-breathe 2.4s ease-in-out infinite",
                },
                "& > *:nth-of-type(2)": { animationDelay: "0.3s" },
                "& > *:nth-of-type(3)": { animationDelay: "0.6s" },
                "@media (prefers-reduced-motion: reduce)": {
                  "& > *": { animation: "none" },
                },
              }}
            >
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
        </Reveal>
      </SimpleGrid>

      <Flex justify={"flex-end"} px={{ base: 4, md: 6 }} py={6}>
        <Button
          asChild
          variant="outline"
          borderColor="secondary.500"
          color="secondary.400"
          borderRadius={0}
          px={8}
          minH="48px"
          fontSize="sm"
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing="widest"
          transition="all 0.3s ease"
          _hover={{ bg: "secondary.500", color: "brand.900" }}
        >
          <NextLink href="/services">
            Voir plus
            <Iconify icon="mdi:arrow-right" w="16px" h="16px" />
          </NextLink>
        </Button>
      </Flex>
    </>
  );
}
