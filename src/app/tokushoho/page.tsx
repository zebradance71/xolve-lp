import Link from "next/link";

export default function TokushohoPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 md:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">特定商取引法に基づく表記</h1>
        <p className="text-sm text-slate-300">
          販売事業者情報、連絡先、価格、支払時期、引渡時期をここに掲載します。
        </p>
        <p className="text-sm text-slate-300">
          本商品はデジタルコンテンツの性質上、購入後の返品・返金は原則としてお受けできません。
        </p>
        <Link href="/" className="text-sm underline underline-offset-4">
          LPへ戻る
        </Link>
      </div>
    </main>
  );
}
