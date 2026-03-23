import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const IMAGE_DIMS = { maxW: "400px", h: { base: "320px", md: "440px", lg: "560px" } };

export default function AgencyWord() {
  return (
    <Flex
      py={{ base: 8, md: 12 }}
      direction={{ base: "column", lg: "row" }}
      align="stretch"
    >
      <Box
        flex={1}
        position="relative"
        bg="brand.500"
        p={{ base: 6, md: 8 }}
        boxShadow="md"
      >
        <Box pb={{ base: 14, lg: 0 }}>
          <Box
            position="relative"
            w="100%"
            maxW={IMAGE_DIMS.maxW}
            h={IMAGE_DIMS.h}
            mx="auto"
            borderRadius="xl"
            overflow="visible"
          >
            <Image
              src="/images/cities/kenitra.png"
              alt="Vue de Kénitra"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "inherit",
              }}
              sizes={`(max-width: 768px) 100vw, ${IMAGE_DIMS.maxW}`}
              priority
            />

            <Box
              position="absolute"
              bottom={{ base: -12, lg: -10 }}
              right={{ base: "50%", lg: -6 }}
              transform={{ base: "translateX(50%)", lg: "none" }}
              zIndex={1}
              px={{ base: 5, md: 6 }}
              py={{ base: 6, md: 8 }}
              bg="brand.900"
              color="secondary.500"
              boxShadow="lg"
            >
              <Text
                as="h3"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                textAlign="center"
              >
                +15
              </Text>
              <Text
                as="h4"
                fontSize={{ base: "xs", md: "sm" }}
                textAlign="center"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Années d&apos;expérience
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Flex
        flex={1}
        direction="column"
        justify="center"
        pt={{ base: 16, lg: 8 }}
        pb={{ base: 8, lg: 8 }}
        px={{ base: 6, md: 10, lg: 16, xl: 24 }}
        color="white"
      >
        <Text
          color="secondary.500"
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Excellence
        </Text>

        <Text
          as="h3"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          mt={2}
          mb={4}
        >
          Mot De l&apos;agence
        </Text>

        <Text
          color="secondary.300"
          fontSize={{ base: "sm", md: "md" }}
          lineHeight="tall"
        >
          &ldquo;Chez Majestic Keys, nous croyons que l&apos;immobilier de luxe
          ne se résume pas à des mètres carrés, mais à l&apos;art de vivre.
          Notre mission est d&apos;offrir une expérience sur-mesure, où la
          discrétion et l&apos;efficacité sont les piliers de chaque
          transaction.&rdquo;
        </Text>

        <Text
          mt={4}
          color="secondary.300"
          fontSize={{ base: "sm", md: "md" }}
          lineHeight="tall"
        >
          Spécialistes du marché de Kénitra, nous accompagnons une clientèle
          exigeante dans la recherche de résidences d&apos;exception. Notre
          réseau exclusif nous permet d&apos;accéder à des biens
          &ldquo;off-market&rdquo; uniques.
        </Text>

        <Text
          as="span"
          display="inline-block"
          alignSelf={{ base: "center", lg: "flex-start" }}
          mt={6}
          color="secondary.500"
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          py={2}
          px={{ base: 4, lg: 0 }}
          borderBottom="3px solid"
          borderColor="secondary.500"
          w="fit-content"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            bg: "secondary.500",
            color: "white",
            transform: "translateY(-2px)",
          }}
        >
          Découvrir l&apos;histoire de l&apos;agence
        </Text>
      </Flex>
    </Flex>
  );
}