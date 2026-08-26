import { setRequestLocale } from "next-intl/server";
import AgencyWord from "@/features/homePage/agencyWord";
import Hero from "@/features/homePage/hero";
import MorePropertiesWrapper from "@/features/homePage/morePropertiesWrapper";
import WhyChooseUs from "@/features/homePage/whyChooseUs";
import BrowseByCity from "@/features/browseListings/browseByCity";
import NewsletterSection from "@/features/newsletter/newsletterSection";
import FeaturedPropertySection from "@/features/properties/featuredPropertiesSection";
import ServicesSection from "@/features/services/servicesSection";
import { Testimonials } from "@/features/testimonials";
import { Box } from "@chakra-ui/react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Layouts and pages render in parallel, so the layout's call has not
  // necessarily run yet. Without this, next-intl falls back to reading the
  // request headers and the page can no longer be prerendered.
  setRequestLocale(locale);

  return (
    <Box>
      <Hero />
      <AgencyWord />
      <FeaturedPropertySection />
      <WhyChooseUs />
      <BrowseByCity />
      <ServicesSection />
      <MorePropertiesWrapper />
      <NewsletterSection />
      <Testimonials />
    </Box>
  );
}
