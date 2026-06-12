"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  HiChartBar,
  HiTrendingUp,
  HiAcademicCap,
  HiClock,
  HiCheckCircle,
  HiMinusCircle,
  HiLightBulb,
  HiStar,
  HiArrowLeft,
} from "react-icons/hi";

// ═══════════════════════════════════════
// 🔢 বাংলা Number Converter
// ═══════════════════════════════════════
const toBangla = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => banglaDigits[d]);
};

// ═══════════════════════════════════════
// ⏱️ Time Formatter
// ═══════════════════════════════════════
const formatTime = (seconds) => {
  if (!seconds || seconds <= 0) return "০ সে";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${toBangla(secs)} সে`;
  if (secs === 0) return `${toBangla(mins)} মি`;
  return `${toBangla(mins)} মি ${toBangla(secs)} সে`;
};

// ═══════════════════════════════════════
// 📅 Date Formatter
// ═══════════════════════════════════════
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "আজ";
  if (diffDays === 1) return "গতকাল";
  if (diffDays < 7) return `${toBangla(diffDays)} দিন আগে`;
  if (diffDays < 30) return `${toBangla(Math.floor(diffDays / 7))} সপ্তাহ আগে`;
  return `${toBangla(Math.floor(diffDays / 30))} মাস আগে`;
};

// ═══════════════════════════════════════
// 🎨 SVG LINE CHART Component
// ═══════════════════════════════════════
const LineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 320;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxScore = Math.max(...data.map((d) => d.percentage), 10);
  const minScore = 0;

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth;
    const y =
      padding.top + chartHeight - ((d.percentage - minScore) / (maxScore - minScore)) * chartHeight;
    return { x, y, ...d };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const ySteps = 5;
  const yLabels = [];
  for (let i = 0; i <= ySteps; i++) {
    const val = Math.round(minScore + ((maxScore - minScore) / ySteps) * i);
    const y = padding.top + chartHeight - (i / ySteps) * chartHeight;
    yLabels.push({ val, y });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Grid Lines */}
      {yLabels.map((label, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            y1={label.y}
            x2={width - padding.right}
            y2={label.y}
            stroke="rgba(30,41,59,0.1)"
            strokeDasharray="3,3"
          />
          <text
            x={padding.left - 5}
            y={label.y + 4}
            textAnchor="end"
            fill="rgba(30,41,59,0.4)"
            fontSize="9"
          >
            {label.val}%
          </text>
        </g>
      ))}

      {/* Area Gradient */}
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area Fill */}
      {points.length > 1 && (
        <polygon
          points={`${padding.left},${padding.top + chartHeight} ${polylinePoints} ${
            points[points.length - 1].x
          },${padding.top + chartHeight}`}
          fill="url(#areaGradient)"
        />
      )}

      {/* Line */}
      {points.length > 1 && (
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Dots */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#10B981" strokeWidth="2.5" />
          <text x={p.x} y={height - 8} textAnchor="middle" fill="rgba(30,41,59,0.4)" fontSize="9">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ═══════════════════════════════════════
// 🍩 SVG DONUT CHART Component
// ═══════════════════════════════════════
const DonutChart = ({ correct, wrong, skipped }) => {
  const total = correct + wrong + skipped;
  if (total === 0) return null;

  const size = 160;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const correctPct = correct / total;
  const wrongPct = wrong / total;
  const skippedPct = skipped / total;

  const correctDash = correctPct * circumference;
  const wrongDash = wrongPct * circumference;
  const skippedDash = skippedPct * circumference;

  const correctOffset = 0;
  const wrongOffset = -correctDash;
  const skippedOffset = -(correctDash + wrongDash);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />

          {/* Skipped Segment */}
          {skipped > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#94A3B8"
              strokeWidth={strokeWidth}
              strokeDasharray={`${skippedDash} ${circumference - skippedDash}`}
              strokeDashoffset={skippedOffset}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          )}

          {/* Wrong Segment */}
          {wrong > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#EF4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${wrongDash} ${circumference - wrongDash}`}
              strokeDashoffset={wrongOffset}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          )}

          {/* Correct Segment */}
          {correct > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#10B981"
              strokeWidth={strokeWidth}
              strokeDasharray={`${correctDash} ${circumference - correctDash}`}
              strokeDashoffset={correctOffset}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          )}

          {/* Center Text */}
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            fill="#1F2937"
            fontSize="20"
            fontWeight="bold"
          >
            {toBangla(total)}
          </text>
          <text x={center} y={center + 12} textAnchor="middle" fill="#94A3B8" fontSize="10">
            মোট উত্তর
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-slate-600">সঠিক: {toBangla(correct)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
          <span className="text-slate-600">ভুল: {toBangla(wrong)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
          <span className="text-slate-600">স্কিপ: {toBangla(skipped)}</span>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// 📊 HORIZONTAL BAR Component
// ═══════════════════════════════════════
const HorizontalBar = ({ label, value, max, color = "bg-emerald-500" }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="text-gray-800 font-medium">{toBangla(value)}টি</span>
      </div>
      <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{
            width: `${Math.max(percentage, percentage > 0 ? 4 : 0)}%`,
          }}
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// 🏠 MAIN ANALYTICS CLIENT
// ═══════════════════════════════════════
export default function AnalyticsClient({ attempts = [] }) {
  const router = useRouter();

  // ═══════════════════════════════════
  // 📊 Calculate All Analytics
  // ═══════════════════════════════════
  const stats = useMemo(() => {
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        avgScore: 0,
        passRate: 0,
        bestScore: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalSkipped: 0,
        bestTime: 0,
        avgTime: 0,
        maxCorrect: 0,
        lastExamDate: null,
        totalQuestions: 0,
        scoreDistribution: [0, 0, 0, 0, 0],
        trendData: [],
        tips: [],
      };
    }

    const totalAttempts = attempts.length;
    const passCount = attempts.filter((a) => a.is_passed).length;
    const passRate = Math.round((passCount / totalAttempts) * 100);

    const percentages = attempts.map((a) =>
      a.total_marks > 0 ? Math.round((a.score / a.total_marks) * 100) : 0
    );
    const avgScore = Math.round(percentages.reduce((s, v) => s + v, 0) / totalAttempts);
    const bestScore = Math.max(...percentages);

    const totalCorrect = attempts.reduce((s, a) => s + (a.correct_count || 0), 0);
    const totalWrong = attempts.reduce((s, a) => s + (a.wrong_count || 0), 0);
    const totalSkipped = attempts.reduce((s, a) => s + (a.skipped_count || 0), 0);
    const totalQuestions = totalCorrect + totalWrong + totalSkipped;

    const times = attempts.map((a) => a.time_taken_seconds || 0).filter((t) => t > 0);
    const bestTime = times.length > 0 ? Math.min(...times) : 0;
    const avgTime =
      times.length > 0 ? Math.round(times.reduce((s, t) => s + t, 0) / times.length) : 0;

    const maxCorrect = Math.max(...attempts.map((a) => a.correct_count || 0));

    const lastExamDate = attempts.length > 0 ? attempts[attempts.length - 1].completed_at : null;

    const scoreDistribution = [0, 0, 0, 0, 0];
    percentages.forEach((p) => {
      if (p < 20) scoreDistribution[0]++;
      else if (p < 40) scoreDistribution[1]++;
      else if (p < 60) scoreDistribution[2]++;
      else if (p < 80) scoreDistribution[3]++;
      else scoreDistribution[4]++;
    });

    const trendData = attempts.map((a, i) => ({
      attempt: i + 1,
      percentage: a.total_marks > 0 ? Math.round((a.score / a.total_marks) * 100) : 0,
      date: a.completed_at,
    }));

    const tips = [];
    if (passRate === 0) {
      tips.push({
        icon: "warning",
        text: "আপনার পাস রেট ০%। বেসিক থেকে শুরু করুন এবং নিয়মিত অনুশীলন করুন।",
        color: "text-amber-600",
      });
    } else if (passRate < 50) {
      tips.push({
        icon: "warning",
        text: `পাস রেট ${toBangla(passRate)}%। প্রতিটি ভুল উত্তর বিশ্লেষণ করুন।`,
        color: "text-amber-600",
      });
    } else {
      tips.push({
        icon: "star",
        text: `দারুণ! পাস রেট ${toBangla(passRate)}%। এভাবে চালিয়ে যান!`,
        color: "text-emerald-600",
      });
    }

    if (avgScore < 30) {
      tips.push({
        icon: "info",
        text: "গড় স্কোর কম। প্রতিদিন কমপক্ষে ১টি পরীক্ষা দিন।",
        color: "text-primary",
      });
    } else if (avgScore < 60) {
      tips.push({
        icon: "info",
        text: "গড় স্কোর মাঝামাঝি। দুর্বল বিষয়গুলোতে বেশি ফোকাস করুন।",
        color: "text-primary",
      });
    } else {
      tips.push({
        icon: "star",
        text: "গড় স্কোর ভালো! আরো কঠিন পরীক্ষায় চ্যালেঞ্জ নিন।",
        color: "text-emerald-600",
      });
    }

    if (totalAttempts >= 5) {
      tips.push({
        icon: "star",
        text: `আপনি ${toBangla(totalAttempts)}টি পরীক্ষা দিয়েছেন! ধারাবাহিকতা বজায় রাখুন।`,
        color: "text-emerald-600",
      });
    } else {
      tips.push({
        icon: "info",
        text: "আরো বেশি পরীক্ষা দিন। অনুশীলনই সফলতার চাবিকাঠি।",
        color: "text-primary",
      });
    }

    if (totalSkipped > totalCorrect) {
      tips.push({
        icon: "warning",
        text: "স্কিপ করা প্রশ্ন বেশি। সব প্রশ্নের উত্তর দেওয়ার চেষ্টা করুন।",
        color: "text-amber-600",
      });
    }

    return {
      totalAttempts,
      avgScore,
      passRate,
      bestScore,
      totalCorrect,
      totalWrong,
      totalSkipped,
      bestTime,
      avgTime,
      maxCorrect,
      lastExamDate,
      totalQuestions,
      scoreDistribution,
      trendData,
      tips,
    };
  }, [attempts]);

  // ═══════════════════════════════════
  // 📭 Empty State
  // ═══════════════════════════════════
  if (attempts.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFBFC]">
        {/* Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-4 pt-6">
          {/* Back Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 cursor-pointer font-medium"
          >
            <HiArrowLeft className="text-lg" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>

          {/* Empty Card */}
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm max-w-sm w-full">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiChartBar className="text-primary text-3xl" />
              </div>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">কোনো ডেটা নেই</h2>
              <p className="text-slate-500 mb-6">এনালিটিক্স দেখতে অন্তত একটি পরীক্ষা দিন</p>
              <button
                onClick={() => router.push("/exams")}
                className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                পরীক্ষা দিন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════
  // 📊 Score Distribution Labels
  // ═══════════════════════════════════
  const distLabels = ["০-২০%", "২০-৪০%", "৪০-৬০%", "৬০-৮০%", "৮০-১০০%"];
  const distColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-primary",
    "bg-emerald-500",
  ];
  const maxDist = Math.max(...stats.scoreDistribution, 1);

  // ═══════════════════════════════════
  // 🎨 MAIN RENDER
  // ═══════════════════════════════════
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 pt-6 pb-20">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4 cursor-pointer font-medium"
          >
            <HiArrowLeft className="text-lg" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
              <HiChartBar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">পারফরম্যান্স এনালিটিক্স</h1>
              <p className="text-slate-500 text-sm">আপনার পরীক্ষার বিস্তারিত বিশ্লেষণ</p>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 1: Overview Stats ═══════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {/* মোট পরীক্ষা */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                <HiAcademicCap className="text-emerald-600 text-base" />
              </div>
              <span className="text-slate-500 text-xs">মোট পরীক্ষা</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{toBangla(stats.totalAttempts)}</p>
          </div>

          {/* গড় স্কোর */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                <HiTrendingUp className="text-primary text-base" />
              </div>
              <span className="text-slate-500 text-xs">গড় স্কোর</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{toBangla(stats.avgScore)}%</p>
          </div>

          {/* পাস রেট */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                <HiCheckCircle className="text-amber-600 text-base" />
              </div>
              <span className="text-slate-500 text-xs">পাস রেট</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{toBangla(stats.passRate)}%</p>
          </div>

          {/* সেরা স্কোর */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center">
                <HiStar className="text-purple-600 text-base" />
              </div>
              <span className="text-slate-500 text-xs">সেরা স্কোর</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{toBangla(stats.bestScore)}%</p>
          </div>
        </div>

        {/* ═══════════ SECTION 2: Score Trend ═══════════ */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
              <HiTrendingUp className="text-emerald-600 text-base" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">স্কোর ট্রেন্ড</h2>
          </div>
          <p className="text-slate-500 text-xs mb-4 ml-9">প্রতিটি পরীক্ষায় আপনার স্কোর (%)</p>
          <LineChart data={stats.trendData} />
          <p className="text-center text-slate-400 text-xs mt-2">পরীক্ষা ক্রম →</p>
        </div>

        {/* ═══════════ SECTION 3: Score Distribution ═══════════ */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
              <HiChartBar className="text-primary text-base" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">স্কোর ডিস্ট্রিবিউশন</h2>
          </div>
          <p className="text-slate-500 text-xs mb-5 ml-9">কোন স্কোর রেঞ্জে কতটি পরীক্ষা</p>

          <div className="space-y-4">
            {distLabels.map((label, i) => (
              <HorizontalBar
                key={i}
                label={label}
                value={stats.scoreDistribution[i]}
                max={maxDist}
                color={distColors[i]}
              />
            ))}
          </div>
        </div>

        {/* ═══════════ SECTION 4: Accuracy Donut ═══════════ */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
              <HiCheckCircle className="text-emerald-600 text-base" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">উত্তরের নির্ভুলতা</h2>
          </div>
          <p className="text-slate-500 text-xs mb-5 ml-9">সব পরীক্ষা মিলিয়ে সঠিক, ভুল ও স্কিপ</p>

          <DonutChart
            correct={stats.totalCorrect}
            wrong={stats.totalWrong}
            skipped={stats.totalSkipped}
          />

          <div className="mt-5 text-center">
            <p className="text-slate-500 text-sm">নির্ভুলতার হার</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">
              {toBangla(
                stats.totalQuestions > 0
                  ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
                  : 0
              )}
              %
            </p>
          </div>
        </div>

        {/* ═══════════ SECTION 5: Performance Summary ═══════════ */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
              <HiStar className="text-amber-600 text-base" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">পারফরম্যান্স সারাংশ</h2>
          </div>

          {/* Best Records */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-4">
            <h3 className="text-emerald-700 font-semibold text-sm mb-3 flex items-center gap-2">
              <HiStar className="text-lg" />
              ব্যক্তিগত সেরা রেকর্ড
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">সর্বোচ্চ স্কোর</span>
                <span className="text-gray-900 font-semibold">{toBangla(stats.bestScore)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">দ্রুততম সময়</span>
                <span className="text-gray-900 font-semibold">{formatTime(stats.bestTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">সবচেয়ে বেশি সঠিক</span>
                <span className="text-gray-900 font-semibold">{toBangla(stats.maxCorrect)}টি</span>
              </div>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
            <h3 className="text-primary font-semibold text-sm mb-3 flex items-center gap-2">
              <HiClock className="text-lg" />
              সামগ্রিক পরিসংখ্যান
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">গড় সময়</span>
                <span className="text-gray-900 font-semibold">{formatTime(stats.avgTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">মোট প্রশ্নের উত্তর</span>
                <span className="text-gray-900 font-semibold">
                  {toBangla(stats.totalQuestions)}টি
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">সর্বশেষ পরীক্ষা</span>
                <span className="text-gray-900 font-semibold">
                  {formatDate(stats.lastExamDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 6: Improvement Tips ═══════════ */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
              <HiLightBulb className="text-amber-600 text-base" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">উন্নতির টিপস</h2>
          </div>

          <div className="space-y-3">
            {stats.tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]"
              >
                <div className="shrink-0 mt-0.5">
                  {tip.icon === "warning" && <HiMinusCircle className={`text-xl ${tip.color}`} />}
                  {tip.icon === "info" && <HiLightBulb className={`text-xl ${tip.color}`} />}
                  {tip.icon === "star" && <HiStar className={`text-xl ${tip.color}`} />}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ BOTTOM ACTIONS ═══════════ */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/dashboard/history")}
            className="flex-1 py-3 bg-white border border-[#E2E8F0] text-gray-700 rounded-xl hover:bg-[#F1F5F9] hover:border-primary/30 transition-all duration-200 text-center cursor-pointer font-medium"
          >
            📋 পরীক্ষার ইতিহাস দেখুন
          </button>
          <button
            onClick={() => router.push("/exams")}
            className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer font-medium"
          >
            📝 নতুন পরীক্ষা দিন
          </button>
        </div>
      </div>
    </div>
  );
}
