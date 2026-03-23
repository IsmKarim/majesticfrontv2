// components/WhyChooseUs.tsx
"use client"
import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { BsGrid1X2, BsPeopleFill, BsGearWideConnected } from "react-icons/bs";
import WhyChooseUsStats from "./statistics";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: BsGrid1X2,
    title: "Portfolio Exclusif",
    description:
      "Accès privilégié à des propriétés off-market et des domaines d'exception introuvables ailleurs.",
  },
  {
    icon: BsPeopleFill,
    title: "Service Personnalisé",
    description:
      "Chaque client bénéficie d'un accompagnement sur mesure, adapté à ses besoins les plus spécifiques.",
  },
  {
    icon: BsGearWideConnected,
    title: "Expertise du Marché",
    description:
      "Une connaissance approfondie du paysage immobilier marocain pour des investissements sécurisés.",
  },
];

function FeatureItem({ icon, title, description }: Feature) {
  return (
    <Flex gap={4} align="flex-start">
      <Box
        flexShrink={0}
        p={2}
        border="1px solid"
        borderColor="secondary.700"
        color="secondary.500"
      >
        <Icon as={icon} boxSize={{ base: 4, md: 5 }} />
      </Box>
      <Box>
        <Text
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "md" }}
          color="white"
          mb={1}
        >
          {title}
        </Text>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="secondary.300"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Box>
    </Flex>
  );
}

export default function WhyChooseUs() {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="stretch"
      py={{ base: 8, md: 12 }}
    >
      {/* ── Left: Features Panel ── */}
      <Flex
        flex={1}
        direction="column"
        justify="center"
        bg="brand.900"
        px={{ base: 6, md: 10, lg: 14 }}
        py={{ base: 10, lg: 14 }}
      >
        <Text
          color="secondary.500"
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="widest"
          mb={3}
        >
          Pourquoi nous choisir
        </Text>

        <Text
          as="h2"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          color="white"
          lineHeight="shorter"
          mb={{ base: 8, lg: 10 }}
        >
          L&apos;Excellence à votre service
        </Text>

        <VStack gap={{ base: 7, md: 8 }} align="stretch">
          {FEATURES.map((feature, index) => (
            <Box ml={index==1 ? 6 : 0} key={index}>
              <FeatureItem key={feature.title} {...feature} />

            </Box>
          ))}
        </VStack>
      </Flex>

      {/* ── Right: Stats Panel ── */}
      <Box
        flex={{ base: "unset", lg: "0 0 42%" }}
        minH={{ base: "300px", lg: "unset" }}
      >
        <WhyChooseUsStats />
      </Box>
    </Flex>
  );
}