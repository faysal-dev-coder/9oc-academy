import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
// GET → List all courses with filters
// ═══════════════════════════════════════════════════════════
export async function GET(request) {
  try {
    const supabase = await createClient();

    // 1. Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "অননুমোদিত অ্যাক্সেস" }, { status: 401 });
    }

    // 2. Admin check
    const { data: isAdminData } = await supabase.rpc("is_admin");
    if (!isAdminData) {
      return NextResponse.json({ error: "শুধুমাত্র অ্যাডমিনের জন্য" }, { status: 403 });
    }

    // 3. Get query params (filters)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // 4. Build query with category join
    let query = supabase
      .from("courses")
      .select(
        `
        *,
        category:categories(id, name, slug, color, icon)
      `
      )
      .order("global_order", { ascending: true });

    // 5. Apply filters
    if (category && category !== "all") {
      query = query.eq("category_id", category);
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data: courses, error } = await query;

    if (error) {
      console.error("Courses fetch error:", error);
      return NextResponse.json({ error: "কোর্স লোড করতে সমস্যা হয়েছে" }, { status: 500 });
    }

    return NextResponse.json({ courses: courses || [] });
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json({ error: "সার্ভার সমস্যা" }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// POST → Create new course
// ═══════════════════════════════════════════════════════════
export async function POST(request) {
  try {
    const supabase = await createClient();

    // 1. Auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "অননুমোদিত অ্যাক্সেস" }, { status: 401 });
    }

    // 2. Admin check
    const { data: isAdminData } = await supabase.rpc("is_admin");
    if (!isAdminData) {
      return NextResponse.json({ error: "শুধুমাত্র অ্যাডমিনের জন্য" }, { status: 403 });
    }

    // 3. Get body data
    const body = await request.json();

    // 4. Basic validation
    if (!body.title || !body.slug || !body.category_id) {
      return NextResponse.json({ error: "Title, Slug এবং Category আবশ্যক" }, { status: 400 });
    }

    // 5. Slug uniqueness check
    const { data: existing } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "এই Slug ইতিমধ্যে ব্যবহৃত হয়েছে" }, { status: 400 });
    }

    // 6. Prepare insert data
    const insertData = {
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      short_description: body.short_description || null,
      category_id: body.category_id,
      thumbnail_url: body.thumbnail_url || null,
      price: body.is_free ? 0 : body.price || 0,
      discount_price: body.is_free ? null : body.discount_price || null,
      is_free: body.is_free || false,
      instructor_name: body.instructor_name || null,
      instructor_image: body.instructor_image || null,
      total_lessons: body.total_lessons || 0,
      total_duration: body.total_duration || 0,
      difficulty_level: body.difficulty_level || "beginner",
      global_order: body.global_order || 0,
      category_order: body.category_order || 0,
      is_featured: body.is_featured || false,
      is_popular: body.is_popular || false,
      status: body.status || "draft",
      validity_days: body.validity_days || 365,
      expiry_date: body.expiry_date || null,
      published_at: body.status === "active" ? new Date().toISOString() : null,
    };

    // 7. Insert course
    const { data: newCourse, error } = await supabase
      .from("courses")
      .insert(insertData)
      .select(
        `
        *,
        category:categories(id, name, slug, color, icon)
      `
      )
      .single();

    if (error) {
      console.error("Course insert error:", error);
      return NextResponse.json(
        { error: "কোর্স তৈরি করতে সমস্যা হয়েছে: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "কোর্স সফলভাবে তৈরি হয়েছে!",
      course: newCourse,
    });
  } catch (error) {
    console.error("POST course error:", error);
    return NextResponse.json({ error: "সার্ভার সমস্যা" }, { status: 500 });
  }
}
