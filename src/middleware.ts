import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** プレビュー取得のため /share の HTML を読む可能性がある UA（人間ブラウザは除外） */
const SOCIAL_OR_PREVIEW_BOT_RE =
  /Twitterbot|facebookexternalhit|Facebot|Slackbot|LinkedInBot|Embedly|Pinterest|Discordbot|SkypeUriPreview|redditbot|TelegramBot|Googlebot|bingbot|Yandex|Applebot/i;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/share") {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (!SOCIAL_OR_PREVIEW_BOT_RE.test(ua)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/share",
};
