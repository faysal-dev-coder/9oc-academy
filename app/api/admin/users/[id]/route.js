// app/api/admin/users/[id]/route.js
// ═══════════════════════════════════════════
// Admin Users API — PUT + DELETE
// ═══════════════════════════════════════════
// PUT:    Update user profile (full_name, phone, role, etc.)
// DELETE: Remove user profile (with safety!)
//
// 🛡️ SAFETY CHECKS:
//   ├── Self-delete: Blocked
//   ├── Self-demote: Blocked (last admin protection too)
//   └── Last admin delete: Blocked
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ──────────────────────────────────────────
// PUT /api/admin/users/[id]
// ──────────────────────────────────────────
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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

    // ⭐ Parse body
    const body = await request.json();
    const { full_name, phone, role, district, preparation_level, avatar_url } = body;

    // ⭐ Basic validation
    if (!full_name?.trim()) {
      return NextResponse.json({ error: "Full name আবশ্যক!" }, { status: 400 });
    }

    if (!["admin", "student"].includes(role)) {
      return NextResponse.json({ error: "Invalid role!" }, { status: 400 });
    }

    // ⭐ Fetch target user
    const { data: targetUser, error: fetchErr } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", id)
      .single();

    if (fetchErr || !targetUser) {
      return NextResponse.json({ error: "ইউজার পাওয়া যায়নি!" }, { status: 404 });
    }

    // 🛡️ Safety: Self-demote prevention (admin → student)
    if (id === user.id && targetUser.role === "admin" && role !== "admin") {
      return NextResponse.json(
        { error: "নিজেকে admin থেকে demote করতে পারবেন না!" },
        { status: 400 }
      );
    }

    // 🛡️ Safety: Last admin protection
    if (targetUser.role === "admin" && role !== "admin") {
      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");

      if ((count || 0) <= 1) {
        return NextResponse.json(
          { error: "সিস্টেমে কমপক্ষে ১ জন admin থাকা আবশ্যক!" },
          { status: 400 }
        );
      }
    }

    // ⭐ Update profile
    const { data: updated, error: updateErr } = await supabase
      .from("profiles")
      .update({
        full_name: full_name.trim(),
        phone: phone?.trim() || null,
        role,
        district: district?.trim() || null,
        preparation_level: preparation_level?.trim() || null,
        avatar_url: avatar_url?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      console.error("Profile update error:", updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: updated,
      message: "ইউজার সফলভাবে আপডেট হয়েছে!",
    });
  } catch (err) {
    console.error("PUT user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ──────────────────────────────────────────
// DELETE /api/admin/users/[id]
// ──────────────────────────────────────────
export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
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

    // 🛡️ Safety: Self-delete prevention
    if (id === user.id) {
      return NextResponse.json({ error: "নিজেকে delete করতে পারবেন না!" }, { status: 400 });
    }

    // ⭐ Fetch target user
    const { data: targetUser, error: fetchErr } = await supabase
      .from("profiles")
      .select("id, role, full_name")
      .eq("id", id)
      .single();

    if (fetchErr || !targetUser) {
      return NextResponse.json({ error: "ইউজার পাওয়া যায়নি!" }, { status: 404 });
    }

    // 🛡️ Safety: Last admin protection
    if (targetUser.role === "admin") {
      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");

      if ((count || 0) <= 1) {
        return NextResponse.json(
          { error: "শেষ admin কে delete করা যাবে না! আগে অন্য কাউকে admin করুন।" },
          { status: 400 }
        );
      }
    }

    // ⭐ Delete profile
    // (auth.users row রেখে দিই — শুধু profile delete)
    const { error: deleteErr } = await supabase.from("profiles").delete().eq("id", id);

    if (deleteErr) {
      console.error("Profile delete error:", deleteErr);
      return NextResponse.json({ error: deleteErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `"${targetUser.full_name || "ইউজার"}" সফলভাবে ডিলিট হয়েছে!`,
    });
  } catch (err) {
    console.error("DELETE user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
