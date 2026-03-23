import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS } from "@/config/propertyIcons";
import { Property } from "@/types/property.type";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

// ── Config ──────────────────────────────────────────────────────────────────
const PROP_ATTRIBUTES: {
    icon: keyof typeof PROPERTYICONS;
    getValue: (p: Property) => string | number | null;
}[] = [
        { icon: "totalArea", getValue: (p) => p.totalArea ? `${p.totalArea}m²` : null },
        { icon: "bedrooms", getValue: (p) => p.bedrooms },
        { icon: "bathrooms", getValue: (p) => p.bathrooms },
        { icon: "parkingSpaces", getValue: (p) => p.parkingSpaces },
    ];

function formatPricePerSqm(price: number, surface?: number): string | null {
    if (!surface) return null;
    const rounded = Math.round(price / surface / 100) * 100;
    return `${rounded.toLocaleString()} MAD/m²`;
}

function PropAttributeWithIcon({
    icon,
    value,
}: {
    icon: keyof typeof PROPERTYICONS;
    value: string | number;
}) {
    return (
        <Flex align="center" gap={1} color="gray.400" fontSize="sm">
            <Iconify icon={PROPERTYICONS[icon]} color="currentColor" w="18px" h="18px" />
            <Text fontWeight="semibold" fontSize="sm" color="white">
                {value}
            </Text>
        </Flex>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PropertyCard({ property }: { property: Property }) {
    const pricePerSqm = formatPricePerSqm(property.price, property.totalArea);
    const isBuy = property.transactionType === "buy";
    const location = `${property.neighborhood} - ${property.city}`
    return (
        <Box

            display="block"
            overflow="hidden"
            color="white"
            transition="transform 0.25s ease, box-shadow 0.25s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
            cursor="pointer"
        >
            <NextLink href={`/properties/${property.slug}`}>
                {/* ── Image ── */}
                <Box position="relative" w="100%" aspectRatio="4 / 3" overflow="hidden">
                    <Image
                        src={property.coverImage.url}
                        alt={property.title}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        sizes="(max-width: 768px) 100vw, 600px"
                    />

                    {/* Transaction badge — Buy / Rent */}
                    <Badge position="absolute" top={3} left={3} variant="solid"
                        colorScheme={isBuy ? "yellow" : "blue"}>
                        {isBuy ? "Vente" : "Location"}
                    </Badge>

                    {/* Property type badge */}
                    <Badge position="absolute" top={3} right={3} variant="solid">
                        {property.category}
                    </Badge>
                </Box>

                {/* ── Details ── */}
                <Box p={4}>
                    <Text fontWeight="bold" fontSize="lg" mb={1} lineClamp={1}>
                        {property.title}
                    </Text>

                    {/* Price row */}
                    <Flex align="baseline" gap={2} mb={3}>
                        <Text color="secondary.500" fontWeight="bold" fontSize="lg">
                            {property.price.toLocaleString()} MAD
                        </Text>
                        {pricePerSqm && (
                            <Text color="gray.400" fontSize="xs">
                                {pricePerSqm}
                            </Text>
                        )}
                    </Flex>

                    {/* Location */}
                    <Flex align="center" gap={1} mb={3} color="gray.400" fontSize="sm">
                        <Iconify icon={PROPERTYICONS.city} w="14px" h="14px" color="currentColor" />
                        <Text>{location}</Text>
                    </Flex>

                    {/* Attributes */}
                    <Flex gap={4} flexWrap="wrap">
                        {PROP_ATTRIBUTES.map(({ icon, getValue }) => {
                            const value = getValue(property);
                            return value !== null ? (
                                <PropAttributeWithIcon key={icon} icon={icon} value={value} />
                            ) : null;
                        })}
                    </Flex>
                </Box>
            </NextLink>
        </Box>
    );
}