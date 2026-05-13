import type { Metadata } from "next";

const SITE = new URL("https://xolve-lp.vercel.app");

/**
 * LP の OGP / Twitter Card。pathname は og:url 用（X が URL 単位でキャッシュするため /share など別パスでも再利用）。
 */
export function lpMetadata(pathname: string): Metadata {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonical = new URL(path, SITE).toString();

  return {
    metadataBase: SITE,
    title: "xolve | 買い切りライセンス",
    description: "xolve 販促LP",
    openGraph: {
      type: "website",
      url: canonical,
      title: "XOLVE",
      description: "X運用を、手作業から解放する。",
      images: [
        {
          url: "/og/xolve-og.png?v=3",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "XOLVE",
      description: "X運用を、手作業から解放する。",
      images: ["/og/xolve-og.png?v=3"],
    },
  };
}
