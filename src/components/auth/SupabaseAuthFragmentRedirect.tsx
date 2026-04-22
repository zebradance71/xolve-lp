"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getSupabaseAuthFragmentRedirectTarget } from "@/lib/supabaseAuthFragmentRedirect";

/**
 * Supabase の Site URL がルートだと、メールリンクのトークンが `/` の hash に付くことがある。
 * `/auth` へ hash / query を引き継ぎ、`detectSessionInUrl` と recovery UI を有効にする。
 */
export function SupabaseAuthFragmentRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = getSupabaseAuthFragmentRedirectTarget(pathname, window.location.hash, window.location.search);
    if (target) window.location.replace(target);
  }, [pathname]);

  return null;
}
