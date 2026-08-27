"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useCallback, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import PropertyCard from "./propertyCard";
import type { Property } from "@/types/property.type";

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const t = useTranslations("common");
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
            overscrollBehaviorX: "contain", /* swipe past the end must not trigger browser back */
            WebkitOverflowScrolling: "touch",
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

      {/* Right-edge fade: quietly signals there is more to scroll */}
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        w="48px"
        pointerEvents="none"
        zIndex={1}
        bg="linear-gradient(to left, rgba(13,27,42,0.85), rgba(13,27,42,0))"
        opacity={canRight ? 1 : 0}
        transition="opacity 0.4s ease"
      />

      {/* Arrows are a pointer affordance — on touch, the swipe is the control */}
      {canLeft && (
        <IconButton
          aria-label={t("previous")}
          onClick={() => slide(-1)}
          display={{ base: "none", md: "flex" }}
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
          transition="transform 0.2s ease, background 0.2s ease"
          _hover={{ bg: "gray.100", transform: "translateY(-50%) scale(1.08)" }}
        >
          ‹
        </IconButton>
      )}
      {canRight && (
        <IconButton
          aria-label={t("next")}
          onClick={() => slide(1)}
          display={{ base: "none", md: "flex" }}
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
          transition="transform 0.2s ease, background 0.2s ease"
          _hover={{ bg: "gray.100", transform: "translateY(-50%) scale(1.08)" }}
        >
          ›
        </IconButton>
      )}
    </Box>
  );
}