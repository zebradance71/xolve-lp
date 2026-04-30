import Link from "next/link";

const navClass =
  "text-sm font-medium text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2D1]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000B18]";

export function LpTopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#000B18]/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 min-w-0 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight text-white md:text-xl">
          xolve
        </Link>

        <nav className="hidden min-w-0 items-center gap-8 md:flex" aria-label="ページ内ナビゲーション">
          <a href="#features" className={navClass}>
            機能
          </a>
          <a href="#purchase" className={navClass}>
            料金
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/mypage"
            className="hidden text-xs font-semibold text-zinc-400 transition hover:text-zinc-200 sm:inline sm:text-sm"
          >
            マイページ
          </Link>
          <a
            href="#purchase"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#00C2D1] px-3.5 text-xs font-bold text-[#000B18] shadow-[0_0_22px_rgba(0,194,209,0.35)] transition hover:bg-[#3fe8f5] sm:h-10 sm:px-4 sm:text-sm"
          >
            今すぐ自動化する
          </a>
        </div>
      </div>
    </header>
  );
}
