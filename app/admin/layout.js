// app/admin/layout.js
// ═══════════════════════════════════════════════════════════════
// 🏗️ Admin Layout — Premium Light Theme
// Phase 7 — Chat 27
// ├── Wraps all /admin/* routes
// ├── AdminGuard for role-based protection
// ├── Sidebar + Header structure
// ├── Mobile menu state management
// └── Responsive layout (mobile-first)
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ═══ Sidebar (Fixed Left) ═══ */}
        <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* ═══ Main Area (with left margin for sidebar on desktop) ═══ */}
        <div className="lg:pl-72">
          {/* Header */}
          <AdminHeader onMenuClick={openSidebar} />

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
