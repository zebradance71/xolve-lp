import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 md:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">プライバシーポリシー</h1>
        <p className="text-sm text-slate-300">
          取得情報、利用目的、安全管理については `docs/privacy-policy.md` を正本として反映してください。
        </p>
        <Link href="/" className="text-sm underline underline-offset-4">
          LPへ戻る
        </Link>
      </div>
    </main>
  );
}
