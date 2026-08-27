import { Avatar, Box, HStack, Icon, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { teamMembers } from "./mocks";

// Cycles through the brand palette so avatar tiles aren't monochrome — no
// headshots exist yet, so initials (via Avatar.Fallback) stand in for photos.
const AVATAR_BG = ["secondary.600", "brand.400", "secondary.700", "brand.500"];

export default async function TeamGrid() {
    const t = await getTranslations("team.grid");
    return (
        <Box bg="brand.600" py={{ base: 14, md: 20 }} px={4}>
            <HStack justify="center" gap={3} mb={4}>
                <Box w="36px" h="1px" bg="secondary.500" />
                <Text
                    color="secondary.500"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontWeight="600"
                >
                    {t("eyebrow")}
                </Text>
                <Box w="36px" h="1px" bg="secondary.500" />
            </HStack>

            <Text
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="white"
                textAlign="center"
                mb={{ base: 10, md: 14 }}
            >
                {t("title")}
            </Text>

            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                gap={{ base: 8, md: 10 }}
                maxW="1100px"
                mx="auto"
            >
                {teamMembers.map((member, index) => (
                    <VStack
                        key={member.id}
                        gap={4}
                        textAlign="center"
                        bg="brand.700"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="brand.500"
                        px={6}
                        py={8}
                    >
                        <Avatar.Root size="2xl" bg={AVATAR_BG[index % AVATAR_BG.length]}>
                            <Avatar.Fallback name={member.name} color="white" fontWeight="600" />
                        </Avatar.Root>

                        <Box>
                            <Text color="white" fontWeight="600" fontSize="lg">
                                {member.name}
                            </Text>
                            <Text
                                color="secondary.500"
                                fontSize="xs"
                                textTransform="uppercase"
                                letterSpacing="wide"
                                mt={1}
                            >
                                {member.role}
                            </Text>
                        </Box>

                        <Text color="secondary.300" fontSize="sm" lineHeight="tall">
                            {member.bio}
                        </Text>

                        <Link
                            href={`mailto:${member.email}`}
                            aria-label={t("emailAria", { name: member.name })}
                            color="secondary.400"
                            _hover={{ color: "secondary.500" }}
                        >
                            <Icon asChild boxSize={4}>
                                <FaEnvelope />
                            </Icon>
                        </Link>
                    </VStack>
                ))}
            </SimpleGrid>
        </Box>
    );
}
