import { Box, Button, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";

export default function PriceCard ({ price = 8_450_000 }: { price?: number }){
  const formatted = new Intl.NumberFormat("fr-MA").format(price);

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
      <Text
        fontSize="2xs"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="secondary.400"
        mb={2}
      >
        Price on Inquiry
      </Text>
      <Text
        fontSize={{ base: "3xl", xl: "4xl" }}
        fontWeight="700"
        color="secondary.50"
        mb={6}
        fontFamily="heading"
        lineHeight="1"
      >
        {formatted}&nbsp;DH
      </Text>

      <Button
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
        Request a Private Viewing
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
        href="#"
      >
        <Icon as={FiDownload} boxSize={3} />
        Download Brochure
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
            Celestial Advisor
          </Text>
          <Text fontSize="sm" fontWeight="600" color="secondary.100" fontFamily="heading">
            Julian St. James
          </Text>
          <Link
            fontSize="2xs"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="accent.400"
            _hover={{ color: "accent.300" }}
            href="#"
          >
            Contact Directly
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};