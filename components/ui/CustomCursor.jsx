// components/ui/CustomCursor.jsx
'use client';
// ═══════════════════════════════════════════
// 9OC Academy — Custom Cursor (GSAP Powered)
// (Fixed for Tailwind v4 — Zero Warnings)
// শুধু Desktop এ দেখাবে, Mobile এ লুকানো
// ═══════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null); // বড় Ring
  const cursorDotRef = useRef(null); // ছোট Dot
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // ─── Touch Device হলে Custom Cursor দেখাবো না ───
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // ─── Mouse Move Handler ───
    const onMouseMove = (e) => {
      setIsVisible(true);

      // বড় Ring — দেরিতে Follow করবে (Smooth)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });

      // ছোট Dot — দ্রুত Follow করবে
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // ─── Visibility Handlers ───
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // ─── Hover Detect (Clickable Elements) ───
    const onElementEnter = () => setIsHovering(true);
    const onElementLeave = () => setIsHovering(false);

    // ─── Event Listeners Add ───
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // সব Clickable Elements এ Hover Effect
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onElementEnter);
      el.addEventListener('mouseleave', onElementLeave);
    });

    // ─── Cleanup ───
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onElementEnter);
        el.removeEventListener('mouseleave', onElementLeave);
      });
    };
  }, []);

  return (
    <>
      {/* ─── বড় Ring (Outer) ─── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none mix-blend-difference hidden lg:block"
        style={{
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isHovering ? '56px' : '40px',
            height: isHovering ? '56px' : '40px',
            transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
            background: isHovering ? 'rgba(108, 99, 255, 0.1)' : 'transparent',
          }}
        />
      </div>

      {/* ─── ছোট Dot (Inner) ─── */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none mix-blend-difference hidden lg:block"
        style={{
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            transition: 'width 0.2s ease, height 0.2s ease',
          }}
        />
      </div>
    </>
  );
}
