function trimEmail(raw: string | null | undefined): string | null {
  const e = (raw ?? "").trim();
  return e.length > 0 ? e : null;
}

async function resolveEmailFromLicenseRow(sessionId: string): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey || !sessionId) return null;

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/licenses?select=user_email&stripe_checkout_session_id=eq.${encodeURIComponent(sessionId)}&order=issued_at.desc&limit=1`;
  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as Array<{ user_email?: string }>;
    return trimEmail(rows[0]?.user_email);
  } catch {
    return null;
  }
}

/** Checkout 完了直後でも利用可能（Webhook 前） */
async function resolveEmailFromStripeSession(sessionId: string): Promise<string | null> {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret || !sessionId) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      customer_email?: string | null;
      customer_details?: { email?: string | null } | null;
    };
    return trimEmail(data.customer_details?.email ?? data.customer_email);
  } catch {
    return null;
  }
}

/** Stripe API を優先し、未取得時のみ licenses を参照 */
export async function resolveCheckoutPurchaserEmail(sessionId: string): Promise<string | null> {
  const fromStripe = await resolveEmailFromStripeSession(sessionId);
  if (fromStripe) return fromStripe;
  return resolveEmailFromLicenseRow(sessionId);
}
