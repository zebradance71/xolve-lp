export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readUrlEmail(): string {
  if (typeof window === "undefined") return "";
  const q = new URLSearchParams(window.location.search);
  const urlEmail = q.get("email")?.trim() ?? "";
  return urlEmail && EMAIL_RE.test(urlEmail) ? urlEmail : "";
}

export function readStripeSessionId(): string {
  if (typeof window === "undefined") return "";
  const sid = new URLSearchParams(window.location.search).get("session_id")?.trim() ?? "";
  if (sid.startsWith("cs_live_") || sid.startsWith("cs_test_")) return sid;
  return "";
}

/** Supabase メール確認・PKCE コールバックの `#access_token=...` から JWT の email を取り出す */
export function readEmailFromAuthCallbackHash(): string {
  if (typeof window === "undefined") return "";
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return "";
  const params = new URLSearchParams(raw);
  const token = params.get("access_token");
  if (!token) return "";
  try {
    const payloadB64 = token.split(".")[1];
    if (!payloadB64) return "";
    const b64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    const json = JSON.parse(atob(b64 + pad)) as { email?: string };
    const email = json.email?.trim() ?? "";
    return email && EMAIL_RE.test(email) ? email : "";
  } catch {
    return "";
  }
}

export function mergeEmailIfEmpty(prev: string, incoming: string): string {
  return prev.trim() ? prev : incoming;
}
