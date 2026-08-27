"use client";

import { useTransition } from "react";
import { Flex, Menu, Portal, Text } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";

import Iconify from "@/components/ui/iconify";
import { locales, type Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Autonyms — a language is always listed in its own language, so these are the
 * same in every catalog and belong in code rather than in the messages.
 */
const LANGUAGE_NAMES: Record<Locale, string> = {
    fr: "Français",
    en: "English",
};

export default function LocaleSwitcher({ variant = "menu" }: { variant?: "menu" | "inline" }) {
    const t = useTranslations("common");
    const locale = useLocale() as Locale;
    // Locale-free path, courtesy of next-intl's navigation helpers.
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function switchTo(next: Locale) {
        if (next === locale) return;

        // Read the query string at click time rather than through
        // `useSearchParams`. This component lives in the layout, and a
        // render-time dependency on search params would force a Suspense
        // boundary around the whole shell under Cache Components.
        const search = typeof window === "undefined" ? "" : window.location.search;

        // `replace`, not `push`: viewing the same page in another language is a
        // substitution, not a new step in the user's history.
        startTransition(() => {
            router.replace(`${pathname}${search}`, { locale: next });
        });
    }

    // Flat row of codes — used inside the mobile drawer, where a nested menu
    // inside a drawer is awkward to operate.
    if (variant === "inline") {
        return (
            <Flex align="center" gap={1} role="group" aria-label={t("changeLanguage")}>
                {locales.map((code, index) => (
                    <Flex key={code} align="center" gap={1}>
                        {index > 0 && (
                            <Text color="whiteAlpha.400" fontSize="xs" aria-hidden>
                                /
                            </Text>
                        )}
                        <Text
                            asChild
                            px={2}
                            py={1}
                            fontSize="xs"
                            fontWeight="600"
                            letterSpacing="widest"
                            textTransform="uppercase"
                            cursor="pointer"
                            color={code === locale ? "secondary.400" : "whiteAlpha.700"}
                            _hover={{ color: "secondary.300" }}
                            transition="color 0.2s ease"
                        >
                            <button
                                type="button"
                                onClick={() => switchTo(code)}
                                aria-current={code === locale ? "true" : undefined}
                                disabled={isPending}
                            >
                                {code}
                            </button>
                        </Text>
                    </Flex>
                ))}
            </Flex>
        );
    }

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Flex
                    as="button"
                    align="center"
                    gap={2}
                    py={2}
                    cursor="pointer"
                    color="whiteAlpha.800"
                    fontFamily="heading"
                    fontSize="0.8rem"
                    fontWeight="medium"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    opacity={isPending ? 0.6 : 1}
                    transition="color 0.25s ease, opacity 0.2s ease"
                    _hover={{ color: "secondary.300" }}
                    aria-label={t("changeLanguage")}
                >
                    <Iconify icon="mdi:web" w="16px" h="16px" color="currentColor" />
                    <Text as="span">{locale}</Text>
                </Flex>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content
                        bg="rgba(5, 11, 18, 0.95)"
                        backdropFilter="blur(18px) saturate(160%)"
                        border="1px solid rgba(255, 255, 255, 0.12)"
                        borderRadius="md"
                        minW="160px"
                        py={2}
                    >
                        {locales.map((code) => (
                            <Menu.Item
                                key={code}
                                value={code}
                                onSelect={() => switchTo(code)}
                                px={4}
                                py={2}
                                fontSize="0.85rem"
                                cursor="pointer"
                                color={code === locale ? "secondary.500" : "whiteAlpha.800"}
                                _hover={{ bg: "whiteAlpha.100", color: "secondary.500" }}
                            >
                                <Flex align="center" justify="space-between" w="100%" gap={3}>
                                    <Text as="span">{LANGUAGE_NAMES[code]}</Text>
                                    {code === locale && (
                                        <Iconify icon="mdi:check" w="14px" h="14px" color="currentColor" />
                                    )}
                                </Flex>
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}
