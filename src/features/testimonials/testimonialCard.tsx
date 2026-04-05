// features/testimonials/components/TestimonialCard.tsx

"use client";

import { Box, Text, HStack, VStack, Image } from "@chakra-ui/react";
import { memo } from "react";
import { Testimonial } from "./types";
import { TestimonialRating } from "./testimonialRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  isActive,
}: TestimonialCardProps) {
  const { author, content, rating, propertyType, location } = testimonial;

  return (
    <Box
      opacity={isActive ? 1 : 0}
      position={isActive ? "relative" : "absolute"}
      top={0}
      left={0}
      w="100%"
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      pointerEvents={isActive ? "auto" : "none"}
    >
      <VStack gap={8} align="center" textAlign="center" maxW="720px" mx="auto">
        {/* Quote mark */}
        <Text
          fontSize="7xl"
          lineHeight={1}
          color="secondary.500"
          fontFamily="'Playfair Display', serif"
          userSelect="none"
          aria-hidden
        >
          &ldquo;
        </Text>

        {/* Content */}
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontFamily="'Playfair Display', serif"
          fontWeight={400}
          lineHeight={1.8}
          color="secondary.200"
          letterSpacing="0.01em"
        >
          {content}
        </Text>

        {/* Rating */}
        <TestimonialRating rating={rating} size={18} />

        {/* Author */}
        <HStack gap={4}>
          <Image
            src={author.avatar}
            alt={author.name}
            boxSize="56px"
            borderRadius="full"
            objectFit="cover"
            border="2px solid"
            borderColor="secondary.500"
          />
          <VStack gap={0} align="start">
            <Text
              fontSize="md"
              fontWeight={600}
              color="secondary.400"
              letterSpacing="0.04em"
              textTransform="uppercase"
              fontFamily="'Outfit', sans-serif"
            >
              {author.name}
            </Text>
            <Text fontSize="sm" color="secondary.400" >
              {author.role}
              {author.company && ` · ${author.company}`}
            </Text>
          </VStack>
        </HStack>

        {/* Meta */}
        <HStack
          gap={2}
          fontSize="xs"
          color="secondary.800"
          textTransform="uppercase"
          letterSpacing="0.1em"
          fontFamily="'Outfit', sans-serif"
        >
          <Text>{propertyType}</Text>
          <Text>·</Text>
          <Text>{location}</Text>
        </HStack>
      </VStack>
    </Box>
  );
});