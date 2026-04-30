"use client";

import { LpDefenseSection } from "@/components/landing/LpDefenseSection";
import { LpFeatureGridSection } from "@/components/landing/LpFeatureGridSection";
import { LpHeroSection } from "@/components/landing/LpHeroSection";
import { LpPricingSection } from "@/components/landing/LpPricingSection";
import { LpShell } from "@/components/landing/LpShell";
import { LpTipsSection } from "@/components/landing/LpTipsSection";
import { useLandingPurchase } from "@/components/landing/useLandingPurchase";

export default function Home() {
  const purchase = useLandingPurchase();

  return (
    <LpShell className="mx-auto flex min-w-0 w-full max-w-6xl flex-col gap-28 px-4 py-10 md:gap-32 md:px-8 md:py-20">
      <LpHeroSection />
      <LpFeatureGridSection />
      <LpDefenseSection />
      <LpTipsSection />
      <LpPricingSection
        agreeTerms={purchase.agreeTerms}
        setAgreeTerms={purchase.setAgreeTerms}
        agreeDisclaimer={purchase.agreeDisclaimer}
        setAgreeDisclaimer={purchase.setAgreeDisclaimer}
        activeCheckoutPlan={purchase.activeCheckoutPlan}
        checkoutError={purchase.checkoutError}
        consentNotice={purchase.consentNotice}
        clearConsentNotice={purchase.clearConsentNotice}
        startCheckout={purchase.startCheckout}
      />
    </LpShell>
  );
}
