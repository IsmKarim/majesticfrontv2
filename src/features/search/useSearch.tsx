"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getNeighborhoodsCollection } from "@/config/citiesData";

const initialFilter = {
  transactionType: "sale" as "sale" | "rent" | "all",
  propertyType: "",
  neighborhood: "",
  priceMin: 0,      
  priceMax: 10_000_000,
  bedrooms: 0,
  bathrooms: 0,
  city: "",
  equipped: "any" as "any" | "yes" | "no", 
};

type SearchQuery = typeof initialFilter;

export const useSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = useMemo<SearchQuery>(() => ({
    ...initialFilter,
    city: searchParams.get("city") ?? "",
    propertyType: searchParams.get("propertyType") ?? "",
    // ... etc
  }), [searchParams]);

  const updateSearchQuery = (patch: Partial<SearchQuery>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      v ? params.set(k, String(v)) : params.delete(k);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const neighborhoodsOptions = useMemo(() => {
    return getNeighborhoodsCollection(searchQuery.city);
  }, [searchQuery.city]);

  return {
    searchQuery,
    updateSearchQuery,
    neighborhoodsOptions,
  };
};
