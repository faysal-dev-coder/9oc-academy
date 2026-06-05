// components/layout/Navbar.jsx
'use client';
// ═══════════════════════════════════════════
// 9OC Academy — Premium Glassmorphism Navbar
// (Final Clean Version — Zero ESLint Errors)
// ═══════════════════════════════════════════

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import Logo from '../shared/Logo';
import { NAV_LINKS } from '../../constants';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ─── Scroll Detect ────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Body Scroll Lock (Mobile Menu) ─
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ─── Menu Close Handler ──────────────
  // Link Click করলে Menu বন্ধ হবে
  // (useEffect ছাড়াই — তাই ESLint Error নেই)
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ═══════════════════════════════════ */}
      {/* ═══ MAIN NAVBAR ══════════════════ */}
      {/* ═══════════════════════════════════ */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-out',
          scrolled
            ? 'bg-[#0A0A1A]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* ─── Logo ─── */}
            <Logo size="small" />

            {/* ─── Desktop Nav Links ─── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium',
                    'transition-all duration-300',
                    pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {pathname === link.href && (
                    <span className="absolute inset-0 rounded-lg bg-[#6C63FF]/10 border border-[#6C63FF]/20" />
                  )}

                  <span className="relative z-10">{link.label}</span>

                  {pathname === link.href && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6C63FF]" />
                  )}
                </Link>
              ))}
            </div>

            {/* ─── Right Side: Auth + Mobile Toggle ─── */}
            <div className="flex items-center gap-3">
              {/* Login Button (Desktop) */}
              <Link
                href="/login"
                className={cn(
                  'hidden sm:flex items-center gap-2',
                  'px-4 py-2 rounded-lg',
                  'text-sm font-medium text-gray-300',
                  'border border-white/10',
                  'hover:border-[#6C63FF]/50 hover:text-white',
                  'hover:bg-[#6C63FF]/5',
                  'transition-all duration-300'
                )}
              >
                <FiLogIn className="w-4 h-4" />
                <span>লগইন</span>
              </Link>

              {/* Register Button (Desktop) */}
              <Link
                href="/register"
                className={cn(
                  'hidden sm:flex items-center gap-2',
                  'px-5 py-2 rounded-lg',
                  'text-sm font-medium text-white',
                  'bg-linear-to-r from-[#6C63FF] to-[#6C63FF]/80',
                  'hover:from-[#6C63FF] hover:to-[#00D4AA]',
                  'shadow-lg shadow-[#6C63FF]/25',
                  'hover:shadow-[#6C63FF]/40',
                  'hover:scale-105',
                  'transition-all duration-300'
                )}
              >
                <FiUserPlus className="w-4 h-4" />
                <span>রেজিস্ট্রেশন</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  'lg:hidden',
                  'relative w-10 h-10 rounded-lg',
                  'flex items-center justify-center',
                  'text-gray-300 hover:text-white',
                  'border border-white/10',
                  'hover:border-[#6C63FF]/50',
                  'hover:bg-[#6C63FF]/10',
                  'transition-all duration-300'
                )}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenuAlt3 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════ */}
      {/* ═══ MOBILE MENU OVERLAY ═════════ */}
      {/* ═══════════════════════════════════ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ═══════════════════════════════════ */}
      {/* ═══ MOBILE MENU PANEL (SIDE) ════ */}
      {/* ═══════════════════════════════════ */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72',
          'bg-[#0D0D24]/95 backdrop-blur-2xl',
          'border-l border-white/5',
          'shadow-2xl shadow-black/50',
          'transform transition-transform duration-500 ease-out',
          'lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <Logo size="small" />
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-lg flex items-center justify-center
                       text-gray-400 hover:text-white
                       border border-white/10 hover:border-[#6C63FF]/50
                       hover:bg-[#6C63FF]/10
                       transition-all duration-300"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="p-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl',
                'text-sm font-medium',
                'transition-all duration-300',
                pathname === link.href
                  ? 'bg-[#6C63FF]/15 text-white border border-[#6C63FF]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}

              {pathname === link.href && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Auth Buttons (নিচে) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 space-y-3">
          <Link
            href="/login"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2
                       w-full px-4 py-3 rounded-xl
                       text-sm font-medium text-gray-300
                       border border-white/10
                       hover:border-[#6C63FF]/50 hover:text-white
                       hover:bg-[#6C63FF]/5
                       transition-all duration-300"
          >
            <FiLogIn className="w-4 h-4" />
            লগইন
          </Link>

          <Link
            href="/register"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2
                       w-full px-4 py-3 rounded-xl
                       text-sm font-medium text-white
                       bg-linear-to-r from-[#6C63FF] to-[#6C63FF]/80
                       hover:from-[#6C63FF] hover:to-[#00D4AA]
                       shadow-lg shadow-[#6C63FF]/25
                       transition-all duration-300"
          >
            <FiUserPlus className="w-4 h-4" />
            ফ্রি রেজিস্ট্রেশন
          </Link>
        </div>
      </div>
    </>
  );
}
