// components/home/HeroBackground.jsx
// ═══════════════════════════════════
// 🎨 Hero Background — CSS Animations
// No GSAP | Tailwind v4 | brand colors
// ═══════════════════════════════════

export default function HeroBackground() {
  const particleData = [
    { top: "10%", left: "5%", size: "h-1 w-1" },
    { top: "20%", left: "80%", size: "h-0.5 w-0.5" },
    { top: "35%", left: "15%", size: "h-1.5 w-1.5" },
    { top: "45%", left: "90%", size: "h-0.5 w-0.5" },
    { top: "55%", left: "40%", size: "h-1 w-1" },
    { top: "65%", left: "70%", size: "h-0.5 w-0.5" },
    { top: "75%", left: "25%", size: "h-1 w-1" },
    { top: "80%", left: "60%", size: "h-1.5 w-1.5" },
    { top: "15%", left: "50%", size: "h-0.5 w-0.5" },
    { top: "85%", left: "85%", size: "h-1 w-1" },
    { top: "30%", left: "35%", size: "h-0.5 w-0.5" },
    { top: "70%", left: "55%", size: "h-1 w-1" },
  ];

  // CSS animation delays for variety
  const delays = [
    "delay-0",
    "delay-300",
    "delay-700",
    "delay-1000",
    "delay-500",
    "delay-200",
    "delay-800",
    "delay-400",
    "delay-600",
    "delay-100",
    "delay-900",
    "delay-1100",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50" aria-hidden="true">
      {/* ── Grid Pattern ── */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,64,175,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,64,175,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Orb 1 — brand (top-left) ── */}
      <div
        className="absolute -left-16 -top-16 h-125 w-125 animate-pulse rounded-full bg-brand-800/10 blur-[120px]"
        style={{ animationDuration: "8s" }}
      />

      {/* ── Orb 2 — brand lighter (right) ── */}
      <div
        className="absolute -right-16 top-1/2 h-100 w-100 animate-pulse rounded-full bg-brand-700/8 blur-[120px]"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />

      {/* ── Orb 3 — amber (bottom) ── */}
      <div
        className="absolute bottom-0 left-1/3 h-87.5 w-87.5 animate-pulse rounded-full bg-amber-400/8 blur-[120px]"
        style={{ animationDuration: "12s", animationDelay: "4s" }}
      />

      {/* ── Orb 4 — brand soft (top-right) ── */}
      <div
        className="absolute right-1/4 top-1/4 h-75 w-75 animate-pulse rounded-full bg-brand-900/6 blur-[100px]"
        style={{ animationDuration: "9s", animationDelay: "1s" }}
      />

      {/* ── Floating Particles ── */}
      {particleData.map((particle, index) => (
        <div
          key={index}
          className={`absolute animate-bounce rounded-full bg-brand-700/40 ${particle.size} ${delays[index % delays.length]}`}
          style={{
            top: particle.top,
            left: particle.left,
            animationDuration: `${3 + (index % 4)}s`,
          }}
        />
      ))}

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
    </div>
  );
}
