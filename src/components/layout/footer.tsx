"use client"
import { navigationConfig } from "@/config/navigation";
import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    SimpleGrid,
    Stack,
    Link,
    Icon,
} from "@chakra-ui/react";
import Logo from "../ui/logo";
// Assuming you have react-icons installed. If not, use generic Chakra Icons or text.
import { FaPhoneAlt, FaEnvelope, FaCalendarCheck, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export  function Footer() {
    // defined colors for easy tweaking
    const bgBrand = "brand.900"; // slightly darker than 500 for footer
    const textMuted = "gray.400";
    const accent = "secondary.500";

    return (
        <Box bg={bgBrand} color="white" position="relative" >
            <Container maxW="container.xl" pt={10}>
                <Box
                    bg="rgba(10, 12, 16, 0.72)"
                    bgGradient="linear(to-br, rgba(255,255,255,0.10), rgba(255,255,255,0.02))"
                    backdropFilter="blur(18px) saturate(160%)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    boxShadow="0 22px 70px rgba(0,0,0,0.55)"
                    position="relative"
                    overflow="hidden"
                    p={{ base: 6, md: 10 }}
                    top="-6rem"
                    borderTop="4px solid"
                    borderTopColor={accent}
                    _before={{
                        content: `""`,
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        bgGradient:
                            "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 60%)",
                    }}
                >
                    <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={6}>
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                                Prêt à concrétiser votre projet Immobilier ?
                            </Text>
                            <Text color="whiteAlpha.800">
                                Contactez-nous dès aujourd'hui ou planifiez une visite.
                            </Text>
                        </Box>

                        <Flex gap={4} direction={{ base: "column", sm: "row" }} w={{ base: "100%", md: "auto" }}>
                            <Button
                                size="lg"
                                bg={accent}
                                _hover={{ bg: "secondary.400", transform: "translateY(-6px)" }}
                                transition="all 0.2s"
                            >
                                <FaEnvelope />  Message
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                color="white"
                                borderColor="whiteAlpha.400"
                                _hover={{ bg: "whiteAlpha.100", transform: "translateY(-6px)" }}
                            >
                                <FaPhoneAlt />  Appeler
                            </Button>
                            <Button
                                size="lg"
                                bg="white"
                                color="brand.900"
                                _hover={{ bg: "gray.100", transform: "translateY(-6px)" }}
                            >
                                <FaCalendarCheck />Visiter
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Container>

            {/* 2. MAIN FOOTER CONTENT */}
            <Container maxW="container.xl" pb={10} px={{ base: 6, md: 10 }}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={10}>

                    {/* Column 1: Brand & Tagline */}
                    <Stack gap={6}>
                        <Box>
                            <Logo />
                        </Box>
                        <Text color={textMuted} fontSize="sm">
                            Votre partenaire de confiance pour des solutions immobilières d'exception.
                            L'excellence à chaque étape.
                        </Text>
                        <Flex gap={4}>
                            {/* Social Icons with hover effects */}
                            {[FaFacebook, FaInstagram, FaLinkedin].map((SocialIcon, index) => (
                                <Box
                                    key={index}
                                    as="button"
                                    bg="whiteAlpha.100"
                                    p={2}
                                    rounded="full"
                                    _hover={{ bg: accent, color: "white" }}
                                    transition="all 0.3s"
                                >
                                    <Icon as={SocialIcon} boxSize={5} />
                                </Box>
                            ))}
                        </Flex>
                    </Stack>

                    {/* Column 2: Navigation */}
                    <Stack align={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"lg"} mb={2} color={accent}>
                            Navigation
                        </Text>
                        {navigationConfig.mainNav.map((navItem, index) => (
                            <Link
                                key={index}
                                href={navItem.href || "#"}
                                color={textMuted}
                                _hover={{ color: "white", paddingLeft: "5px" }}
                                transition="all 0.2s"
                            >
                                {navItem.title}
                            </Link>
                        ))}
                    </Stack>

                    {/* Column 3: Legal / Extra (Replacing the duplicate nav map) */}
                    <Stack align={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"lg"} mb={2} color={accent}>
                            Support
                        </Text>
                        <Link href="#" color={textMuted} _hover={{ color: "white" }}>FAQ</Link>
                        <Link href="#" color={textMuted} _hover={{ color: "white" }}>Politique de confidentialité</Link>
                        <Link href="#" color={textMuted} _hover={{ color: "white" }}>Conditions générales</Link>
                        <Link href="#" color={textMuted} _hover={{ color: "white" }}>Carrières</Link>
                    </Stack>

                    {/* Column 4: Contact Info (Replacing the duplicate nav map) */}
                    <Stack align={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"lg"} mb={2} color={accent}>
                            Coordonnées
                        </Text>

                        <Flex align="center" gap={3} color={textMuted}>
                            <Icon as={MdLocationOn} color={accent} />
                            <Text fontSize="sm">123 Boulevard Majestic, Paris</Text>
                        </Flex>

                        <Flex align="center" gap={3} color={textMuted}>
                            <Icon as={FaPhoneAlt} color={accent} boxSize={3} />
                            <Text fontSize="sm">+33 1 23 45 67 89</Text>
                        </Flex>

                        <Flex align="center" gap={3} color={textMuted}>
                            <Icon as={FaEnvelope} color={accent} boxSize={3} />
                            <Text fontSize="sm">contact@majestickeys.com</Text>
                        </Flex>
                    </Stack>

                </SimpleGrid>
            </Container>


            <Box py={6} bg="blackAlpha.300">
                <Container maxW="container.xl">
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify={{ base: 'center', md: 'space-between' }}
                        align={{ base: 'center', md: 'center' }}
                    >
                        <Text fontSize="sm" color={textMuted}>
                            © 2026 Majestic Keys. All Rights Reserved.
                        </Text>
                        <Stack direction={'row'} gap={6} mt={{ base: 4, md: 0 }}>
                            <Link fontSize={'sm'} color={textMuted} _hover={{ color: accent }}>Privacy</Link>
                            <Link fontSize={'sm'} color={textMuted} _hover={{ color: accent }}>Terms</Link>
                        </Stack>
                    </Flex>
                </Container>
            </Box>
        </Box>
    )
}