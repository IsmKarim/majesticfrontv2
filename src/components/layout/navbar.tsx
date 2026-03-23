"use client"
import { Box, Flex, Button } from "@chakra-ui/react";
import { navigationConfig, NavItem, NavItemWithChildren } from "@/config/navigation";
import NavDrawer from "./components/navDrawer";
import Logo from "../ui/logo";
import Link from "next/link";
import ActiveNavItem from "./components/activeNavComponent";
import { colors } from "@/theme";

const navItems = navigationConfig.mainNav;

export const NavComponent = ({ navItem, pathname }: { navItem: NavItemWithChildren; pathname: string }) => {
  const hasChildren = navItem.items && navItem.items.length > 0;
  const isActive = pathname === navItem.href;

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
        "& > a::after": {
          content: '""',
          position: "absolute",
          bottom: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          height: "2px",
          width: isActive ? "100%" : "0%",
          background: "secondary.500",
          transition: "width 0.3s ease",
        },
        "&:hover > a::after": {
          width: "100%",
        },
      }}
    >
      <Box position="relative" display="inline-block">
        <Link href={navItem.href}>
          {navItem.title}
        </Link>
        <Box
          position="absolute"
          bottom="-8px"
          left="50%"
          transform="translateX(-50%)"
          height="2px"
          bg="secondary.500"
          width={isActive ? "100%" : "0%"}
          transition="width 0.3s ease"
          className="underline"
        />
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
            bg="rgba(15, 23, 42, 0.95)"
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
                  {child.title}
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
  return (
    <Box
      as="header"
      position="absolute"
      top={0}
      zIndex={100}
      h="120px"
      px={{ md: 16 }}
      w="100%"
      shadow="xl"
      bg="rgba(15, 23, 42, 0.45)"
    >
      <Flex
        h={16}
        align="center"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Button variant="ghost">Account</Button>
        <Box><Logo /></Box>
        <NavDrawer />
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        h="100%"
        px={8}
        display={{ base: "none", md: "flex" }}
        color="whiteAlpha.800"
        fontSize="0.9rem"
      >
        {navItems.slice(0, 3).map((navItem, index) => (
          <ActiveNavItem key={index} navItem={navItem} />
        ))}
        <Box><Logo /></Box>
        {navItems.slice(3).map((navItem, index) => (
          <ActiveNavItem key={index} navItem={navItem} />
        ))}
      </Flex>
    </Box>
  );
}