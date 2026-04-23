import { CalendarClock, FlaskConical, Shield, ShieldCheck, Shuffle } from "lucide-react";

export function LpDefenseSection() {
  return (
    <section data-animate="defense" className="space-y-10">
      <div className="space-y-4 text-center md:space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">凍結回避</p>
        <h2 className="mx-auto w-full max-w-full px-3 text-center font-black leading-[1.12] tracking-tight text-zinc-50 [font-size:clamp(1.35rem,5.2vw+0.75rem,4.25rem)] md:px-4 md:leading-[1.08] lg:whitespace-nowrap">
          その自動化は、安全か。
        </h2>
        <p className="mx-auto max-w-2xl text-sm font-normal leading-relaxed text-zinc-500 md:text-base md:leading-relaxed">
          独自の凍結回避ロジックを搭載。xolveで、揺るぎない運用を。
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-10 lg:p-12">
        <div className="mb-10 border-b border-zinc-800/80 pb-10 md:mb-12 md:pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Trust layer</p>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-snug text-zinc-100 md:text-xl md:leading-snug">
            ツール側の不備で資産を失わせない。freezeGuard と揺らぎ設計で、規約の範囲内に運用を閉じ込めます。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-800/90 bg-black px-6 py-8 md:px-8 md:py-10">
            <CalendarClock className="h-5 w-5 text-[#06b6d4]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-6 text-base font-semibold text-zinc-100">自動シフト衝突防止</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-500">
              予約の前後6分に他予定がないか自動確認。重なれば15分後へシフトし再検証。不自然な同時投稿を避けます。
            </p>
          </div>
          <div className="border border-zinc-800/90 bg-black px-6 py-8 md:px-8 md:py-10">
            <Shuffle className="h-5 w-5 text-[#06b6d4]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-6 text-base font-semibold text-zinc-100">二段構えの人間らしい揺らぎ</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-500">
              ランダムバッファ（1〜10分）に加え、正規分布ブレ（1〜30秒）で微細な間隔を付与。規則性を落とし、人間の間に寄せます。
            </p>
          </div>
          <div className="border border-zinc-800/90 bg-black px-6 py-8 md:px-8 md:py-10">
            <FlaskConical className="h-5 w-5 text-[#06b6d4]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-6 text-base font-semibold text-zinc-100">API消費ゼロのシミュレーション</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-500">
              本番前に内部ロジックだけで挙動を検証。API代の無駄打ちを抑え、失敗の芽を先に摘みます。
            </p>
          </div>
          <div className="border border-zinc-800/90 bg-black px-6 py-8 md:px-8 md:py-10">
            <Shield className="h-5 w-5 text-[#06b6d4]" strokeWidth={1.75} aria-hidden />
            <h3 className="mt-6 text-base font-semibold text-zinc-100">freezeGuard</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-500">
              1日のアクション上限をシステムで制御。暴走を物理的に防ぎ、規約を踏み越えない運用を後押しします。
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 border border-zinc-800/80 bg-zinc-950/80 px-5 py-4 md:mt-10 md:px-6 md:py-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#06b6d4]" strokeWidth={1.75} aria-hidden />
          <p className="text-sm font-normal leading-relaxed text-zinc-400">
            衝突回避・揺らぎ・検証・上限ガードを束ね、「夜ぐっすり眠れる」ための安心を、見た目の重さでも伝えます。
          </p>
        </div>
      </div>
    </section>
  );
}
