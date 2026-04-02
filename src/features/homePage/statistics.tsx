// components/WhyChooseUsStats.tsx
"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Années d'expertise", duration: 1500 },
  { value: 500, suffix: "+", label: "Biens vendus", duration: 2000 },
  { value: 100, suffix: "%", label: "Satisfaction client", duration: 1800 },
];

// ─── easing: easeOutExpo ───────────────────────────────────────────────────
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ─── single animated counter ──────────────────────────────────────────────
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

// ─── single stat row ──────────────────────────────────────────────────────
function StatItem({
  stat,
  active,
  showDivider,
}: {
  stat: Stat;
  active: boolean;
  showDivider: boolean;
}) {
  const count = useCounter(stat.value, stat.duration ?? 1500, active);

  return (
    <Box w="100%" textAlign="center">
      <Text
        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
        fontWeight="bold"
        color="secondary.500"
        lineHeight={1}
        fontVariantNumeric="tabular-nums" // prevents layout shift during count
      >
        {count}
        {stat.suffix}
      </Text>

      <Text
        fontSize={{ base: "2xs", md: "xs" }}
        color="secondary.300"
        textTransform="uppercase"
        letterSpacing="widest"
        mt={2}
      >
        {stat.label}
      </Text>
    </Box>
  );
}

export default function WhyChooseUsStats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Flex
      ref={containerRef}
      direction="column"
      justify="space-evenly"
      align="center"
      bg="brand.800"
      h="100%"
      minH={{ base: "280px", lg: "100%" }}
      py={{ base: 10, lg: 14 }}
      px={{ base: 8, lg: 12 }}
      border="1px solid"
      borderColor="secondary.700"
    >
      {STATS.map((stat, i) => (
        <StatItem
          key={stat.label}
          stat={stat}
          active={hasAnimated}
          showDivider={i < STATS.length - 1}
        />
      ))}
    </Flex>
  );
}
