// components/ui/logoMarquee.tsx
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useMemo } from "react";

export type MarqueeLogo = {
  src: string;
  alt: string;
  href?: string;
};

type LogoMarqueeProps = {
  logos: MarqueeLogo[];
  /** seconds for one full loop */
  duration?: number;
  /** space between logos */
  gap?: number;
  /** logo height in px */
  logoHeight?: number;
  /** pause animation when hovering the banner */
  pauseOnHover?: boolean;
};

export function LogoMarquee({
  logos,
  duration = 22,
  gap = 56,
  logoHeight = 42,
  pauseOnHover = true,
}: LogoMarqueeProps) {
  // Duplicate items for seamless looping
  const items = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <Box
      position="relative"
      overflow="hidden"
      width="full"
      py={4}
      // Edge fade (works in modern browsers)
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
      // Pause on hover (optional)
      sx={
        pauseOnHover
          ? {
              "&:hover [data-marquee-track]": {
                animationPlayState: "paused",
              },
            }
          : undefined
      }
    >
      <Flex
        data-marquee-track
        width="max-content"
        align="center"
        gap={`${gap}px`}
        // The trick: translate by 50% because we duplicated the list
        sx={{
          animation: `logo-marquee ${duration}s linear infinite`,
          "@keyframes logo-marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
        }}
      >
        {items.map((logo, idx) => {
          const content = (
            <Image
              src={logo.src}
              alt={logo.alt}
              height={`${logoHeight}px`}
              width="auto"
              objectFit="contain"
              opacity={0.8}
              transition="opacity 0.2s ease"
              _hover={{ opacity: 1 }}
              draggable={false}
              loading="lazy"
            />
          );

          return (
            <Box key={`${logo.src}-${idx}`} flex="0 0 auto">
              {logo.href ? (
                <Link href={logo.href} target="_blank" rel="noreferrer">
                  {content}
                </Link>
              ) : (
                content
              )}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}
