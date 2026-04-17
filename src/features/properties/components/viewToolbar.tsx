"use client"
import { Flex, Icon, Menu, Portal, Tabs, Text } from "@chakra-ui/react";
import { LuArrowUpDown, LuLayoutGrid, LuList } from "react-icons/lu";

const SORT_OPTIONS = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "date-desc", label: "Newest First" },
    { value: "date-asc", label: "Oldest First" },
    { value: "size-desc", label: "Largest First" },
    { value: "size-asc", label: "Smallest First" },
];

export default function ViewToolBar() {
    return (
        <Flex
            justify="space-between"
            align="center"
            bg="brand.700"
            px={6}
            py={3}
            borderRadius="md"
        >
            <Tabs.Root defaultValue="grid">
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
                        <Text fontSize="sm">Grille</Text>
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
                        <Text fontSize="sm">Liste</Text>
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
                        <Text fontSize="sm">Sort Order</Text>
                    </Flex>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content bg="brand.700" borderColor="brand.600" minW="180px">
                            {SORT_OPTIONS.map((opt) => (
                                <Menu.Item
                                    key={opt.value}
                                    value={opt.value}
                                    color="secondary.400"
                                    fontSize="sm"
                                    _hover={{ bg: "brand.600", color: "secondary.500" }}
                                >
                                    {opt.label}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    );
}