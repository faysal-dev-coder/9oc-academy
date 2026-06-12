// components/admin/AdminSidebar.jsx
// ═══════════════════════════════════════════════════════════════
// 📋 Admin Sidebar — Premium Light Theme
// Phase 7 — Chat 27
// ├── Grouped navigation (Management, Finance, System)
// ├── Desktop: Always visible (left side)
// ├── Mobile: Drawer with backdrop
// ├── Active state highlighting
// ├── Badge support (for pending counts)
// └── Premium hover effects
// ═══════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiSquares2X2,
  HiUsers,
  HiBookOpen,
  HiClipboardDocumentList,
  HiQuestionMarkCircle,
  HiTag,
  HiCreditCard,
  HiBell,
  HiHome,
  HiShieldCheck,
  HiXMark,
} from "react-icons/hi2";

// ═══════════════════════════════════
// NAV MENU CONFIGURATION
// ═══════════════════════════════════
const menuGroups = [
  {
    title: null, // No group title for main
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: HiSquares2X2,
        exact: true, // Match exactly
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { href: "/admin/users", label: "Users", icon: HiUsers },
      { href: "/admin/courses", label: "Courses", icon: HiBookOpen },
      { href: "/admin/exams", label: "Exams", icon: HiClipboardDocumentList },
      { href: "/admin/questions", label: "Questions", icon: HiQuestionMarkCircle },
      { href: "/admin/categories", label: "Categories", icon: HiTag },
    ],
  },
  {
    title: "FINANCE",
    items: [
      {
        href: "/admin/payments",
        label: "Payments",
        icon: HiCreditCard,
        badge: 0, // Will be dynamic later (pending payments count)
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ href: "/admin/notifications", label: "Notifications", icon: HiBell }],
  },
];

// ═══════════════════════════════════
// SIDEBAR COMPONENT
// ═══════════════════════════════════
export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  // Check if link is active
  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* ═══ Mobile Backdrop ═══ */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* ═══ Sidebar ═══ */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-[#E2E8F0] bg-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ═══ Header / Brand ═══ */}
        <div
          className="relative flex h-20 items-center justify-between px-6 border-b border-[#E2E8F0]"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,156,215,0.08) 0%, rgba(10,90,138,0.04) 100%)",
          }}
        >
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            {/* Brand Icon */}
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1E9CD7 0%, #0A5A8A 100%)",
                boxShadow: "0 4px 12px rgba(30,156,215,0.3)",
              }}
            >
              <HiShieldCheck className="text-xl" />
            </div>

            {/* Brand Text */}
            <div>
              <h1 className="text-base font-bold text-[#1F2937] leading-tight">9OC Admin</h1>
              <p className="text-xs text-[#64748B] leading-tight">Control Panel</p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1F2937] lg:hidden"
            aria-label="Close sidebar"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>

        {/* ═══ Navigation Menu ═══ */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className={groupIdx > 0 ? "mt-6" : ""}>
              {/* Group Title */}
              {group.title && (
                <h3 className="mb-2 px-3 text-xs font-semibold text-[#94A3B8] tracking-wider">
                  {group.title}
                </h3>
              )}

              {/* Menu Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group relative flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-[#1E9CD7]/10 text-[#1E9CD7]"
                          : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1F2937]"
                      }`}
                    >
                      {/* Active Indicator (left bar) */}
                      {active && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#1E9CD7]" />
                      )}

                      {/* Icon + Label */}
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`text-lg transition-transform duration-200 ${
                            active ? "scale-110" : "group-hover:scale-110"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {/* Badge (for counts) */}
                      {item.badge > 0 && (
                        <span className="rounded-full bg-[#DC2626] px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ═══ Footer / Back to Site ═══ */}
        <div className="border-t border-[#E2E8F0] p-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#475569] transition-all hover:border-[#1E9CD7]/30 hover:bg-[#1E9CD7]/5 hover:text-[#1E9CD7]"
          >
            <HiHome className="text-lg" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
