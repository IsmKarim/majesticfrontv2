"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getNeighborhoodsCollection } from "@/config/citiesData";
import {
    buildPropertyHref,
    parsePropertyQuery,
    parsePropertyView,
    type PropertyQuery,
    type PropertySort,
    type PropertyView,
} from "@/features/properties/property.query";

/** Sentinel values the filter controls use for "no preference". */
const PRICE_FLOOR = 0;
const PRICE_CEILING = 10_000_000;

export type SearchDraft = Partial<PropertyQuery> & {
    /** The switch has a third state the query schema does not model. */
    equipped?: "yes" | "no";
};

function paramsToObject(searchParams: URLSearchParams): Record<string, string> {
    return Object.fromEntries(searchParams.entries());
}

/**
 * Drops values that mean "unfiltered" so they never reach the URL. Without this
 * an untouched slider would pin `priceMin=0&priceMax=10000000` onto every search
 * URL, splitting the cache and polluting the canonical link.
 */
function clean(draft: SearchDraft): Partial<PropertyQuery> {
    const out: SearchDraft = { ...draft };
    if (out.priceMin !== undefined && out.priceMin <= PRICE_FLOOR) delete out.priceMin;
    if (out.priceMax !== undefined && out.priceMax >= PRICE_CEILING) delete out.priceMax;
    if (out.bedrooms !== undefined && out.bedrooms <= 0) delete out.bedrooms;
    if (out.bathrooms !== undefined && out.bathrooms <= 0) delete out.bathrooms;
    for (const key of Object.keys(out) as (keyof SearchDraft)[]) {
        if (out[key] === "" || out[key] === undefined) delete out[key];
    }
    return out;
}

export const useSearch = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    /** What the server actually rendered — the URL is the source of truth. */
    const committed = useMemo<PropertyQuery>(
        () => parsePropertyQuery(paramsToObject(searchParams)),
        [searchParams],
    );

    /**
     * Filters are staged locally and committed on submit, so picking a city then
     * a price range is one navigation instead of two. Single-action controls
     * (sort, pagination) bypass the draft and commit immediately.
     */
    const [draft, setDraft] = useState<SearchDraft>(committed);

    // Re-sync when the URL changes from outside the widget (back button, a
    // sort change, a pagination link).
    useEffect(() => {
        setDraft(committed);
    }, [committed]);

    // The switch adds an "any" state on top of the draft's own value type, so the
    // patch type has to replace `equipped` rather than intersect with it.
    const updateSearchQuery = (
        patch: Omit<SearchDraft, "equipped"> & { equipped?: "any" | "yes" | "no" },
    ) => {
        setDraft((current) => {
            const next = { ...current, ...patch } as SearchDraft;
            // "any" is the widget's neutral state; the query schema expresses that
            // as the field being absent.
            if (patch.equipped === "any") delete next.equipped;
            return next;
        });
    };

    /** Runs the staged search. Always lands on /properties, always from page 1. */
    const submitSearch = () => {
        router.push(buildPropertyHref({ ...clean(draft), page: 1 }));
    };

    /** Grid vs list, read back off the URL so the server renders the right one. */
    const view = useMemo<PropertyView>(
        () => parsePropertyView(paramsToObject(searchParams)),
        [searchParams],
    );

    /** Sort is a single action, so it commits straight to the URL. */
    const applySort = (sort: PropertySort) => {
        router.replace(buildPropertyHref({ ...committed, view, sort, page: 1 }), { scroll: false });
    };

    /**
     * Switching layout keeps the current page — unlike a filter or sort change,
     * it does not reorder anything, so there is nothing to reset.
     */
    const applyView = (next: PropertyView) => {
        router.replace(buildPropertyHref({ ...committed, view: next }), { scroll: false });
    };

    const neighborhoodsOptions = useMemo(
        () => getNeighborhoodsCollection(draft.city ?? ""),
        [draft.city],
    );

    return {
        /** Staged, uncommitted filter state. */
        searchQuery: draft,
        /** The filters currently reflected in the URL and the rendered results. */
        committed,
        view,
        applyView,
        updateSearchQuery,
        submitSearch,
        applySort,
        neighborhoodsOptions,
    };
};
