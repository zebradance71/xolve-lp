import Link from "next/link";
import { LpShell } from "@/components/landing/LpShell";

export default function LegalPage() {
  return (
    <LpShell className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-white/[0.06] bg-[#061525]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-10">
        <h1 className="text-2xl font-bold text-white md:text-3xl">利用規約・免責事項</h1>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">1. 動作環境・仕様</h2>
          <p>本サービスは Windows 10 / 11 専用です。Mac、Linux、モバイル端末等では動作しません。</p>
          <p>インターネット接続が必須です。また、利用にあたり X API および OpenAI API の独自取得・設定が別途必要となります。</p>
          <p>データは利用者のローカルPC（SQLite）に保存されます。サーバー側でのデータバックアップ等は行いません。</p>
          <p>特定のセキュリティソフトやPCの管理者権限の有無に起因する動作不良については、サポートの対象外となります。</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">2. 凍結リスクおよびコンテンツに関する免責</h2>
          <p>凍結リスクを最小化する設計ですが、アカウントの安全を100%保証するものではありません。利用により生じた損害について、開発者は一切の責任を負いません。</p>
          <p>本ツールを通じて投稿・配信される内容に関する一切の責任は利用者に帰属します。</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">3. API仕様変更およびサービスの継続性</h2>
          <p>APIの仕様変更やサービス終了により、本ツールの一部または全部が利用不能になる可能性があります。</p>
          <p>可能な限り修正パッチの提供に努めますが、技術的に対応不能な場合や開発継続が困難な場合は、サポートの対象外とさせていただきます。</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">4. API利用料および消費に関する免責</h2>
          <p>本ツールの利用に伴う各APIの利用料金は、すべて利用者の自己負担となります。設定ミス等により発生した一切の費用について、開発者は補償致しません。</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">5. 知的財産権および禁止事項</h2>
          <p>本アプリの知的財産権は開発者に帰属します。</p>
          <p>解析（リバースエンジニアリング）、改ざん、二次配布、転売、および複数人でのライセンス共有を固く禁じます。</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <h2 className="text-base font-semibold text-zinc-100">6. サポート範囲および返金</h2>
          <p>個別のPC環境に起因する問題、API申請、および運用のコンサルティングはサポート対象外です。</p>
          <p>デジタルコンテンツの性質上、購入後の返品・返金は原則としてお受けできません。</p>
        </section>

        <Link
          href="/"
          className="inline-block text-sm font-medium text-[#00C2D1] underline underline-offset-4 transition hover:text-[#3fe8f5]"
        >
          HOMEへ戻る
        </Link>
      </article>
    </LpShell>
  );
}
