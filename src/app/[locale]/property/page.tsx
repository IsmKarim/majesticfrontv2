"use client"
import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS } from "@/config/propertyIcons";
import PropertyDetails from "@/features/properties/components/propertyDetails/propertyDetails";
import PropertyFeatures from "@/features/properties/components/propertyDetails/propertyFeatures";
import PropertyMortgage from "@/features/properties/components/propertyDetails/propertyMortgage";
import PriceCard from "@/features/properties/components/propertyDetails/propertyPriceCard";
import PropertyGallery from "@/features/property-gallery/property-gallery";
import { mockProperties } from "@/types/property.type";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuBedDouble, LuBath, LuMaximize2,  LuWaves } from "react-icons/lu";

const Attribute = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) => (
  <VStack gap={1} align="center" minW="fit-content">
    <Iconify icon={icon} boxSize={6} color="secondary.300" />
    <Text
      fontSize="2xs"
      fontWeight="600"
      letterSpacing="0.15em"
      textTransform="uppercase"
      color="secondary.300"
    >
      {value ? `${value} ${label}` : label}
    </Text>
  </VStack>
);



export default function Property() {
  const property= mockProperties[1]

  return (
    <Box pt={28} bg="brand.700" minH="100vh">
      <Box
        borderBottom="1px solid"
        borderColor="secondary.800"
        px={{ base: 4, md: 10, xl: 20 }}
        py={6}
      >
        <Flex
          gap={{ base: 6, md: 10 }}
          justify={{ base: "flex-start", md: "flex-start" }}
          overflowX="auto"
          pb={1}
          style={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          <Attribute icon={PROPERTYICONS["bedrooms"]} label="Bedrooms" value={property.bedrooms?.toString()} />
          <Attribute icon={PROPERTYICONS["bathrooms"]} label="Bathrooms" value={property.bathrooms?.toString()} />
          <Attribute icon={PROPERTYICONS["totalArea"]} label="m²" value={property.totalArea?.toString()} />
          <Attribute icon={PROPERTYICONS["parkingSpaces"]} label="Parking Spaces" value={property.parkingSpaces?.toString()} />
        </Flex>
      </Box>

      {/* ── Main two-column layout ── */}
      <Box px={{ base: 4, md: 10, xl: 20 }} py={{ base: 10, md: 16 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 380px" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="flex-start"
        >
          <GridItem>
            <PropertyDetails  {...property} />

            <Box my={12}>
            
              <VStack align="flex-start" gap={5}>
                <Text fontSize="sm" color="secondary.300" lineHeight="tall">
                  {property.description}
                </Text>
             
              </VStack>
            </Box>

       

            {/* ── Curated Amenities ── */}
          <PropertyFeatures property={property} />

            {/* Mortgage calculator */}
            {property.transactionType === "Sale" && (
              <Box mt={10}>
                <PropertyMortgage price={property.price} />
              </Box>
            )}
          </GridItem>

          {/* Right column — sticky price card */}
          <GridItem>
            <PriceCard price={property.price} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}