"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

/**
 * Route-level error boundary. Catches render/data failures below the layout —
 * a failed property fetch, for example — so a backend outage degrades to a
 * recoverable screen instead of a blank page.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("errors");

    useEffect(() => {
        // Replace with the real reporter (Sentry et al.) once one is wired up.
        console.error(error);
    }, [error]);

    return (
        <Box bg="brand.700" minH="70vh" display="flex" alignItems="center" justifyContent="center" px={6}>
            <VStack gap={5} textAlign="center" maxW="520px">
                <Text as="h1" fontSize={{ base: "2xl", md: "3xl" }} color="white" fontWeight="600">
                    {t("title")}
                </Text>
                <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                    {t("body")}
                </Text>
                {error.digest && (
                    <Text color="secondary.600" fontSize="xs" fontFamily="mono">
                        {t("reference", { digest: error.digest })}
                    </Text>
                )}
                <Button
                    onClick={reset}
                    bg="secondary.500"
                    color="brand.900"
                    borderRadius={0}
                    px={8}
                    minH="48px"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    _hover={{ bg: "white" }}
                >
                    {t("retry")}
                </Button>
            </VStack>
        </Box>
    );
}
