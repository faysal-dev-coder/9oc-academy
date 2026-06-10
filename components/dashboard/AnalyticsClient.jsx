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
      {yLabels.map((label, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            y1={label.y}
            x2={width - padding.right}
            y2={label.y}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="3,3"
          />
          <text
            x={padding.left - 5}
            y={label.y + 4}
            textAnchor="end"
            fill="rgba(255,255,255,0.4)"
            fontSize="9"
          >
            {label.val}%
          </text>
        </g>
      ))}

      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {points.length > 1 && (
        <polygon
          points={`${padding.left},${padding.top + chartHeight} ${polylinePoints} ${
            points[points.length - 1].x
          },${padding.top + chartHeight}`}
          fill="url(#areaGradient)"
        />
      )}

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

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#0A0A1A" stroke="#10B981" strokeWidth="2.5" />
          <text
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="9"
          >
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
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />

          {skipped > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#6B7280"
              strokeWidth={strokeWidth}
              strokeDasharray={`${skippedDash} ${circumference - skippedDash}`}
              strokeDashoffset={skippedOffset}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          )}

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

          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            {toBangla(total)}
          </text>
          <text
            x={center}
            y={center + 12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
          >
            মোট উত্তর
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-white/70">সঠিক: {toBangla(correct)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
          <span className="text-white/70">ভুল: {toBangla(wrong)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-500 shrink-0" />
          <span className="text-white/70">স্কিপ: {toBangla(skipped)}</span>
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
        <span className="text-white/70">{label}</span>
        <span className="text-white/90 font-medium">{toBangla(value)}টি</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${Math.max(percentage, percentage > 0 ? 4 : 0)}%` }}
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
        color: "text-amber-400",
      });
    } else if (passRate < 50) {
      tips.push({
        icon: "warning",
        text: `পাস রেট ${toBangla(passRate)}%। প্রতিটি ভুল উত্তর বিশ্লেষণ করুন।`,
        color: "text-amber-400",
      });
    } else {
      tips.push({
        icon: "star",
        text: `দারুণ! পাস রেট ${toBangla(passRate)}%। এভাবে চালিয়ে যান!`,
        color: "text-emerald-400",
      });
    }

    if (avgScore < 30) {
      tips.push({
        icon: "info",
        text: "গড় স্কোর কম। প্রতিদিন কমপক্ষে ১টি পরীক্ষা দিন।",
        color: "text-blue-400",
      });
    } else if (avgScore < 60) {
      tips.push({
        icon: "info",
        text: "গড় স্কোর মাঝামাঝি। দুর্বল বিষয়গুলোতে বেশি ফোকাস করুন।",
        color: "text-blue-400",
      });
    } else {
      tips.push({
        icon: "star",
        text: "গড় স্কোর ভালো! আরো কঠিন পরীক্ষায় চ্যালেঞ্জ নিন।",
        color: "text-emerald-400",
      });
    }

    if (totalAttempts >= 5) {
      tips.push({
        icon: "star",
        text: `আপনি ${toBangla(totalAttempts)}টি পরীক্ষা দিয়েছেন! ধারাবাহিকতা বজায় রাখুন।`,
        color: "text-emerald-400",
      });
    } else {
      tips.push({
        icon: "info",
        text: "আরো বেশি পরীক্ষা দিন। অনুশীলনই সফলতার চাবিকাঠি।",
        color: "text-blue-400",
      });
    }

    if (totalSkipped > totalCorrect) {
      tips.push({
        icon: "warning",
        text: "স্কিপ করা প্রশ্ন বেশি। সব প্রশ্নের উত্তর দেওয়ার চেষ্টা করুন।",
        color: "text-amber-400",
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
      <div className="min-h-screen bg-[#0A0A1A]">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-4 pt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <HiArrowLeft className="text-lg" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>

          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-sm w-full">
              <HiChartBar className="text-white/20 text-6xl mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">কোনো ডেটা নেই</h2>
              <p className="text-white/50 mb-6">এনালিটিক্স দেখতে অন্তত একটি পরীক্ষা দিন</p>
              <button
                onClick={() => router.push("/exams")}
                className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
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
    "bg-blue-500",
    "bg-emerald-500",
  ];
  const maxDist = Math.max(...stats.scoreDistribution, 1);

  // ═══════════════════════════════════
  // 🎨 MAIN RENDER
  // ═══════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0A0A1A]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 pt-6 pb-20">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 cursor-pointer"
          >
            <HiArrowLeft className="text-lg" />
            <span>ড্যাশবোর্ডে ফিরুন</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
              <HiChartBar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">পারফরম্যান্স এনালিটিক্স</h1>
              <p className="text-white/50 text-sm">আপনার পরীক্ষার বিস্তারিত বিশ্লেষণ</p>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 1: Overview Stats ═══════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <HiAcademicCap className="text-emerald-400 text-lg" />
              <span className="text-white/50 text-xs">মোট পরীক্ষা</span>
            </div>
            <p className="text-2xl font-bold text-white">{toBangla(stats.totalAttempts)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <HiTrendingUp className="text-blue-400 text-lg" />
              <span className="text-white/50 text-xs">গড় স্কোর</span>
            </div>
            <p className="text-2xl font-bold text-white">{toBangla(stats.avgScore)}%</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <HiCheckCircle className="text-amber-400 text-lg" />
              <span className="text-white/50 text-xs">পাস রেট</span>
            </div>
            <p className="text-2xl font-bold text-white">{toBangla(stats.passRate)}%</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <HiStar className="text-purple-400 text-lg" />
              <span className="text-white/50 text-xs">সেরা স্কোর</span>
            </div>
            <p className="text-2xl font-bold text-white">{toBangla(stats.bestScore)}%</p>
          </div>
        </div>

        {/* ═══════════ SECTION 2: Score Trend ═══════════ */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HiTrendingUp className="text-emerald-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">স্কোর ট্রেন্ড</h2>
          </div>
          <p className="text-white/40 text-xs mb-4">প্রতিটি পরীক্ষায় আপনার স্কোর (%)</p>
          <LineChart data={stats.trendData} />
          <p className="text-center text-white/30 text-xs mt-2">পরীক্ষা ক্রম →</p>
        </div>

        {/* ═══════════ SECTION 3: Score Distribution ═══════════ */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HiChartBar className="text-blue-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">স্কোর ডিস্ট্রিবিউশন</h2>
          </div>
          <p className="text-white/40 text-xs mb-5">কোন স্কোর রেঞ্জে কতটি পরীক্ষা</p>

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
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HiCheckCircle className="text-emerald-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">উত্তরের নির্ভুলতা</h2>
          </div>
          <p className="text-white/40 text-xs mb-5">সব পরীক্ষা মিলিয়ে সঠিক, ভুল ও স্কিপ</p>

          <DonutChart
            correct={stats.totalCorrect}
            wrong={stats.totalWrong}
            skipped={stats.totalSkipped}
          />

          <div className="mt-5 text-center">
            <p className="text-white/50 text-sm">নির্ভুলতার হার</p>
            <p className="text-3xl font-bold text-emerald-400">
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
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <HiStar className="text-amber-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">পারফরম্যান্স সারাংশ</h2>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
            <h3 className="text-emerald-400 font-medium text-sm mb-3 flex items-center gap-2">
              <HiStar className="text-lg" />
              ব্যক্তিগত সেরা রেকর্ড
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">সর্বোচ্চ স্কোর</span>
                <span className="text-white font-medium">{toBangla(stats.bestScore)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">দ্রুততম সময়</span>
                <span className="text-white font-medium">{formatTime(stats.bestTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">সবচেয়ে বেশি সঠিক</span>
                <span className="text-white font-medium">{toBangla(stats.maxCorrect)}টি</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <h3 className="text-blue-400 font-medium text-sm mb-3 flex items-center gap-2">
              <HiClock className="text-lg" />
              সামগ্রিক পরিসংখ্যান
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">গড় সময়</span>
                <span className="text-white font-medium">{formatTime(stats.avgTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">মোট প্রশ্নের উত্তর</span>
                <span className="text-white font-medium">{toBangla(stats.totalQuestions)}টি</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">সর্বশেষ পরীক্ষা</span>
                <span className="text-white font-medium">{formatDate(stats.lastExamDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ SECTION 6: Improvement Tips ═══════════ */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <HiLightBulb className="text-amber-400 text-xl" />
            <h2 className="text-lg font-semibold text-white">উন্নতির টিপস</h2>
          </div>

          <div className="space-y-3">
            {stats.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="shrink-0 mt-0.5">
                  {tip.icon === "warning" && <HiMinusCircle className={`text-xl ${tip.color}`} />}
                  {tip.icon === "info" && <HiLightBulb className={`text-xl ${tip.color}`} />}
                  {tip.icon === "star" && <HiStar className={`text-xl ${tip.color}`} />}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ BOTTOM ACTIONS ═══════════ */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/dashboard/history")}
            className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors text-center cursor-pointer"
          >
            📋 পরীক্ষার ইতিহাস দেখুন
          </button>
          <button
            onClick={() => router.push("/exams")}
            className="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors text-center cursor-pointer"
          >
            📝 নতুন পরীক্ষা দিন
          </button>
        </div>
      </div>
    </div>
  );
}
