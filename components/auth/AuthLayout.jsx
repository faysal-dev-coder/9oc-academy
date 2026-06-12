"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { HiArrowLeft } from "react-icons/hi2";
import Logo from "@/components/shared/Logo";

export default function AuthLayout({ children, title, subtitle }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Orbs Animate
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        x: -20,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Card Entrance Animation
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-br from-[#F8FAFC] via-white to-[#EFF6FF] flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background Orbs — Soft & Light */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary/12 blur-3xl pointer-events-none"
      />

      {/* Grid Pattern — Subtle */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Auth Card */}
        <div
          ref={cardRef}
          className="relative bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xl shadow-primary/5 overflow-hidden"
        >
          {/* Top gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-accent" />

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{title}</h1>
            <p className="text-[#64748B] text-sm">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Bottom Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#64748B] text-sm hover:text-primary transition-colors group"
          >
            <HiArrowLeft className="text-base transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Home এ ফিরে যাও</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
