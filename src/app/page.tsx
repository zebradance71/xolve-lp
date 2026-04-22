"use client";

import { LpDefenseSection } from "@/components/landing/LpDefenseSection";
import { LpFeatureGridSection } from "@/components/landing/LpFeatureGridSection";
import { LpHeroSection } from "@/components/landing/LpHeroSection";
import { LpPricingSection } from "@/components/landing/LpPricingSection";
import { LpTipsSection } from "@/components/landing/LpTipsSection";
import { useLandingPurchase } from "@/components/landing/useLandingPurchase";

export default function Home() {
  const purchase = useLandingPurchase();

  return (
    <main className="min-h-screen bg-[#000000] font-sans tracking-tight text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-160px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#06b6d4]/[0.04] blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 py-14 md:px-8 md:py-20">
        <LpHeroSection onScrollToPurchase={purchase.scrollToPurchase} />
        <LpFeatureGridSection />
        <LpDefenseSection />
        <LpTipsSection />
        <LpPricingSection
          agreeTerms={purchase.agreeTerms}
          setAgreeTerms={purchase.setAgreeTerms}
          agreeDisclaimer={purchase.agreeDisclaimer}
          setAgreeDisclaimer={purchase.setAgreeDisclaimer}
          canGlobalPurchase={purchase.canGlobalPurchase}
          activeCheckoutPlan={purchase.activeCheckoutPlan}
          checkoutError={purchase.checkoutError}
          startCheckout={purchase.startCheckout}
        />
      </div>
    </main>
  );
}
