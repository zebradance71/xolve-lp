import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";

const trustItems = ["凍結リスクに配慮", "シミュレーションで安心", "ローカルで安全管理"] as const;

export function LpHeroSection() {
  return (
    <section data-animate="hero" className="pt-2 md:pt-6">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
        <div className="min-w-0 space-y-7 text-left md:space-y-8">
          <h1 className="font-black tracking-tight text-white">
            <span className="block text-4xl leading-[1.08] sm:text-5xl md:text-6xl lg:text-[2.85rem] lg:leading-[1.06] xl:text-6xl">
              <span className="block">X運用、</span>
              <span className="block">放置で回る。</span>
            </span>
            <span className="mt-3 block text-lg font-semibold text-[#00C2D1] sm:text-xl md:text-2xl">
              毎日の投稿作業、もうやめませんか？
            </span>
          </h1>

          <p className="inline-flex max-w-full rounded-full border border-white/15 bg-[#061525]/90 px-4 py-2 text-xs font-medium text-zinc-200 backdrop-blur-sm sm:text-sm">
            複数アカウント運用・副業・運用代行に
          </p>

          <p className="max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
            投稿の作成・予約、スケジュール配信、AIによる下書きやリライトまで。xolve
            が面倒な定型作業をまとめて肩代わりし、あなたは中身の判断に集中できます。
          </p>

          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {trustItems.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                <Check className="size-4 shrink-0 text-[#00C2D1]" strokeWidth={2.5} aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div>
            <a
              href="#purchase"
              className="inline-flex h-14 w-full max-w-md items-center justify-center gap-2 rounded-xl bg-[#00C2D1] px-8 text-base font-bold text-[#000B18] shadow-[0_0_36px_rgba(0,194,209,0.35)] transition hover:bg-[#3fe8f5] sm:w-auto"
            >
              今すぐ自動化する
              <ChevronRight className="size-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-90 blur-2xl md:-inset-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(0, 194, 209, 0.22) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#061525]/80 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_1px_rgba(0,194,209,0.25)_inset] lg:rounded-3xl lg:p-2.5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#0a1628] lg:aspect-[16/10] lg:rounded-2xl">
              <Image
                src="/images/lp-hero-white-v2.png"
                alt="xolve ダッシュボードのモックアップ"
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
