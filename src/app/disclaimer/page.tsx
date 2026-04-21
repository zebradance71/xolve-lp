import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 md:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">免責事項</h1>
        <p className="text-sm text-slate-300">
          API仕様変更、外部サービス停止、利用環境に起因する不具合については保証対象外です。
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
