"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef, useState } from "react";

type RevealVariant = "rise" | "fade" | "scale";

interface RevealProps extends BoxProps {
  children: ReactNode;
  /** Delay before the reveal starts, in ms — use for staggering siblings */
  delay?: number;
  /** rise = fade + translate up (default) · fade = opacity only · scale = fade + settle from 0.94 */
  variant?: RevealVariant;
  /** Travel distance in px for the "rise" variant */
  distance?: number;
  duration?: number;
}

const HIDDEN_TRANSFORM: Record<RevealVariant, string> = {
  rise: "translateY(var(--reveal-distance))",
  fade: "none",
  scale: "scale(0.94) translateY(8px)",
};

/**
 * Reveals its children once, when they scroll into view.
 * Opacity/transform only (no layout shift), disabled entirely for
 * users with prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  distance = 28,
  duration = 800,
  ...boxProps
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // Already in view on mount (e.g. above the fold): reveal immediately
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      style={{ "--reveal-distance": `${distance}px` } as React.CSSProperties}
      opacity={shown ? 1 : 0}
      transform={shown ? "none" : HIDDEN_TRANSFORM[variant]}
      transition={`opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`}
      willChange={shown ? undefined : "opacity, transform"}
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          opacity: 1,
          transform: "none",
          transition: "none",
        },
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
