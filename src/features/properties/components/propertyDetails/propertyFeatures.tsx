import { Box, Grid, Text } from "@chakra-ui/react";
import Amenity from "./amenity";
import { PropertyFeatures as FEATURES } from "@/config/propertyIcons";
import type { Property } from "@/types/property.type";

export default function PropertyFeatures({ property }: { property: Property }) {
  const active = FEATURES.filter(f => property[f.accessor as keyof Property]);

  if (!active.length) return null;

  return (
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
        templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={{ base: 7, sm: 8, md: 10 }}
      >
        {active.map(f => (
          <Amenity key={f.accessor} icon={f.icon} title={f.name} />
        ))}
      </Grid>
    </Box>
  );
}
