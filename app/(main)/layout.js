// app/(main)/layout.js
// ═══════════════════════════════════════════
// Main Pages Layout
// Navbar + Footer + CustomCursor এখানে
// ═══════════════════════════════════════════
// Apply হবে: /, /courses, /about, /contact
// ═══════════════════════════════════════════

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Custom Cursor — Desktop Only */}
      <CustomCursor />

      {/* Navbar — Main Pages এ দেখাবে */}
      <Navbar />

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer — Main Pages এ দেখাবে */}
      <Footer />
    </>
  );
}
