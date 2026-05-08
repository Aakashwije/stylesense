import { PublicLayout } from "@/components/layouts/PublicLayout";
import { CTASection } from "@/features/landing/CTASection";
import { FeaturesSection } from "@/features/landing/FeaturesSection";
import { HeroSection } from "@/features/landing/HeroSection";
import { PricingSection } from "@/features/landing/PricingSection";
import { ServicesSection } from "@/features/landing/ServicesSection";
import { TestimonialsSection } from "@/features/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </PublicLayout>
  );
}
