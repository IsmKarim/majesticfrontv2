import "server-only";

import type { Paginated } from "./api.client";
import type { PropertyQuery } from "@/features/properties/property.query";
import { type Property, mockProperties } from "@/types/property.type";

/**
 * The only place that knows where property data comes from.
 *
 * There is no property API yet, so everything below filters `mockProperties` in
 * memory. The signatures are exactly the ones the HTTP calls will have, so
 * switching over is a change to this file alone — see the commented `apiGet`
 * calls on each function for the intended endpoint.
 */

/**
 * The mock data stores display labels ("Apartment", "Villa") while the URL and
 * the filter UI speak the slugs from `config/data.ts`. The real API will return
 * slugs directly, at which point this mapping disappears with the mocks.
 */
const CATEGORY_TO_TYPE: Record<string, string> = {
    Apartment: "appartment",
    Studio: "appartment",
    Penthouse: "appartment",
    Villa: "villa",
    Riad: "house",
    House: "house",
    Land: "land",
    Office: "business",
    Commercial: "commercial",
};

function matches(property: Property, query: PropertyQuery): boolean {
    const { transactionType, propertyType, city, neighborhood } = query;
    const { priceMin, priceMax, bedrooms, bathrooms, equipped } = query;

    if (transactionType && property.transactionType.toLowerCase() !== transactionType) return false;
    if (propertyType && (CATEGORY_TO_TYPE[property.category] ?? "other") !== propertyType) return false;
    if (city && property.city.toLowerCase() !== city.toLowerCase()) return false;
    if (neighborhood && property.neighborhood.toLowerCase() !== neighborhood.toLowerCase()) return false;
    if (priceMin !== undefined && property.price < priceMin) return false;
    if (priceMax !== undefined && property.price > priceMax) return false;
    if (bedrooms !== undefined && bedrooms > 0 && property.bedrooms < bedrooms) return false;
    if (bathrooms !== undefined && bathrooms > 0 && property.bathrooms < bathrooms) return false;
    if (equipped === "yes" && !property.hasEquippedKitchen) return false;
    if (equipped === "no" && property.hasEquippedKitchen) return false;

    return true;
}

const COMPARATORS: Record<PropertyQuery["sort"], (a: Property, b: Property) => number> = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "size-asc": (a, b) => a.totalArea - b.totalArea,
    "size-desc": (a, b) => b.totalArea - a.totalArea,
};

function paginate(items: Property[], page: number, pageSize: number): Paginated<Property> {
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    // Clamp rather than return an empty page: ?page=999 should show the last page.
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;

    return {
        items: items.slice(start, start + pageSize),
        total,
        page: safePage,
        pageSize,
        totalPages,
    };
}

export async function fetchProperties(query: PropertyQuery): Promise<Paginated<Property>> {
    // return apiGet<Paginated<Property>>("properties", { search: toApiSearchParams(query) });
    const filtered = mockProperties.filter((p) => matches(p, query)).sort(COMPARATORS[query.sort]);
    return paginate(filtered, query.page, query.pageSize);
}

export async function fetchFeaturedProperties(limit: number): Promise<Property[]> {
    // return apiGet<Property[]>("properties/featured", { search: new URLSearchParams({ limit: String(limit) }) });
    return mockProperties
        .filter((p) => p.isFeatured)
        .sort(COMPARATORS.newest)
        .slice(0, limit);
}

export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
    // return apiGet<Property>(`properties/${encodeURIComponent(slug)}`).catch(notFoundToNull);
    return mockProperties.find((p) => p.slug === slug) ?? null;
}

export async function fetchPropertySlugs(): Promise<string[]> {
    // return apiGet<string[]>("properties/slugs");
    return mockProperties.map((p) => p.slug);
}
