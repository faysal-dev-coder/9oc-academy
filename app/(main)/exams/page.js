// app/(main)/exams/page.js
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { getAllExams, getAllCategories, getExamQuestionCount } from "@/lib/supabase/exam";
import ExamCard from "@/components/exam/ExamCard";
import ExamFilter from "@/components/exam/ExamFilter";
import { FaSearch, FaGraduationCap } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function ExamsPage() {
  const { user, loading: userLoading } = useUser();
  const isLoggedIn = !!user;

  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [examsLoaded, setExamsLoaded] = useState(false); // ⭐ NEW
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    type: "all",
  });

  // ⭐ EFFECT 1: Mount এ একবার মাত্র Exams + Categories Fetch
  useEffect(() => {
    let isMounted = true;

    async function loadExamsAndCategories() {
      console.log("🚀 [ExamsPage] Loading Exams + Categories...");
      const startTime = Date.now();

      try {
        const [examsResult, categoriesResult] = await Promise.all([
          getAllExams(),
          getAllCategories(),
        ]);

        if (!isMounted) {
          console.log("⚠️ [ExamsPage] Unmounted before data arrived");
          return;
        }

        if (examsResult.error) throw new Error(examsResult.error);
        if (categoriesResult.error) throw new Error(categoriesResult.error);

        const examsData = examsResult.exams || [];
        const categoriesData = categoriesResult.categories || [];

        console.log(
          `✅ [ExamsPage] Got ${examsData.length} exams, ${categoriesData.length} categories in ${Date.now() - startTime}ms`
        );

        setExams(examsData);
        setFilteredExams(examsData);
        setCategories(categoriesData);
        setExamsLoaded(true);
      } catch (err) {
        console.error("💥 [ExamsPage] Error:", err);
        if (isMounted) {
          setError(err.message || "পরীক্ষা লোড করতে সমস্যা হয়েছে।");
          setExamsLoaded(true);
        }
      }
    }

    loadExamsAndCategories();

    return () => {
      isMounted = false;
    };
  }, []); // ⭐ Empty deps — শুধু Mount এ একবার

  // ⭐ EFFECT 2: Exams Load হলে → Question Counts Fetch
  // userLoading=false অপেক্ষা করি (isLoggedIn জানার জন্য)
  useEffect(() => {
    if (!examsLoaded || exams.length === 0 || userLoading) {
      return;
    }

    let isMounted = true;

    async function loadCounts() {
      console.log(
        `📡 [ExamsPage] Loading question counts (user: ${isLoggedIn ? "logged-in" : "guest"})`
      );

      try {
        const counts = await Promise.all(
          exams.map(async (exam) => {
            // Premium + Logout → Skip
            if (!isLoggedIn && !exam.is_free) {
              return { id: exam.id, count: null };
            }
            const count = await getExamQuestionCount(exam.id);
            return { id: exam.id, count };
          })
        );

        if (!isMounted) return;

        const countsMap = {};
        counts.forEach((c) => {
          countsMap[c.id] = c.count;
        });
        setQuestionCounts(countsMap);
        console.log("✅ [ExamsPage] Question counts loaded");
      } catch (err) {
        console.error("⚠️ [ExamsPage] Counts error:", err);
      }
    }

    loadCounts();

    return () => {
      isMounted = false;
    };
  }, [examsLoaded, exams, isLoggedIn, userLoading]);

  // ─── Filter Logic ───
  const applyFilters = (filters, query) => {
    let result = [...exams];
    if (filters.category !== "all")
      result = result.filter((e) => e.category_id === filters.category);
    if (filters.type === "free") result = result.filter((e) => e.is_free === true);
    else if (filters.type === "paid") result = result.filter((e) => e.is_free === false);
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lowerQuery) ||
          (e.description || "").toLowerCase().includes(lowerQuery)
      );
    }
    setFilteredExams(result);
  };

  const handleFilter = (filters) => {
    setActiveFilters(filters);
    applyFilters(filters, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(activeFilters, query);
  };

  // ⭐ Loading: শুধু exams না আসা পর্যন্ত
  if (!examsLoaded) {
    return (
      <div className="min-h-screen bg-dark pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-white/5 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
            <p className="text-white/40 text-sm mt-4">পরীক্ষা লোড হচ্ছে...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Error UI ───
  if (error) {
    return (
      <div className="min-h-screen bg-dark pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😓</div>
          <p className="text-white/60 text-lg mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary rounded-xl text-white hover:bg-primary/80 transition-colors cursor-pointer"
          >
            আবার চেষ্টা করো
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <FaGraduationCap className="text-primary" size={16} />
            <span className="text-primary text-sm font-medium">MCQ পরীক্ষা কেন্দ্র</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            সব <span className="text-primary">পরীক্ষা</span> দেখুন
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            BCS, Bank Job, NTRCA সহ সব ধরনের সরকারি চাকরির পরীক্ষার প্রস্তুতি নিন
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input
            type="text"
            placeholder="পরীক্ষা খুঁজুন..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <ExamFilter categories={categories} onFilter={handleFilter} />

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">
            মোট <span className="text-white font-semibold">{filteredExams.length}</span>টি পরীক্ষা
            পাওয়া গেছে
          </p>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                questionCount={questionCounts[exam.id]}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <HiOutlineDocumentSearch size={64} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/60 mb-2">কোনো পরীক্ষা পাওয়া যায়নি</h3>
            <p className="text-white/30">অন্য ফিল্টার বা কীওয়ার্ড দিয়ে চেষ্টা করুন</p>
          </div>
        )}
      </div>
    </div>
  );
}
