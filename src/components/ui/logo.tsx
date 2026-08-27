import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Logo({ showWordmark = false }: { showWordmark?: boolean }) {
  const t = useTranslations("common");
  return (
    <Link href="/" aria-label={t("homeLink")}>
      <Stack gap="2" justify="center" align="center">
        <Image
          src="/logo.png"
          alt={t("logoAlt")}
          width={120}
          height={80}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />

        {showWordmark && (
          <Text
            fontFamily="heading"
            fontWeight="medium"
            letterSpacing="widest"
            textTransform="uppercase"
            textAlign="center"
            fontSize={{ base: "lg", md: "xl" }}
            color="secondary.500"
          >
            Majestic Keys
          </Text>
        )}
      </Stack>
    </Link>
  );
}