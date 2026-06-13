// app/api/admin/categories/route.js
// ═══════════════════════════════════════════
// Admin Categories API — GET + POST
// ═══════════════════════════════════════════
// GET:  List all categories with course/exam counts
// POST: Create new category
// ═══════════════════════════════════════════

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ──────────────────────────────────────────
// GET /api/admin/categories
// List all categories with counts
// ──────────────────────────────────────────
export async function GET() {
  try {
    const supabase = await createClient();

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

    // ⭐ Fetch Categories
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Categories fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ⭐ Get Course Counts (per category)
    const { data: courseCounts } = await supabase
      .from("courses")
      .select("category_id")
      .neq("status", "archived");

    // ⭐ Get Exam Counts (per category)
    const { data: examCounts } = await supabase.from("exams").select("category_id");

    // ⭐ Merge counts into categories
    const categoriesWithCounts = categories.map((cat) => ({
      ...cat,
      courses_count: courseCounts?.filter((c) => c.category_id === cat.id).length || 0,
      exams_count: examCounts?.filter((e) => e.category_id === cat.id).length || 0,
    }));

    return NextResponse.json({
      success: true,
      categories: categoriesWithCounts,
    });
  } catch (err) {
    console.error("GET categories error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ──────────────────────────────────────────
// POST /api/admin/categories
// Create new category
// ──────────────────────────────────────────
export async function POST(request) {
  try {
    const supabase = await createClient();

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

    // ⭐ Basic Validation
    if (!name || !slug || !icon || !color) {
      return NextResponse.json({ error: "Name, slug, icon, color are required" }, { status: 400 });
    }

    // ⭐ Check slug uniqueness
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "এই slug আগে থেকেই আছে! অন্য slug দিন।" }, { status: 400 });
    }

    // ⭐ Insert Category
    const { data: newCategory, error } = await supabase
      .from("categories")
      .insert({
        name,
        slug,
        description: description || null,
        icon,
        color,
        display_order: display_order || 0,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single();

    if (error) {
      console.error("Category insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      category: newCategory,
      message: "Category সফলভাবে যোগ হয়েছে!",
    });
  } catch (err) {
    console.error("POST category error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
