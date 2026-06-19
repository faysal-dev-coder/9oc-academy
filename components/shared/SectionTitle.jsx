// components/shared/SectionTitle.jsx
// ═══════════════════════════════════════════════════════════════
// 🎬 Animated Section Title — CSS animate-in (No GSAP!)
// Chat 49 Rebuild — Brand colors, Tailwind v4
// ═══════════════════════════════════════════════════════════════

export default function SectionTitle({
  badge,
  badgeIcon,
  title,
  highlightText,
  subtitle,
  center = true,
}) {
  return (
    <div className={`mb-16 ${center ? "text-center" : "text-left"}`}>
      {/* Badge */}
      {badge && (
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-md
            bg-brand-800/10 border border-brand-800/20 mb-6
            animate-in fade-in slide-in-from-bottom-4 duration-500
          `}
        >
          {badgeIcon && <span className="text-base shrink-0">{badgeIcon}</span>}
          <span className="text-sm font-medium text-brand-800">{badge}</span>
        </div>
      )}

      {/* Title */}
      <h2
        className={`
          text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4
          animate-in fade-in slide-in-from-bottom-5 duration-600 delay-100
          ${center ? "" : ""}
        `}
      >
        {title}{" "}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-800 to-brand-700">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Underline Bar */}
      <div
        className={`
          h-1 w-24 rounded-full
          bg-linear-to-r from-brand-800 via-emerald-500 to-amber-400
          mb-6
          animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200
          ${center ? "mx-auto" : ""}
        `}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`
            text-lg text-slate-500 max-w-2xl
            animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300
            ${center ? "mx-auto" : ""}
          `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
