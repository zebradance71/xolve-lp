import { lpMetadata } from "@/lib/lpSocialMetadata";

/** 人間は middleware で `/` へ。ここは主に SNS クローラ向けの最小ボディ。 */
export const metadata = lpMetadata("/share", { noindex: true });

export default function ShareBotPage() {
  return (
    <main className="sr-only" aria-hidden>
      xolve
    </main>
  );
}
