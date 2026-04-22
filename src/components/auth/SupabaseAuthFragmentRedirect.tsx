"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Supabase の Site URL がルート（例: http://localhost:3000）だと、
 * メールのリカバリー／確認リンクのトークンが `/` の hash に付くことがある。
 * その場合 `/auth` 側の `detectSessionInUrl` と recovery UI が動かないので、
 * `/auth` へ hash / query をそのまま引き継ぐ。
 */
export function SupabaseAuthFragmentRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/auth")) return;

    const { hash, search } = window.location;
    const hasHash = Boolean(hash && hash.length > 1);

    const isRecoveryInHash =
      hash.includes("type=recovery") ||
      hash.includes("type%3Drecovery") ||
      hash.includes("&type=recovery");

    const hasImplicitAccessToken = hash.includes("access_token=");

    const searchParams = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const hasPkceCode = Boolean(searchParams.get("code"));

    const shouldForwardToAuth =
      isRecoveryInHash ||
      (hasHash && hasImplicitAccessToken) ||
      (pathname === "/" && hasPkceCode);

    if (!hasHash && !hasPkceCode) return;
    if (!shouldForwardToAuth) return;

    window.location.replace(`/auth${search}${hash}`);
  }, [pathname]);

  return null;
}
