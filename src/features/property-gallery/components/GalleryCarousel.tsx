"use client";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GalleryCarouselProps } from "../types";

// ─── Navigation Arrow ─────────────────────────────────────────────────────────

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

function ArrowButton({ direction, onClick, disabled }: ArrowButtonProps) {
  return (
    <IconButton
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      onClick={onClick}
      disabled={disabled}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      {...(direction === "prev" ? { left: 3 } : { right: 3 })}
      zIndex={2}
      size="sm"
      variant="subtle"
      bg="blackAlpha.700"
      color="white"
      borderRadius="full"
      _hover={{ bg: "blackAlpha.900" }}
      _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
      transition="all 0.2s"
    >
      {direction === "prev" ? "←" : "→"}
    </IconButton>
  );
}

// ─── Dot Indicator ────────────────────────────────────────────────────────────

interface DotsProps {
  count: number;
  selected: number;
}

function Dots({ count, selected }: DotsProps) {
  const visible = Math.min(count, 7);

  return (
    <Flex gap={1.5} justify="center" mt={3}>
      {Array.from({ length: visible }).map((_, i) => (
        <Box
          key={i}
          w={i === selected ? "20px" : "6px"}
          h="6px"
          borderRadius="full"
          bg={i === selected ? "yellow.400" : "gray.400"}
          transition="all 0.3s ease"
        />
      ))}
      {count > visible && (
        <Text fontSize="xs" color="gray.400" alignSelf="center" ml={1}>
          +{count - visible}
        </Text>
      )}
    </Flex>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GalleryCarousel({ images, onImageClick }: GalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images.length) return null;

  return (
    <Box position="relative">
      {/* Embla Viewport */}
      <Box ref={emblaRef} overflow="hidden" borderRadius="xl">
        <Flex>
          {images.map((image, index) => (
            <Box
              key={image.id}
              flex="0 0 100%"
              minW={0}
              position="relative"
              h="320px"
              cursor="pointer"
              onClick={() => onImageClick(index)}
              role="button"
              aria-label={`View ${image.alt} in fullscreen`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />

              {/* Caption overlay */}
              {image.caption && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  px={4}
                  py={3}
                  bgGradient="to-t"
                  gradientFrom="blackAlpha.700"
                  gradientTo="transparent"
                >
                  <Text fontSize="sm" color="white" fontWeight="medium">
                    {image.caption}
                  </Text>
                </Box>
              )}

              {/* Counter badge */}
              <Box
                position="absolute"
                top={3}
                right={3}
                px={2.5}
                py={1}
                bg="blackAlpha.700"
                backdropFilter="blur(8px)"
                borderRadius="full"
              >
                <Text fontSize="xs" color="white" fontWeight="semibold">
                  {index + 1} / {images.length}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Navigation Arrows */}
      <ArrowButton direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} />
      <ArrowButton direction="next" onClick={scrollNext} disabled={!canScrollNext} />

      {/* Dot Indicators */}
      <Dots count={images.length} selected={selectedIndex} />
    </Box>
  );
}