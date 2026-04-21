import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "決済キャンセル | xolve",
  description: "Stripe Checkout をキャンセルした場合の案内",
};

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-lg space-y-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">決済は完了していません</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-500">
          Checkout を終了したか、決済が中断されました。料金は発生していません。再度ご購入の場合はプランをお選びください。
        </p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <Link
            href="/#purchase"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#06b6d4] px-6 text-sm font-bold text-black transition hover:bg-[#22d3ee]"
          >
            プラン選択へ戻る
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-700 bg-transparent px-6 text-sm font-semibold text-zinc-200 transition hover:border-[#06b6d4]/50 hover:text-white"
          >
            LPトップへ
          </Link>
        </div>
      </div>
    </main>
  );
}
