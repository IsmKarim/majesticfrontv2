"use client";

import { Button, Flex } from "@chakra-ui/react";
import { GalleryTag } from "../types";
import { useTranslations } from "next-intl";

interface GalleryTagFilterProps {
  tags: Array<GalleryTag | "all">;
  activeTag: GalleryTag | "all";
  onTagChange: (tag: GalleryTag | "all") => void;
}

// Values are i18n keys in the `properties.gallery` namespace.
const TAG_LABEL_KEYS: Record<string, string> = {
  all: "allPhotos",
  interior: "tagInterior",
  exterior: "tagExterior",
  pool: "tagPool",
  garden: "tagGarden",
  kitchen: "tagKitchen",
  bedroom: "tagBedroom",
};

export function GalleryTagFilter({ tags, activeTag, onTagChange }: GalleryTagFilterProps) {
  const t = useTranslations("properties.gallery");

  if (tags.length <= 1) return null;

  return (
    <Flex gap={2} wrap="wrap" pb={2}>
      {tags.map((tag) => (
        <Button
          key={tag}
          size="sm"
          variant={activeTag === tag ? "solid" : "outline"}
          colorScheme={activeTag === tag ? "yellow" : "gray"}
          onClick={() => onTagChange(tag)}
          borderRadius="full"
          fontWeight="medium"
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wider"
          transition="all 0.2s"
          _hover={{
            bg: activeTag === tag ? undefined : "gray.100",
            transform: "translateY(-1px)",
          }}
        >
          {t(TAG_LABEL_KEYS[tag ?? ""] ?? "allPhotos")}
        </Button>
      ))}
    </Flex>
  );
}