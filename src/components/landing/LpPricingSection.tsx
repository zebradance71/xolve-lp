import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PlanId } from "./landingTypes";

type LpPricingSectionProps = {
  consentByPlan: Record<PlanId, boolean>;
  setPlanConsent: (plan: PlanId, value: boolean) => void;
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  agreeDisclaimer: boolean;
  setAgreeDisclaimer: (v: boolean) => void;
  canGlobalPurchase: boolean;
  activeCheckoutPlan: PlanId | null;
  checkoutError: string | null;
  startCheckout: (plan: PlanId) => void;
};

export function LpPricingSection({
  consentByPlan,
  setPlanConsent,
  agreeTerms,
  setAgreeTerms,
  agreeDisclaimer,
  setAgreeDisclaimer,
  canGlobalPurchase,
  activeCheckoutPlan,
  checkoutError,
  startCheckout,
}: LpPricingSectionProps) {
  return (
    <section id="purchase" data-animate="pricing" className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-400">Pricing</p>
        <h2 className="text-3xl font-bold md:text-5xl">資産としてのツール</h2>
        <p className="text-sm text-zinc-400">サブスク貧乏を脱却し、一生モノの資産へ。</p>
      </div>

      <div className="grid items-stretch gap-4 overflow-visible pt-8 lg:grid-cols-3">
        <Card className="flex h-full flex-col overflow-visible border-zinc-800 bg-[#09090b]">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-200">STANDARD</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-4">
            <p className="text-3xl font-black tabular-nums text-zinc-50">¥29,800</p>
            <p className="text-sm text-zinc-400">手動運用の効率化</p>
            <div className="space-y-4 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                単発予約投稿
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                スレッド予約投稿
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                カレンダー管理
              </p>
            </div>
            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-zinc-800 pt-4">
              <label className="flex cursor-pointer items-start gap-1.5 leading-none">
                <Checkbox
                  className="mt-0.5 size-3.5 shrink-0 rounded border-zinc-600"
                  checked={consentByPlan.STANDARD}
                  onCheckedChange={(v) => setPlanConsent("STANDARD", v === true)}
                />
                <span className="text-[10px] leading-tight text-zinc-500">規約に同意して購入する</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => startCheckout("STANDARD")}
                className={cn(
                  "h-11 w-full rounded-md border text-xs font-black transition-all duration-200 disabled:opacity-100",
                  consentByPlan.STANDARD
                    ? "border-transparent bg-[#06b6d4] text-black shadow-[0_0_22px_rgba(34,211,238,0.35)] hover:bg-[#22d3ee]"
                    : "border-zinc-600 bg-transparent text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-900/80 hover:text-zinc-100"
                )}
                disabled={!consentByPlan.STANDARD || !canGlobalPurchase || activeCheckoutPlan !== null}
              >
                {activeCheckoutPlan === "STANDARD" ? "遷移中..." : "STANDARDを購入"}
              </Button>
              <p className="text-[10px] text-zinc-600">返金不可（利用規約準拠）</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex h-full flex-col overflow-visible border-zinc-800 bg-[#09090b]">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-200">PRO</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-4">
            <p className="text-3xl font-black tabular-nums text-zinc-50">¥39,800</p>
            <p className="text-sm text-zinc-400">大量投稿を効率化</p>
            <div className="space-y-4 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                STANDARDの全機能
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                CSV一括投稿
              </p>
            </div>
            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-zinc-800 pt-4">
              <label className="flex cursor-pointer items-start gap-1.5 leading-none">
                <Checkbox
                  className="mt-0.5 size-3.5 shrink-0 rounded border-zinc-600"
                  checked={consentByPlan.PRO}
                  onCheckedChange={(v) => setPlanConsent("PRO", v === true)}
                />
                <span className="text-[10px] leading-tight text-zinc-500">規約に同意して購入する</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => startCheckout("PRO")}
                className={cn(
                  "h-11 w-full rounded-md border text-xs font-black transition-all duration-200 disabled:opacity-100",
                  consentByPlan.PRO
                    ? "border-transparent bg-[#06b6d4] text-black shadow-[0_0_22px_rgba(34,211,238,0.35)] hover:bg-[#22d3ee]"
                    : "border-zinc-600 bg-transparent text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-900/80 hover:text-zinc-100"
                )}
                disabled={!consentByPlan.PRO || !canGlobalPurchase || activeCheckoutPlan !== null}
              >
                {activeCheckoutPlan === "PRO" ? "遷移中..." : "PROを購入"}
              </Button>
              <p className="text-[10px] text-zinc-600">返金不可（利用規約準拠）</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex h-full flex-col overflow-visible border-[#06b6d4]/40 bg-[#09090b] ring-1 ring-[#06b6d4]/20">
          <CardHeader className="space-y-2 border-b border-zinc-800 pb-3">
            <div className="flex justify-center">
              <span className="rounded border border-cyan-500/50 bg-black px-3 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Recommend
              </span>
            </div>
            <CardTitle className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              PREMIUM
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-4">
            <p className="text-5xl font-black tabular-nums tracking-tight text-zinc-50">¥49,800</p>
            <p className="text-sm text-zinc-400">AIで自動化・収益化を加速</p>
            <div className="space-y-4 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                PROの全機能
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                AIリライト
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                自動運用フル機能
              </p>
            </div>
            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-zinc-800 pt-4">
              <label className="flex cursor-pointer items-start gap-1.5 leading-none">
                <Checkbox
                  className="mt-0.5 size-3.5 shrink-0 rounded border-zinc-600 data-[state=checked]:border-[#06b6d4] data-[state=checked]:text-[#06b6d4]"
                  checked={consentByPlan.PREMIUM}
                  onCheckedChange={(v) => setPlanConsent("PREMIUM", v === true)}
                />
                <span className="text-[10px] leading-tight text-zinc-500">規約に同意して購入する</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => startCheckout("PREMIUM")}
                className={cn(
                  "h-11 w-full rounded-md border text-xs font-black transition-all duration-200 disabled:opacity-100",
                  consentByPlan.PREMIUM
                    ? "border-transparent bg-[#06b6d4] text-black shadow-[0_0_32px_rgba(34,211,238,0.55)] hover:bg-[#22d3ee]"
                    : "border-zinc-600 bg-transparent text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-900/80 hover:text-zinc-100"
                )}
                disabled={!consentByPlan.PREMIUM || !canGlobalPurchase || activeCheckoutPlan !== null}
              >
                {activeCheckoutPlan === "PREMIUM" ? "遷移中..." : "PREMIUMを購入"}
              </Button>
              <p className="text-[10px] text-zinc-600">返金不可（利用規約準拠）</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-[#09090b]">
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap gap-3 text-sm underline underline-offset-4">
            <Link href="/terms">利用規約</Link>
            <Link href="/disclaimer">免責事項</Link>
            <Link href="/privacy-policy">プライバシーポリシー</Link>
            <Link href="/tokushoho">特商法表記</Link>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={agreeTerms} onCheckedChange={(v) => setAgreeTerms(v === true)} />
              <Label>利用規約に同意する</Label>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={agreeDisclaimer} onCheckedChange={(v) => setAgreeDisclaimer(v === true)} />
              <Label>免責事項に同意する</Label>
            </label>
          </div>

          {!canGlobalPurchase ? (
            <Alert className="border-zinc-800 bg-black">
              <AlertTitle>同意が必要です</AlertTitle>
              <AlertDescription>購入前に利用規約・免責事項へ同意してください。</AlertDescription>
            </Alert>
          ) : null}
          {checkoutError ? (
            <Alert className="border-red-900/70 bg-black">
              <AlertTitle className="text-red-300">チェックアウトを開始できませんでした</AlertTitle>
              <AlertDescription className="text-red-200/80">{checkoutError}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
