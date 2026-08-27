import { Box, Button, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

/** Rendered by `notFound()` on an unknown property slug, and for unmatched URLs. */
export default function NotFound() {
    const t = useTranslations("errors");
    const tc = useTranslations("common");
    return (
        <Box bg="brand.700" minH="70vh" display="flex" alignItems="center" justifyContent="center" px={6}>
            <VStack gap={5} textAlign="center" maxW="520px">
                <Text color="secondary.500" fontSize="sm" letterSpacing="widest" textTransform="uppercase">
                    {t("notFoundEyebrow")}
                </Text>
                <Text as="h1" fontSize={{ base: "2xl", md: "3xl" }} color="white" fontWeight="600">
                    {t("notFoundTitle")}
                </Text>
                <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                    {t("notFoundBody")}
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
                    <NextLink href="/properties">{tc("seeAll")}</NextLink>
                </Button>
            </VStack>
        </Box>
    );
}
