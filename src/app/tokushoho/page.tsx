import Link from "next/link";
import { LpShell } from "@/components/landing/LpShell";

export default function TokushohoPage() {
  return (
    <LpShell className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-16">
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-white/[0.06] bg-[#061525]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-10">
        <h1 className="text-2xl font-bold text-white md:text-3xl">特定商取引法に基づく表記</h1>
        <div className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <p>
            <span className="font-semibold text-zinc-100">販売業者:</span> モリモト ナオヤ
          </p>
          <p>
            <span className="font-semibold text-zinc-100">運営責任者:</span> モリモト ナオヤ
          </p>
          <p>
            <span className="font-semibold text-zinc-100">所在地:</span> ※請求がある場合には、詳細を遅滞なく開示いたします。
          </p>
          <p>
            <span className="font-semibold text-zinc-100">電話番号:</span> ※請求がある場合には、詳細を遅滞なく開示いたします。
          </p>
          <p>
            <span className="font-semibold text-zinc-100">メールアドレス:</span> xolve.support@gmail.com
          </p>
          <p>
            <span className="font-semibold text-zinc-100">役務の内容:</span> X運用デスクトップアプリ「xolve」のライセンス提供（Windows 10 / 11 対応）
          </p>
          <p>
            <span className="font-semibold text-zinc-100">販売価格:</span> 販売ページに表示の税込価格（現行: PREMIUM 買い切りライセンス 49,800円）
          </p>
          <p>
            <span className="font-semibold text-zinc-100">商品代金以外の必要料金:</span> インターネット接続に関する通信費等
          </p>
          <p>
            <span className="font-semibold text-zinc-100">代金の支払方法:</span> Stripe によるクレジットカード決済
          </p>
          <p>
            <span className="font-semibold text-zinc-100">代金の支払時期:</span> 購入手続き完了時に課金
          </p>
          <p>
            <span className="font-semibold text-zinc-100">商品の引渡時期:</span>{" "}
            決済完了後、所定の会員登録・ログインのうえマイページへアクセスいただいた場合に、ライセンスキーおよびアプリのダウンロード用リンクを提供します。利用条件等の掲示は当サイト内の所定ページにて行います。
          </p>
        </div>
        <div className="space-y-2 rounded-xl border border-white/[0.06] bg-[#000B18]/70 p-4 text-sm leading-relaxed text-zinc-400">
          <p className="font-semibold text-zinc-100">返品・キャンセル規約</p>
          <p className="font-semibold text-zinc-100">＜顧客都合の返品・交換＞</p>
          <p>デジタルコンテンツの性質上、決済完了後の返金・キャンセルはお受けしておりません。</p>
          <p>※買い切りライセンス販売のため、月額サブスクリプションの定期請求はありません。</p>
          <p className="pt-2 font-semibold text-zinc-100">＜不良品・不具合等の対応＞</p>
          <p>サービスが正常に利用できない等の不具合がある場合は、上記メールアドレスよりご連絡ください。内容を確認の上、適切に対応いたします。</p>
        </div>
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
