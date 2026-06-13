// app/api/admin/categories/[id]/route.js
// ═══════════════════════════════════════════
// Admin Single Category API — PUT + DELETE
// ═══════════════════════════════════════════
// PUT:    Update category
// DELETE: Delete category (with safety check)
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ──────────────────────────────────────────
// PUT /api/admin/categories/[id]
// Update existing category
// ──────────────────────────────────────────
export async function PUT(request, { params }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // ⭐ Admin Check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ⭐ Parse body
    const body = await request.json();
    const { name, slug, description, icon, color, display_order, is_active } = body;

    // ⭐ Check if category exists
    const { data: existing } = await supabase
      .from("categories")
      .select("id, slug")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Category পাওয়া যায়নি!" }, { status: 404 });
    }

    // ⭐ Slug uniqueness check (only if changed)
    if (slug && slug !== existing.slug) {
      const { data: slugExists } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", slug)
        .neq("id", id)
        .maybeSingle();

      if (slugExists) {
        return NextResponse.json(
          { error: "এই slug অন্য category তে আছে! অন্য slug দিন।" },
          { status: 400 }
        );
      }
    }

    // ⭐ Build update object (only provided fields)
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (color !== undefined) updateData.color = color;
    if (display_order !== undefined) updateData.display_order = display_order;
    if (is_active !== undefined) updateData.is_active = is_active;
    updateData.updated_at = new Date().toISOString();

    // ⭐ Update
    const { data: updated, error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Category update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      category: updated,
      message: "Category সফলভাবে আপডেট হয়েছে!",
    });
  } catch (err) {
    console.error("PUT category error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ──────────────────────────────────────────
// DELETE /api/admin/categories/[id]
// Delete category (with safety check)
// ──────────────────────────────────────────
export async function DELETE(request, { params }) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // ⭐ Admin Check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ⭐ Check if category exists
    const { data: category } = await supabase
      .from("categories")
      .select("id, name")
      .eq("id", id)
      .single();

    if (!category) {
      return NextResponse.json({ error: "Category পাওয়া যায়নি!" }, { status: 404 });
    }

    // ⭐ SAFETY CHECK 1: Linked Courses?
    const { count: coursesCount } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id);

    if (coursesCount > 0) {
      return NextResponse.json(
        {
          error: `এই category তে ${coursesCount} টি course আছে! আগে courses গুলো অন্য category তে move করুন বা delete করুন।`,
          coursesCount,
        },
        { status: 400 }
      );
    }

    // ⭐ SAFETY CHECK 2: Linked Exams?
    const { count: examsCount } = await supabase
      .from("exams")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id);

    if (examsCount > 0) {
      return NextResponse.json(
        {
          error: `এই category তে ${examsCount} টি exam আছে! আগে exams গুলো অন্য category তে move করুন বা delete করুন।`,
          examsCount,
        },
        { status: 400 }
      );
    }

    // ⭐ Safe to Delete
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.error("Category delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `"${category.name}" সফলভাবে delete হয়েছে!`,
    });
  } catch (err) {
    console.error("DELETE category error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
