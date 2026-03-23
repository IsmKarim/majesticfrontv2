import { Box, Flex, Text, Portal } from "@chakra-ui/react";
import Iconify from "./iconify";
import { useState, useRef, useEffect } from "react";

export default function GlassSelect({ collection, label, placeholder, icon, onValueChange }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: { label: string; value: string }) => {
        setSelected(item);
        onValueChange(item.value);
        setIsOpen(false);
    };

    return (
        <Box
            ref={containerRef}
            flex="1"
            position="relative"
            bg={{ base: "blackAlpha.200", md: "transparent" }}
            borderRadius={{ base: "md", md: "0" }}
            mt={{ base: 2, md: 0 }}
            data-group
        >
            {/* Left icon */}
            <Box position="absolute" top="50%" left="4" transform="translateY(-50%)" pointerEvents="none" zIndex={1}>
                <Iconify
                    icon={icon}
                    color="whiteAlpha.600"
                    w="20px"
                    h="20px"
                    transition="color 0.2s"
                />
            </Box>

            {/* Trigger */}
            <Flex
                h="full"
                direction="column"
                justify="center"
                pl={12}
                pr={10}
                py={4}
                cursor="pointer"
                onClick={() => setIsOpen((prev) => !prev)}
                userSelect="none"
            >
                <Text fontSize="10px" textTransform="uppercase" letterSpacing="wider" color="whiteAlpha.500" mb="1">
                    {label}
                </Text>
                <Text
                    fontFamily="serif"
                    fontSize="lg"
                    color={selected ? "white" : "whiteAlpha.500"}
                >
                    {selected ? selected.label : placeholder}
                </Text>
            </Flex>

            {/* Chevron icon */}
            <Box
                position="absolute"
                top="50%"
                right="4"
                transform={`translateY(-50%) rotate(${isOpen ? "180deg" : "0deg"})`}
                transition="transform 0.2s"
                pointerEvents="none"
            >
                <Iconify icon="mdi:chevron-down" color="whiteAlpha.500" w="20px" h="20px" />
            </Box>

            {/* Glassy Dropdown */}
            {isOpen && (
                <Box
                    position="absolute"
                    top="calc(100% + 8px)"
                    left="0"
                    right="0"
                    zIndex={100}
                    borderRadius="xl"
                    overflow="hidden"
                    bg="rgba(0, 0, 0, 0.7)"
                    backdropFilter="blur(20px) saturate(160%)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
                    py={2}
                    style={{
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                    }}
                >
                    {collection?.items?.map((item: any) => (
                        <Box
                            key={item.value}
                            px={5}
                            py={3}
                            cursor="pointer"
                            color={selected?.value === item.value ? "secondary.400" : "whiteAlpha.800"}
                            fontFamily="serif"
                            fontSize="md"
                            transition="background 0.15s"
                            _hover={{
                                bg: "rgba(255, 255, 255, 0.12)",
                                color: "white",
                            }}
                            onClick={() => handleSelect(item)}
                        >
                            {item.label}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}