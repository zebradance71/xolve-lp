"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LpShell } from "@/components/landing/LpShell";
import type { AuthPageViewModel } from "./useAuthPageClient";

type Props = AuthPageViewModel;

export function AuthPageShell({
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
}: Props) {
  const cardTitle = !supabase
    ? "準備中"
    : recoveryMode
      ? "パスワード更新"
      : isLoginPostReset
        ? "次のステップ"
        : isLoginMode
          ? "ログイン"
          : "メールアドレス登録";

  const onLoginFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void onLogin();
  };

  return (
    <LpShell className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-lg space-y-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00C2D1]">Account</p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {recoveryMode
            ? "新しいパスワードを設定"
            : isLoginPostReset
              ? "再設定メールを送信しました"
              : isLoginMode
                ? "メール認証完了・ログイン"
                : "購入後の会員登録"}
        </h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          {recoveryMode
            ? "メール内のリンクからアクセスできています。新しいパスワードを入力して保存すると、マイページへ進めます。"
            : isLoginPostReset
              ? "この画面はログイン用です。メール内のリンクでパスワードを更新したあと、同じメールアドレスと新しいパスワードでログインしてください。"
              : isLoginMode
                ? "メール認証が完了しました。購入時と同じメールアドレスでログインし、マイページでライセンスキーとアプリ導線を確認してください。"
                : "Stripe購入時と同じメールアドレスで会員登録してください。登録後、Supabase Auth から確認メールが届きます。メール認証後にマイページでライセンスキーとアプリ導線を確認できます。"}
        </p>

        <Card className="border-white/[0.06] bg-[#000B18]/60">
          <CardHeader>
            <CardTitle className="text-zinc-100">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!supabase && !error ? <p className="text-sm text-zinc-400">接続準備中...</p> : null}
            {recoveryMode && supabase ? (
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
                    className="border-white/15 bg-[#000B18]/80 text-zinc-100"
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
                    className="border-white/15 bg-[#000B18]/80 text-zinc-100"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !supabase}
                  className="h-10 w-full bg-[#00C2D1] font-bold text-[#000B18] shadow-[0_0_20px_rgba(0,194,209,0.25)] hover:bg-[#3fe8f5]"
                >
                  パスワードを保存してマイページへ
                </Button>
              </form>
            ) : supabase && !isLoginPostReset ? (
              <form className="space-y-4" onSubmit={isLoginMode ? onLoginFormSubmit : onSignUp}>
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
                    className="border-white/15 bg-[#000B18]/80 text-zinc-100"
                  />
                  {!isLoginMode && initialEmail ? (
                    <p className="text-xs text-zinc-400">
                      Stripe 購入時に入力したメールアドレスを表示しています。ライセンスと紐づくため、原則としてこのまま登録してください。
                    </p>
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
                    className="border-white/15 bg-[#000B18]/80 text-zinc-100"
                  />
                </div>
                {!isSignUpCompleted ? (
                  <div className="space-y-2">
                    <Button
                      type="submit"
                      disabled={loading || !supabase}
                      className="h-10 w-full bg-[#00C2D1] font-bold text-[#000B18] shadow-[0_0_20px_rgba(0,194,209,0.25)] hover:bg-[#3fe8f5]"
                    >
                      {isLoginMode ? "ログインしてマイページへ" : "新規登録"}
                    </Button>
                    {isLoginMode ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={onResetPassword}
                        disabled={loading || !supabase}
                        className="h-10 w-full border border-white/15"
                      >
                        パスワードを再設定
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </form>
            ) : supabase ? (
              <div className="space-y-3 rounded-lg border border-white/[0.06] bg-[#000B18]/50 p-4">
                <p className="text-sm text-zinc-300">
                  送信先: <span className="font-mono text-zinc-100">{email.trim()}</span>
                </p>
                <Button type="button" variant="ghost" className="h-10 w-full border border-white/15" onClick={clearPostResetState}>
                  ログインに戻る
                </Button>
                <Button type="button" variant="ghost" className="h-10 w-full border border-white/15 text-zinc-400" onClick={clearPostResetState}>
                  メールアドレスを修正して再送信
                </Button>
              </div>
            ) : null}

            {notice ? (
              <Alert className="border-emerald-800/50 bg-[#000B18]/80">
                <AlertTitle className="text-emerald-300">完了</AlertTitle>
                <AlertDescription className="text-emerald-200/80">{notice}</AlertDescription>
              </Alert>
            ) : null}
            {error ? (
              <Alert className="border-red-900/70 bg-[#000B18]/80">
                <AlertTitle className="text-red-300">エラー</AlertTitle>
                <AlertDescription className="text-red-200/80">{error}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>

        <Link
          href="/"
          className="inline-block text-sm font-medium text-[#00C2D1] underline underline-offset-4 transition hover:text-[#3fe8f5]"
        >
          HOMEへ戻る
        </Link>
      </div>
    </LpShell>
  );
}
