import "server-only";

import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { siteConfig } from "@/config/site";
import type { Property } from "@/types/property.type";
import type { BrochurePhoto } from "./brochureData";
import { activeAmenityKeys, propertyTypeKey, transactionKey } from "./brochureData";
import { FONT_FAMILY, logoBuffer, palette } from "./brochureTheme";

/** Everything the template needs that isn't on `Property`, resolved by the caller. */
export interface BrochureStrings {
    /** `properties.brochure.*` */
    b: (key: string, values?: Record<string, string | number>) => string;
    /** `properties.detail.*` — reused for spec labels. */
    d: (key: string, values?: Record<string, string | number>) => string;
    /** `properties.features.*` */
    f: (key: string) => string;
    /** `propertyTypes.*` */
    type: (key: string) => string;
    /** `transactionTypes.*` */
    tx: (key: string) => string;
}

const styles = StyleSheet.create({
    page: {
        fontFamily: FONT_FAMILY,
        fontSize: 10,
        color: palette.ink,
        backgroundColor: palette.white,
        paddingTop: 0,
        paddingBottom: 56,
        paddingHorizontal: 0,
    },

    // ── Masthead ──
    masthead: {
        backgroundColor: palette.navy,
        paddingVertical: 18,
        paddingHorizontal: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo: { width: 64, height: 43, objectFit: "contain" },
    mastheadRight: { alignItems: "flex-end" },
    agencyName: {
        color: palette.white,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: 2.5,
        textTransform: "uppercase",
    },
    tagline: { color: palette.gold, fontSize: 8, letterSpacing: 1.4, marginTop: 3 },

    body: { paddingHorizontal: 40, paddingTop: 24 },

    // ── Title block ──
    eyebrowRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
    badge: {
        backgroundColor: palette.gold,
        color: palette.navy,
        fontSize: 7.5,
        fontWeight: 600,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        paddingVertical: 3,
        paddingHorizontal: 7,
    },
    reference: { fontSize: 8, color: palette.muted, letterSpacing: 1 },
    title: { fontSize: 21, fontWeight: 600, color: palette.navy, lineHeight: 1.25 },
    location: { fontSize: 10.5, color: palette.muted, marginTop: 4 },

    // ── Price ──
    priceRow: {
        marginTop: 14,
        paddingTop: 12,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: palette.rule,
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    price: { fontSize: 20, fontWeight: 600, color: palette.navy },
    perSqm: { fontSize: 9, color: palette.muted },

    // ── Specs ──
    specs: { flexDirection: "row", flexWrap: "wrap", marginTop: 14, gap: 0 },
    spec: { width: "20%", marginBottom: 10 },
    specValue: { fontSize: 12, fontWeight: 600, color: palette.navy },
    specLabel: {
        fontSize: 7,
        color: palette.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginTop: 2,
    },

    // ── Sections ──
    sectionTitle: {
        fontSize: 8,
        fontWeight: 600,
        color: palette.gold,
        textTransform: "uppercase",
        letterSpacing: 1.6,
        marginTop: 16,
        marginBottom: 6,
    },
    description: { fontSize: 10, lineHeight: 1.55, color: palette.ink, textAlign: "justify" },

    amenities: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
    amenity: {
        fontSize: 8,
        color: palette.navy,
        backgroundColor: palette.cream,
        borderWidth: 0.5,
        borderColor: palette.rule,
        paddingVertical: 3,
        paddingHorizontal: 7,
    },

    // ── Photos ──
    cover: { width: "100%", height: 250, objectFit: "cover", marginTop: 14 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    gridItem: { width: "48.5%", height: 128, objectFit: "cover" },

    // ── Footer ──
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: palette.navy,
        paddingVertical: 12,
        paddingHorizontal: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerText: { color: palette.cream, fontSize: 7.5, lineHeight: 1.5, maxWidth: 300 },
    footerRight: { color: palette.gold, fontSize: 7.5, textAlign: "right", lineHeight: 1.5 },
    pageNumber: { color: palette.gold, fontSize: 7 },
});

function Masthead({ s }: { s: BrochureStrings }) {
    return (
        <View style={styles.masthead} fixed>
            <Image style={styles.logo} src={logoBuffer()} />
            <View style={styles.mastheadRight}>
                <Text style={styles.agencyName}>{siteConfig.name}</Text>
                <Text style={styles.tagline}>{s.b("tagline")}</Text>
            </View>
        </View>
    );
}

function Footer() {
    const { street, city, zip, country } = siteConfig.contact.address;
    return (
        <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
                {street}
                {"\n"}
                {zip} {city}, {country}
            </Text>
            <View>
                <Text style={styles.footerRight}>
                    {siteConfig.contact.phone} · {siteConfig.contact.email}
                </Text>
                <Text style={styles.footerRight}>{siteConfig.url.replace(/^https?:\/\//, "")}</Text>
            </View>
        </View>
    );
}

/** Renders only when the value is meaningful — `0` counts, `null` does not. */
function Spec({ value, label }: { value: string | number | null | undefined; label: string }) {
    if (value == null || value === "") return null;
    return (
        <View style={styles.spec}>
            <Text style={styles.specValue}>{value}</Text>
            <Text style={styles.specLabel}>{label}</Text>
        </View>
    );
}

export function BrochureDocument({
    property,
    cover,
    grid,
    strings: s,
    locale,
}: {
    property: Property;
    cover: BrochurePhoto | null;
    grid: BrochurePhoto[];
    strings: BrochureStrings;
    locale: string;
}) {
    const nf = new Intl.NumberFormat(locale === "en" ? "en-MA" : "fr-MA");
    const amenities = activeAmenityKeys(property);

    const pricePerSqm =
        property.totalArea > 0 ? Math.round(property.price / property.totalArea / 100) * 100 : null;

    const floor =
        property.floorNumber == null
            ? null
            : property.floorNumber > 0
              ? String(property.floorNumber)
              : s.b("groundFloorShort");

    const location = [property.neighborhood, property.city].filter(Boolean).join(", ");

    return (
        <Document
            title={`${property.title} — ${siteConfig.name}`}
            author={siteConfig.name}
            subject={s.b("documentSubject")}
            creator={siteConfig.name}
            producer={siteConfig.name}
        >
            {/* ── Page 1: the listing ── */}
            <Page size="A4" style={styles.page}>
                <Masthead s={s} />

                <View style={styles.body}>
                    <View style={styles.eyebrowRow}>
                        <Text style={styles.badge}>{s.tx(transactionKey(property))}</Text>
                        <Text style={styles.badge}>{s.type(propertyTypeKey(property))}</Text>
                        <Text style={styles.reference}>
                            {s.b("reference", { ref: property.propertyRef })}
                        </Text>
                    </View>

                    <Text style={styles.title}>{property.title}</Text>
                    {location !== "" && <Text style={styles.location}>{location}</Text>}

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            {property.isPriceOnRequest
                                ? s.d("priceOnInquiry")
                                : `${nf.format(property.price)} ${property.currency}`}
                        </Text>
                        {/* The per-m² rate would give away a withheld price. */}
                        {!property.isPriceOnRequest && pricePerSqm != null && (
                            <Text style={styles.perSqm}>
                                {nf.format(pricePerSqm)} {property.currency}/m²
                            </Text>
                        )}
                    </View>

                    <View style={styles.specs}>
                        <Spec value={`${property.totalArea} m²`} label={s.d("totalArea")} />
                        <Spec value={`${property.livingArea} m²`} label={s.d("livingArea")} />
                        <Spec value={property.bedrooms} label={s.d("bedrooms")} />
                        <Spec value={property.bathrooms} label={s.d("bathrooms")} />
                        <Spec value={property.parkingSpaces} label={s.d("parking")} />
                        <Spec value={floor} label={s.d("floor")} />
                        <Spec value={property.propertyCondition} label={s.d("condition")} />
                        <Spec
                            value={property.isFurnished ? s.d("yes") : s.d("no")}
                            label={s.d("furnished")}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>{s.b("descriptionTitle")}</Text>
                    <Text style={styles.description}>{property.description}</Text>

                    {amenities.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>{s.d("amenities")}</Text>
                            <View style={styles.amenities}>
                                {amenities.map((key) => (
                                    <Text key={key} style={styles.amenity}>
                                        {s.f(key)}
                                    </Text>
                                ))}
                            </View>
                        </>
                    )}

                    {cover && <Image style={styles.cover} src={cover.data} />}
                </View>

                <Footer />
            </Page>

            {/* ── Page 2: photography ── */}
            {grid.length > 0 && (
                <Page size="A4" style={styles.page}>
                    <Masthead s={s} />
                    <View style={styles.body}>
                        <Text style={styles.sectionTitle}>{s.b("photosTitle")}</Text>
                        <View style={styles.grid}>
                            {grid.map((photo, i) => (
                                <Image key={i} style={styles.gridItem} src={photo.data} />
                            ))}
                        </View>
                    </View>
                    <Footer />
                </Page>
            )}
        </Document>
    );
}
