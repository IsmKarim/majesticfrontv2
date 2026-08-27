// components/WhyChooseUs.tsx
"use client";

import Reveal from "@/components/ui/reveal";
import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { BsGrid1X2, BsPeopleFill, BsGearWideConnected } from "react-icons/bs";
import { useTranslations } from "next-intl";
import WhyChooseUsStats from "./statistics";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

// `titleKey`/`bodyKey` resolve against the `home.whyChooseUs` namespace.
const FEATURES = [
  { icon: BsGrid1X2, titleKey: "portfolioTitle", bodyKey: "portfolioBody" },
  { icon: BsPeopleFill, titleKey: "serviceTitle", bodyKey: "serviceBody" },
  { icon: BsGearWideConnected, titleKey: "expertiseTitle", bodyKey: "expertiseBody" },
] as const;

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
  const t = useTranslations("home.whyChooseUs");
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
        <Reveal>
          <Text
            color="secondary.500"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            mb={3}
          >
            {t("eyebrow")}
          </Text>

          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="white"
            lineHeight="shorter"
            mb={{ base: 8, lg: 10 }}
          >
            {t("title")}
          </Text>
        </Reveal>

        <VStack gap={{ base: 7, md: 8 }} align="stretch">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.titleKey} delay={140 + index * 140} ml={index == 1 ? 6 : 0}>
              <FeatureItem
                icon={feature.icon}
                title={t(feature.titleKey)}
                description={t(feature.bodyKey)}
              />
            </Reveal>
          ))}
        </VStack>
      </Flex>

      {/* ── Right: Stats Panel ── */}
      <Reveal
        variant="fade"
        delay={200}
        flex={{ base: "unset", lg: "0 0 42%" }}
        minH={{ base: "300px", lg: "unset" }}
      >
        <WhyChooseUsStats />
      </Reveal>
    </Flex>
  );
}