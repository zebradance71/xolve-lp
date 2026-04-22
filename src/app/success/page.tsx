import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お支払い完了 | xolve",
  description: "Stripe Checkout 完了後の案内",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

async function resolvePurchasedEmail(sessionId: string): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey) return null;

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/licenses?select=user_email&stripe_checkout_session_id=eq.${encodeURIComponent(sessionId)}&order=issued_at.desc&limit=1`;
  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as Array<{ user_email?: string }>;
    const email = rows[0]?.user_email?.trim();
    return email && email.length > 0 ? email : null;
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const purchasedEmail = sessionId ? await resolvePurchasedEmail(sessionId) : null;
  const authParams = new URLSearchParams({ next: "/mypage", mode: "signup" });
  if (purchasedEmail) authParams.set("email", purchasedEmail);
  const authHref = `/auth?${authParams.toString()}`;

  return (
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-xl space-y-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">ご購入ありがとうございます！</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-500">
          決済が正常に完了しました。xolveをご利用いただくために、まずはアカウントの作成をお願いします。登録完了後、すぐにライセンスキーの発行とアプリのダウンロードが可能です。
        </p>
        {sessionId ? (
          <p className="text-xs font-mono text-zinc-600">
            session_id: <span className="text-zinc-500">{sessionId}</span>
          </p>
        ) : null}
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
