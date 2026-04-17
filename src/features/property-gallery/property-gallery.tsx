"use client";

import { Alert, Box, Text } from "@chakra-ui/react";
import { PropertyGalleryProps } from "./types";
import { usePropertyGallery } from "./usePropertyGallery";
import { GalleryTagFilter } from "./components/GalleryTagFilter";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryCarousel } from "./components/GalleryCarousel";
import { GalleryLightbox } from "./components/GalleryLightbox";

export default function PropertyGallery({
  propertyId,
  propertyName,
}: PropertyGalleryProps) {
  const {
    images,
    activeTag,
    availableTags,
    activeIndex,
    isLightboxOpen,
    handleImageClick,
    handleLightboxClose,
    handleIndexChange,
    handleTagChange,
  } = usePropertyGallery(propertyId);
  const isError = false
  const isLoading = false

  if (isError) {
    return (
      <Alert.Root status="error" borderRadius="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Gallery unavailable</Alert.Title>
          <Alert.Description>
            We couldn&apos;t load the photos for {propertyName}. Please try again later.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Box as="section" aria-label={`Photo gallery for ${propertyName}`} px="4">
      {/* Section Header */}
      <Box mb={4}>
        <Text 
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          color="gray.800"
          mb={3}
        >
          Gallery
          {!isLoading && images.length > 0 && (
            <Text as="span" fontWeight="normal" color="gray.500" ml={2} fontSize="md">
              ({images.length} photos)
            </Text>
          )}
        </Text>

        <GalleryTagFilter
          tags={availableTags}
          activeTag={activeTag}
          onTagChange={handleTagChange}
        />
      </Box>

      <Box display={{ base: "none", md: "block" }}>
        <GalleryGrid
          images={isLoading ? [] : images}
          onImageClick={handleImageClick}
        />
      </Box>

      <Box display={{ base: "block", md: "none" }}>
        <GalleryCarousel images={images} onImageClick={handleImageClick} />
      </Box>

      <GalleryLightbox
        images={images}
        currentIndex={activeIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onIndexChange={handleIndexChange}
      />
    </Box>
  );
}