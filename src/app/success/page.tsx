import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お支払い完了 | xolve",
  description: "Stripe Checkout 完了後の案内",
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  return (
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-lg space-y-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">お支払いを受け付けました</h1>
        <p className="text-sm font-normal leading-relaxed text-zinc-500">
          ライセンスキーとご案内メールの送信を進めています。届かない場合は迷惑メールフォルダもあわせてご確認ください。
        </p>
        {sessionId ? (
          <p className="text-xs font-mono text-zinc-600">
            セッションID: <span className="text-zinc-500">{sessionId}</span>
          </p>
        ) : null}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-6 text-sm font-semibold text-zinc-100 transition hover:border-[#06b6d4]/50 hover:text-white"
          >
            LPへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
