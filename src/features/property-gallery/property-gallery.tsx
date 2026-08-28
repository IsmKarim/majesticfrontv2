"use client";

import { useTranslations } from "next-intl";
import { Box, Text } from "@chakra-ui/react";
import { PropertyGalleryProps } from "./types";
import { usePropertyGallery } from "./usePropertyGallery";
import { GalleryTagFilter } from "./components/GalleryTagFilter";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryCarousel } from "./components/GalleryCarousel";
import { GalleryLightbox } from "./components/GalleryLightbox";

export default function PropertyGallery({
  propertyName,
  images: source,
}: PropertyGalleryProps) {
  const t = useTranslations("properties.gallery");
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
  } = usePropertyGallery(source ?? []);

  // A listing with no photography renders nothing rather than an empty frame.
  if (!images.length) return null;

  return (
    <Box as="section" aria-label={t("sectionLabel", { name: propertyName })} px="4">
      {/* Section Header */}
      <Box mb={4}>
        <Text 
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          color="secondary.400"
          mb={3}
        >
          {t("title")}
          <Text as="span" fontWeight="normal" color="secondary.500" ml={2} fontSize="md">
            {t("photoCount", { count: images.length })}
          </Text>
        </Text>

        <GalleryTagFilter
          tags={availableTags}
          activeTag={activeTag}
          onTagChange={handleTagChange}
        />
      </Box>

      <Box display={{ base: "none", md: "block" }}>
        <GalleryGrid images={images} onImageClick={handleImageClick} />
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