import type { Metadata } from "next";
import Link from "next/link";
import { LpShell } from "@/components/landing/LpShell";
import { resolveCheckoutPurchaserEmail } from "@/lib/resolveCheckoutPurchaserEmail";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "お支払い完了 | xolve",
  description: "Stripe Checkout 完了後の案内",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id.trim() : "";
  const purchasedEmail = sessionId ? await resolveCheckoutPurchaserEmail(sessionId) : null;

  const authParams = new URLSearchParams({ next: "/mypage", mode: "signup" });
  if (purchasedEmail) authParams.set("email", purchasedEmail);
  if (sessionId) authParams.set("session_id", sessionId);
  const authHref = `/auth?${authParams.toString()}`;

  return (
    <LpShell className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-xl space-y-8 rounded-2xl border border-white/[0.06] bg-[#061525]/90 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00C2D1]">Checkout</p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">ご購入ありがとうございます！</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-400">
          決済が正常に完了しました。xolveをご利用いただくために、まずはアカウントの作成をお願いします。登録完了後、すぐにライセンスキーの発行とアプリのダウンロードが可能です。
        </p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <Link
            href={authHref}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#00C2D1] px-6 text-sm font-bold text-[#000B18] shadow-[0_0_24px_rgba(0,194,209,0.3)] transition hover:bg-[#3fe8f5]"
          >
            新規登録へ進む
          </Link>
        </div>
      </div>
    </LpShell>
  );
}
