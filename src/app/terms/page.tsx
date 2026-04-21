import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 md:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">利用規約</h1>
        <p className="text-sm text-slate-300">
          xolveの利用条件をここに掲載します。詳細文言は `docs/terms.md` をベースに反映してください。
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
