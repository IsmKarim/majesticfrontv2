import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { Paginated } from "./api.client";
import {
    fetchFeaturedProperties,
    fetchProperties,
    fetchPropertyBySlug,
    fetchPropertySlugs,
} from "./properties.adapter";
import { buildPropertyQuery, type PropertyQuery } from "@/features/properties/property.query";
import type { Property } from "@/types/property.type";

/**
 * The read API for property data. Every page goes through here.
 *
 * Each function is a `use cache` scope, so its arguments form the cache key —
 * distinct filter combinations get distinct entries with no manual key building.
 * Tags let a future admin mutation call `updateTag("properties")` to flush the
 * whole listing set, or `updateTag("property:<slug>")` for a single listing.
 */

/** Tag names, kept here so revalidation callers don't hand-write strings. */
export const PROPERTY_TAGS = {
    all: "properties",
    featured: "properties:featured",
    bySlug: (slug: string) => `property:${slug}`,
} as const;

export async function getProperties(query: PropertyQuery): Promise<Paginated<Property>> {
    "use cache";
    cacheLife("hours");
    cacheTag(PROPERTY_TAGS.all);

    return fetchProperties(query);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
    "use cache";
    cacheLife("hours");
    cacheTag(PROPERTY_TAGS.all, PROPERTY_TAGS.featured);

    return fetchFeaturedProperties(limit);
}

/** The landing page's second list: most recent listings, newest first. */
export async function getLatestProperties(limit = 6): Promise<Property[]> {
    "use cache";
    cacheLife("hours");
    cacheTag(PROPERTY_TAGS.all);

    const { items } = await fetchProperties(buildPropertyQuery({ sort: "newest", pageSize: limit }));
    return items;
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
    "use cache";
    cacheLife("days");
    cacheTag(PROPERTY_TAGS.all, PROPERTY_TAGS.bySlug(slug));

    return fetchPropertyBySlug(slug);
}

/** Backs `generateStaticParams` on the detail route and the sitemap. */
export async function getPropertySlugs(): Promise<string[]> {
    "use cache";
    cacheLife("hours");
    cacheTag(PROPERTY_TAGS.all);

    return fetchPropertySlugs();
}
