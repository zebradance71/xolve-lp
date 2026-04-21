export function LpTipsSection() {
  return (
    <section data-animate="tips" className="space-y-16 pb-4">
      <div className="space-y-5 text-center md:text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">導入後の未来</p>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
          xolveが変える、あなたの24時間。
        </h2>
        <p className="mx-auto max-w-xl text-sm font-normal leading-relaxed text-zinc-500 md:mx-0 md:text-base">
          週末の1時間で来週1週間分を仕込み。平日は短い確認だけ。余白を活かしたタイムラインで、リズムだけを置きます。
        </p>
      </div>

      <div className="mx-auto max-w-xl md:mx-0 md:max-w-2xl">
        <ol className="relative m-0 list-none p-0">
          <li className="relative pb-16 pl-10 md:pb-20 md:pl-14">
            <span
              className="absolute left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-[#06b6d4] bg-[#000000] md:left-[7px]"
              aria-hidden
            />
            <span className="absolute left-[8px] top-5 bottom-0 w-px bg-zinc-800 md:left-3" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#06b6d4]">土曜日</p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">仕込み</p>
            <p className="mt-4 text-base font-normal leading-relaxed text-zinc-500">
              スプレッドシートで来週の動画投稿用CSVを作成。xolveへインポートし、正規分布ジッター付きで予約を完了。
            </p>
          </li>
          <li className="relative pb-16 pl-10 md:pb-20 md:pl-14">
            <span
              className="absolute left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-[#06b6d4] bg-[#000000] md:left-[7px]"
              aria-hidden
            />
            <span className="absolute left-[8px] top-5 bottom-0 w-px bg-zinc-800 md:left-3" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#06b6d4]">日曜日</p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">検証</p>
            <p className="mt-4 text-base font-normal leading-relaxed text-zinc-500">
              自動運用の設定を整え、モックモードで挙動を確認。API消費ゼロで、不安を先に落とします。
            </p>
          </li>
          <li className="relative pl-10 md:pl-14">
            <span
              className="absolute left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-[#06b6d4] bg-[#000000] md:left-[7px]"
              aria-hidden
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#06b6d4]">平日</p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">5分の確認</p>
            <p className="mt-4 text-base font-normal leading-relaxed text-zinc-500">
              仕事のあとにアプリを開き、溜まった検索キューの下書きを確認して送信するだけ。freezeGuardが上限を見張り、出しすぎのストレスから解放します。
            </p>
          </li>
        </ol>
        <p className="mt-12 border-t border-zinc-900 pt-8 text-xs font-normal leading-relaxed text-zinc-600">
          ※ CSV作成の負荷を下げる「xolve専用・高機能Excelテンプレート」を標準同梱。
        </p>
      </div>
    </section>
  );
}
