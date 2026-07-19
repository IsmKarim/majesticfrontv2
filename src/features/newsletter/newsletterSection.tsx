// components/NewsletterSection.tsx
"use client";

import Reveal from "@/components/ui/reveal";
import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Box py={{ base: 10, md: 16 }} px={{ base: 4, md: 8 }} bg="secondary.700">
      <Reveal variant="scale" distance={20}>
        <Box
          bg="brand.800"
          borderRadius="xl"
          px={{ base: 6, md: 12, lg: 20 }}
          py={{ base: 12, md: 16 }}
          textAlign="center"
          maxW="900px"
          mx="auto"
        >
          {/* ── Eyebrow ── */}
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color="secondary.500"
            mb={4}
          >
            Newsletter Exclusive
          </Text>

          {/* ── Heading ── */}
          <Text
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="white"
            lineHeight="shorter"
            mb={4}
          >
            Restez informé de nos offres privées
          </Text>

          {/* ── Subtext ── */}
          <Text
            color="secondary.300"
            fontSize={{ base: "sm", md: "md" }}
            maxW="480px"
            mx="auto"
            mb={10}
            lineHeight="tall"
          >
            Inscrivez-vous pour recevoir en avant-première nos nouvelles propriétés
            et nos analyses du marché de prestige.
          </Text>

          {/* ── Input + CTA ── */}
          {submitted ? (
            <Reveal variant="fade" duration={500}>
              <Text color="secondary.500" fontWeight="semibold" fontSize="md">
                Merci ! Vous êtes maintenant abonné. ✓
              </Text>
            </Reveal>
          ) : (
            <Flex
              as="form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleSubmit();
              }}
              maxW="520px"
              mx="auto"
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 3, sm: 0 }}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                bg="brand.900"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius={0}
                color="white"
                // 16px floor: below that, iOS zooms the page on focus
                fontSize="md"
                px={5}
                h="52px"
                flex={1}
                _placeholder={{ color: "whiteAlpha.400" }}
                transition="border-color 0.25s ease"
                _focus={{
                  outline: "none",
                  borderColor: "secondary.500",
                  boxShadow: "none",
                }}
              />
              <Button
                type="submit"
                h="52px"
                px={8}
                bg="secondary.500"
                fontWeight="semibold"
                fontSize="sm"
                letterSpacing="wide"
                textTransform="uppercase"
                borderRadius={0}
                transition="all 0.3s ease"
                _hover={{ bg: "secondary.400" }}
                _active={{ transform: "scale(0.98)" }}
              >
                S&apos;abonner
              </Button>
            </Flex>
          )}
        </Box>
      </Reveal>
    </Box>
  );
}
