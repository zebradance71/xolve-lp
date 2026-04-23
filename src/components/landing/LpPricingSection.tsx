import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PlanId } from "./landingTypes";

type LpPricingSectionProps = {
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
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-400">Premium Plan</p>
        <h2 className="text-3xl font-bold md:text-5xl">PREMIUMのみ提供中</h2>
        <p className="text-sm text-zinc-400">買い切りで、運用の中核機能をまとめて導入できます。</p>
      </div>

      <div className="mx-auto grid w-full max-w-xl items-stretch gap-4 overflow-visible pt-8">
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
                投稿作成〜予約管理を一通り対応
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                AI支援でリライト・複数投稿の自動生成
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                自動運用でいいね・バズリライトを代行
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                複数アカウントとログを一元管理
              </p>
            </div>
            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-zinc-800 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => startCheckout("PREMIUM")}
                className={cn(
                  "h-11 w-full rounded-md border text-xs font-black transition-all duration-200 disabled:opacity-100",
                  canGlobalPurchase
                    ? "border-transparent bg-[#06b6d4] text-black shadow-[0_0_32px_rgba(34,211,238,0.55)] hover:bg-[#22d3ee]"
                    : "border-zinc-600 bg-transparent text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-900/80 hover:text-zinc-100"
                )}
                disabled={!canGlobalPurchase || activeCheckoutPlan !== null}
              >
                {activeCheckoutPlan === "PREMIUM" ? "遷移中..." : "PREMIUMを購入"}
              </Button>
              <p className="text-[10px] text-zinc-600">返金不可（利用規約準拠）</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto w-full max-w-xl px-0">
        <Card className="border-zinc-800 bg-[#09090b] shadow-none">
          <CardContent className="space-y-5 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm underline underline-offset-4">
              <Link href="/legal">利用規約・免責事項</Link>
              <Link href="/privacy-policy">プライバシーポリシー</Link>
              <Link href="/tokushoho">特商法表記</Link>
              <a
                href="https://zebradance71.github.io/xolve-manual/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄公式説明
              </a>
            </div>

            <label className="flex cursor-pointer items-start justify-center gap-2.5 text-sm sm:items-center">
              <Checkbox
                className="mt-0.5 sm:mt-0"
                checked={agreeTerms && agreeDisclaimer}
                onCheckedChange={(v) => {
                  const checked = v === true;
                  setAgreeTerms(checked);
                  setAgreeDisclaimer(checked);
                }}
              />
              <Label className="text-left leading-snug sm:text-center">利用規約・免責事項に同意する</Label>
            </label>

            {!canGlobalPurchase ? (
              <Alert className="border-zinc-800 bg-black text-center">
                <AlertTitle className="text-center">同意が必要です</AlertTitle>
                <AlertDescription className="text-center text-zinc-400">
                  購入前に利用規約・免責事項への同意が必要です。
                </AlertDescription>
              </Alert>
            ) : null}
            {checkoutError ? (
              <Alert className="border-red-900/70 bg-black text-center">
                <AlertTitle className="text-center text-red-300">チェックアウトを開始できませんでした</AlertTitle>
                <AlertDescription className="text-center text-red-200/80">{checkoutError}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
