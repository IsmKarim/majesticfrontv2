// features/testimonials/components/TestimonialSlider.tsx

"use client";

import {
  Box,
  HStack,
  IconButton,
  VStack,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useTestimonials } from "./useTestimonials";
import { TestimonialCard } from "./testimonialCard";

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const TestimonialSlider = () => {
  const {
    testimonials,
    activeIndex,
    totalSlides,
    /* isLoading,
    isError, */
    goToSlide,
    goNext,
    goPrev,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useTestimonials();

/*   if (isLoading) {
    return (
      <Center minH="400px">
        <Spinner size="lg" color="brand.gold" />
      </Center>
    );
  } */

/*   if (isError || !testimonials.length) {
    return (
      <Center minH="400px">
        <Text color="text.secondary" fontFamily="'Outfit', sans-serif">
          Unable to load testimonials at this time.
        </Text>
      </Center>
    );
  } */

  return (
    <VStack
      gap={10}
      w="100%"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slides container */}
      <Box position="relative" w="100%" minH={{ base: "360px", md: "320px" }}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={index === activeIndex}
          />
        ))}
      </Box>

      {/* Controls */}
      <HStack gap={6} justify="center" align="center">
        <IconButton
          aria-label="Previous testimonial"
          onClick={goPrev}
          size="lg"
          color="text.secondary"
          _hover={{ color: "secondary.500" }}
          transition="color 0.3s ease"
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Dot indicators */}
        <HStack gap={2}>
          {Array.from({ length: totalSlides }, (_, i) => (
            <Box
              as="button"
              key={i}
              onClick={() => goToSlide(i)}
              w={i === activeIndex ? "28px" : "8px"}
              h="8px"
              borderRadius="full"
              bg={i === activeIndex ? "secondary.500" : "gray.300"}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ bg: i === activeIndex ? "secondary.500" : "gray.400" }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </HStack>

        <IconButton
          aria-label="Next testimonial"
          onClick={goNext}
          size="lg"
          color="white"
          _hover={{ color: "secondary.500" }}
          transition="color 0.3s ease"
        >
          <ChevronRightIcon />
        </IconButton>
      </HStack>
    </VStack>
  );
};