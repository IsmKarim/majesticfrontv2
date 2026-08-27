import { z } from "zod";
import { PROPERTYTYPES, TRANSACTIONTYPES } from "@/config/propertyOptions";

export const PROPERTY_TYPE_VALUES = PROPERTYTYPES.map((t) => t.value) as [string, ...string[]];
export const TRANSACTION_TYPE_VALUES = TRANSACTIONTYPES.map((t) => t.value) as [string, ...string[]];

/** Mirrors the option values already rendered by the sort menu in viewToolbar. */
export const SORT_VALUES = [
    "newest",
    "oldest",
    "price-asc",
    "price-desc",
    "size-asc",
    "size-desc",
] as const;

export type PropertySort = (typeof SORT_VALUES)[number];

/**
 * Grid vs list is a *presentation* choice: both render the same listings in the
 * same order. It therefore lives alongside the query in the URL but never inside
 * `PropertyQuery` — putting it there would make it part of the `use cache` key
 * and store two identical result sets per filter combination.
 */
export const VIEW_VALUES = ["grid", "list"] as const;
export type PropertyView = (typeof VIEW_VALUES)[number];
export const DEFAULT_VIEW: PropertyView = "grid";

export const DEFAULT_SORT: PropertySort = "newest";
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

/**
 * Every field is optional and every coercion is guarded with `.catch()`.
 * A crawler hitting `?page=abc&bedrooms=999` must land on a valid page-1 result,
 * never a 500 — bad params degrade to the default rather than throwing.
 */
export const propertyQuerySchema = z.object({
    transactionType: z.enum(TRANSACTION_TYPE_VALUES).optional().catch(undefined),
    propertyType: z.enum(PROPERTY_TYPE_VALUES).optional().catch(undefined),
    city: z.string().trim().min(1).max(80).optional().catch(undefined),
    neighborhood: z.string().trim().min(1).max(80).optional().catch(undefined),
    priceMin: z.coerce.number().int().nonnegative().optional().catch(undefined),
    priceMax: z.coerce.number().int().positive().optional().catch(undefined),
    bedrooms: z.coerce.number().int().min(0).max(10).optional().catch(undefined),
    bathrooms: z.coerce.number().int().min(0).max(10).optional().catch(undefined),
    equipped: z.enum(["yes", "no"]).optional().catch(undefined),
    sort: z.enum(SORT_VALUES).catch(DEFAULT_SORT).default(DEFAULT_SORT),
    page: z.coerce.number().int().min(1).catch(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).catch(DEFAULT_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
});

export type PropertyQuery = z.infer<typeof propertyQuerySchema>;

/** The order keys are emitted in. Fixed so cache keys stay stable — see normalize(). */
const KEY_ORDER = [
    "transactionType",
    "propertyType",
    "city",
    "neighborhood",
    "priceMin",
    "priceMax",
    "bedrooms",
    "bathrooms",
    "equipped",
    "sort",
    "page",
    "pageSize",
] as const satisfies readonly (keyof PropertyQuery)[];

/**
 * A parsed query becomes part of a `use cache` key, which is derived from a
 * serialization of the argument. `?city=X&page=1` and `?page=1&city=X` must
 * therefore produce a byte-identical object: emit keys in one fixed order and
 * drop `undefined` entries rather than leaving holes.
 */
function normalize(parsed: PropertyQuery): PropertyQuery {
    const out: Record<string, unknown> = {};
    for (const key of KEY_ORDER) {
        const value = parsed[key];
        if (value !== undefined) out[key] = value;
    }
    return out as PropertyQuery;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

/** Collapses repeated params (`?city=a&city=b`) to the first value. */
function firstValues(searchParams: RawSearchParams): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(searchParams)) {
        const v = Array.isArray(value) ? value[0] : value;
        if (v !== undefined && v !== "") out[key] = v;
    }
    return out;
}

/** Reads the presentation mode. Anything unrecognised falls back to the default. */
export function parsePropertyView(searchParams: RawSearchParams): PropertyView {
    const raw = searchParams.view;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return VIEW_VALUES.includes(value as PropertyView) ? (value as PropertyView) : DEFAULT_VIEW;
}

/** URL search params -> normalized, defaulted query. Never throws. */
export function parsePropertyQuery(searchParams: RawSearchParams): PropertyQuery {
    const parsed = propertyQuerySchema.parse(firstValues(searchParams));
    return normalize(parsed);
}

/** Same normalization for queries built in code rather than read off a URL. */
export function buildPropertyQuery(input: Partial<PropertyQuery> = {}): PropertyQuery {
    return normalize(propertyQuerySchema.parse(input));
}

const DEFAULTS: Partial<Record<keyof PropertyQuery, unknown>> = {
    sort: DEFAULT_SORT,
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
};

/**
 * Serializes a query back to a `/properties` href. Values equal to their default
 * are omitted so the canonical URL for an unfiltered first page stays clean.
 *
 * `view` is accepted so sort and pagination links keep the reader in the layout
 * they chose. Leave it off when building a canonical URL — grid and list are the
 * same content, and emitting both would be duplicate content.
 */
export function buildPropertyHref(
    query: Partial<PropertyQuery> & { view?: PropertyView } = {},
    basePath = "/properties",
): string {
    const params = new URLSearchParams();
    for (const key of KEY_ORDER) {
        const value = query[key];
        if (value === undefined || value === "") continue;
        if (DEFAULTS[key] === value) continue;
        params.set(key, String(value));
    }
    if (query.view && query.view !== DEFAULT_VIEW) params.set("view", query.view);

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
}

/** Turns a query into the querystring the backend list endpoint expects. */
export function toApiSearchParams(query: PropertyQuery): URLSearchParams {
    const params = new URLSearchParams();
    for (const key of KEY_ORDER) {
        const value = query[key];
        if (value !== undefined) params.set(key, String(value));
    }
    return params;
}
