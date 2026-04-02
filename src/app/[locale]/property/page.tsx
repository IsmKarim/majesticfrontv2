"use client"
import Iconify from "@/components/ui/iconify";
import PropertyDetails from "@/features/properties/components/propertyDetails/propertyDetails";
import PropertyFeatures from "@/features/properties/components/propertyDetails/propertyFeatures";
import PropertyGallery from "@/features/properties/components/propertyDetails/propertyGallery";
import PropertyMortgage from "@/features/properties/components/propertyDetails/propertyMortgage";
import PriceCard from "@/features/properties/components/propertyDetails/propertyPriceCard";
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
import { LuBedDouble, LuBath, LuMaximize2, LuCar, LuWaves } from "react-icons/lu";
import { MdOutlineLocalMovies, MdOutlineWineBar, MdOutlineSpa, MdOutlineSupportAgent } from "react-icons/md";

// ─── Attribute pill in the top bar ───────────────────────────────────────────
const Attribute = ({
  icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) => (
  <VStack gap={1} align="center" minW="fit-content">
    <Icon as={icon} boxSize={6} color="secondary.300" />
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

// ─── Single amenity card ──────────────────────────────────────────────────────
const Amenity = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <HStack align="flex-start" gap={4}>
    <Icon as={icon} boxSize={5} color="secondary.300" mt="2px" flexShrink={0} />
    <VStack align="flex-start" gap={0}>
      <Text
        fontSize="xs"
        fontWeight="700"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="secondary.100"
      >
        {title}
      </Text>
      <Text fontSize="xs" color="secondary.400" lineHeight="tall">
        {description}
      </Text>
    </VStack>
  </HStack>
);

// ─── Sticky price / CTA card ──────────────────────────────────────────────────


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Property() {
  return (
    <Box pt={28} bg="brand.700" minH="100vh">
      {/* ── Gallery ── */}
      <PropertyGallery propertyId="8" propertyName="Alabaster Pavilion" />

      {/* ── Attributes bar ── */}
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
          <Attribute icon={LuBedDouble} label="Bedrooms" value="5" />
          <Attribute icon={LuBath} label="Bathrooms" value="6" />
          <Attribute icon={LuMaximize2} label="SQM" value="1,200" />
          <Attribute icon={LuWaves} label="Infinity Pool" />
        </Flex>
      </Box>

      {/* ── Main two-column layout ── */}
      <Box px={{ base: 4, md: 10, xl: 20 }} py={{ base: 10, md: 16 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 380px" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="flex-start"
        >
          {/* Left column — content */}
          <GridItem>
            {/* Architectural Vision */}
            <Box mb={12}>
              <Text
                as="h2"
                fontFamily="heading"
                fontSize={{ base: "2xl", md: "3xl" }}
                color="secondary.400"
                fontStyle="italic"
                fontWeight="400"
                mb={6}
              >
                The Architectural Vision
              </Text>
              <VStack align="flex-start" gap={5}>
                <Text fontSize="sm" color="secondary.300" lineHeight="tall">
                  Designed by the renowned firm Aethelgard &amp; Associates, the Alabaster Pavilion
                  is a masterpiece of light and form. The residence utilizes local limestone and
                  expansive floor-to-ceiling glass to dissolve the boundaries between the opulent
                  interior and the rugged beauty of the Moroccan coastline.
                </Text>
                <Text fontSize="sm" color="secondary.300" lineHeight="tall">
                  Every angle has been calculated to capture the golden hour of Casablanca, casting
                  soft, rhythmic shadows across the curated marble galleries that form the spine of
                  the home.
                </Text>
              </VStack>
            </Box>

            {/* Injected property detail sections */}
            <PropertyDetails />
            <PropertyFeatures />

            {/* ── Curated Amenities ── */}
            <Box
              bg="brand.800"
              border="1px solid"
              borderColor="secondary.800"
              borderRadius="sm"
              p={{ base: 6, md: 10 }}
              mt={10}
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                color="secondary.100"
                fontStyle="italic"
                fontWeight="400"
                mb={8}
              >
                Curated Amenities
              </Text>

              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={{ base: 7, sm: 8, md: 10 }}
              >
                <Amenity
                  icon={MdOutlineLocalMovies}
                  title="Private Cinema"
                  description="12-seat 4K Dolby Atmos theater."
                />
                <Amenity
                  icon={MdOutlineWineBar}
                  title="Wine Cellar"
                  description="Climate-controlled for 2,500 bottles."
                />
                <Amenity
                  icon={MdOutlineSpa}
                  title="Wellness Suite"
                  description="Hammam, sauna, and massage room."
                />
                <Amenity
                  icon={MdOutlineSupportAgent}
                  title="24/7 Concierge"
                  description="Dedicated stay on call around the clock."
                />
              </Grid>
            </Box>

            {/* Mortgage calculator */}
            <Box mt={10}>
              <PropertyMortgage price={8_450_000} />
            </Box>
          </GridItem>

          {/* Right column — sticky price card */}
          <GridItem>
            <PriceCard price={8_450_000} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}