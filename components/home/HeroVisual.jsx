// components/home/HeroVisual.jsx
// ═══════════════════════════════════
// 🎴 Hero Visual — MCQ Card Preview
// Lucide icons | CSS animations | brand colors
// ═══════════════════════════════════

"use client";

import { useMemo } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toBanglaNumber } from "@/lib/utils";

export default function HeroVisual() {
  const mcqOptions = useMemo(
    () => [
      { letter: "ক", text: "৪ নভেম্বর ১৯৭২", status: "correct" },
      { letter: "খ", text: "১৬ ডিসেম্বর ১৯৭২", status: "wrong" },
      { letter: "গ", text: "২৬ মার্চ ১৯৭১", status: "default" },
      { letter: "ঘ", text: "১৭ এপ্রিল ১৯৭১", status: "default" },
    ],
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-8 relative mx-auto w-full max-w-lg duration-700 delay-300 lg:mx-0">
      {/* ══════════════════════════════════ */}
      {/* ██  MCQ Card Preview             */}
      {/* ══════════════════════════════════ */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-800/10">
        {/* ── Card Header ── */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Q Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-800 to-brand-900 text-sm font-bold text-white">
              Q
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">বাংলাদেশ বিষয়াবলি</p>
              <p className="text-xs text-slate-500">
                প্রশ্ন {toBanglaNumber(15)}/{toBanglaNumber(50)}
              </p>
            </div>
          </div>

          {/* Timer Badge */}
          <div className="flex items-center gap-1 rounded-full border border-amber-300/50 bg-amber-400/10 px-3 py-1">
            <span className="text-xs font-bold text-amber-600">
              ⏱ {toBanglaNumber(24)}:{toBanglaNumber(35)}
            </span>
          </div>
        </div>

        {/* ── Question Text ── */}
        <div className="mb-4">
          <p className="text-sm font-medium leading-relaxed text-slate-800">
            বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?
          </p>
        </div>

        {/* ── Options ── */}
        <div className="space-y-2">
          {mcqOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-150 ${
                option.status === "correct"
                  ? "border-emerald-500/40 bg-emerald-500/8"
                  : option.status === "wrong"
                    ? "border-red-500/40 bg-red-500/8"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              {/* Letter */}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  option.status === "correct"
                    ? "bg-emerald-500/15 text-emerald-600"
                    : option.status === "wrong"
                      ? "bg-red-500/15 text-red-600"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {option.letter}
              </span>

              {/* Text */}
              <span
                className={`flex-1 text-sm ${
                  option.status === "correct"
                    ? "font-medium text-emerald-600"
                    : option.status === "wrong"
                      ? "font-medium text-red-600"
                      : "text-slate-500"
                }`}
              >
                {option.text}
              </span>

              {/* Status Icon */}
              {option.status === "correct" && (
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
              )}
              {option.status === "wrong" && <XCircle className="h-5 w-5 shrink-0 text-red-500" />}
            </div>
          ))}
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">অগ্রগতি</span>
            <span className="text-xs font-bold text-emerald-600">{toBanglaNumber(78)}%</span>
          </div>
          {/* CSS transition: animate on mount */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full animate-in fade-in rounded-full bg-linear-to-r from-brand-800 to-emerald-500 duration-1000 delay-700"
              style={{ width: "78%" }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ */}
      {/* ██  Floating Card 1 — Top Right  */}
      {/* ══════════════════════════════════ */}
      <div className="absolute -right-4 -top-4 animate-in fade-in slide-in-from-right-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg duration-500 delay-500">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
            <span className="text-lg">✅</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{toBanglaNumber(85)}%</p>
            <p className="text-[10px] text-slate-500">সঠিক উত্তর</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ */}
      {/* ██  Floating Card 2 — Bot Left   */}
      {/* ══════════════════════════════════ */}
      <div className="absolute -bottom-4 -left-4 animate-in fade-in slide-in-from-left-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg duration-500 delay-700">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800/10">
            <span className="text-lg">🏆</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">#{toBanglaNumber(12)}</p>
            <p className="text-[10px] text-slate-500">লিডারবোর্ড</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════ */}
      {/* ██  Floating Card 3 — Mid Left   */}
      {/* (lg only)                        */}
      {/* ══════════════════════════════════ */}
      <div className="absolute -left-8 top-1/3 hidden animate-in fade-in slide-in-from-left-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg duration-500 delay-1000 lg:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15">
            <span className="text-lg">🔥</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{toBanglaNumber(7)} দিন</p>
            <p className="text-[10px] text-slate-500">ধারাবাহিক</p>
          </div>
        </div>
      </div>
    </div>
  );
}
