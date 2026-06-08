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
        // ─── Auth Check ────────────────────────────────────
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          console.log("✅ User logged in:", session.user.email);
        }

        // ─── Exam Fetch ────────────────────────────────────
        const { exam: examData, error: examError } = await getExamById(examId);

        if (examError || !examData) {
          console.error("❌ Exam not found:", examError);
          setError("পরীক্ষাটি পাওয়া যায়নি!");
          setLoading(false);
          return;
        }

        setExam(examData);
        console.log("✅ Exam loaded:", examData.title);

        // ─── Question Count ────────────────────────────────
        const count = await getExamQuestionCount(examId);
        setQuestionCount(count);

        // ─── Previous Attempts (if logged in) ──────────────
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
      <div className="min-h-screen bg-[#0A0A1A] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/5 rounded w-1/3"></div>
            <div className="h-12 bg-white/5 rounded w-2/3"></div>
            <div className="h-32 bg-white/5 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-white/5 rounded"></div>
              <div className="h-24 bg-white/5 rounded"></div>
              <div className="h-24 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error State ────────────────────────────────────────
  if (error || !exam) {
    return (
      <div className="min-h-screen bg-[#0A0A1A] flex items-center justify-center p-4">
        <div className="text-center bg-white/5 border border-red-500/30 rounded-2xl p-8 max-w-md">
          <FaExclamationTriangle className="text-red-400 text-5xl mx-auto mb-4" />
          <p className="text-white text-xl mb-2">{error || "পরীক্ষাটি পাওয়া যায়নি"}</p>
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/80 transition-colors"
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
    <div className="min-h-screen bg-[#0A0A1A] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ── Back Button ──────────────────────────────────── */}
        <Link
          href="/exams"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>সব পরীক্ষায় ফিরে যাও</span>
        </Link>

        {/* ── Exam Header Card ─────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {exam.categories && (
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                📚 {exam.categories.name}
              </span>
            )}
            {exam.is_free ? (
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                বিনামূল্যে
              </span>
            ) : (
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaLock className="text-[10px]" /> প্রিমিয়াম
              </span>
            )}
            {exam.is_randomized && (
              <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FaRandom /> এলোমেলো প্রশ্ন
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">{exam.title}</h1>

          {/* Description */}
          {exam.description && (
            <p className="text-white/70 text-base leading-relaxed">{exam.description}</p>
          )}
        </div>

        {/* ── Stats Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <FaQuestionCircle className="text-primary text-2xl mx-auto mb-2" />
            <div className="text-white text-2xl font-bold">{questionCount}</div>
            <div className="text-white/50 text-sm">প্রশ্ন</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <FaClock className="text-secondary text-2xl mx-auto mb-2" />
            <div className="text-white text-2xl font-bold">{exam.duration_minutes}</div>
            <div className="text-white/50 text-sm">মিনিট</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <FaTrophy className="text-accent text-2xl mx-auto mb-2" />
            <div className="text-white text-2xl font-bold">{exam.total_marks}</div>
            <div className="text-white/50 text-sm">মোট নম্বর</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
            <div className="text-white text-2xl font-bold">{exam.pass_marks}</div>
            <div className="text-white/50 text-sm">পাস মার্কস</div>
          </div>
        </div>

        {/* ── Rules / Important Info ──────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            ⚠️ গুরুত্বপূর্ণ তথ্য
          </h2>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>মোট প্রশ্ন: {questionCount}টি</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>সময়: {exam.duration_minutes} মিনিট</span>
            </li>
            {exam.has_negative_marking && (
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span className="text-red-400">
                  নেগেটিভ মার্কিং আছে - প্রতিটি ভুল উত্তরে {exam.negative_mark_value} নম্বর কাটা
                  যাবে
                </span>
              </li>
            )}
            {exam.is_randomized && (
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>প্রশ্ন এলোমেলোভাবে আসবে</span>
              </li>
            )}
            {exam.max_attempts && (
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>
                  সর্বোচ্চ {exam.max_attempts} বার চেষ্টা করা যাবে
                  {user && ` (বাকি ${attemptsLeft} বার)`}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* ── Previous Attempts ───────────────────────────── */}
        {user && previousAttempts.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <FaHistory /> তোমার পূর্ববর্তী চেষ্টা
            </h2>
            <div className="space-y-2">
              {previousAttempts.slice(0, 3).map((attempt, idx) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-sm">#{idx + 1}</span>
                    <span
                      className={`text-sm font-semibold ${
                        attempt.is_passed ? "text-secondary" : "text-red-400"
                      }`}
                    >
                      {attempt.is_passed ? "✅ পাস" : "❌ ফেল"}
                    </span>
                    <span className="text-white text-sm">
                      {attempt.score}/{attempt.total_marks}
                    </span>
                  </div>
                  <span className="text-white/40 text-xs">
                    {new Date(attempt.completed_at).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Start Button ─────────────────────────────────── */}
        <div className="bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-6 text-center">
          {!user ? (
            <>
              <p className="text-white/70 mb-4">পরীক্ষা শুরু করতে লগইন করুন</p>
              <Link
                href={`/login?redirect=/exams/${examId}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/80 transition-colors"
              >
                <FaLock /> লগইন করুন
              </Link>
            </>
          ) : !canAttempt ? (
            <>
              <p className="text-red-400 mb-2 font-semibold">❌ সর্বোচ্চ চেষ্টা সংখ্যা শেষ</p>
              <p className="text-white/60 text-sm">
                তুমি এই পরীক্ষায় {exam.max_attempts} বার চেষ্টা করেছো।
              </p>
            </>
          ) : questionCount === 0 ? (
            <>
              <p className="text-yellow-400 mb-2">⚠️ এই পরীক্ষায় এখনো কোনো প্রশ্ন যুক্ত হয়নি</p>
            </>
          ) : (
            <>
              <p className="text-white/70 mb-4">
                প্রস্তুত? শুরু করার পর {exam.duration_minutes} মিনিটের মধ্যে শেষ করতে হবে।
              </p>
              <Link
                href={`/exams/${examId}/start`}
                className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-secondary/80 transition-colors"
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
