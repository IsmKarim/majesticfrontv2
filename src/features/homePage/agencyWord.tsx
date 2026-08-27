import Reveal from "@/components/ui/reveal";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";

const IMAGE_DIMS = { maxW: "400px", h: { base: "320px", md: "440px", lg: "560px" } };

export default async function AgencyWord() {
  const t = await getTranslations('home.agencyWord');
  return (
    <Flex
      py={{ base: 8, md: 12 }}
      direction={{ base: "column", lg: "row" }}
      align="stretch"
    >
      {/* ── Left: Image Panel ── */}
      <Box
        flex={1}
        position="relative"
        bg="brand.500"
        p={{ base: 6, md: 8 }}
        boxShadow="md"
      >
        {/* Extra bottom padding on mobile to give badge breathing room */}
        <Reveal pb={{ base: 14, lg: 0 }}>
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
              alt={t("imageAlt")}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "inherit",
              }}
              sizes={`(max-width: 768px) 100vw, ${IMAGE_DIMS.maxW}`}
              priority
            />

            {/* ── Experience Badge ── */}
            <Box
              position="absolute"
              // On mobile: anchor bottom-center; on lg: bottom-right bleed
              bottom={{ base: -12, lg: -10 }}
              right={{ base: "50%", lg: -6 }}
              transform={{ base: "translateX(50%)", lg: "none" }}
              zIndex={1}
            >
              {/* Settles in a beat after the photo — feels intentional, not simultaneous */}
              <Reveal
                variant="scale"
                delay={350}
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
                  {t('experienceYears')}
                </Text>
                <Text
                  as="h4"
                  fontSize={{ base: "xs", md: "sm" }}
                  textAlign="center"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {t('experienceLabel')}
                </Text>
              </Reveal>
            </Box>
          </Box>
        </Reveal>
      </Box>

      {/* ── Right: Text Panel ── */}
      <Flex
        flex={1}
        direction="column"
        justify="center"
        // Generous top padding on mobile to clear the badge bleed
        pt={{ base: 16, lg: 8 }}
        pb={{ base: 8, lg: 8 }}
        px={{ base: 6, md: 10, lg: 16, xl: 24 }}
        color="white"
      >
        <Reveal delay={100}>
          <Text
            color="secondary.500"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {t('label')}
          </Text>

          <Text
            as="h3"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            mt={2}
            mb={4}
          >
            {t('title')}
          </Text>
        </Reveal>

        <Reveal delay={220}>
          <Text
            color="secondary.300"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="tall"
          >
            &ldquo;{t('body')}&rdquo;
          </Text>

          <Text
            mt={4}
            color="secondary.300"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="tall"
          >
            {t('body2')}
          </Text>
        </Reveal>

        <Reveal delay={340} display="flex" flexDirection="column">
          <Text
            asChild
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
            <NextLink href="/about">
              {t('cta')}
            </NextLink>
          </Text>
        </Reveal>
      </Flex>
    </Flex>
  );
}
