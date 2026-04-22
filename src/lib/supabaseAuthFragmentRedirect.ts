/**
 * Supabase メールリンク由来の hash / query を `/auth` に渡すべきか判定する。
 * （Site URL がルートのとき、トークンが `/` に付く問題の回避）
 */
export function getSupabaseAuthFragmentRedirectTarget(
  pathname: string | null | undefined,
  hash: string,
  search: string
): string | null {
  if (pathname?.startsWith("/auth")) return null;

  const hasHash = Boolean(hash && hash.length > 1);

  const isRecoveryInHash =
    hash.includes("type=recovery") ||
    hash.includes("type%3Drecovery") ||
    hash.includes("&type=recovery");

  const hasImplicitAccessToken = hash.includes("access_token=");

  const searchParams = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const hasPkceCode = Boolean(searchParams.get("code"));

  const shouldForward =
    isRecoveryInHash || (hasHash && hasImplicitAccessToken) || (pathname === "/" && hasPkceCode);

  if (!hasHash && !hasPkceCode) return null;
  if (!shouldForward) return null;

  return `/auth${search}${hash}`;
}
