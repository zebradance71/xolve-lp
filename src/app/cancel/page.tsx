import type { Metadata } from "next";
import Link from "next/link";
import { LpShell } from "@/components/landing/LpShell";

export const metadata: Metadata = {
  title: "決済キャンセル | xolve",
  description: "Stripe Checkout をキャンセルした場合の案内",
};

export default function CheckoutCancelPage() {
  return (
    <LpShell className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-lg space-y-8 rounded-2xl border border-white/[0.06] bg-[#061525]/90 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00C2D1]">Checkout</p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">決済は完了していません</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-400">
          Checkout を終了したか、決済が中断されました。料金は発生していません。再度ご購入の場合はプランをお選びください。
        </p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <Link
            href="/#purchase"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#00C2D1] px-6 text-sm font-bold text-[#000B18] shadow-[0_0_24px_rgba(0,194,209,0.3)] transition hover:bg-[#3fe8f5]"
          >
            プラン選択へ戻る
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 text-sm font-semibold text-zinc-200 transition hover:border-[#00C2D1]/50 hover:text-white"
          >
            LPトップへ
          </Link>
        </div>
      </div>
    </LpShell>
  );
}
