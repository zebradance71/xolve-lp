import { BarChart3, ClipboardList, FlaskConical, Shield, Zap } from "lucide-react";
import { LpSectionEyebrow } from "@/components/landing/LpSectionEyebrow";

const cards = [
  {
    kind: "shield-zap" as const,
    title: "ランダムな間隔",
    body: "正規分布ジッターなどで規則性を下げ、人間らしい間隔に近づけます。",
  },
  {
    kind: "icon" as const,
    icon: BarChart3,
    title: "1日の上限",
    body: "freezeGuard で日次アクションを抑制。暴走しがちな設定もシステム側で抑えます。",
  },
  {
    kind: "icon" as const,
    icon: FlaskConical,
    title: "シミュレーション",
    body: "本番前に挙動を確認。API消費を抑えながら不安を先に潰せます。",
  },
  {
    kind: "icon" as const,
    icon: ClipboardList,
    title: "ログ可視化",
    body: "実行履歴を残し、いつ何が起きたかを後から追いやすくします。",
  },
] as const;

const cardClass =
  "flex flex-col rounded-2xl border border-white/[0.06] bg-[#061525]/90 px-5 py-8 md:px-6 md:py-9";

function ShieldZapGlyph() {
  return (
    <span className="relative inline-flex h-6 w-6 shrink-0" aria-hidden>
      <Shield className="absolute inset-0 h-6 w-6 text-[#00C2D1]" strokeWidth={1.75} />
      <Zap
        className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 fill-[#00C2D1] text-[#00C2D1]"
        strokeWidth={1.25}
      />
    </span>
  );
}

export function LpDefenseSection() {
  return (
    <section id="faq" data-animate="defense" className="space-y-12 scroll-mt-24 md:scroll-mt-28">
      <div className="space-y-5 text-center">
        <LpSectionEyebrow label="SAFETY" />
        <h2 className="text-3xl font-black tracking-tight text-zinc-50 md:text-4xl md:leading-tight">
          その自動化は、安全か。
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          アカウント凍結リスクを抑える設計を最優先に、間隔・上限・検証・ログを一体で支えます。
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className={cardClass}>
            {c.kind === "shield-zap" ? (
              <ShieldZapGlyph />
            ) : (
              <c.icon className="h-6 w-6 text-[#00C2D1]" strokeWidth={1.75} aria-hidden />
            )}
            <h3 className="mt-6 text-base font-semibold text-zinc-100">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
