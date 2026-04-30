import { Bot, ChevronDown, ChevronRight, LineChart, UserRound } from "lucide-react";
import { Fragment } from "react";
import { LpSectionEyebrow } from "@/components/landing/LpSectionEyebrow";

const steps = [
  {
    icon: UserRound,
    title: "セットアップ",
    body: "アカウント連携と、使う機能だけをオン。最初はシミュレーションからでもOK。",
  },
  {
    icon: Bot,
    title: "自動運転",
    body: "予約投稿や自動運用を回しつつ、上限と間隔はアプリが見張ります。",
  },
  {
    icon: LineChart,
    title: "たまに確認",
    body: "ログとキューを眺め、必要なときだけ手を入れる。運用の主導権はあなたに。",
  },
] as const;

const stepCardClass =
  "flex w-full min-w-0 max-w-md flex-1 flex-col rounded-2xl border border-white/[0.06] bg-[#061525]/90 px-5 py-7 text-center md:max-w-[280px] md:px-6 md:py-8";

export function LpTipsSection() {
  return (
    <section id="cases" data-animate="tips" className="space-y-12 scroll-mt-24 pb-4 md:scroll-mt-28">
      <div className="space-y-5 text-center">
        <LpSectionEyebrow label="HOW IT WORKS" />
        <h2 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
          使い方は、かんたん3ステップ。
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          難しい設定の羅列ではなく、はじめてでも迷わない流れにしています。
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-2 lg:gap-4">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <Fragment key={title}>
            {i > 0 ? (
              <div
                className="flex h-8 shrink-0 items-center justify-center text-[#00C2D1] md:h-auto md:px-1"
                aria-hidden
              >
                <ChevronDown className="size-6 md:hidden" />
                <ChevronRight className="hidden size-7 md:block" />
              </div>
            ) : null}
            <div className={stepCardClass}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#00C2D1]/35 bg-[#000B18]/80">
                <Icon className="h-6 w-6 text-[#00C2D1]" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#00C2D1]">
                STEP {i + 1}
              </p>
              <p className="mt-2 text-lg font-bold text-zinc-100">{title}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
            </div>
          </Fragment>
        ))}
      </div>

      <p className="border-t border-white/[0.06] pt-8 text-center text-sm leading-relaxed text-zinc-400 md:text-left">
        ※ CSV一括取り込み用の「xolve専用・高機能Excelテンプレート」を標準同梱。
      </p>
    </section>
  );
}
