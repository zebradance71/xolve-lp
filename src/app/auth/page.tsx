import { AuthPageClient } from "@/components/auth/AuthPageClient";

type Props = {
  searchParams: Promise<{ next?: string; type?: string; mode?: string; email?: string }>;
};

export default async function AuthPage({ searchParams }: Props) {
  const params = await searchParams;
  const nextPath = params.next || "/mypage";
  const initialMode = params.mode === "signup" ? "signup" : "login";
  const initialEmail = typeof params.email === "string" ? params.email.trim() : "";
  return (
    <AuthPageClient nextPath={nextPath} initialMode={initialMode} initialEmail={initialEmail} />
  );
}
