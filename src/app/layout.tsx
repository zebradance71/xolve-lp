import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SupabaseAuthFragmentRedirect } from "@/components/auth/SupabaseAuthFragmentRedirect";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xolve-lp.vercel.app"),
  title: "xolve | 買い切りライセンス",
  description: "xolve 販促LP",
  openGraph: {
    type: "website",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full min-w-0 overflow-x-hidden flex flex-col bg-[#000B18] text-zinc-100">
        <SupabaseAuthFragmentRedirect />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
