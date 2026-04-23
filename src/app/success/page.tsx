import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-xl space-y-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">ご購入ありがとうございます！</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-500">
          決済が正常に完了しました。xolveをご利用いただくために、まずはアカウントの作成をお願いします。登録完了後、すぐにライセンスキーの発行とアプリのダウンロードが可能です。
        </p>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <Link
            href={authHref}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#06b6d4] px-6 text-sm font-bold text-black transition hover:bg-[#22d3ee]"
          >
            新規登録へ進む
          </Link>
        </div>
      </div>
    </main>
  );
}
