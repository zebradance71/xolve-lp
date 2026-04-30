import type { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useCallback, useEffect, useState } from "react";
import {
  EMAIL_RE,
  mergeEmailIfEmpty,
  readEmailFromAuthCallbackHash,
  readStripeSessionId,
  readUrlEmail,
} from "@/components/auth/authPageClientEmailSources";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export type AuthPageClientInput = {
  nextPath?: string;
  initialMode?: "signup" | "login";
  initialEmail?: string;
};

export function useAuthPageClient({
  nextPath = "/mypage",
  initialMode = "signup",
  initialEmail = "",
}: AuthPageClientInput) {
  const router = useRouter();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const isLoginMode = initialMode === "login";

  const [email, setEmail] = useState(() => initialEmail.trim());
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordResetMailSent, setPasswordResetMailSent] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isSignUpCompleted = !isLoginMode && notice !== null;
  const isLoginPostReset = isLoginMode && passwordResetMailSent;

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setSupabase(createSupabaseBrowserClient());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Supabase の初期化に失敗しました。");
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    queueMicrotask(() => {
      const hash = window.location.hash;
      if (hash.includes("type=recovery") || hash.includes("type%3Drecovery")) {
        setRecoveryMode(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryMode(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  /** メール確認後など、URL 処理済みセッションからメールを補完（ログイン画面の自動入力） */
  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user?.email?.trim() ?? "";
      if (!u || !EMAIL_RE.test(u)) return;
      startTransition(() => {
        setEmail((prev) => mergeEmailIfEmpty(prev, u));
      });
    });
  }, [supabase]);

  /** RSC の searchParams が空で届くケースの補正（同期 setState を避けるため transition へ） */
  useEffect(() => {
    const trimmed = initialEmail.trim();
    if (!trimmed) return;
    startTransition(() => {
      setEmail((prev) => mergeEmailIfEmpty(prev, trimmed));
    });
  }, [initialEmail]);

  /** URL の email / ハッシュ内 access_token / Stripe session からの補完 */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hashEmail = readEmailFromAuthCallbackHash();
    if (hashEmail) {
      startTransition(() => {
        setEmail((prev) => mergeEmailIfEmpty(prev, hashEmail));
      });
    }

    const urlEmail = readUrlEmail();
    if (urlEmail) {
      startTransition(() => {
        setEmail((prev) => mergeEmailIfEmpty(prev, urlEmail));
      });
    }

    const sid = readStripeSessionId();
    if (!sid) return;

    let cancelled = false;
    const delays = [0, 1500, 3200];

    const run = async () => {
      for (const d of delays) {
        if (cancelled) return;
        if (d > 0) await new Promise((r) => setTimeout(r, d));
        if (cancelled) return;
        try {
          const res = await fetch(`/api/purchaser-email?session_id=${encodeURIComponent(sid)}`);
          const data = (await res.json()) as { email?: string | null };
          const resolved = data.email?.trim();
          if (resolved) {
            startTransition(() => {
              setEmail((prev) => mergeEmailIfEmpty(prev, resolved));
            });
            return;
          }
        } catch {
          /* 次のリトライへ */
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSignUp = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!supabase) return;
      setLoading(true);
      setNotice(null);
      setError(null);
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(nextPath)}`,
          },
        });
        if (signUpError) throw signUpError;
        if (!data.user) {
          setError(
            "このメールアドレスでは新規登録を完了できませんでした。すでに登録済みの可能性があります。下のフォームからログインするか、パスワード再設定を試してください。"
          );
          return;
        }
        setNotice(
          "登録を受け付けました。Supabase Auth から届く確認メールのリンクを開いて認証してください。認証後にマイページへ進めます。"
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "サインアップに失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [supabase, email, password, nextPath]
  );

  const onLogin = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setNotice(null);
    setError(null);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (loginError) throw loginError;
      router.replace(nextPath);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "ログインに失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [supabase, email, password, nextPath, router]);

  const onResetPassword = useCallback(async () => {
    if (!supabase) return;
    if (!email.trim()) {
      setError("先にメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    setNotice(null);
    setError(null);
    try {
      const origin = window.location.origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/auth?next=${encodeURIComponent(nextPath)}&recovery=1`,
      });
      if (resetError) throw resetError;
      setPasswordResetMailSent(true);
      setNotice(
        "パスワード再設定メールを送信しました。受信メールのリンクを開き、新しいパスワードを設定してください。設定後はこのページに戻り、下の「ログインに戻る」からログインできます。"
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "パスワード再設定メール送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [supabase, email, nextPath]);

  const onUpdatePasswordFromRecovery = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!supabase) return;
      setLoading(true);
      setNotice(null);
      setError(null);
      try {
        if (newPassword.length < 8) {
          throw new Error("パスワードは8文字以上にしてください。");
        }
        if (newPassword !== confirmPassword) {
          throw new Error("パスワードが一致しません。");
        }
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
        if (updateError) throw updateError;
        if (typeof window !== "undefined" && window.location.hash) {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        }
        setRecoveryMode(false);
        setNewPassword("");
        setConfirmPassword("");
        router.replace(nextPath);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "パスワードの更新に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [supabase, newPassword, confirmPassword, nextPath, router]
  );

  const clearPostResetState = useCallback(() => {
    setPasswordResetMailSent(false);
    setNotice(null);
    setError(null);
  }, []);

  return {
    supabase,
    isLoginMode,
    initialEmail,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    notice,
    error,
    recoveryMode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isSignUpCompleted,
    isLoginPostReset,
    onSignUp,
    onLogin,
    onResetPassword,
    onUpdatePasswordFromRecovery,
    clearPostResetState,
  };
}

export type AuthPageViewModel = ReturnType<typeof useAuthPageClient>;
