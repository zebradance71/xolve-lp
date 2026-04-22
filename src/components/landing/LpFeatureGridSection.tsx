import {
  Activity,
  BrainCircuit,
  CalendarClock,
  FileSpreadsheet,
  Shield,
  Workflow,
} from "lucide-react";

export function LpFeatureGridSection() {
  return (
    <section data-animate="feature-grid" className="space-y-12">
      <div className="space-y-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Core narrative</p>
        <h2 className="text-3xl font-black leading-[1.15] tracking-tight text-zinc-100 md:text-5xl md:leading-[1.12]">
          凍結を、過去にする。
          <br />
          「正規分布ブレ」が生む、揺るぎない自動化。
        </h2>
        <p className="mx-auto max-w-2xl text-sm font-normal leading-relaxed text-zinc-500 md:text-base">
          TIPSで語っている3つの軸を、LPの主役に据えました。派手な演出より、余白と字の太さだけで読ませます。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col border border-zinc-800 bg-black px-8 py-10 md:min-h-[280px] md:px-10 md:py-12">
          <Shield className="h-5 w-5 text-[#06b6d4]" aria-hidden />
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">freezeGuard</h3>
          <p className="mt-4 text-sm font-normal leading-relaxed text-zinc-500">
            1日のアクション上限をシステムで制御。API規約を無視した暴走を物理的に防ぎ、アカウントを守ります。
          </p>
        </div>
        <div className="flex flex-col border border-zinc-800 bg-black px-8 py-10 md:min-h-[280px] md:px-10 md:py-12">
          <Activity className="h-5 w-5 text-[#06b6d4]" aria-hidden />
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">正規分布ブレ</h3>
          <p className="mt-4 text-sm font-normal leading-relaxed text-zinc-500">
            1〜30秒の微細な揺らぎを統計的に付与。規則性のない「人間の間」に近づけ、不自然な同時投稿を避けます。
          </p>
        </div>
        <div className="flex flex-col border border-zinc-800 bg-black px-8 py-10 md:min-h-[280px] md:px-10 md:py-12">
          <CalendarClock className="h-5 w-5 text-[#06b6d4]" aria-hidden />
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">導入後の24時間</h3>
          <p className="mt-4 text-sm font-normal leading-relaxed text-zinc-500">
            週末の仕込みから平日夜の短い確認まで、運用リズムをページ下のタイムラインとして一枚に整理しました。
          </p>
        </div>
      </div>

      <div className="grid border border-zinc-800 bg-black md:grid-cols-3">
        <div className="space-y-3 p-6 md:border-r md:border-zinc-800 md:p-8">
          <FileSpreadsheet className="h-5 w-5 text-[#06b6d4]" />
          <p className="text-sm font-semibold text-zinc-200">一撃予約</p>
          <p className="text-xs font-normal leading-relaxed text-zinc-500">
            CSVで動画・画像パスを一括取り込み。スレッド予約まで数秒で完了。
          </p>
        </div>
        <div className="space-y-3 border-t border-zinc-800 p-6 md:border-r md:border-t-0 md:border-zinc-800 md:p-8">
          <BrainCircuit className="h-5 w-5 text-[#06b6d4]" />
          <p className="text-sm font-semibold text-zinc-200">リスト起点のAI</p>
          <p className="text-xs font-normal leading-relaxed text-zinc-500">
            厳選リストから抽出し、キューで精査。4o / 4o-miniを用途別に切替。
          </p>
        </div>
        <div className="space-y-3 border-t border-zinc-800 p-6 md:border-t-0 md:p-8">
          <Workflow className="h-5 w-5 text-[#06b6d4]" />
          <p className="text-sm font-semibold text-zinc-200">二段構え配信</p>
          <p className="text-xs font-normal leading-relaxed text-zinc-500">
            ストックから確認、またはフルオートへ。自動化と判断の両立。
          </p>
        </div>
      </div>
    </section>
  );
}
