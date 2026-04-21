"use client";

import { useMemo, useState } from "react";
import type { PlanId } from "./landingTypes";
import { TERMS_VERSION } from "./landingTypes";

export function useLandingPurchase() {
  const [consentByPlan, setConsentByPlan] = useState<Record<PlanId, boolean>>({
    STANDARD: false,
    PRO: false,
    PREMIUM: false,
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState<PlanId | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const canGlobalPurchase = useMemo(() => agreeTerms && agreeDisclaimer, [agreeTerms, agreeDisclaimer]);

  const checkoutBaseUrl = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE_URL ?? "/functions/v1";
    return raw.replace(/\/$/, "");
  }, []);

  const setPlanConsent = (plan: PlanId, value: boolean) => {
    setConsentByPlan((prev) => ({ ...prev, [plan]: value }));
  };

  const scrollToPurchase = () => {
    document.getElementById("purchase")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startCheckout = async (plan: PlanId) => {
    if (!canGlobalPurchase || !consentByPlan[plan]) {
      setCheckoutError("購入前に、プラン同意と利用規約・免責事項への同意を完了してください。");
      return;
    }
    setCheckoutError(null);
    setActiveCheckoutPlan(plan);
    try {
      const response = await fetch(`${checkoutBaseUrl}/stripe-create-checkout-session`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          planType: plan,
          consent: {
            terms: true,
            disclaimer: true,
            termsVersion: TERMS_VERSION,
            agreedAt: new Date().toISOString(),
          },
        }),
      });
      const payload = (await response.json()) as
        | { ok?: boolean; checkoutUrl?: string; message?: string }
        | undefined;
      if (!response.ok || !payload?.ok || !payload.checkoutUrl) {
        throw new Error(payload?.message || "チェックアウトURLの取得に失敗しました。");
      }
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : "チェックアウト処理に失敗しました。";
      setCheckoutError(message);
      setActiveCheckoutPlan(null);
    }
  };

  return {
    consentByPlan,
    setPlanConsent,
    agreeTerms,
    setAgreeTerms,
    agreeDisclaimer,
    setAgreeDisclaimer,
    canGlobalPurchase,
    activeCheckoutPlan,
    checkoutError,
    scrollToPurchase,
    startCheckout,
  };
}
