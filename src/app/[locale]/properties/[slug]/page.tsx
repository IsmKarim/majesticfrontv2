import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Box, Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

import Iconify from "@/components/ui/iconify";
import { PROPERTYICONS } from "@/config/propertyIcons";
import { siteConfig } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";
import PropertyDetails from "@/features/properties/components/propertyDetails/propertyDetails";
import PropertyFeatures from "@/features/properties/components/propertyDetails/propertyFeatures";
import PropertyMortgage from "@/features/properties/components/propertyDetails/propertyMortgage";
import PriceCard from "@/features/properties/components/propertyDetails/propertyPriceCard";
import PropertyGallery from "@/features/property-gallery/property-gallery";
import { getPropertyBySlug, getPropertySlugs } from "@/services/properties.service";
import type { Property } from "@/types/property.type";

type Params = Promise<{ locale: string; slug: string }>;

/**
 * Supplying sample params keeps this route prerenderable under Cache Components —
 * without it `params` counts as request-time data. `dynamicParams` stays at its
 * default `true`, so listings added after a build still render on demand.
 */
export async function generateStaticParams() {
    const slugs = await getPropertySlugs();
    return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: "errors" });
    const property = await getPropertyBySlug(slug);

    if (!property) return { title: t("propertyNotFound"), robots: { index: false, follow: false } };

    // The default locale is served unprefixed; other locales must carry it.
    const path = `/properties/${property.slug}`;
    const prefixed = (l: string) => (l === defaultLocale ? path : `/${l}${path}`);
    const canonical = prefixed(locale);
    const description = property.description.slice(0, 300);

    return {
        title: property.title,
        description,
        alternates: {
            canonical,
            languages: Object.fromEntries(locales.map((l: Locale) => [l, prefixed(l)])),
        },
        openGraph: {
            type: "website",
            url: canonical,
            title: property.title,
            description,
            images: [{ url: property.coverImage.url, width: 1200, height: 630, alt: property.coverImage.alt ?? property.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: property.title,
            description,
            images: [property.coverImage.url],
        },
        // Keep sold/rented listings out of the index while their URL stays alive.
        robots: property.listingStatus === "Available" ? undefined : { index: false, follow: true },
    };
}

function PropertyJsonLd({ property }: { property: Property }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: property.title,
        description: property.description,
        url: `${siteConfig.url}/properties/${property.slug}`,
        image: `${siteConfig.url}${property.coverImage.url}`,
        datePosted: property.createdAt,
        numberOfRooms: property.bedrooms,
        numberOfBathroomsTotal: property.bathrooms,
        floorSize: { "@type": "QuantitativeValue", value: property.totalArea, unitCode: "MTK" },
        address: {
            "@type": "PostalAddress",
            addressLocality: property.city,
            addressRegion: property.neighborhood,
            addressCountry: "MA",
        },
        offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: "MAD",
            availability:
                property.listingStatus === "Available"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/SoldOut",
        },
    };

    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

const Attribute = ({ icon, label, value }: { icon: string; label: string; value?: string }) => (
    <VStack gap={1} align="center" minW="fit-content">
        <Iconify icon={icon} boxSize={6} color="secondary.300" />
        <Text
            fontSize="2xs"
            fontWeight="600"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="secondary.300"
        >
            {value ? `${value} ${label}` : label}
        </Text>
    </VStack>
);

export default async function PropertyPage({ params }: { params: Params }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("properties.detail");

    const property = await getPropertyBySlug(slug);
    if (!property) notFound();

    const galleryImages = property.images.map((img) => ({
        id: img.id,
        src: img.url,
        alt: img.alt ?? property.title,
        width: 1080,
        height: 720,
    }));

    return (
        <Box pt={28} bg="brand.700" minH="100vh">
            <PropertyJsonLd property={property} />

            <Box
                borderBottom="1px solid"
                borderColor="secondary.800"
                px={{ base: 4, md: 10, xl: 20 }}
                py={6}
            >
                <PropertyGallery
                    propertyId={property.id}
                    propertyName={property.title}
                    images={galleryImages}
                />
                <Flex
                    pt={6}
                    gap={{ base: 6, md: 10 }}
                    justify={{ base: "flex-start", md: "flex-start" }}
                    overflowX="auto"
                    pb={1}
                    css={{ "&::-webkit-scrollbar": { display: "none" } }}
                >
                    <Attribute icon={PROPERTYICONS["bedrooms"]} label={t("bedrooms")} value={property.bedrooms?.toString()} />
                    <Attribute icon={PROPERTYICONS["bathrooms"]} label={t("bathrooms")} value={property.bathrooms?.toString()} />
                    <Attribute icon={PROPERTYICONS["totalArea"]} label={t("squareMeters")} value={property.totalArea?.toString()} />
                    <Attribute icon={PROPERTYICONS["parkingSpaces"]} label={t("parking")} value={property.parkingSpaces?.toString()} />
                </Flex>
            </Box>

            <Box px={{ base: 4, md: 10, xl: 20 }} py={{ base: 10, md: 16 }}>
                <Grid
                    templateColumns={{ base: "1fr", lg: "1fr 380px" }}
                    gap={{ base: 10, lg: 16 }}
                    alignItems="flex-start"
                >
                    <GridItem>
                        <PropertyDetails {...property} />

                        <Box my={12}>
                            <VStack align="flex-start" gap={5}>
                                <Text fontSize="sm" color="secondary.300" lineHeight="tall">
                                    {property.description}
                                </Text>
                            </VStack>
                        </Box>

                        <PropertyFeatures property={property} />

                        {property.transactionType === "Sale" && (
                            <Box mt={10}>
                                <PropertyMortgage price={property.price} />
                            </Box>
                        )}
                    </GridItem>

                    <GridItem>
                        <PriceCard price={property.price} />
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
}
