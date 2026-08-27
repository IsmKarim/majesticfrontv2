import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Iconify from "@/components/ui/iconify";
import Reveal from "@/components/ui/reveal";
import ServiceCardVar from "./serviceCardVar";
import { getTranslations } from "next-intl/server";

const SERVICES = [
  { titleKey: "selectionTitle", bodyKey: "selectionBody", logo: "/icons/Transaction.svg" },
  { titleKey: "vipTitle", bodyKey: "vipBody", logo: "/icons/VIP.svg" },
  { titleKey: "adviceTitle", bodyKey: "adviceBody", logo: "/icons/Transaction.svg" },
] as const;

export default async function ServicesSection() {
  const t = await getTranslations("services.section");
  const tc = await getTranslations("common");
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
              title={t(service.titleKey)}
              description={t(service.bodyKey)}
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
              {t("eyebrow")}
            </Text>

            <Text color="white" as="h4">
              {t("title")}
            </Text>
            <Text color="white" mt={4}>
              {t("body")}
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
            {tc("seeMore")}
            <Iconify icon="mdi:arrow-right" w="16px" h="16px" />
          </NextLink>
        </Button>
      </Flex>
    </>
  );
}
