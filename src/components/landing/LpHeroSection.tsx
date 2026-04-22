import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type LpHeroSectionProps = {
  onScrollToPurchase: () => void;
};

export function LpHeroSection({ onScrollToPurchase }: LpHeroSectionProps) {
  return (
    <section data-animate="hero" className="space-y-8 text-center">
      <div className="flex justify-end">
        <Link
          href="/mypage"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-700 px-5 text-sm font-semibold text-zinc-200 transition hover:border-[#06b6d4]/60 hover:text-white"
        >
          マイページ
        </Link>
      </div>

      <div className="space-y-7">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge className="border-zinc-800 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#06b6d4]">
            freezeGuard
          </Badge>
          <Badge className="border-zinc-800 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
            正規分布ブレ
          </Badge>
          <Badge className="border-zinc-800 bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
            導入後の24時間
          </Badge>
        </div>

        <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
          守る。揺らぐ。週末に仕込む。
          <br className="hidden md:block" />
          <span className="text-zinc-100">xolveが整える、あなたの24時間。</span>
        </h1>

        <p className="mx-auto max-w-3xl text-base font-normal leading-relaxed text-zinc-500 md:text-lg md:leading-relaxed">
          <span className="font-semibold text-zinc-300">freezeGuard</span>
          で暴走を抑え、
          <span className="font-semibold text-zinc-300"> 正規分布ブレ</span>
          で人間らしい間隔を再現。
          土日の仕込みから平日夜の5分チェックまで、
          <span className="font-semibold text-zinc-300">導入後の24時間タイムライン</span>
          として設計されています。
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
          <img
            src="/images/app-ui.png"
            alt="xolve アプリUI"
            width={1365}
            height={768}
            className="h-auto w-full rounded-xl"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={onScrollToPurchase}
          className="h-12 rounded-xl bg-cyan-500 px-8 text-sm font-bold text-black shadow-[0_0_25px_rgba(6,182,212,0.55)] transition hover:bg-cyan-400"
        >
          今すぐ購入する
        </Button>
      </div>
    </section>
  );
}
