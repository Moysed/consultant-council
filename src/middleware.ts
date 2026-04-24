import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Track cookie updates so we can forward them to redirect responses
  let cookieUpdates: {
    name: string;
    value: string;
    options: Record<string, unknown>;
  }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookieUpdates = cookiesToSet;
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Helper: redirect with Supabase cookies forwarded
  function redirectTo(pathname: string) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = "";
    const response = NextResponse.redirect(url);
    cookieUpdates.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return supabaseResponse;
  }

  // Handle PKCE code exchange
  const code = request.nextUrl.searchParams.get("code");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return redirectTo("/dashboard");
  }

  const publicPaths = ["/", "/login"];
  const isPublicPath = publicPaths.some((p) => pathname === p);

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  if (!hasAuthCookie) {
    if (!isPublicPath) {
      return redirectTo("/login");
    }
    return supabaseResponse;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath) {
    const response = redirectTo("/login");
    // Clear stale auth cookies
    request.cookies
      .getAll()
      .filter((c) => c.name.startsWith("sb-"))
      .forEach((c) => response.cookies.delete(c.name));
    return response;
  }

  if (user && pathname === "/login") {
    return redirectTo("/dashboard");
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
