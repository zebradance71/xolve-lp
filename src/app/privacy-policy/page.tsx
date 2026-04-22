import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#000000] px-4 py-10 text-zinc-100 md:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">プライバシーポリシー</h1>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">1. 個人情報の収集</h2>
          <p>本サービスは、アカウント登録、本人確認、および決済処理のため、利用者のメールアドレスを収集します。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">2. 利用目的</h2>
          <p>収集した情報は、サービスの提供、アップデートや障害等の重要な通知、およびお問い合わせへの対応にのみ利用します。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">3. 第三者提供の禁止</h2>
          <p>法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供することはありません。ただし、決済処理（Stripe）および認証基盤（Supabase）等のサービス提供に必要な外部システムへの提供は除きます。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">4. 情報の管理</h2>
          <p>収集した個人情報は、外部の専門サービスを通じて適切に保護・管理されます。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">5. 保存期間</h2>
          <p>個人情報は、利用目的の達成に必要な期間に限って保持し、不要となった情報は合理的な方法で削除または匿名化します。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">6. 開示・訂正・削除等の請求</h2>
          <p>利用者本人から、保有個人データの開示・訂正・利用停止・削除等の請求があった場合は、法令に基づき合理的な範囲で対応します。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">7. 外部サービス・ログ情報</h2>
          <p>本サービスでは、サービス安定運用および不正対策のため、アクセスログやエラーログ等の技術情報を取得する場合があります。これらには個人を直接特定しない情報が含まれることがあります。</p>
        </section>

        <section className="space-y-2 text-sm text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-100">8. 改定</h2>
          <p>本ポリシーは必要に応じて改定されることがあります。重要な変更がある場合は、サービス上で告知します。</p>
        </section>

        <Link href="/" className="text-sm text-zinc-300 underline underline-offset-4">
          HOMEへ戻る
        </Link>
      </div>
    </main>
  );
}
