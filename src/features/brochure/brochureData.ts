import "server-only";

import { PropertyFeatures as FEATURES } from "@/config/propertyIcons";
import { categoryToPropertyType, normalizeTransactionType } from "@/config/propertyOptions";
import type { Property, PropertyImage } from "@/types/property.type";

/** Photos on the grid page. One page's worth; the gallery holds the rest. */
export const MAX_GRID_PHOTOS = 8;

/**
 * The provider serves sized variants behind a `thumb_<id>_property_<size>`
 * naming scheme. Measured weights for a representative photo:
 *
 *   _xlarge  1200x1600  1.37 MB
 *   _large    600x800   395 KB
 *   _small    200x267    48 KB
 *   _medium   —          3.9 KB, a placeholder. Never use it.
 *
 * Roughly 9% of URLs in the payload are hash-named instead and have no
 * variants; those fall back to the original, which measures 55–76 KB.
 */
type Variant = "xlarge" | "large" | "small";

const VARIANT_PATTERN = /(thumb_\d+_property_)(xlarge|large|medium|small)(\.\w+)$/;

export function variantUrl(url: string, variant: Variant): string {
    return VARIANT_PATTERN.test(url) ? url.replace(VARIANT_PATTERN, `$1${variant}$3`) : url;
}

/** A photo already downloaded, ready to hand to `<Image src={...} />`. */
export interface BrochurePhoto {
    alt: string;
    data: Buffer;
}

async function download(url: string, alt: string): Promise<BrochurePhoto | null> {
    // One retry: under load Node's fetch occasionally drops a connection to a
    // host that is perfectly reachable, and a single retry clears it.
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            // `cache: "no-store"` opts out of Next's patched fetch. Left on the
            // default it tries to put these JPEGs through the data cache, which
            // fails intermittently on binary payloads of this size — reliably
            // ~4 failures per brochure, while the same URLs fetch cleanly from a
            // plain Node script. The PDF itself is cached at the HTTP layer.
            const res = await fetch(url, {
                cache: "no-store",
                signal: AbortSignal.timeout(15_000),
            });
            if (!res.ok) return null;
            return { alt, data: Buffer.from(await res.arrayBuffer()) };
        } catch (error) {
            // Only the final failure is worth logging; the first is what the
            // retry exists for.
            if (attempt === 1) {
                const cause = (error as { cause?: { code?: string } }).cause;
                console.error(
                    `[brochure] photo unavailable (${cause?.code ?? (error as Error).name}):`,
                    url,
                );
                return null; // One unreachable photo must not fail the brochure.
            }
        }
    }
    return null;
}

/**
 * Photos are fetched one at a time, deliberately.
 *
 * Issuing them in parallel opens up to nine sockets to the provider per request;
 * four concurrent brochure requests was enough to produce `fetch failed` on
 * images that `curl` serves in 0.25s, and then to take the whole server down.
 * Sequential costs ~2s per brochure and removes the failure mode entirely.
 */

/**
 * Ceiling on downloaded photo bytes.
 *
 * Listings whose images are hash-named have no `_small` variant, so they fall
 * back to full-size originals (~400 KB each). Without a budget the 54-photo
 * villa produced a 2.5 MB PDF. Once the budget is spent the grid simply stops —
 * a shorter brochure is better than an unmailable one.
 */
const PHOTO_BUDGET_BYTES = 900_000;

/**
 * Fetches the cover at print-ish quality and the grid photos small.
 * Failures are dropped rather than thrown — a brochure with fewer photos beats
 * a 500.
 */
export async function loadPhotos(property: Property): Promise<{
    cover: BrochurePhoto | null;
    grid: BrochurePhoto[];
}> {
    const all: PropertyImage[] = property.images?.length ? property.images : [property.coverImage];
    const [first, ...rest] = all;

    const cover = await download(variantUrl(first.url, "large"), first.alt || property.title);

    let spent = cover?.data.byteLength ?? 0;
    const grid: BrochurePhoto[] = [];

    for (const img of rest.slice(0, MAX_GRID_PHOTOS)) {
        if (spent >= PHOTO_BUDGET_BYTES) break;
        const photo = await download(variantUrl(img.url, "small"), img.alt || property.title);
        if (!photo) continue;
        spent += photo.data.byteLength;
        grid.push(photo);
    }

    return { cover, grid };
}

/** Amenity keys present on this listing, for lookup against `properties.features.*`. */
export function activeAmenityKeys(property: Property): string[] {
    return FEATURES.filter((f) => property[f.accessor as keyof Property]).map((f) => f.accessor);
}

export function propertyTypeKey(property: Property): string {
    return categoryToPropertyType(property.category);
}

export function transactionKey(property: Property): string {
    return normalizeTransactionType(property.transactionType);
}

/** `Réf. KEN-MIM-013` → `majestic-keys-KEN-MIM-013.pdf` */
export function brochureFilename(property: Property): string {
    const ref = property.propertyRef.replace(/[^A-Za-z0-9._-]/g, "-");
    return `majestic-keys-${ref}.pdf`;
}
