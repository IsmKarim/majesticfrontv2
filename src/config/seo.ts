import type { Locale } from "@/i18n/locales";
import { siteConfig } from "./site";

interface LocaleSeoContent {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
}

export const seoContent: Record<Locale, LocaleSeoContent> = {
  fr: {
    title: `${siteConfig.name} | Agence Immobilière de Luxe à Kénitra`,
    description:
      "Majestic Keys est une agence immobilière premium à Kénitra, spécialisée dans l'achat, la vente et la location de biens d'exception. Un accompagnement discret, efficace et sur-mesure.",
    keywords: [
      "agence immobilière Kénitra",
      "immobilier de luxe Maroc",
      "achat villa Kénitra",
      "location appartement Kénitra",
      "biens immobiliers d'exception",
      "Majestic Keys",
    ],
    ogLocale: "fr_FR",
  },
  en: {
    title: `${siteConfig.name} | Luxury Real Estate Agency in Kénitra`,
    description:
      "Majestic Keys is a premium real estate agency in Kénitra, Morocco, specializing in the sale, purchase and rental of exceptional properties. Discreet, efficient, tailor-made service.",
    keywords: [
      "real estate agency Kenitra",
      "luxury real estate Morocco",
      "buy villa Kenitra",
      "rent apartment Kenitra",
      "exceptional properties",
      "Majestic Keys",
    ],
    ogLocale: "en_US",
  },
};
