// proxy.js
// ═══════════════════════════════════════════════════════════════
// 🛡️ Next.js 16 Proxy — Server-Side Auth & Role Protection
// Phase 7 — Chat 27 (Updated for Admin Role Check)
// ├── Auth check (login required for protected routes)
// ├── Admin role check (admin routes)
// ├── Auth redirect (logged-in users away from login/register)
// └── Exam route protection
// ═══════════════════════════════════════════════════════════════

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔐 User Session Check
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  const pathname = request.nextUrl.pathname;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🗂️ Route Categories
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 🔐 Protected — Login required
  const protectedPaths = ["/dashboard", "/profile", "/my-courses", "/my-results", "/settings"];

  // 👑 Admin Only — Login + Admin role required
  const adminPaths = ["/admin"];

  // 🚫 Auth Only — Logged-in users redirect to dashboard
  const authPaths = ["/login", "/register", "/forgot-password"];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔍 Route Detection
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // ⭐ SPECIAL: Exam Routes Logic
  // /exams              → Public ✅
  // /exams/[id]         → Public ✅
  // /exams/[id]/start   → Protected 🔐
  // /exams/[id]/result  → Protected 🔐
  const isExamProtectedRoute = /^\/exams\/[^/]+\/(start|result)/.test(pathname);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🚦 Redirect Logic
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ─── Case 1: Admin Route + Not Logged In ───
  if (isAdminPath && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ─── Case 2: Admin Route + Logged In → Check Role ───
  if (isAdminPath && isLoggedIn) {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      // Error or not admin → redirect to home
      if (error || !profile || profile.role !== "admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("error", "admin_only");
        return NextResponse.redirect(url);
      }
      // ✅ Admin verified — allow access
    } catch (err) {
      // Safety: any error → redirect to home
      console.error("[proxy.js] Admin check error:", err);
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // ─── Case 3: Protected Route + Not Logged In ───
  if ((isProtectedPath || isExamProtectedRoute) && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ─── Case 4: Auth Route + Already Logged In → Dashboard ───
  if (isAuthPath && isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder image files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
