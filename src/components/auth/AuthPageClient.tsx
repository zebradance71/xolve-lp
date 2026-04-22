"use client";

import { AuthPageShell } from "./AuthPageShell";
import { useAuthPageClient, type AuthPageClientInput } from "./useAuthPageClient";

export type { AuthPageClientInput };

export function AuthPageClient(props: AuthPageClientInput) {
  const state = useAuthPageClient(props);
  return <AuthPageShell {...state} />;
}
