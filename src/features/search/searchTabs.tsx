"use client";

import { Tabs } from "@chakra-ui/react";

/** "all" is the neutral state; the query schema expresses it as no filter at all. */
const TABS = [
    { value: "all", label: "Tous" },
    { value: "sale", label: "Acheter" },
    { value: "rent", label: "Louer" },
] as const;

export default function SearchTabs({
    value,
    onValueChange,
}: {
    value: string | undefined;
    onValueChange: (transactionType: string | undefined) => void;
}) {
    return (
        <Tabs.Root
            value={value ?? "all"}
            onValueChange={(e) => onValueChange(e.value === "all" ? undefined : e.value)}
            color="white"
        >
            <Tabs.List gap={1}>
                {TABS.map((tab) => (
                    <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        bg="brand.500"
                        color="white"
                        _selected={{ bg: "secondary.500", color: "brand.900" }}
                    >
                        {tab.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
        </Tabs.Root>
    );
}
