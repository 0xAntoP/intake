import { NextRequest, NextResponse } from "next/server";

function detectLocale(acceptLanguage: string): "en" | "it" {
  if (!acceptLanguage) return "en";
  const langs = acceptLanguage
    .split(",")
    .map((lang) => {
      const parts = lang.trim().split(";q=");
      return { code: parts[0].trim().toLowerCase(), q: parts[1] ? parseFloat(parts[1]) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);
  return langs[0]?.code.startsWith("it") ? "it" : "en";
}

export function middleware(request: NextRequest) {
  const existing = request.cookies.get("locale")?.value;
  const locale =
    existing === "en" || existing === "it"
      ? existing
      : detectLocale(request.headers.get("accept-language") || "");

  // Inject x-locale into the request so server components can read it on the very first visit,
  // before the browser has sent the cookie back.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (!existing) {
    response.cookies.set("locale", locale, { maxAge: 60 * 60 * 24 * 30, path: "/" });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
