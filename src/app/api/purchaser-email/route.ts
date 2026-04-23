import { NextRequest, NextResponse } from "next/server";
import { resolveCheckoutPurchaserEmail } from "@/lib/resolveCheckoutPurchaserEmail";

/** Checkout Session ID のみ受け付け（列挙・誤用軽減） */
function isCheckoutSessionId(value: string): boolean {
  return value.startsWith("cs_live_") || value.startsWith("cs_test_");
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")?.trim() ?? "";
  if (!sessionId || !isCheckoutSessionId(sessionId)) {
    return NextResponse.json({ email: null }, { status: 200 });
  }
  try {
    const email = await resolveCheckoutPurchaserEmail(sessionId);
    return NextResponse.json({ email: email ?? null }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ email: null }, { status: 200, headers: { "cache-control": "no-store" } });
  }
}
