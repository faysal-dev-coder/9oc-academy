// components/layout/Footer.jsx
// ═══════════════════════════════════════
// 🦶 Premium Footer
// (Updated: CSS Conflict Fixed + All Previous Issues)
// ├── Issue #11: Duplicate text বাদ
// ├── Issue #12: Year auto + English text + center
// ├── Issue #13: Academy fix (typo removed)
// ├── Issue #14: Wrong Bangla বাদ
// ├── Issue #15: Real React Icons + Real links
// ├── Issue #16: Column alignment
// └── Issue #17: ❤️ line বাদ
// ═══════════════════════════════════════

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { FaFacebookF, FaYoutube, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  // ✅ Auto year with fallback (2026 system bug fix)
  const browserYear = new Date().getFullYear();
  const currentYear = browserYear < 2024 || browserYear > 2050 ? 2024 : browserYear;

  const footerLinks = {
    platform: [
      { name: "কোর্সসমূহ", href: "/courses" },
      { name: "মডেল টেস্ট", href: "/courses" },
      { name: "প্রশ্ন ব্যাংক", href: "/courses" },
      { name: "লিডারবোর্ড", href: "/courses" },
    ],
    exams: [
      { name: "BCS প্রিলি", href: "/courses" },
      { name: "ব্যাংক জব", href: "/courses" },
      { name: "NTRCA", href: "/courses" },
      { name: "প্রাইমারি", href: "/courses" },
    ],
    company: [
      { name: "আমাদের সম্পর্কে", href: "/about" },
      { name: "যোগাযোগ", href: "/contact" },
      { name: "গোপনীয়তা নীতি", href: "/about" },
      { name: "শর্তাবলী", href: "/about" },
    ],
  };

  // ✅ Real Social Links with React Icons
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/9ocacademy/",
      label: "Facebook",
      color: "hover:text-blue-400 hover:border-blue-400/50",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@9oc-academy",
      label: "YouTube",
      color: "hover:text-red-500 hover:border-red-500/50",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/9ocacademy/",
      label: "Instagram",
      color: "hover:text-pink-400 hover:border-pink-400/50",
    },
    {
      icon: FaTelegramPlane,
      href: "https://t.me/+8801962714066",
      label: "Telegram",
      color: "hover:text-cyan-400 hover:border-cyan-400/50",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/8801962714066",
      label: "WhatsApp",
      color: "hover:text-green-400 hover:border-green-400/50",
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-dark">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-6 text-white/50 text-sm leading-relaxed">
              বাংলাদেশের সবচেয়ে বড় অনলাইন MCQ পরীক্ষা প্ল্যাটফর্ম। স্মার্টভাবে প্রস্তুতি নিন আপনার
              স্বপ্নের সরকারি চাকরির জন্য।
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10
                    flex items-center justify-center text-white/60
                    transition-all duration-300 hover:scale-110 hover:bg-white/10
                    ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links - Platform */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              প্ল্যাটফর্ম
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-white/50 hover:text-primary hover:translate-x-1 text-sm transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Exams */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              পরীক্ষাসমূহ
            </h4>
            <ul className="space-y-3">
              {footerLinks.exams.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-white/50 hover:text-secondary hover:translate-x-1 text-sm transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              কোম্পানি
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-white/50 hover:text-accent hover:translate-x-1 text-sm transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Center Aligned English Text */}
        <div className="border-t border-white/10 py-6">
          <p className="text-white/50 text-sm text-center">
            © {currentYear} 9OC Academy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
