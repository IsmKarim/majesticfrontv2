"use client";

import { Box, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { GalleryGridProps } from "../types";

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function GalleryGridSkeleton() {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      templateRows={{ md: "repeat(2, 240px)" }}
      gap="2px"
      h={{ md: "482px" }}
    >
      <GridItem rowSpan={{ md: 2 }}>
        <Skeleton h="full" w="full" />
      </GridItem>
      {Array.from({ length: 4 }).map((_, i) => (
        <GridItem key={i}>
          <Skeleton h="full" w="full" />
        </GridItem>
      ))}
    </Grid>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (!images.length) return <GalleryGridSkeleton />;

  const [hero, ...rest] = images;
  const gridImages = rest.slice(0, 4);
  const remainingCount = Math.max(0, images.length - 5);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      templateRows={{ md: "repeat(2, 240px)" }}
      gap="2px"
      h={{ md: "482px" }}
      overflow="hidden"
      borderRadius="xl"
    >
      {/* Hero Image */}
      <GridItem
        rowSpan={{ md: 2 }}
        position="relative"
        overflow="hidden"
        cursor="pointer"
        onClick={() => onImageClick(0)}
        role="button"
        aria-label={`View ${hero.alt} in fullscreen`}
        _hover={{ "& .overlay": { opacity: 1 } }}
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
          priority
        />
        <Box
          className="overlay"
          position="absolute"
          inset={0}
          bg="blackAlpha.300"
          opacity={0}
          transition="opacity 0.3s ease"
        />
        {hero.tag && (
          <Box
            position="absolute"
            bottom={3}
            left={3}
            px={3}
            py={1}
            bg="blackAlpha.700"
            backdropFilter="blur(8px)"
            borderRadius="full"
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="white"
            >
              {hero.tag}
            </Text>
          </Box>
        )}
      </GridItem>

      {/* Grid Thumbnails */}
      {gridImages.map((image, i) => {
        const imageIndex = i + 1;
        const isLast = i === gridImages.length - 1 && remainingCount > 0;

        return (
          <GridItem
            key={image.id}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            onClick={() => onImageClick(imageIndex)}
            role="button"
            aria-label={`View ${image.alt} in fullscreen`}
            _hover={{ "& .overlay": { opacity: 1 } }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
            />

            {/* Hover Overlay */}
            <Box
              className="overlay"
              position="absolute"
              inset={0}
              bg="blackAlpha.300"
              opacity={0}
              transition="opacity 0.3s ease"
            />

            {/* "+N more" badge on last visible thumbnail */}
            {isLast && (
              <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.600"
                backdropFilter="blur(4px)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={1}
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                  letterSpacing="tight"
                >
                  +{remainingCount}
                </Text>
                <Text
                  fontSize="xs"
                  color="whiteAlpha.800"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  more photos
                </Text>
              </Box>
            )}
          </GridItem>
        );
      })}
    </Grid>
  );
}