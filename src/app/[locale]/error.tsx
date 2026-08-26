"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

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
    useEffect(() => {
        // Replace with the real reporter (Sentry et al.) once one is wired up.
        console.error(error);
    }, [error]);

    return (
        <Box bg="brand.700" minH="70vh" display="flex" alignItems="center" justifyContent="center" px={6}>
            <VStack gap={5} textAlign="center" maxW="520px">
                <Text as="h1" fontSize={{ base: "2xl", md: "3xl" }} color="white" fontWeight="600">
                    Une erreur est survenue
                </Text>
                <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                    Nous n&apos;avons pas pu charger cette page. Réessayez dans un instant — si le
                    problème persiste, contactez notre équipe.
                </Text>
                {error.digest && (
                    <Text color="secondary.600" fontSize="xs" fontFamily="mono">
                        Référence : {error.digest}
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
                    Réessayer
                </Button>
            </VStack>
        </Box>
    );
}
