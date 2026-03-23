"use client"
import React from "react";
import { Flex, Box, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import Iconify from "@/components/ui/iconify";

const LUXURY_GOLD = "#d4af37";

export default function SocialSidebar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const socialLinks = [
    { icon: "cib:facebook", label: "Facebook", href: "#", hoverColor: LUXURY_GOLD },
    { icon: "cib:instagram", label: "Instagram", href: "#", hoverColor: LUXURY_GOLD },
    { icon: "cib:youtube", label: "YouTube", href: "#", hoverColor: "red.500" },
    { icon: "cib:whatsapp", label: "WhatsApp", href: "#", hoverColor: LUXURY_GOLD },
  ];

  const FadeLine = ({ dir }: { dir: "down" | "up" }) => (
    <Box
      w="2px"
      h="96px"
      bg="whiteAlpha.600"
      style={{
        WebkitMaskImage:
          dir === "down"
            ? "linear-gradient(to bottom, transparent, black)"
            : "linear-gradient(to top, transparent, black)",
        maskImage:
          dir === "down"
            ? "linear-gradient(to bottom, transparent, black)"
            : "linear-gradient(to top, transparent, black)",
      }}
    />
  );

  return (
    <Flex
      direction={isMobile ? "row" : "column"}
      gap={isMobile ? 3 : 8}
      align="center"
      bg={isMobile ? "blackAlpha.400" : "transparent"}
      px={isMobile ? 3 : 0}
      py={isMobile ? 2 : 0}
      borderRadius={isMobile ? "full" : "none"}
      backdropFilter={isMobile ? "blur(6px)" : "none"}
    >
      {!isMobile && <FadeLine dir="down" />}

      <Flex direction={isMobile ? "row" : "column"} gap={isMobile ? 3 : 6} align="center">
        {socialLinks.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            aria-label={s.label}
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            role="group"
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "whiteAlpha.500",
              borderRadius: "full",
            }}
          >
            {/* Label only on desktop (mobile has no room for this drama) */}
            <Text
              display={{ base: "none", md: "block" }}
              position="absolute"
              left="40px"
              opacity={0}
              transform="translateX(-8px)"
              transition="all 300ms ease"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.25em"
              color={LUXURY_GOLD}
              whiteSpace="nowrap"
              _hover={{ opacity: 1, transform: "translateX(0)" }}
            >
              {s.label}
            </Text>

            <Flex
              p={3}
              border="1px solid transparent"
              borderRadius="full"
              transition="all 300ms ease"
              _hover={{ borderColor: "whiteAlpha.300", bg: "whiteAlpha.100" }}
            >
              <Box
                color="white"
                transition="color 300ms ease"
                _hover={{ color: s.hoverColor }}
              >
                <Iconify icon={s.icon} color="currentColor" w="20px" h="20px" />
              </Box>
            </Flex>
          </Link>
        ))}
      </Flex>

      {!isMobile && <FadeLine dir="up" />}
    </Flex>
  );
}
