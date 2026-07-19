import AgencyWord from "@/features/homePage/agencyWord";
import Hero from "@/features/homePage/hero";
import MorePropertiesWrapper from "@/features/homePage/morePropertiesWrapper";
import WhyChooseUs from "@/features/homePage/whyChooseUs";
import BrowseByCity from "@/features/browseListings/browseByCity";
import NewsletterSection from "@/features/newsletter/newsletterSection";
import FeaturedPropertySection from "@/features/properties/featuredPropertiesSection";
import ServicesSection from "@/features/services/servicesSection";
import { Testimonials } from "@/features/testimonials";
import { mockProperties } from "@/types/property.type";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const properties = mockProperties;
  return (
    <Box>
      <Hero />
      <AgencyWord />
      <FeaturedPropertySection />
      <WhyChooseUs />
      <BrowseByCity />
      <ServicesSection />
      <MorePropertiesWrapper properties={properties} />
      <NewsletterSection />
      <Testimonials />
    </Box>
  );
}
