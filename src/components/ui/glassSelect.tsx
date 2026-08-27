import { Box, Flex, Text, Portal } from "@chakra-ui/react";
import Iconify from "./iconify";
import { useState, useRef, useEffect } from "react";

export default function GlassSelect({ collection, label, placeholder, icon, onValueChange }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
    const [rect, setRect] = useState<{
        top?: number;
        bottom?: number;
        left: number;
        width: number;
        maxHeight: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click — the dropdown itself lives in a portal (see below),
    // so it's outside containerRef's DOM subtree and needs its own check here.
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const insideTrigger = containerRef.current?.contains(target);
            const insideDropdown = dropdownRef.current?.contains(target);
            if (!insideTrigger && !insideDropdown) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // The dropdown renders in a Portal (outside the hero's `overflow: hidden`
    // clipping box), so it needs viewport-relative coordinates instead of the
    // `position: absolute` trick that relied on the trigger's positioned parent.
    // It also caps its own height to whatever room is actually available and
    // scrolls internally — a long list (e.g. a city's ~100 neighborhoods) would
    // otherwise just run off the edge of the viewport instead of being clipped,
    // which is no more reachable than the original bug. If there isn't enough
    // room below the trigger, it flips to open upward instead.
    useEffect(() => {
        if (!isOpen) return;
        const MARGIN = 16;
        const GAP = 8;
        const MIN_HEIGHT = 120;
        const updateRect = () => {
            const el = containerRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const spaceBelow = window.innerHeight - r.bottom - GAP - MARGIN;
            const spaceAbove = r.top - GAP - MARGIN;
            const openUpward = spaceBelow < MIN_HEIGHT && spaceAbove > spaceBelow;
            setRect({
                left: r.left,
                width: r.width,
                maxHeight: Math.max(MIN_HEIGHT, openUpward ? spaceAbove : spaceBelow),
                ...(openUpward
                    ? { bottom: window.innerHeight - r.top + GAP }
                    : { top: r.bottom + GAP }),
            });
        };
        updateRect();
        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect, { passive: true, capture: true });
        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect, true);
        };
    }, [isOpen]);

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

            {/* Glassy Dropdown — portaled to <body> so the hero section's
                `overflow: hidden` can't clip it when it drops below the fold */}
            {isOpen && rect && (
                <Portal>
                    <Box
                        ref={dropdownRef}
                        position="fixed"
                        top={rect.top !== undefined ? `${rect.top}px` : undefined}
                        bottom={rect.bottom !== undefined ? `${rect.bottom}px` : undefined}
                        left={`${rect.left}px`}
                        width={`${rect.width}px`}
                        maxHeight={`${rect.maxHeight}px`}
                        overflowY="auto"
                        zIndex={1400}
                        borderRadius="xl"
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
                </Portal>
            )}
        </Box>
    );
}