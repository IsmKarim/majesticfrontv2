import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS, PropertyFeatures as FEATURES } from "@/config/propertyIcons";
import { categoryToPropertyType, normalizeTransactionType } from "@/config/propertyOptions";
import type { Property } from "@/types/property.type";

/** How many amenity chips fit before the row starts to feel crowded. */
const MAX_AMENITY_CHIPS = 4;

/**
 * Chips are capped, so the order decides what a reader actually sees. Config
 * order would surface "Sous-sol, Sécurisé" and bury "Piscine, Vue sur mer" in
 * the overflow — rank by what sells a property instead.
 */
const AMENITY_PRIORITY = [
    "hasPool",
    "hasOceanView",
    "hasGarden",
    "hasTerrace",
    "hasEquippedKitchen",
    "hasElevator",
    "hasAirConditioning",
    "hasSecurity",
    "hasBalcony",
    "hasEasyAccess",
    "hasBasement",
];

const amenityRank = (accessor: string) => {
    const i = AMENITY_PRIORITY.indexOf(accessor);
    return i === -1 ? AMENITY_PRIORITY.length : i;
};

function pricePerSqmValue(price: number, surface?: number): number | null {
    if (!surface) return null;
    return Math.round(price / surface / 100) * 100;
}

function Spec({ icon, value, label }: { icon: string; value: string | number; label: string }) {
    return (
        <Flex align="center" gap={2} minW="fit-content">
            <Iconify icon={icon} w="18px" h="18px" color="var(--chakra-colors-secondary-500)" />
            <Box>
                <Text fontSize="sm" fontWeight="600" color="white" lineHeight="1.2">
                    {value}
                </Text>
                <Text fontSize="2xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    {label}
                </Text>
            </Box>
        </Flex>
    );
}

/**
 * One listing per row. The grid card is a glance; this is the scan-and-compare
 * view, so it carries the description, the full spec line, amenities and the
 * reference — everything a shortlisting reader would otherwise open the detail
 * page for.
 */
