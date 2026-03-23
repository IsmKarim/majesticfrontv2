"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import PropertyCard from "@/features/properties/components/propertyCard";
import { Property } from "@/types/property.type";

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null); // ← plain div, not Chakra Flex
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const syncBtns = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncBtns();
    el.addEventListener("scroll", syncBtns, { passive: true });
    window.addEventListener("resize", syncBtns);
    return () => {
      el.removeEventListener("scroll", syncBtns);
      window.removeEventListener("resize", syncBtns);
    };
  }, [syncBtns]);

  const slide = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const w = card.getBoundingClientRect().width + 16; // 16 = gap
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  return (
    <Box position="relative" w="100%">
      {/* Clipping wrapper — overflow hidden here is fine, it's not the scroll element */}
      <Box overflow="hidden" w="100%">

        {/* 
          ✅ KEY FIX: plain <div> with ref, NOT <Flex ref={...}>
          Chakra components don't reliably forward refs — scrollRef.current stays null
          which is why scrollBy() never fired.
        */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexWrap: "nowrap",           /* prevent cards wrapping to next row */
            gap: "16px",
            overflowX: "scroll",          /* the actual scroll axis */
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {properties.map((property, index) => (
            <div
              key={index}
              data-card
              style={{
                flexShrink: 0,            /* prevent cards from shrinking */
                scrollSnapAlign: "start",
                // Show 1 on mobile, 2 on sm, 3 on md+
                width: "clamp(260px, calc(33.333% - 11px), 340px)",
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </Box>

      {canLeft && (
        <IconButton
          aria-label="Précédent"
          onClick={() => slide(-1)}
          position="absolute"
          left="-14px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          borderRadius="full"
          size="sm"
          bg="white"
          color="gray.800"
          boxShadow="md"
          _hover={{ bg: "gray.100" }}
        >
          ‹
        </IconButton>
      )}
      {canRight && (
        <IconButton
          aria-label="Suivant"
          onClick={() => slide(1)}
          position="absolute"
          right="-14px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          borderRadius="full"
          size="sm"
          bg="white"
          color="gray.800"
          boxShadow="md"
          _hover={{ bg: "gray.100" }}
        >
          ›
        </IconButton>
      )}
    </Box>
  );
}