"use client";

import { Box, Flex, HStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { navigationConfig, isActiveRoute, NavItemWithChildren } from "@/config/navigation";
import NavDrawer from "./components/navDrawer";
import LocaleSwitcher from "./components/localeSwitcher";
import Logo from "../ui/logo";
import Iconify from "../ui/iconify";

const navItems = navigationConfig.mainNav;

const NavComponent = ({
  navItem,
  isActive,
}: {
  navItem: NavItemWithChildren;
  isActive: boolean;
}) => {
  const hasChildren = !!navItem.items?.length;
  const t = useTranslations("nav");

  return (
    <Box
      position="relative"
      css={{
        "& .dropdown": {
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        },
        "&:hover .dropdown": {
          opacity: 1,
          pointerEvents: "auto",
        },
      }}
    >
      <Box
        asChild
        position="relative"
        display="inline-block"
        py={2}
        fontFamily="heading"
        fontSize="0.8rem"
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing="widest"
        color={isActive ? "secondary.400" : "whiteAlpha.800"}
        transition="color 0.25s ease"
        _hover={{ color: "secondary.300", _after: { width: "100%" } }}
        _after={{
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "1px",
          bg: "secondary.400",
          width: isActive ? "100%" : "0%",
          transition: "width 0.25s ease",
        }}
      >
        <Link href={navItem.href}>{t(navItem.title)}</Link>
      </Box>

      {hasChildren && (
        <Box
          className="dropdown"
          position="absolute"
          top="100%"
          left="50%"
          transform="translateX(-50%)"
          pt={2}
          minW="200px"
        >
          <Box
            bg="rgba(5, 11, 18, 0.95)"
            backdropFilter="blur(18px) saturate(160%)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            borderRadius="md"
            shadow="xl"
            py={2}
          >
            {navItem.items!.map((child, idx) => (
              <Link key={idx} href={child.href}>
                <Box
                  px={4}
                  py={2}
                  fontSize="0.85rem"
                  color="whiteAlpha.800"
                  _hover={{ bg: "whiteAlpha.100", color: "secondary.500" }}
                  transition="background 0.15s ease"
                >
                  {t(child.title)}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <Box
      as="header"
      position="absolute"
      top={0}
      zIndex={100}
      h="120px"
      px={{ md: 16 }}
      w="100%"
      bg="rgba(5, 11, 18, 0.78)"
      backdropFilter="blur(18px) saturate(160%)"
      borderBottom="1px solid rgba(255, 255, 255, 0.12)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.45)"
    >
      {/* Mobile */}
      <Flex
        h="100%"
        align="center"
        justify="space-between"
        px={4}
        display={{ base: "flex", md: "none" }}
      >
        <Iconify icon="mdi:account-outline" w="22px" h="22px" color="white" />
        <Box>
          <Logo />
        </Box>
        <NavDrawer />
      </Flex>

      {/* Desktop */}
      <Flex
        align="center"
        justify="space-between"
        h="100%"
        px={8}
        display={{ base: "none", md: "flex" }}
      >
        <HStack gap={10}>
          {navItems.slice(0, 3).map((navItem, index) => (
            <NavComponent
              key={index}
              navItem={navItem}
              isActive={isActiveRoute(pathname, navItem.href)}
            />
          ))}
        </HStack>

        <Box position="relative" flexShrink={0} mx={8}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="140px"
            h="140px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)"
            pointerEvents="none"
          />
          <Logo />
        </Box>

        <HStack gap={10}>
          {navItems.slice(3).map((navItem, index) => (
            <NavComponent
              key={index}
              navItem={navItem}
              isActive={isActiveRoute(pathname, navItem.href)}
            />
          ))}
          <LocaleSwitcher />
        </HStack>
      </Flex>
    </Box>
  );
}
