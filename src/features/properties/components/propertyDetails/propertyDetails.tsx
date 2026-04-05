import { Box, Text } from "@chakra-ui/react";

export default function PropertyDetails() {
  return <Box bg="brand.800"
    border="1px solid"
    borderColor="secondary.800"
    borderRadius="sm"
    p={{ base: 6, md: 10 }}
    mt={10} color="white">

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
    <Text>

      propertyType , transactionType , price , totalArea , livingArea  city ,  neighborhood
      bedrooms  ,bathrooms, parkingSpaces , isFurnished
      buildingAge , propertyCondition , listingStatus , floorNumber
    </Text>
  </Box>;
}