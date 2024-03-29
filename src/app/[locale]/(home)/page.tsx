import { getTranslations } from "next-intl/server";
import { CanvasRevealEffectDemo3 } from "./_components/hero-section/hero-section";
import { GlobeDemo } from "./_components/feature-section/globe-component";
import { Divider } from "@nextui-org/react";
import PricingSection from "./_components/pricing-section";
import FAQSection from "./_components/faq-section";

export default async function Home() {

  return (
    <>
      <div className="bg-black">
        <CanvasRevealEffectDemo3 />
        <Divider />
        <GlobeDemo />
        <div className="pb-12" id="faq">
          <FAQSection />
        </div>
        <div className="mb-36 overflow-x-hidden" id="pricing">
          <PricingSection />
        </div>
      </div>
    </>
  );
}
