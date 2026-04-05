// features/testimonials/testimonials.tsx
// ─── Presentation Layer (Server Component) ─────────────────────
// NO 'use client' — this is a Server Component by default.
// NO business logic, NO direct API calls, NO state management.
// Composes child components and passes data via props.

import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { TestimonialSlider } from "./testimonialSlider";

export const Testimonials = () => {
  return (
    <Box
      as="section"
      aria-labelledby="testimonials-heading"
      py={{ base: 20, md: 28, lg: 36 }}
      px={{ base: 6, md: 12, lg: 20 }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="800px"
        h="800px"
        borderRadius="full"
        bg="secondary.500"
        opacity={0.02}
        pointerEvents="none"
        aria-hidden
      />

      <VStack gap={{ base: 12, md: 16 }} maxW="960px" mx="auto" position="relative">
        <VStack gap={5} textAlign="center">
          <HStack gap={3} align="center">
            <Box w="40px" h="1px" bg="secondary.500" />
            <Text
              fontSize="xs"
              fontWeight={500}
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="secondary.500"
              fontFamily="'Outfit', sans-serif"
            >
              Client Stories
            </Text>
            <Box w="40px" h="1px" bg="secondary.500" />
          </HStack>

          <Text
            as="h2"
            id="testimonials-heading"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight={400}
            lineHeight={1.2}
            color="white"
            letterSpacing="-0.01em"
          >
            Trusted by Discerning Buyers
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="secondary.400"
            maxW="560px"
            lineHeight={1.7}
            fontFamily="'Outfit', sans-serif"
          >
            Our clients share their experiences finding their dream properties
            through Majestic Keys.
          </Text>
        </VStack>

        <TestimonialSlider />
      </VStack>
    </Box>
  );
};