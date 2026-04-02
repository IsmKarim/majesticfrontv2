import { Box, Text } from "@chakra-ui/react";

export default function PropertyDetails() {
  return <Box  bg="white" mx="6">

    <Text  mb="4">
      propTitle
    </Text>
    <Text>

      propertyType , transactionType , price , totalArea , livingArea  city ,  neighborhood
      bedrooms  ,bathrooms, parkingSpaces , isFurnished 
      buildingAge , propertyCondition , listingStatus , floorNumber
    </Text>
  </Box>;
}