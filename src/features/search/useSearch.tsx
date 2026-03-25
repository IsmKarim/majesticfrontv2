"use client";

import { useMemo, useState } from "react";
import { getNeighborhoodsCollection } from "@/config/citiesData";

const initialFilter = {
  transactionType: "sale",
  propertyType: "",   
  neighborhood: "",
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: 0,
  bathrooms: 0,
  city: "",
};

type SearchQuery = typeof initialFilter;

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>(initialFilter);

  const updateSearchQuery = (patch: Partial<SearchQuery>) => {
    setSearchQuery((prev) => ({ ...prev, ...patch }));
  };

  const neighborhoodsOptions = useMemo(() => {
    return getNeighborhoodsCollection(searchQuery.city);
  }, [searchQuery.city]);

  return {
    searchQuery,
    setSearchQuery,
    updateSearchQuery,
    neighborhoodsOptions,
  };
};
