"use client";

import { useState } from "react";
import { Box, Button, CloseButton, Drawer, Portal, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { navigationConfig, isActiveRoute } from "@/config/navigation";
import Logo from "@/components/ui/logo";
import Iconify from "@/components/ui/iconify";
import LocaleSwitcher from "./localeSwitcher";

export default function NavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
      <Drawer.Trigger asChild>
          
          <Iconify icon="mdi:menu" w="24px" h="24px" color="white" aria-label={t("openMenu")} />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <Drawer.Positioner>
          <Drawer.Content
            bg="rgba(13, 27, 42, 0.92)"
            backdropFilter="blur(20px) saturate(160%)"
            borderLeft="1px solid rgba(255, 255, 255, 0.12)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
            color="whiteAlpha.900"
            maxW="300px"
          >
            <Drawer.Header borderBottom="1px solid rgba(255, 255, 255, 0.1)">
              <Box>
                <Logo />
              </Box>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" gap={1} mt={4}>
                {navigationConfig.mainNav.map((navItem, index) => {
                  const active = isActiveRoute(pathname, navItem.href);
                  return (
                    <Box
                      asChild
                      key={index}
                      py={3}
                      px={3}
                      borderRadius="md"
                      fontFamily="heading"
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      color={active ? "secondary.400" : "whiteAlpha.800"}
                      bg={active ? "whiteAlpha.100" : "transparent"}
                      transition="all 0.2s ease"
                      _hover={{ bg: "whiteAlpha.100", color: "secondary.300" }}
                    >
                      <Link href={navItem.href} onClick={() => setOpen(false)}>
                        {t(navItem.title)}
                      </Link>
                    </Box>
                  );
                })}

                <Box pt={4} mt={2} borderTop="1px solid rgba(255, 255, 255, 0.1)">
                  <LocaleSwitcher variant="inline" />
                </Box>
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton bg="transparent" size="sm" color="whiteAlpha.800" _hover={{ color: "secondary.300" }} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
