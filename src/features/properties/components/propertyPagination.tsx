import { Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { buildPropertyHref, type PropertyQuery, type PropertyView } from "../property.query";
import { getTranslations } from "next-intl/server";

/**
 * Builds a compact page list: always the first and last page, plus a window
 * around the current one, with `null` marking an elision.
 */
function pageItems(current: number, total: number): (number | null)[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const window = new Set([1, total, current, current - 1, current + 1]);
    const pages = [...window].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

    const out: (number | null)[] = [];
    let previous = 0;
    for (const page of pages) {
        if (previous && page - previous > 1) out.push(null);
        out.push(page);
        previous = page;
    }
    return out;
}

const linkStyles = {
    minW: "40px",
    h: "40px",
    px: 3,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "sm",
    borderWidth: "1px",
} as const;

/**
 * Real `<a>` elements rather than click handlers — pagination has to be
 * crawlable, and each page is its own indexable URL.
 */
export default async function PropertyPagination({
    query,
    view,
    page,
    totalPages,
}: {
    query: PropertyQuery;
    view: PropertyView;
    page: number;
    totalPages: number;
}) {
    const t = await getTranslations("common");
    const tp = await getTranslations("properties.pagination");

    if (totalPages <= 1) return null;

    // Carry the view through so paging does not throw the reader back to grid.
    const href = (target: number) => buildPropertyHref({ ...query, view, page: target });

    return (
        <Flex as="nav" aria-label={tp("label")} justify="center" align="center" gap={2} py={10} bg="brand.700" wrap="wrap">
            {page > 1 && (
                <Text
                    asChild
                    {...linkStyles}
                    color="secondary.400"
                    borderColor="secondary.800"
                    _hover={{ borderColor: "secondary.500", color: "secondary.500" }}
                >
                    <NextLink href={href(page - 1)} rel="prev">
                        {t("previous")}
                    </NextLink>
                </Text>
            )}

            {pageItems(page, totalPages).map((item, index) =>
                item === null ? (
                    <Text key={`gap-${index}`} color="secondary.600" px={1} aria-hidden>
                        …
                    </Text>
                ) : item === page ? (
                    <Text
                        key={item}
                        {...linkStyles}
                        aria-current="page"
                        bg="secondary.500"
                        color="brand.900"
                        borderColor="secondary.500"
                        fontWeight="600"
                    >
                        {item}
                    </Text>
                ) : (
                    <Text
                        key={item}
                        asChild
                        {...linkStyles}
                        color="secondary.400"
                        borderColor="secondary.800"
                        _hover={{ borderColor: "secondary.500", color: "secondary.500" }}
                    >
                        <NextLink href={href(item)}>{item}</NextLink>
                    </Text>
                ),
            )}

            {page < totalPages && (
                <Text
                    asChild
                    {...linkStyles}
                    color="secondary.400"
                    borderColor="secondary.800"
                    _hover={{ borderColor: "secondary.500", color: "secondary.500" }}
                >
                    <NextLink href={href(page + 1)} rel="next">
                        {t("next")}
                    </NextLink>
                </Text>
            )}
        </Flex>
    );
}
