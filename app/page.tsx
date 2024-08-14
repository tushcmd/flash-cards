import CallToAction from "@/components/marketing/cta";
import FAQSection from "@/components/marketing/faq";
import FeaturesSection from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import PricingSection from "@/components/marketing/pricing";

export default function Home() {
  return (
    <main className="page-container flex flex-col items-center justify-center">
      <Hero />
      {/* <FeaturesSection /> */}

      <PricingSection />
      <CallToAction />
      <FAQSection />

    </main>
  );
}
