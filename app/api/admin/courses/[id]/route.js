import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════
// PUT → Update course
// ═══════════════════════════════════════════════════════════
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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

    // 3. Get body
    const body = await request.json();

    // 4. Basic validation
    if (!body.title || !body.slug || !body.category_id) {
      return NextResponse.json({ error: "Title, Slug এবং Category আবশ্যক" }, { status: 400 });
    }

    // 5. Slug uniqueness check (exclude self)
    const { data: existing } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", body.slug)
      .neq("id", id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "এই Slug অন্য কোর্সে ব্যবহৃত হয়েছে" }, { status: 400 });
    }

    // 6. Get current course (for status comparison)
    const { data: currentCourse } = await supabase
      .from("courses")
      .select("status, published_at")
      .eq("id", id)
      .single();

    // 7. Prepare update data (correct DB column names!)
    const updateData = {
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
      duration_minutes: body.duration_minutes || 0, // ✅ Correct
      level: body.level || "beginner", // ✅ Correct
      global_order: body.global_order || 0,
      category_order: body.category_order || 0,
      is_featured: body.is_featured || false,
      status: body.status || "draft",
      validity_days: body.validity_days || 365,
      expiry_date: body.expiry_date || null,
      archived_at: body.status === "archived" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    // Set published_at if status becomes active for first time
    if (
      body.status === "active" &&
      currentCourse?.status !== "active" &&
      !currentCourse?.published_at
    ) {
      updateData.published_at = new Date().toISOString();
    }

    // 8. Update course
    const { data: updatedCourse, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        *,
        category:categories(id, name, slug, color, icon)
      `
      )
      .single();

    if (error) {
      console.error("Course update error:", error);
      return NextResponse.json(
        { error: "কোর্স আপডেট করতে সমস্যা হয়েছে: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "কোর্স সফলভাবে আপডেট হয়েছে!",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("PUT course error:", error);
    return NextResponse.json({ error: "সার্ভার সমস্যা" }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// DELETE → Safe delete (check enrollments)
// ═══════════════════════════════════════════════════════════
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
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

    // 3. Check if enrollments exist
    const { count: enrollmentCount } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("course_id", id);

    if (enrollmentCount && enrollmentCount > 0) {
      return NextResponse.json(
        {
          error: `এই কোর্সে ${enrollmentCount} জন শিক্ষার্থী এনরোল করেছে। মুছে ফেলা যাবে না। পরিবর্তে Archive করুন।`,
        },
        { status: 400 }
      );
    }

    // 4. Get course thumbnail (for storage cleanup)
    const { data: course } = await supabase
      .from("courses")
      .select("thumbnail_url")
      .eq("id", id)
      .single();

    // 5. Delete course
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      console.error("Course delete error:", error);
      return NextResponse.json(
        { error: "কোর্স মুছতে সমস্যা হয়েছে: " + error.message },
        { status: 500 }
      );
    }

    // 6. Optional: Delete thumbnail from storage
    if (course?.thumbnail_url && course.thumbnail_url.includes("course-thumbnails")) {
      try {
        const fileName = course.thumbnail_url.split("/").pop();
        await supabase.storage.from("course-thumbnails").remove([fileName]);
      } catch (storageError) {
        console.error("Storage cleanup error (non-fatal):", storageError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "কোর্স সফলভাবে মুছে ফেলা হয়েছে!",
    });
  } catch (error) {
    console.error("DELETE course error:", error);
    return NextResponse.json({ error: "সার্ভার সমস্যা" }, { status: 500 });
  }
}
