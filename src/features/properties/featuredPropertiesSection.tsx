import { Box, Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import PropertyCarousel from "./components/propertyCarousel";
import { mockProperties } from "@/types/property.type";
import Reveal from "@/components/ui/reveal";
import Iconify from "@/components/ui/iconify";

export default function FeaturedPropertySection() {
  const properties = mockProperties;
  return (
    <>
      <Flex
        bg="brand.500"
        py={8}
        px={{ base: 4, md: 6 }}
        gap={4}
        align="stretch"
        direction={{ base: "column", md: "row" }}  // stack on mobile
      >
        {/* ── Pinned info card ── */}
        <Reveal
          flexShrink={0}
          w={{ base: "100%", md: "260px", lg: "300px" }}
          bg="secondary.700"
          minH={{ base: "auto", md: "200px" }}
          boxShadow="md"
        >
          <Flex
            px={{ base: 6, md: 10 }}
            py={{ base: 8, md: 12 }}
            direction="column"
            gap={4}
            justify="center"
            h="100%"
          >
            <Text color="white" as="h4" fontWeight="semibold" letterSpacing="wider">
              COLLECTION EXCLUSIVE
            </Text>
            <Text color="white" mt={4} fontSize="sm" lineHeight="tall">
              Architecture soignée, volumes harmonieux, finitions raffinées
            </Text>
            <Flex gap={4} w="100%" pb={{ base: 0, md: 6 }}>
              <Text textDecor="underline" color="whiteAlpha.900" cursor="pointer" fontSize="sm" py={1}>
                Vente
              </Text>
              <Text textDecor="underline" color="whiteAlpha.900" cursor="pointer" fontSize="sm" py={1}>
                Location
              </Text>
            </Flex>
          </Flex>
        </Reveal>

        {/* ── Carousel (client) ── */}
        <Reveal delay={180} flex={1} minW={0} position="relative">
          <PropertyCarousel properties={properties} />
        </Reveal>
      </Flex>

      <Flex justify="flex-end" px={{ base: 4, md: 6 }} py={6}>
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
          <NextLink href="/properties">
            Voir plus
            <Iconify icon="mdi:arrow-right" w="16px" h="16px" />
          </NextLink>
        </Button>
      </Flex>
    </>
  );
}
