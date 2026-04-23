import { AuthPageClient } from "@/components/auth/AuthPageClient";
import { resolveCheckoutPurchaserEmail } from "@/lib/resolveCheckoutPurchaserEmail";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ next?: string; type?: string; mode?: string; email?: string; session_id?: string }>;
};

export default async function AuthPage({ searchParams }: Props) {
  const params = await searchParams;
  const nextPath = params.next || "/mypage";
  const initialMode = params.mode === "signup" ? "signup" : "login";
  let initialEmail = typeof params.email === "string" ? params.email.trim() : "";
  const sessionId = typeof params.session_id === "string" ? params.session_id.trim() : "";
  if (!initialEmail && sessionId) {
    initialEmail = (await resolveCheckoutPurchaserEmail(sessionId)) ?? "";
  }
  return (
    <AuthPageClient nextPath={nextPath} initialMode={initialMode} initialEmail={initialEmail} />
  );
}
