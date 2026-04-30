import Link from "next/link";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LpSectionEyebrow } from "@/components/landing/LpSectionEyebrow";
import type { PlanId } from "./landingTypes";

const planFeatures = [
  "投稿作成〜予約管理を一通り対応",
  "AI支援でリライト・複数投稿の自動生成",
  "自動運用でいいね・バズリライトを代行",
  "複数アカウントとログを一元管理",
  "シミュレーションで事前に挙動を確認",
  "データはローカルに保存（クラウドに預けない安心感）",
] as const;

const recommendedFor = [
  "毎日の投稿・予約作業に追われている",
  "複数アカウントを安全に回したい",
  "自動化したいが、凍結リスクが気になる",
  "AIで下書き〜整形まで時短したい",
  "運用代行や副業で再現性のある手順が欲しい",
] as const;

type LpPricingSectionProps = {
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  agreeDisclaimer: boolean;
  setAgreeDisclaimer: (v: boolean) => void;
  activeCheckoutPlan: PlanId | null;
  checkoutError: string | null;
  consentNotice: string | null;
  clearConsentNotice: () => void;
  startCheckout: (plan: PlanId) => void;
};

const panelPad = "p-7 md:p-9 lg:p-10";

export function LpPricingSection({
  agreeTerms,
  setAgreeTerms,
  agreeDisclaimer,
  setAgreeDisclaimer,
  activeCheckoutPlan,
  checkoutError,
  consentNotice,
  clearConsentNotice,
  startCheckout,
}: LpPricingSectionProps) {
  return (
    <section id="purchase" data-animate="pricing" className="space-y-12 scroll-mt-24 md:scroll-mt-28">
      <div className="space-y-4 text-center">
        <LpSectionEyebrow label="PRICE" />
        <h2 className="text-3xl font-black tracking-tight text-zinc-50 md:text-4xl">シンプルな料金プラン</h2>
        <p className="text-sm text-zinc-400">
          PREMIUM は買い切りライセンス。運用の中核機能をまとめて導入できます。
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-[#00C2D1]/25 bg-[#061525]/95 shadow-[0_0_60px_rgba(0,194,209,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="grid divide-y divide-white/[0.06] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <div className={`${panelPad} flex flex-col`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00C2D1]">PREMIUM</p>
            <p className="mt-3 text-xl font-bold text-zinc-100">PREMIUM プラン</p>
            <div className="mt-6">
              <p className="text-4xl font-black tabular-nums tracking-tight text-white md:text-5xl">¥49,800</p>
              <p className="mt-1 text-sm text-zinc-400">税込・買い切り（利用規約に準拠）</p>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-zinc-200">
              {planFeatures.map((line) => (
                <li key={line} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00C2D1]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${panelPad} flex flex-col justify-between gap-8 bg-[#00C2D1]/[0.04] lg:min-h-[420px]`}
          >
            <div className="space-y-3">
              <p className="text-lg font-bold leading-snug text-zinc-100 md:text-xl">
                月に30〜60時間かかっていた作業を、まとめて圧縮。
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                予約・自動運用・AI下書きを一つのアプリに集約。細かい手作業から解放され、伸ばすことに集中できます。
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-center text-xs text-zinc-400">
                ※購入にはページ下部の同意チェックが必要です。
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => startCheckout("PREMIUM")}
                className={cn(
                  "h-12 w-full rounded-xl border border-transparent bg-[#00C2D1] text-sm font-black text-[#000B18] shadow-[0_0_32px_rgba(0,194,209,0.35)] transition-all duration-200 hover:bg-[#3fe8f5] disabled:opacity-70"
                )}
                disabled={activeCheckoutPlan !== null}
              >
                <span className="inline-flex items-center justify-center gap-1">
                  {activeCheckoutPlan === "PREMIUM" ? "遷移中..." : "今すぐ自動化する"}
                  {activeCheckoutPlan !== "PREMIUM" ? <ChevronRight className="size-4" aria-hidden /> : null}
                </span>
              </Button>
              <p className="text-center text-[11px] text-zinc-500">返金不可（利用規約準拠）</p>
            </div>
          </div>

          <div className={`${panelPad} flex flex-col`}>
            <p className="text-lg font-bold text-zinc-100">こんな方におすすめ</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-300">
              {recommendedFor.map((line) => (
                <li key={line} className="border-l-2 border-[#00C2D1]/45 pl-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="purchase-consent" className="mx-auto w-full max-w-6xl scroll-mt-28 px-0">
        <Card className="rounded-2xl border border-white/[0.06] bg-[#061525]/90 shadow-none">
          <CardContent className="space-y-5 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm underline underline-offset-4">
              <Link href="/legal" className="text-zinc-300 transition hover:text-[#00C2D1]">
                利用規約・免責事項
              </Link>
              <Link href="/privacy-policy" className="text-zinc-300 transition hover:text-[#00C2D1]">
                プライバシーポリシー
              </Link>
              <Link href="/tokushoho" className="text-zinc-300 transition hover:text-[#00C2D1]">
                特商法表記
              </Link>
              <a
                href="https://zebradance71.github.io/xolve-manual/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 transition hover:text-[#00C2D1]"
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
                  if (checked) clearConsentNotice();
                }}
              />
              <Label className="text-left leading-snug text-zinc-200 sm:text-center">
                利用規約・免責事項に同意する
              </Label>
            </label>

            {consentNotice ? (
              <Alert className="border-[#00C2D1]/40 bg-[#000B18]/90 text-center">
                <AlertTitle className="text-center text-[#00C2D1]">ご確認ください</AlertTitle>
                <AlertDescription className="text-center text-zinc-300">{consentNotice}</AlertDescription>
              </Alert>
            ) : null}
            {checkoutError ? (
              <Alert className="border-red-900/70 bg-[#000B18] text-center">
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
