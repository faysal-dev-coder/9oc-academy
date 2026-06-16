// app/admin/layout.js
// ═══════════════════════════════════════════════════════════════
// 🏗️ Admin Layout — Premium Light Theme
// ⭐ UPDATED (Chat 41): New Sidebar + Topbar from shell/
// ═══════════════════════════════════════════════════════════════

"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/shell/AdminSidebar";
import AdminTopbar from "@/components/admin/shell/AdminTopbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50">
        {/* ═══ Sidebar (Fixed Left) ═══ */}
        <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* ═══ Main Area (with left margin for sidebar on desktop) ═══ */}
        <div className="lg:pl-72">
          {/* Topbar */}
          <AdminTopbar onMenuClick={openSidebar} />

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
