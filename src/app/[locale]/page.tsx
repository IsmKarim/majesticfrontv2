import AgencyWord from "@/features/homePage/agencyWord";
import Hero from "@/features/homePage/hero";
import MorePropertiesWrapper from "@/features/homePage/morePropertiesWrapper";
import WhyChooseUs from "@/features/homePage/whyChooseUs";
import NewsletterSection from "@/features/newsletter/newsletterSection";
import FeaturedPropertySection from "@/features/properties/featuredPropertiesSection";
import ServicesSection from "@/features/services/servicesSection";
import { Testimonials } from "@/features/testimonials";
import { mockProperties } from "@/types/property.type";

export default function Home() {
  const properties = mockProperties
  return (
    <>
      <Hero />
      <AgencyWord />
      <FeaturedPropertySection />
      <WhyChooseUs />
      <ServicesSection />
      <MorePropertiesWrapper properties={properties} />
      <NewsletterSection />
      <Testimonials />

    </>
  );
}
