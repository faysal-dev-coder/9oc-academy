// app/api/admin/users/route.js
// ═══════════════════════════════════════════
// Admin Users API — GET (list)
// ═══════════════════════════════════════════
// GET: List all profiles (no auth.users join — keeps it simple)
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ──────────────────────────────────────────
// GET /api/admin/users
// List all users (profiles only)
// ──────────────────────────────────────────
export async function GET() {
  try {
    const supabase = await createClient();

    // ⭐ Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ⭐ Admin check
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ⭐ Fetch all profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Profiles fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      users: profiles || [],
    });
  } catch (err) {
    console.error("GET users error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
