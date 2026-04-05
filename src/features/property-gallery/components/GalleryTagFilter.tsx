"use client";

import { Button, Flex } from "@chakra-ui/react";
import { GalleryTag } from "../types";

interface GalleryTagFilterProps {
  tags: Array<GalleryTag | "all">;
  activeTag: GalleryTag | "all";
  onTagChange: (tag: GalleryTag | "all") => void;
}

const TAG_LABELS: Record<string, string> = {
  all: "All Photos",
  interior: "Interior",
  exterior: "Exterior",
  pool: "Pool",
  garden: "Garden",
  kitchen: "Kitchen",
  bedroom: "Bedroom",
};

export function GalleryTagFilter({ tags, activeTag, onTagChange }: GalleryTagFilterProps) {
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
          {TAG_LABELS[tag ?? ""] ?? tag}
        </Button>
      ))}
    </Flex>
  );
}