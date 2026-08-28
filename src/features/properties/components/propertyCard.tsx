import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS } from "@/config/propertyIcons";
import { Property } from "@/types/property.type";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { categoryToPropertyType, normalizeTransactionType } from "@/config/propertyOptions";

// ── Config ──────────────────────────────────────────────────────────────────
const PROP_ATTRIBUTES: {
    icon: keyof typeof PROPERTYICONS;
    getValue: (p: Property) => string | number | null;
}[] = [
        { icon: "totalArea", getValue: (p) => p.totalArea ? `${p.totalArea}m²` : null },
        { icon: "bedrooms", getValue: (p) => p.bedrooms },
        { icon: "bathrooms", getValue: (p) => p.bathrooms ?? null },
        { icon: "parkingSpaces", getValue: (p) => p.parkingSpaces ?? null },
    ];

function pricePerSqmValue(price: number, surface?: number): number | null {
    if (!surface) return null;
    return Math.round(price / surface / 100) * 100;
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
    const t = useTranslations("properties.card");
    const td = useTranslations("properties.detail");
    const tType = useTranslations("propertyTypes");
    const tTx = useTranslations("transactionTypes");

    const pricePerSqm = pricePerSqmValue(property.price, property.totalArea);
    // The mocks capitalise ("Sale"/"Rent"); normalise before comparing.
    const transaction = normalizeTransactionType(property.transactionType);
    const isSale = transaction === "sale";
    // Neighborhood is nullable in the payload; drop the segment rather than
    // interpolating "null" into the location line.
    const location = [property.neighborhood, property.city].filter(Boolean).join(" - ");
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
                        colorScheme={isSale ? "yellow" : "blue"}>
                        {tTx(transaction)}
                    </Badge>

                    {/* Property type badge */}
                    <Badge position="absolute" top={3} right={3} variant="solid">
                        {tType(categoryToPropertyType(property.category))}
                    </Badge>
                </Box>

                {/* ── Details ── */}
                <Box p={4}>
                    <Text fontWeight="bold" fontSize="lg" mb={1} lineClamp={1}>
                        {property.title}
                    </Text>

                    {/* Price row — the agency can mark a listing price-on-request,
                        in which case neither the figure nor the per-m² rate (which
                        would give it away) may be published. */}
                    <Flex align="baseline" gap={2} mb={3}>
                        {property.isPriceOnRequest ? (
                            <Text color="secondary.500" fontWeight="bold" fontSize="lg">
                                {td("priceOnInquiry")}
                            </Text>
                        ) : (
                            <>
                                <Text color="secondary.500" fontWeight="bold" fontSize="lg">
                                    {t("price", { price: property.price.toLocaleString() })}
                                </Text>
                                {pricePerSqm && (
                                    <Text color="gray.400" fontSize="xs">
                                        {t("perSqm", { price: pricePerSqm.toLocaleString() })}
                                    </Text>
                                )}
                            </>
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