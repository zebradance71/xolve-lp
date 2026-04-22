import { NextRequest, NextResponse } from "next/server";

type CheckoutPayload = {
  planType: "STANDARD" | "PRO" | "PREMIUM";
  consent: {
    terms: boolean;
    disclaimer: boolean;
    termsVersion: string;
    agreedAt: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const fnBase =
      process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_BASE_URL?.trim() ||
      (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.trim().replace(/\/$/, "")}/functions/v1`
        : "");
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
    if (!fnBase || !anon) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Supabase設定が不足しています。NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を確認してください。",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as CheckoutPayload;
    const response = await fetch(`${fnBase.replace(/\/$/, "")}/stripe-create-checkout-session`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${anon}`,
      },
      body: JSON.stringify(body),
    });

    const raw = await response.text();
    let payload: unknown = null;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message: `Checkout API がJSON以外を返しました（HTTP ${response.status}）。`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "チェックアウト処理に失敗しました。";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
