import { Box, Button, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

/** Rendered by `notFound()` on an unknown property slug, and for unmatched URLs. */
export default function NotFound() {
    return (
        <Box bg="brand.700" minH="70vh" display="flex" alignItems="center" justifyContent="center" px={6}>
            <VStack gap={5} textAlign="center" maxW="520px">
                <Text color="secondary.500" fontSize="sm" letterSpacing="widest" textTransform="uppercase">
                    Erreur 404
                </Text>
                <Text as="h1" fontSize={{ base: "2xl", md: "3xl" }} color="white" fontWeight="600">
                    Cette page n&apos;existe pas
                </Text>
                <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                    Le bien que vous cherchez a peut-être été vendu, loué, ou retiré de notre sélection.
                </Text>
                <Button
                    asChild
                    variant="outline"
                    borderColor="secondary.500"
                    color="secondary.400"
                    borderRadius={0}
                    px={8}
                    minH="48px"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    _hover={{ bg: "secondary.500", color: "brand.900" }}
                >
                    <NextLink href="/properties">Voir tous nos biens</NextLink>
                </Button>
            </VStack>
        </Box>
    );
}
