"use client";

import { useLocale, useTranslations } from "next-intl";
import { categoryToPropertyType } from "@/config/propertyOptions";
import { Box, Text, Grid, GridItem, Flex, Icon } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS } from "@/config/propertyIcons";
import { colors } from "@/theme";
import type { Property } from "@/types/property.type";

/**
 * Derived from `Property` rather than restated, so nullability stays in sync
 * with the API payload instead of drifting each time the backend changes.
 */
type PropertyOverviewProps = Pick<
  Property,
  | "category"
  | "transactionType"
  | "price"
  | "totalArea"
  | "livingArea"
  | "city"
  | "neighborhood"
  | "bedrooms"
  | "bathrooms"
  | "parkingSpaces"
  | "isFurnished"
  | "buildingAge"
  | "propertyCondition"
  | "listingStatus"
  | "floorNumber"
>;


function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    available: { bg: "rgba(72, 187, 120, 0.15)", text: "#48BB78" },
    sold: { bg: "rgba(245, 101, 101, 0.15)", text: "#F56565" },
    pending: { bg: "rgba(214, 158, 46, 0.15)", text: "#D69E2E" },
  };
  const colors = colorMap[status.toLowerCase()] ?? colorMap.available;
  const t = useTranslations("properties.detail");
  const STATUS_KEYS: Record<string, string> = {
    available: "statusAvailable",
    sold: "statusSold",
    rented: "statusRented",
    pending: "statusPending",
  };
  const label = t(STATUS_KEYS[status.toLowerCase()] ?? "statusAvailable");

  return (
    <Text
      as="span"
      display="inline-block"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="xs"
      fontFamily="body"
      fontWeight="600"
      letterSpacing="0.05em"
      textTransform="uppercase"
      bg={colors.bg}
      color={colors.text}
    >
      {label}
    </Text>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string | number | ReactNode;
}) {
  // Optional fields mean "not applicable" — drop the row rather than printing
  // an empty label or the string "undefined".
  if (value === undefined || value === null || value === "") return null;

  return (
    <Flex gap={3} align="flex-start">
      <Flex
        align="center"
        justify="center"
        w="36px"
        h="36px"
        borderRadius="md"
        bg="rgba(158, 138, 115, 0.1)"
        flexShrink={0}
        mt="2px"
      >
        {icon}
      </Flex>
      <Box>
        <Text
          fontSize="xs"
          fontFamily="body"
          color="whiteAlpha.500"
          textTransform="uppercase"
          letterSpacing="0.08em"
          lineHeight="1"
          mb={1}
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          fontFamily="body"
          color="white"
          fontWeight="500"
          lineHeight="1.3"
        >
          {value}
        </Text>
      </Box>
    </Flex>
  );
}


export default function PropertyDetails({
  category ,
  transactionType,
  price ,
  totalArea,
  livingArea ,
  city ,
  neighborhood ,
  bedrooms ,
  bathrooms,
  parkingSpaces ,
  isFurnished ,
  buildingAge ,
  propertyCondition ,
  listingStatus = "Available",
  floorNumber ,
}: Partial<PropertyOverviewProps>) {
  const t = useTranslations("properties.detail");
  const tType = useTranslations("propertyTypes");
  const locale = useLocale();

  // Currency stays MAD; the locale decides grouping and symbol placement.
  const formattedPrice = new Intl.NumberFormat(`${locale}-MA`, {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(price ?? 0);

  const iconProps = { size: 16, color: "#9E8A73" };

  return (
    <Box
      bg="brand.800"
      border="1px solid"
      borderColor="secondary.800"
      borderRadius="sm"
      p={{ base: 6, md: 10 }}
      mt={10}
      color="white"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="flex-start"
        mb={2}
        flexWrap="wrap"
        gap={3}
      >
        <Box>
          <Text
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "2xl", md: "3xl" }}
            color="secondary.400"
            fontStyle="italic"
            fontWeight="400"
          >
            {t("overview")}
          </Text>
        </Box>
        <StatusBadge status={listingStatus} />
      </Flex>

      {/* Price + Location bar */}
      <Flex
        align="baseline"
        gap={4}
        mb={8}
        flexWrap="wrap"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        pb={6}
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: "xl", md: "2xl" }}
          color="secondary.400"
          fontWeight="600"
        >
          {formattedPrice}
        </Text>
        <Flex align="center" gap={1.5}>
          <Iconify icon={PROPERTYICONS["city"]} color={"secondary.500"} w="16px" h="16px" />
          <Text fontSize="sm" fontFamily="body" color="whiteAlpha.700">
            {neighborhood}, {city}
          </Text>
        </Flex>
        <Text
          fontSize="xs"
          fontFamily="body"
          color="whiteAlpha.400"
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          {transactionType}
        </Text>
      </Flex>

      {/* Details Grid */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 5, md: 6 }}
      >
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.propertyType} {...iconProps} />}
          label={t("propertyType")}
          value={tType(categoryToPropertyType(category ?? ""))}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.totalArea} {...iconProps} />}
          label={t("totalArea")}
          value={totalArea === undefined ? undefined : `${totalArea} m²`}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.totalArea} {...iconProps} />}
          label={t("livingArea")}
          value={livingArea === undefined ? undefined : `${livingArea} m²`}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.bedrooms} {...iconProps} />}
          label={t("bedrooms")}
          value={bedrooms}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.bathrooms} {...iconProps} />}
          label={t("bathrooms")}
          value={bathrooms}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.parkingSpaces} {...iconProps} />}
          label={t("parking")}
          value={parkingSpaces === undefined ? undefined : t("parkingCount", { count: parkingSpaces })}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.isFurnished} {...iconProps} />}
          label={t("furnished")}
          value={isFurnished ? t("yes") : t("no")}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.buildingAge} {...iconProps} />}
          label={t("built")}
          value={buildingAge}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.orientation} {...iconProps} />}
          label={t("condition")}
          value={propertyCondition}
        />
        <DetailItem
          icon={<Iconify icon={PROPERTYICONS.floorNumber} {...iconProps} />}
          label={t("floor")}
          value={floorNumber}
        />
      </Grid>
    </Box>
  );
}