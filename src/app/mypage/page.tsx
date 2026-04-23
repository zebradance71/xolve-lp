"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

type LicenseRow = {
  license_key: string;
  user_email: string;
  status: string;
  plan_type: string;
  issued_at: string;
  max_devices: number;
};

export default function MyPage() {
  const router = useRouter();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [licenses, setLicenses] = useState<LicenseRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setSupabase(createSupabaseBrowserClient());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Supabase の初期化に失敗しました。");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const run = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        const userEmail = data.session?.user.email ?? null;
        if (!token || !userEmail) {
          router.replace("/auth?next=/mypage");
          return;
        }
        setEmail(userEmail);

        const response = await fetch("/api/me/licenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const payload = (await response.json()) as
          | { ok: true; email: string; licenses: LicenseRow[] }
          | { ok: false; message: string };
        if (!response.ok || !payload.ok) {
          throw new Error("message" in payload ? payload.message : "ライセンス取得に失敗しました。");
        }
        setLicenses(payload.licenses);
      } catch (e) {
        setError(e instanceof Error ? e.message : "ライセンス情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [router, supabase]);

  const onSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#000000] px-4 py-16 text-zinc-100 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">My Page</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">購入ライセンス</h1>
        <p className="text-sm leading-relaxed text-zinc-500">
          Stripe購入時と同じメールアドレスで一致したライセンスのみ表示しています。
        </p>

        <Card className="border-zinc-800 bg-[#09090b]">
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-300">ログイン中: {email ?? "-"}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://drive.google.com/file/d/1j4PhGNjvtM9iIXfopcCmaBQP1M9N1zX2/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#06b6d4] px-4 text-sm font-bold text-black hover:bg-[#22d3ee]"
              >
                アプリをダウンロード
              </a>
              <Link
                href="/legal"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 px-4 text-sm hover:border-[#06b6d4]/60"
              >
                利用規約・免責事項
              </Link>
              <Button
                type="button"
                variant="ghost"
                onClick={onSignOut}
                disabled={!supabase}
                className="h-10 border border-zinc-700"
              >
                ログアウト
              </Button>
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4 text-sm leading-relaxed text-zinc-400">
              <div className="space-y-2">
                <p className="font-semibold text-zinc-200">【ダウンロード時のご注意】</p>
                <p>
                  リンクをクリックすると「ファイルをプレビューできませんでした」と表示されますが、製品の容量が大きいための仕様です。
                </p>
                <p>
                  画面中央の<strong className="text-zinc-200">「ダウンロード」ボタン</strong>
                  を押して保存してください。 ※Googleドライブによるウイルススキャン警告が出た場合も、そのまま「ダウンロード」を続行して問題ありません。
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-zinc-200">同梱物（入手パッケージ内）</p>
                <p className="text-xs text-zinc-500">
                  本体とあわせて、次のファイル・ドキュメントが同梱されています（ZIP 内の構成は配布版により同内容です）。
                </p>
                <ul className="list-inside list-disc space-y-1 text-zinc-300">
                  <li>専用Excelテンプレート</li>
                  <li>クイックスタートガイド（PDF）</li>
                  <li>API導入・接続マニュアル（PDF）</li>
                  <li>トラブルシューティング簡易版（PDF）</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {!supabase && !error ? <p className="text-sm text-zinc-500">接続準備中...</p> : null}
        {loading && supabase ? <p className="text-sm text-zinc-500">ライセンスを確認中...</p> : null}
        {error ? (
          <Alert className="border-red-900/70 bg-black">
            <AlertTitle className="text-red-300">取得エラー</AlertTitle>
            <AlertDescription className="text-red-200/80">{error}</AlertDescription>
          </Alert>
        ) : null}

        {supabase && !loading && !error ? (
          <div className="grid gap-4">
            {licenses.length === 0 ? (
              <Card className="border-zinc-800 bg-[#09090b]">
                <CardContent className="space-y-2 p-6">
                  <p className="text-sm text-zinc-300">一致するライセンスが見つかりませんでした。</p>
                  <p className="text-xs text-zinc-500">
                    購入メールとログインメールが異なる場合は、サポート窓口から照合依頼をお願いします。
                  </p>
                </CardContent>
              </Card>
            ) : (
              licenses.map((item) => (
                <Card key={item.license_key} className="border-zinc-800 bg-[#09090b]">
                  <CardContent className="space-y-3 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.plan_type}</p>
                    <p className="text-xs text-zinc-400">ライセンスキー</p>
                    <p className="font-mono text-lg text-[#06b6d4]">{item.license_key}</p>
                    <p className="text-sm text-zinc-300">ステータス: {item.status}</p>
                    <p className="text-xs text-zinc-500">
                      発行日: {new Date(item.issued_at).toLocaleString("ja-JP")} / 最大端末: {item.max_devices}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : null}

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-700 px-4 text-sm hover:border-[#06b6d4]/60"
          >
            HOMEへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
