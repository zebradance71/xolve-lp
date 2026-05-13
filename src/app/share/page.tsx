import Link from "next/link";
import { lpMetadata } from "@/lib/lpSocialMetadata";

export const metadata = lpMetadata("/share");

export default function ShareLandingPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="text-2xl font-black tracking-tight text-white">xolve</h1>
      <p className="text-sm leading-relaxed text-zinc-400">
        共有用URLです。SNSのプレビューが古い場合は、このURLを貼ると更新されやすくなります。
      </p>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-[#00C2D1] px-8 text-sm font-black text-[#000B18] shadow-[0_0_32px_rgba(0,194,209,0.35)] transition hover:bg-[#3fe8f5]"
      >
        サイトへ進む
      </Link>
    </main>
  );
}
