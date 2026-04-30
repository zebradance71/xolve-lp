import { Bot, CalendarClock, Search, Users, Zap } from "lucide-react";
import { LpSectionEyebrow } from "@/components/landing/LpSectionEyebrow";

const items = [
  {
    icon: CalendarClock,
    title: "投稿・予約",
    body: "単発・連投・スレッドまで。日時指定とランダムバッファで自然な配信リズムに。",
  },
  {
    icon: Zap,
    title: "自動投稿",
    body: "仕込んだキューを時間どおりに実行。PC起動中に確実に処理が進みます。",
  },
  {
    icon: Bot,
    title: "AIリライト",
    body: "下書きの整形や一括生成。用途に応じてモデルを切り替え、品質とコストを両立。",
  },
  {
    icon: Search,
    title: "検索・キュー",
    body: "キーワードやリストから候補を集め、キューで精査してから一斉送信。",
  },
  {
    icon: Users,
    title: "マルチアカウント",
    body: "複数Xアカウントを切り替えながら、ログと状態を一画面で把握。",
  },
] as const;

const cardClass =
  "flex flex-col rounded-2xl border border-white/[0.06] bg-[#061525]/90 px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:px-6 md:py-9";

export function LpFeatureGridSection() {
  return (
    <section id="features" data-animate="feature-grid" className="space-y-12 scroll-mt-24 md:scroll-mt-28">
      <div className="space-y-5 text-center">
        <LpSectionEyebrow label="FEATURES" />
        <h2 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl md:leading-tight">
          必要な機能を、シンプルに。
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          運用の現場で本当に使う機能だけを、迷わない導線にまとめました。
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className={cardClass}>
            <Icon className="h-6 w-6 text-[#00C2D1]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-6 text-base font-semibold tracking-tight text-zinc-100">{title}</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
