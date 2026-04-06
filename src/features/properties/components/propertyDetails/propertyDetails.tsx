"use client";

import { Box, Text, Grid, GridItem, Flex, Icon } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Iconify from "@/components/ui/iconify";

interface PropertyOverviewProps {
  propertyType: string;
  transactionType: string;
  price: number;
  totalArea: number;
  livingArea: number;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  isFurnished: boolean;
  buildingAge: string;
  propertyCondition: string;
  listingStatus: string;
  floorNumber: number;
}


function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    available: { bg: "rgba(72, 187, 120, 0.15)", text: "#48BB78" },
    sold: { bg: "rgba(245, 101, 101, 0.15)", text: "#F56565" },
    pending: { bg: "rgba(214, 158, 46, 0.15)", text: "#D69E2E" },
  };
  const colors = colorMap[status.toLowerCase()] ?? colorMap.available;

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
      {status}
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
  value: string | number | ReactNode;
}) {
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
  propertyType = "Villa",
  transactionType = "For Sale",
  price = 4500000,
  totalArea = 320,
  livingArea = 260,
  city = "Casablanca",
  neighborhood = "Anfa",
  bedrooms = 4,
  bathrooms = 3,
  parkingSpaces = 2,
  isFurnished = true,
  buildingAge = "2019",
  propertyCondition = "Excellent",
  listingStatus = "Available",
  floorNumber = 2,
}: Partial<PropertyOverviewProps>) {
  const formattedPrice = new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(price);

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
            Property Overview
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
          icon={<Iconify icon="mdi:home" />}
          label="Property Type"
          value={propertyType}
        />
        <DetailItem
          icon={<Iconify icon="mdi:ruler" {...iconProps} />}
          label="Total Area"
          value={`${totalArea} m²`}
        />
        <DetailItem
          icon={<Iconify icon="mdi:ruler" {...iconProps} />}
          label="Living Area"
          value={`${livingArea} m²`}
        />
        <DetailItem
          icon={<Iconify icon="mdi:bed" {...iconProps} />}
          label="Bedrooms"
          value={bedrooms}
        />
        <DetailItem
          icon={<Iconify icon="mdi:bath" {...iconProps} />}
          label="Bathrooms"
          value={bathrooms}
        />
        <DetailItem
          icon={<Iconify icon="mdi:car" {...iconProps} />}
          label="Parking"
          value={`${parkingSpaces} space${parkingSpaces !== 1 ? "s" : ""}`}
        />
        <DetailItem
          icon={<Iconify icon="mdi:sofa" {...iconProps} />}
          label="Furnished"
          value={isFurnished ? "Yes" : "No"}
        />
        <DetailItem
          icon={<Iconify icon="mdi:calendar" {...iconProps} />}
          label="Built"
          value={buildingAge}
        />
        <DetailItem
          icon={<Iconify icon="mdi:building" {...iconProps} />}
          label="Condition"
          value={propertyCondition}
        />
        <DetailItem
          icon={<Iconify icon="mdi:layers" {...iconProps} />}
          label="Floor"
          value={floorNumber}
        />
      </Grid>
    </Box>
  );
}