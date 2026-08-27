import { Box, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import NextLink from "next/link";

interface BrowseCardProps {
    img: string;
    title: string;
    totalListings: number;
    href: string;
}

export default async function BrowseCard({ img, title, totalListings, href = "/properties" }: BrowseCardProps) {
    const t = await getTranslations("home.cities");
    return (
        <Box
            asChild
            display="block"
            position="relative"
            w="100%"
            aspectRatio="2 / 3"
            overflow="hidden"
            cursor="pointer"
            css={{
                // Grayscale-at-rest is a hover reveal — pointer devices only.
                // On touch there is no hover, so cards stay in full color.
                "@media (hover: hover)": {
                    "& .browse-img": {
                        filter: "grayscale(100%)",
                    },
                    "&:hover .browse-img": {
                        filter: "grayscale(0%)",
                        transform: "scale(1.04)",
                    },
                    "&:hover .browse-title": {
                        color: "var(--chakra-colors-secondary-500)",
                    },
                },
            }}
        >
            <NextLink href={href}>
                {/* ── Image ── */}
                <Box
                    className="browse-img"
                    position="absolute"
                    inset={0}
                    transition="transform 0.6s ease, filter 0.6s ease"
                >
                    <Image
                        src={img}
                        alt={title}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                    />
                </Box>

                {/* ── Gradient scrim ── */}
                <Box
                    position="absolute"
                    inset={0}
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.3) 50%, transparent 70%)"
                    }}
                    zIndex={1}
                />

                {/* ── Text ── */}
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    zIndex={2}
                    px={5}
                    py={6}
                >
                    <Text
                        className="browse-title"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        lineHeight="shorter"
                        mb={1}
                        color="white"
                        transition="color 0.3s ease"
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize="sm"
                        color="whiteAlpha.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                    >
                        {t("listings", { count: totalListings })}
                    </Text>
                </Box>
            </NextLink>
        </Box>
    );
}
