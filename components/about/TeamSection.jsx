// components/about/TeamSection.jsx
// ═══════════════════════════════════════════
// 👥 Team Section — Apple Style
// ├── Initials avatars (NO emoji!)
// ├── 5-color gradient rotation
// ├── Lucide UI + react-icons/fa brands
// └── CSS animations only
// ═══════════════════════════════════════════

"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/constants";

// ═══════════════════════════════════════════
// 🎨 5-color avatar gradient cycle
// ═══════════════════════════════════════════
const AVATAR_GRADIENTS = [
  {
    gradient: "from-brand-700 to-brand-900",
    bg: "bg-brand-50",
    border: "border-brand-200",
    text: "text-brand-800",
    line: "from-brand-700 to-brand-900",
  },
  {
    gradient: "from-emerald-600 to-emerald-800",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    line: "from-emerald-600 to-emerald-800",
  },
  {
    gradient: "from-amber-600 to-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    line: "from-amber-600 to-amber-800",
  },
  {
    gradient: "from-rose-600 to-rose-800",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    line: "from-rose-600 to-rose-800",
  },
  {
    gradient: "from-violet-600 to-violet-800",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    line: "from-violet-600 to-violet-800",
  },
];

// ═══════════════════════════════════════════
// 🛠️ Initials Extractor
// ═══════════════════════════════════════════
const getInitials = (name) => {
  if (!name) return "??";
  // Bengali name এর first letter দুটো word থেকে
  const words = name.trim().split(/\s+/);
  // Skip "মো:", "মোঃ", "মোহাম্মদ" prefix
  const skipWords = ["মো:", "মোঃ", "মোহাম্মদ", "ইঞ্জিনিয়ার"];
  const realWords = words.filter((w) => !skipWords.includes(w));

  const first = realWords[0]?.charAt(0) ?? words[0]?.charAt(0) ?? "";
  const second = realWords[1]?.charAt(0) ?? "";
  return first + second || "??";
};

export default function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* ─── Background ─────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(30,64,175,0.08) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ Apple Header ═══════════════ */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              আমাদের টিম
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            পরিচিত হোন <span className="text-slate-500">টিমের সাথে</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            অভিজ্ঞ শিক্ষক, BCS ক্যাডার এবং টেকনোলজি বিশেষজ্ঞদের নিয়ে গঠিত আমাদের টিম। প্রত্যেকেই
            তাদের ক্ষেত্রে দক্ষ ও নিবেদিতপ্রাণ।
          </p>
        </div>

        {/* ═══ Team Grid ══════════════════ */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TEAM_MEMBERS.map((member, index) => {
            const colors = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
            const initials = getInitials(member.name);

            return (
              <article
                key={member.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Top Accent */}
                <div
                  className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.line}`}
                />

                {/* ─── Avatar (Initials!) ──── */}
                <div className="relative mx-auto mb-6 h-24 w-24">
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 rounded-full bg-linear-to-br ${colors.gradient} opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40`}
                  />

                  {/* Avatar Circle */}
                  <div
                    className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br ${colors.gradient} text-3xl font-black text-white shadow-xl ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {initials}
                  </div>
                </div>

                {/* Name */}
                <h3 className="mb-3 text-center text-xl font-black text-slate-900">
                  {member.name}
                </h3>

                {/* Role Badge */}
                <div className="mb-4 flex justify-center">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${colors.bg} ${colors.border} ${colors.text}`}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Bio */}
                <p className="mb-6 min-h-20 text-center text-sm leading-relaxed text-slate-600">
                  {member.bio}
                </p>

                {/* Divider */}
                <div className="mb-4 h-px bg-slate-200" />

                {/* Social Icons (Brand: react-icons/fa OK!) */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={member.social?.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                  >
                    <FaFacebookF className="h-4 w-4" />
                  </a>

                  <a
                    href={member.social?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                  >
                    <FaLinkedinIn className="h-4 w-4" />
                  </a>
                </div>

                {/* Bottom Accent (expand on hover) */}
                <div
                  className={`absolute bottom-0 left-1/2 h-1 w-1/4 -translate-x-1/2 rounded-t-full bg-linear-to-r ${colors.line} transition-all duration-500 group-hover:w-full`}
                />
              </article>
            );
          })}
        </div>

        {/* ═══ Join Team CTA ══════════════ */}
        <div
          className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "700ms", animationFillMode: "both" }}
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm sm:flex-row">
            {/* Text */}
            <div className="text-center sm:text-left">
              <p className="text-base font-black text-slate-900 sm:text-lg">
                আমাদের টিমে যোগ দিতে চান?
              </p>
              <p className="text-sm text-slate-600">আমরা সব সময় ট্যালেন্টেড মানুষ খুঁজছি</p>
            </div>

            {/* Button */}
            <Link
              href="/contact"
              style={{ color: "#ffffff" }}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 font-bold shadow-lg shadow-brand-800/30 transition-all duration-200 hover:bg-brand-900 hover:shadow-xl"
            >
              <span style={{ color: "#ffffff" }}>আবেদন করুন</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "#ffffff" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
