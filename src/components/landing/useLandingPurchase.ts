"use client";

import { useMemo, useState } from "react";
import type { PlanId } from "./landingTypes";
import { TERMS_VERSION } from "./landingTypes";

const CONSENT_NOTICE =
  "購入前に、ページ下部の「利用規約・免責事項に同意する」にチェックを入れてください。";

export function useLandingPurchase() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);
  const [activeCheckoutPlan, setActiveCheckoutPlan] = useState<PlanId | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [consentNotice, setConsentNotice] = useState<string | null>(null);

  const canGlobalPurchase = useMemo(() => agreeTerms && agreeDisclaimer, [agreeTerms, agreeDisclaimer]);

  const checkoutSessionUrl = useMemo(() => "/api/checkout-session", []);

  const clearConsentNotice = () => setConsentNotice(null);

  const startCheckout = async (plan: PlanId) => {
    if (!canGlobalPurchase) {
      setCheckoutError(null);
      setConsentNotice(CONSENT_NOTICE);
      if (typeof document !== "undefined") {
        requestAnimationFrame(() => {
          document.getElementById("purchase-consent")?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return;
    }
    setConsentNotice(null);
    setCheckoutError(null);
    setActiveCheckoutPlan(plan);
    try {
      const response = await fetch(checkoutSessionUrl, {
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

      const rawBody = await response.text();
      let payload: { ok?: boolean; checkoutUrl?: string; message?: string } | undefined;
      try {
        payload = rawBody ? (JSON.parse(rawBody) as typeof payload) : undefined;
      } catch {
        throw new Error(
          `サーバーが JSON 以外を返しました（HTTP ${response.status}）。URL が Next のページになっていないか、Functions の URL / anon キーを確認してください。`
        );
      }

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
    agreeTerms,
    setAgreeTerms,
    agreeDisclaimer,
    setAgreeDisclaimer,
    canGlobalPurchase,
    activeCheckoutPlan,
    checkoutError,
    consentNotice,
    clearConsentNotice,
    startCheckout,
  };
}
