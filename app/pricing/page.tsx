import FAQSection from "@/components/marketing/faq";
import PricingSection from "@/components/marketing/pricing";


export default function Pricing() {
    return (
        <div className="page-container flex items-center justify-center min-h-screen">
            <PricingSection />
            <FAQSection />
        </div>
    );
}