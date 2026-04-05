
"use client";

import Iconify from "@/components/ui/iconify";
import { HStack, Icon } from "@chakra-ui/react";
import { memo } from "react";

interface TestimonialRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

const StarIcon = ({
  filled,
  size,
  color,
}: {
  filled: boolean;
  size: number;
  color: string;
}) => (
  <Icon viewBox="0 0 24 24" boxSize={`${size}px`} color={filled ? color : "brand.900"}>
    <Iconify icon="material-symbols:star" />
  
  </Icon>
);

export const TestimonialRating = memo(function TestimonialRating({
  rating,
  size = 16,
  color = "secondary.500",
}: TestimonialRatingProps) {
  return (
    <HStack gap={1}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} size={size} color={color} />
      ))}
    </HStack>
  );
});