export default function PropertyListItem({ property }: { property: Property }) {
    const t = useTranslations("properties.card");
    const td = useTranslations("properties.detail");
    const tf = useTranslations("properties.features");
    const tType = useTranslations("propertyTypes");
    const tTx = useTranslations("transactionTypes");

    const transaction = normalizeTransactionType(property.transactionType);
    const isSale = transaction === "sale";
    const pricePerSqm = pricePerSqmValue(property.price, property.totalArea);
    const amenities = FEATURES.filter((f) => property[f.accessor as keyof Property])
        .slice()
        .sort((a, b) => amenityRank(a.accessor) - amenityRank(b.accessor));
    const shown = amenities.slice(0, MAX_AMENITY_CHIPS);
    const overflow = amenities.length - shown.length;

    const floorLabel =
        property.floorNumber > 0
            ? t("floorNumber", { floor: property.floorNumber })
            : t("groundFloor");

    return (
        <Box
            as="article"
            bg="brand.800"
            borderWidth="1px"
            borderColor="secondary.800"
            overflow="hidden"
            transition="border-color 0.25s ease, transform 0.25s ease"
            _hover={{ borderColor: "secondary.600", transform: "translateY(-2px)" }}
        >
            <NextLink href={`/properties/${property.slug}`}>
                <Flex direction={{ base: "column", md: "row" }} align="stretch">
                    {/* ── Image ── */}
                    <Box
                        position="relative"
                        flexShrink={0}
                        w={{ base: "100%", md: "300px", lg: "340px" }}
                        aspectRatio={{ base: "16 / 10", md: "auto" }}
                        minH={{ md: "240px" }}
                        overflow="hidden"
                    >
                        <Image
                            src={property.coverImage.url}
                            alt={property.coverImage.alt ?? property.title}
                            fill
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            sizes="(max-width: 768px) 100vw, 340px"
                        />
                        <Badge
                            position="absolute"
                            top={3}
                            left={3}
                            variant="solid"
                            colorScheme={isSale ? "yellow" : "blue"}
                        >
                            {tTx(transaction)}
                        </Badge>
                    </Box>

                    {/* ── Body ── */}
                    <Flex direction="column" flex="1" minW={0} p={{ base: 4, md: 6 }} gap={3}>
                        <Flex justify="space-between" align="flex-start" gap={4} wrap="wrap">
                            <Box minW={0}>
                                <Flex align="center" gap={2} mb={1} wrap="wrap">
                                    <Badge variant="outline" colorScheme="gray">
                                        {tType(categoryToPropertyType(property.category))}
                                    </Badge>
                                    <Text fontSize="2xs" color="gray.500" letterSpacing="wider">
                                        {t("reference", { ref: property.propertyRef })}
                                    </Text>
                                </Flex>

                                <Text
                                    as="h3"
                                    fontFamily="heading"
                                    fontSize={{ base: "lg", md: "xl" }}
                                    fontWeight="600"
                                    color="white"
                                    lineClamp={1}
                                >
                                    {property.title}
                                </Text>

                                <Flex align="center" gap={1} mt={1} color="gray.400" fontSize="sm">
                                    <Iconify icon={PROPERTYICONS.city} w="14px" h="14px" color="currentColor" />
                                    <Text lineClamp={1}>
                                        {property.neighborhood} — {property.city}
                                    </Text>
                                </Flex>
                            </Box>

                            {/* Price sits top-right on wide rows: the first thing a
                                reader compares when scanning a stacked list. */}
                            <Box textAlign={{ base: "left", md: "right" }} flexShrink={0}>
                                <Text color="secondary.500" fontWeight="700" fontSize={{ base: "lg", md: "xl" }}>
                                    {t("price", { price: property.price.toLocaleString() })}
                                </Text>
                                {pricePerSqm && (
                                    <Text color="gray.500" fontSize="xs">
                                        {t("perSqm", { price: pricePerSqm.toLocaleString() })}
                                    </Text>
                                )}
                            </Box>
                        </Flex>

                        <Text fontSize="sm" color="secondary.300" lineHeight="tall" lineClamp={2}>
                            {property.description}
                        </Text>

                        {/* ── Specs ── */}
                        <Flex gap={{ base: 4, md: 6 }} wrap="wrap" pt={1}>
                            <Spec
                                icon={PROPERTYICONS.totalArea}
                                value={`${property.totalArea} m²`}
                                label={td("totalArea")}
                            />
                            <Spec
                                icon={PROPERTYICONS.bedrooms}
                                value={property.bedrooms}
                                label={td("bedrooms")}
                            />
                            <Spec
                                icon={PROPERTYICONS.bathrooms}
                                value={property.bathrooms}
                                label={td("bathrooms")}
                            />
                            <Spec
                                icon={PROPERTYICONS.parkingSpaces}
                                value={property.parkingSpaces}
                                label={td("parking")}
                            />
                            <Spec
                                icon={PROPERTYICONS.floorNumber}
                                value={floorLabel}
                                label={td("floor")}
                            />
                        </Flex>

                        {/* ── Amenities + CTA ── */}
                        <Flex
                            justify="space-between"
                            align="center"
                            gap={4}
                            wrap="wrap"
                            mt="auto"
                            pt={3}
                            borderTop="1px solid"
                            borderColor="whiteAlpha.100"
                        >
                            <Flex gap={2} wrap="wrap">
                                {shown.map((f) => (
                                    <Flex
                                        key={f.accessor}
                                        align="center"
                                        gap={1}
                                        px={2}
                                        py={1}
                                        bg="whiteAlpha.100"
                                        borderRadius="sm"
                                        color="secondary.300"
                                        fontSize="2xs"
                                    >
                                        <Iconify icon={f.icon} w="13px" h="13px" color="currentColor" />
                                        <Text>{tf(f.accessor)}</Text>
                                    </Flex>
                                ))}
                                {overflow > 0 && (
                                    <Flex align="center" px={2} py={1} color="gray.500" fontSize="2xs">
                                        <Text>{t("moreAmenities", { count: overflow })}</Text>
                                    </Flex>
                                )}
                            </Flex>

                            <Flex
                                align="center"
                                gap={1}
                                color="secondary.400"
                                fontSize="xs"
                                fontWeight="600"
                                textTransform="uppercase"
                                letterSpacing="wider"
                                flexShrink={0}
                            >
                                <Text>{t("viewDetails")}</Text>
                                <Iconify icon="mdi:arrow-right" w="14px" h="14px" color="currentColor" />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </NextLink>
        </Box>
    );
}
