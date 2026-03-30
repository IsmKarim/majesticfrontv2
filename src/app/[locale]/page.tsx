import AgencyWord from "@/features/homePage/agencyWord";
import Hero from "@/features/homePage/hero";
import WhyChooseUs from "@/features/homePage/whyChooseUs";
import NewsletterSection from "@/features/newsletter/newsletterSection";
import FeaturedPropertySection from "@/features/properties/featuredPropertiesSection";
import ServicesSection from "@/features/services/servicesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AgencyWord />
      <FeaturedPropertySection />
      <WhyChooseUs />
      <ServicesSection />
      <NewsletterSection />
    </>
  );
}
