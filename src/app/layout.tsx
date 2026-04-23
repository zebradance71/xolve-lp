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
  title: "xolve | 買い切りライセンス",
  description: "xolve 販促LP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full min-w-0 overflow-x-hidden flex flex-col bg-[#000000] text-zinc-100">
        <SupabaseAuthFragmentRedirect />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
