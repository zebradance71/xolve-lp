import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      return NextResponse.json(
        { ok: false, message: "Supabase環境変数が不足しています。" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!token) {
      return NextResponse.json({ ok: false, message: "認証トークンが必要です。" }, { status: 401 });
    }

    const authClient = createClient(url, anon, { auth: { persistSession: false } });
    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser(token);
    if (userError || !user?.email) {
      return NextResponse.json({ ok: false, message: "ユーザー認証に失敗しました。" }, { status: 401 });
    }

    const userClient = createClient(url, anon, {
      auth: { persistSession: false },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const licenseSelect = "license_key,user_email,status,plan_type,issued_at,max_devices";

    // 初回ログイン時の確定紐付け（auth.uid + auth.jwt.email をSQL側で検証）
    const { data: bindResult, error: bindError } = await userClient.rpc("bind_my_licenses");
    if (bindError) {
      throw bindError;
    }
    const bindPayload = (bindResult ?? {}) as { ok?: boolean; reason?: string; message?: string };
    if (bindPayload.ok === false && bindPayload.reason === "CONFLICT") {
      return NextResponse.json(
        {
          ok: false,
          message:
            bindPayload.message ??
            "同じ購入メールで別アカウントに紐付いたライセンスが見つかりました。サポートへ連絡してください。",
        },
        { status: 409 }
      );
    }
    if (bindPayload.ok === false) {
      return NextResponse.json(
        { ok: false, message: bindPayload.message ?? "ライセンスの紐付けに失敗しました。" },
        { status: 400 }
      );
    }
    // user_id 確定済みレコードを返す。移行前スキーマでは email fallback。
    const { data, error } = await userClient
      .from("licenses")
      .select(licenseSelect)
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false });
    if (error) {
      const detail = String((error as { message?: string }).message ?? "");
      if (!detail.includes("user_id")) throw error;
      const fallback = await userClient
        .from("licenses")
        .select(licenseSelect)
        .eq("user_email", user.email)
        .order("issued_at", { ascending: false });
      if (fallback.error) throw fallback.error;
      return NextResponse.json({
        ok: true,
        email: user.email,
        licenses: fallback.data ?? [],
      });
    }

    return NextResponse.json({
      ok: true,
      email: user.email,
      licenses: data ?? [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ライセンス取得に失敗しました。";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
