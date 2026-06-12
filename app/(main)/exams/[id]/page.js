"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getExamById, getExamQuestionCount, getUserAttemptsForExam } from "@/lib/supabase/exam";
import {
  FaArrowLeft,
  FaClock,
  FaQuestionCircle,
  FaTrophy,
  FaExclamationTriangle,
  FaRandom,
  FaCheckCircle,
  FaPlayCircle,
  FaHistory,
  FaLock,
} from "react-icons/fa";

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id;

  const [exam, setExam] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [previousAttempts, setPreviousAttempts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      console.log("🔍 [ExamDetails] Loading exam:", examId);

      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          console.log("✅ User logged in:", session.user.email);
        }

        const { exam: examData, error: examError } = await getExamById(examId);

        if (examError || !examData) {
          console.error("❌ Exam not found:", examError);
          setError("পরীক্ষাটি পাওয়া যায়নি!");
          setLoading(false);
          return;
        }

        setExam(examData);
        console.log("✅ Exam loaded:", examData.title);

        const count = await getExamQuestionCount(examId);
        setQuestionCount(count);

        if (session?.user) {
          const { attempts } = await getUserAttemptsForExam(session.user.id, examId);
          setPreviousAttempts(attempts || []);
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Error loading exam:", err);
        setError("পরীক্ষা লোড করতে সমস্যা হয়েছে!");
        setLoading(false);
      }
    }

    loadData();
  }, [examId]);

  // ─── Loading State ──────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#F1F5F9] rounded w-1/3"></div>
            <div className="h-12 bg-[#F1F5F9] rounded w-2/3"></div>
            <div className="h-32 bg-[#F1F5F9] rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-[#F1F5F9] rounded"></div>
              <div className="h-24 bg-[#F1F5F9] rounded"></div>
              <div className="h-24 bg-[#F1F5F9] rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────
  if (error || !exam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md shadow-sm">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <p className="text-[#1F2937] text-xl mb-2 font-semibold">
            {error || "পরীক্ষাটি পাওয়া যায়নি"}
          </p>
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-semibold"
          >
            <FaArrowLeft /> সব পরীক্ষায় ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  // ─── Attempt Calculations ───────────────────────────────
  const completedAttempts = previousAttempts.filter((a) => a.status === "completed").length;
  const attemptsLeft = exam.max_attempts ? exam.max_attempts - completedAttempts : null;
  const canAttempt = !exam.max_attempts || attemptsLeft > 0;

  // ─── Main UI ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ── Back Button ──────────────────────────────────── */}
        <Link
          href="/exams"
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-primary mb-6 transition-colors font-medium"
        >
          <FaArrowLeft />
          <span>সব পরীক্ষায় ফিরে যাও</span>
        </Link>

        {/* ── Exam Header Card ─────────────────────────────── */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 mb-6 shadow-sm">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {exam.categories && (
              <span className="bg-primary/10 text-primary-dark border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold">
                📚 {exam.categories.name}
              </span>
            )}
            {exam.is_free ? (
              <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                বিনামূল্যে
              </span>
            ) : (
              <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaLock className="text-[10px]" /> প্রিমিয়াম
              </span>
            )}
            {exam.is_randomized && (
              <span className="bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaRandom /> এলোমেলো প্রশ্ন
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[#1F2937] text-3xl md:text-4xl font-bold mb-3">{exam.title}</h1>

          {/* Description */}
          {exam.description && (
            <p className="text-[#475569] text-base leading-relaxed">{exam.description}</p>
          )}
        </div>

        {/* ── Stats Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <FaQuestionCircle className="text-primary text-xl" />
            </div>
            <div className="text-[#1F2937] text-2xl font-bold">{questionCount}</div>
            <div className="text-[#64748B] text-sm font-medium">প্রশ্ন</div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
              <FaClock className="text-green-600 text-xl" />
            </div>
            <div className="text-[#1F2937] text-2xl font-bold">{exam.duration_minutes}</div>
            <div className="text-[#64748B] text-sm font-medium">মিনিট</div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <FaTrophy className="text-amber-600 text-xl" />
            </div>
            <div className="text-[#1F2937] text-2xl font-bold">{exam.total_marks}</div>
            <div className="text-[#64748B] text-sm font-medium">মোট নম্বর</div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <div className="text-[#1F2937] text-2xl font-bold">{exam.pass_marks}</div>
            <div className="text-[#64748B] text-sm font-medium">পাস মার্কস</div>
          </div>
        </div>

        {/* ── Rules / Important Info ──────────────────────── */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-[#1F2937] text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              ⚠️
            </span>
            গুরুত্বপূর্ণ তথ্য
          </h2>
          <ul className="space-y-2.5 text-[#475569] text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>
                মোট প্রশ্ন: <strong className="text-[#1F2937]">{questionCount}টি</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>
                সময়: <strong className="text-[#1F2937]">{exam.duration_minutes} মিনিট</strong>
              </span>
            </li>
            {exam.has_negative_marking && (
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span className="text-red-700 font-medium">
                  নেগেটিভ মার্কিং আছে - প্রতিটি ভুল উত্তরে {exam.negative_mark_value} নম্বর কাটা
                  যাবে
                </span>
              </li>
            )}
            {exam.is_randomized && (
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>প্রশ্ন এলোমেলোভাবে আসবে</span>
              </li>
            )}
            {exam.max_attempts && (
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>
                  সর্বোচ্চ <strong className="text-[#1F2937]">{exam.max_attempts}</strong> বার
                  চেষ্টা করা যাবে
                  {user && <strong className="text-amber-700"> (বাকি {attemptsLeft} বার)</strong>}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* ── Previous Attempts ───────────────────────────── */}
        {user && previousAttempts.length > 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-[#1F2937] text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <FaHistory className="text-sm" />
              </span>
              তোমার পূর্ববর্তী চেষ্টা
            </h2>
            <div className="space-y-2">
              {previousAttempts.slice(0, 3).map((attempt, idx) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#94A3B8] text-sm font-medium">#{idx + 1}</span>
                    <span
                      className={`text-sm font-semibold px-2 py-0.5 rounded-full border ${
                        attempt.is_passed
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-red-700 bg-red-50 border-red-200"
                      }`}
                    >
                      {attempt.is_passed ? "✅ পাস" : "❌ ফেল"}
                    </span>
                    <span className="text-[#1F2937] text-sm font-semibold">
                      {attempt.score}/{attempt.total_marks}
                    </span>
                  </div>
                  <span className="text-[#64748B] text-xs font-medium">
                    {new Date(attempt.completed_at).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Start Button ─────────────────────────────────── */}
        <div className="bg-linear-to-br from-primary/10 via-white to-secondary/10 border-2 border-primary/30 rounded-2xl p-8 text-center shadow-lg shadow-primary/10">
          {!user ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <FaLock className="text-primary text-2xl" />
              </div>
              <p className="text-[#475569] mb-4 font-medium">পরীক্ষা শুরু করতে লগইন করুন</p>
              <Link
                href={`/login?redirect=/exams/${examId}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <FaLock /> লগইন করুন
              </Link>
            </>
          ) : !canAttempt ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              <p className="text-red-700 mb-2 font-bold text-lg">❌ সর্বোচ্চ চেষ্টা সংখ্যা শেষ</p>
              <p className="text-[#64748B] text-sm">
                তুমি এই পরীক্ষায় <strong className="text-[#1F2937]">{exam.max_attempts}</strong>{" "}
                বার চেষ্টা করেছো।
              </p>
            </>
          ) : questionCount === 0 ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <FaExclamationTriangle className="text-amber-600 text-2xl" />
              </div>
              <p className="text-amber-700 mb-2 font-bold text-lg">
                ⚠️ এই পরীক্ষায় এখনো কোনো প্রশ্ন যুক্ত হয়নি
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
                <FaPlayCircle className="text-green-600 text-2xl" />
              </div>
              <p className="text-[#475569] mb-4 font-medium">
                প্রস্তুত? শুরু করার পর{" "}
                <strong className="text-[#1F2937]">{exam.duration_minutes} মিনিটের</strong> মধ্যে
                শেষ করতে হবে।
              </p>
              <Link
                href={`/exams/${examId}/start`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-green-600/25 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-0.5 transition-all"
              >
                <FaPlayCircle /> পরীক্ষা শুরু করুন
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
