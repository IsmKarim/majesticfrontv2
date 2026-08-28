// Renders `<Icon as={FiDownload} />`, and a component passed through `as` cannot
// cross the server/client boundary as a prop. The card is interactive anyway.
"use client";

import { Box, Button, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { buildWhatsAppHref } from "@/features/properties/whatsapp";

export interface PriceCardProps {
  title: string;
  slug: string;
  propertyRef: string;
  price: number;
  currency: string;
  isPriceOnRequest: boolean;
}

export default function PriceCard({
  title,
  slug,
  propertyRef,
  price,
  currency,
  isPriceOnRequest,
}: PriceCardProps) {
  const t = useTranslations("properties.detail");
  const locale = useLocale();

  const formatted = new Intl.NumberFormat(locale === "en" ? "en-MA" : "fr-MA").format(price);

  const listingUrl = `${siteConfig.url}${locale === "fr" ? "" : `/${locale}`}/properties/${slug}`;
  const whatsAppHref = buildWhatsAppHref(
    siteConfig.contact.whatsapp,
    t("viewingRequestMessage", { title, ref: propertyRef, url: listingUrl }),
  );

  const brochureHref = `/api/properties/${slug}/brochure?locale=${locale}`;

  return (
    <Box
      position={{ base: "relative", lg: "sticky" }}
      top={{ lg: "100px" }}
      bg="brand.800"
      border="1px solid"
      borderColor="secondary.700"
      p={8}
      borderRadius="sm"
      w="full"
    >
      {/* The eyebrow used to read "Prix sur demande" on every listing, directly
          above the actual figure. It is now the price itself when the agency has
          withheld it, and a plain label otherwise. */}
      <Text
        fontSize="2xs"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="secondary.400"
        mb={2}
      >
        {t("priceLabel")}
      </Text>
      <Text
        fontSize={{ base: isPriceOnRequest ? "2xl" : "3xl", xl: isPriceOnRequest ? "3xl" : "4xl" }}
        fontWeight="700"
        color="secondary.50"
        mb={6}
        fontFamily="heading"
        lineHeight="1"
      >
        {isPriceOnRequest ? t("priceOnInquiry") : `${formatted} ${currency}`}
      </Text>

      <Button
        asChild
        w="full"
        bg="secondary.500"
        color="secondary.900"
        letterSpacing="0.15em"
        fontSize="xs"
        fontWeight="700"
        h="52px"
        borderRadius="none"
        mb={4}
      >
        <a href={whatsAppHref} target="_blank" rel="noopener noreferrer">
          {t("requestViewing")}
        </a>
      </Button>

      <Link
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        fontSize="2xs"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="secondary.400"
        _hover={{ color: "secondary.200" }}
        mb={8}
        href={brochureHref}
        // The route already sets Content-Disposition: attachment; this just gives
        // the browser a sensible default name if it ignores the header.
        download
      >
        <Icon as={FiDownload} boxSize={3} />
        {t("downloadBrochure")}
      </Link>


      {/* Advisor */}
      <HStack gap={4}>
        <Box
          w="42px"
          h="42px"
          borderRadius="full"
          bg="brand.700"
          border="1px solid"
          borderColor="secondary.600"
          flexShrink={0}
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
        <VStack align="flex-start" gap={0}>
          <Text
            fontSize="2xs"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="secondary.400"
          >
            {t("advisorRole")}
          </Text>
          <Text fontSize="sm" fontWeight="600" color="secondary.100" fontFamily="heading">
            {t("advisorName")}
          </Text>
          <Link
            fontSize="2xs"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="secondary.600"
            _hover={{ color: "secondary.200" }}
            href="#"
          >
            {t("contactDirectly")}
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};