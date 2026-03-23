import { Box, Button, Flex, Text } from "@chakra-ui/react";
import PropertyCarousel from "./components/propertyCarousel";
import { mockProperties } from "@/types/property.type";

export default function FeaturedPropertySection() {
    const properties = mockProperties
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
        <Box
          flexShrink={0}
          w={{ base: "100%", md: "260px", lg: "300px" }}
          bg="secondary.700"
          minH={{ base: "auto", md: "200px" }}
          boxShadow="md"
        >
          <Flex px={10} py={12} direction="column" gap={4} justify="center" h="100%">
            <Text color="white" as="h4" fontWeight="semibold" letterSpacing="wider">
              COLLECTION EXCLUSIVE
            </Text>
            <Text color="white" mt={4} fontSize="sm" lineHeight="tall">
              Architecture soignée, volumes harmonieux, finitions raffinées
            </Text>
            <Flex gap={4} w="100%" pb={6}>
              <Text textDecor="underline" color="whiteAlpha.900" cursor="pointer" fontSize="sm">
                Vente
              </Text>
              <Text textDecor="underline" color="whiteAlpha.900" cursor="pointer" fontSize="sm">
                Location
              </Text>
            </Flex>
          </Flex>
        </Box>

        {/* ── Carousel (client) ── */}
        <Box flex={1} minW={0} position="relative">   {/* minW:0 prevents flex blowout */}
          <PropertyCarousel properties={properties} />
        </Box>
      </Flex>

      <Flex justify="flex-end" px={4} py={6}>
        <Button color="whiteAlpha.900" cursor="pointer">
          Voir plus
        </Button>
      </Flex>
    </>
  );
}