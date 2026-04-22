"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

type AuthPageClientProps = {
  nextPath?: string;
  initialMode?: "signup" | "login";
  initialEmail?: string;
};

export function AuthPageClient({
  nextPath = "/mypage",
  initialMode = "signup",
  initialEmail = "",
}: AuthPageClientProps) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const isLoginMode = initialMode === "login";

  const [email, setEmail] = useState(initialEmail);
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
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("type%3Drecovery")) {
      setRecoveryMode(true);
    }
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryMode(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const onSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNotice(null);
    setError(null);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(nextPath)}`,
        },
      });
      if (signUpError) throw signUpError;
      setNotice(
        "登録を受け付けました。Supabase Auth から届く確認メールのリンクを開いて認証してください。認証後にマイページへ進めます。"
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "サインアップに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async () => {
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
  };

  const onResetPassword = async () => {
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
      setNotice("パスワード再設定メールを送信しました。受信メールのリンクを開き、新しいパスワードを設定してください。設定後はこのページに戻り、下の「ログインに戻る」からログインできます。");
    } catch (e) {
      setError(e instanceof Error ? e.message : "パスワード再設定メール送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePasswordFromRecovery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };

  return (
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">Account</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {recoveryMode
            ? "新しいパスワードを設定"
            : isLoginPostReset
              ? "再設定メールを送信しました"
              : isLoginMode
                ? "メール認証完了・ログイン"
                : "購入後の会員登録"}
        </h1>
        <p className="text-sm leading-relaxed text-zinc-500">
          {recoveryMode
            ? "メール内のリンクからアクセスできています。新しいパスワードを入力して保存すると、マイページへ進めます。"
            : isLoginPostReset
              ? "この画面はログイン用です。メール内のリンクでパスワードを更新したあと、同じメールアドレスと新しいパスワードでログインしてください。"
              : isLoginMode
                ? "メール認証が完了しました。購入時と同じメールアドレスでログインし、マイページでライセンスキーとアプリ導線を確認してください。"
                : "Stripe購入時と同じメールアドレスで会員登録してください。登録後、Supabase Auth から確認メールが届きます。メール認証後にマイページでライセンスキーとアプリ導線を確認できます。"}
        </p>

        <Card className="border-zinc-800 bg-[#09090b]">
          <CardHeader>
            <CardTitle>
              {recoveryMode
                ? "パスワード更新"
                : isLoginPostReset
                  ? "次のステップ"
                  : isLoginMode
                    ? "ログイン"
                    : "メールアドレス登録"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recoveryMode ? (
              <form className="space-y-4" onSubmit={onUpdatePasswordFromRecovery}>
                <div className="space-y-2">
                  <Label htmlFor="new-password">新しいパスワード</Label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="8文字以上"
                    className="border-zinc-700 bg-black text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="もう一度入力"
                    className="border-zinc-700 bg-black text-zinc-100"
                  />
                </div>
                <Button type="submit" disabled={loading} className="h-10 w-full bg-[#06b6d4] font-bold text-black hover:bg-[#22d3ee]">
                  パスワードを保存してマイページへ
                </Button>
              </form>
            ) : !isLoginPostReset ? (
              <form className="space-y-4" onSubmit={isLoginMode ? (e) => { e.preventDefault(); void onLogin(); } : onSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="border-zinc-700 bg-black text-zinc-100"
                  />
                  {!isLoginMode && initialEmail ? (
                    <p className="text-xs text-zinc-500">Stripe決済時のメールアドレスを自動入力しています。</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="8文字以上"
                    className="border-zinc-700 bg-black text-zinc-100"
                  />
                </div>
                {!isSignUpCompleted ? (
                  <div className="space-y-2">
                    <Button type="submit" disabled={loading} className="h-10 w-full bg-[#06b6d4] font-bold text-black hover:bg-[#22d3ee]">
                      {isLoginMode ? "ログインしてマイページへ" : "新規登録"}
                    </Button>
                    {isLoginMode ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={onResetPassword}
                        disabled={loading}
                        className="h-10 w-full border border-zinc-700"
                      >
                        パスワードを再設定
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </form>
            ) : (
              <div className="space-y-3 rounded-lg border border-zinc-800 bg-black/40 p-4">
                <p className="text-sm text-zinc-300">
                  送信先: <span className="font-mono text-zinc-100">{email.trim()}</span>
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-full border border-zinc-700"
                  onClick={() => {
                    setPasswordResetMailSent(false);
                    setNotice(null);
                    setError(null);
                  }}
                >
                  ログインに戻る
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-full border border-zinc-700 text-zinc-400"
                  onClick={() => {
                    setPasswordResetMailSent(false);
                    setNotice(null);
                    setError(null);
                  }}
                >
                  メールアドレスを修正して再送信
                </Button>
              </div>
            )}

            {notice ? (
              <Alert className="border-emerald-900/70 bg-black">
                <AlertTitle className="text-emerald-300">完了</AlertTitle>
                <AlertDescription className="text-emerald-200/80">{notice}</AlertDescription>
              </Alert>
            ) : null}
            {error ? (
              <Alert className="border-red-900/70 bg-black">
                <AlertTitle className="text-red-300">エラー</AlertTitle>
                <AlertDescription className="text-red-200/80">{error}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>

        <Link href="/" className="inline-block text-sm text-zinc-400 underline underline-offset-4">
          HOMEへ戻る
        </Link>
      </div>
    </main>
  );
}
