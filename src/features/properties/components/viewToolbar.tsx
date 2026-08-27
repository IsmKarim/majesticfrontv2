"use client"
import { Flex, Icon, Menu, Portal, Tabs, Text } from "@chakra-ui/react";
import { LuArrowUpDown, LuLayoutGrid, LuList } from "react-icons/lu";
import { useSearch } from "@/features/search/useSearch";
import { useTranslations } from "next-intl";
import type { PropertySort, PropertyView } from "@/features/properties/property.query";

// Values match the `sort` enum in property.query.ts — they go straight into the URL.
// `labelKey` resolves against the `properties.toolbar` namespace.
const SORT_OPTIONS: { value: PropertySort; labelKey: string }[] = [
    { value: "price-asc", labelKey: "sortPriceAsc" },
    { value: "price-desc", labelKey: "sortPriceDesc" },
    { value: "newest", labelKey: "sortNewest" },
    { value: "oldest", labelKey: "sortOldest" },
    { value: "size-desc", labelKey: "sortSizeDesc" },
    { value: "size-asc", labelKey: "sortSizeAsc" },
];

export default function ViewToolBar() {
    const t = useTranslations("properties.toolbar");
    const { committed, view, applySort, applyView } = useSearch();
    const activeKey = SORT_OPTIONS.find((o) => o.value === committed.sort)?.labelKey;
    const activeLabel = activeKey ? t(activeKey) : t("sortOrder");

    return (
        <Flex
            justify="space-between"
            align="center"
            bg="brand.700"
            px={6}
            py={3}
            borderRadius="md"
        >
            <Tabs.Root
                value={view}
                onValueChange={(e) => applyView(e.value as PropertyView)}
            >
                <Tabs.List
                    borderBottom="none"
                    bg="brand.600"
                    borderRadius="md"
                    p={1}
                    gap={1}
                >
                    <Tabs.Trigger
                        value="grid"
                        color="secondary.400"
                        borderRadius="sm"
                        px={3}
                        py={1}
                        _selected={{ bg: "brand.500", color: "secondary.500" }}
                    >
                        <Icon as={LuLayoutGrid} mr={1} />
                        <Text fontSize="sm">{t("grid")}</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="list"
                        color="secondary.400"
                        borderRadius="sm"
                        px={3}
                        py={1}
                        _selected={{ bg: "brand.500", color: "secondary.500" }}
                    >
                        <Icon as={LuList} mr={1} />
                        <Text fontSize="sm">{t("list")}</Text>
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Flex
                        align="center"
                        gap={2}
                        color="secondary.400"
                        cursor="pointer"
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg="brand.600"
                        _hover={{ bg: "brand.500", color: "secondary.500" }}
                    >
                        <Icon as={LuArrowUpDown} boxSize={4} />
                        <Text fontSize="sm">{activeLabel}</Text>
                    </Flex>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content bg="brand.700" borderColor="brand.600" minW="180px">
                            {SORT_OPTIONS.map((opt) => (
                                <Menu.Item
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={() => applySort(opt.value)}
                                    color={opt.value === committed.sort ? "secondary.500" : "secondary.400"}
                                    fontSize="sm"
                                    _hover={{ bg: "brand.600", color: "secondary.500" }}
                                >
                                    {t(opt.labelKey)}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    );
}