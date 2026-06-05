import HeroSection from "@/components/home/HeroSection";
import { STATS, FEATURES, CATEGORIES } from "@/constants";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-dark">
      {/* ══════════════════════════════════════════ */}
      {/* ██  HERO SECTION — Premium New            */}
      {/* ══════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════ */}
      {/* ██  STATS SECTION                         */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative py-16 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6c63ff, #00d4aa)",
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ██  CATEGORIES SECTION                    */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              📚 পরীক্ষার ক্যাটাগরি
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              আপনার{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #6c63ff, #00d4aa)",
                }}
              >
                লক্ষ্য
              </span>{" "}
              বেছে নিন
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              সরকারি চাকরির সকল ক্যাটাগরির জন্য MCQ পরীক্ষা প্রস্তুত আছে
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.slug}`}
                className="group relative p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-white/15 hover:bg-white/5 transition-all duration-500"
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{cat.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm mb-4 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                {/* Count + Arrow */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: cat.color + "20",
                      color: cat.color,
                    }}
                  >
                    {cat.courseCount}+ কোর্স
                  </span>
                  <HiArrowRight
                    className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: cat.color }}
                  />
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${cat.color}10 0%, transparent 70%)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ██  FEATURES SECTION                      */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-4">
              ⚡ কেন 9OC Academy?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              আমাদের{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #00d4aa, #ffb800)",
                }}
              >
                বিশেষ সুবিধা
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">আমাদের প্ল্যাটফর্মের বিশেষ সুবিধাসমূহ</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="group p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-white/15 hover:bg-white/5 transition-all duration-500"
              >
                {/* Icon */}
                <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ██  CTA SECTION                           */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-white/10 overflow-hidden">
            {/* Background Gradient */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(0, 212, 170, 0.05) 100%)",
              }}
            />

            {/* CTA Content */}
            <div className="relative text-center py-16 px-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                আজই শুরু করুন আপনার{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6c63ff, #ffb800)",
                  }}
                >
                  সাফল্যের যাত্রা
                </span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                ১০,০০০+ শিক্ষার্থী ইতিমধ্যে আমাদের সাথে যুক্ত হয়ে সরকারি চাকরির স্বপ্ন পূরণ করছে।
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base transition-all duration-300 hover:scale-105"
                style={{
                  backgroundImage: "linear-gradient(135deg, #6c63ff, #5a52d5)",
                }}
              >
                🚀 ফ্রি তে রেজিস্ট্রেশন করুন
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* ██  SIMPLE FOOTER                         */}
      {/* ══════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/30 text-sm">© 2025 9OC Academy. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </main>
  );
}
