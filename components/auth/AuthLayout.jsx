"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
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
      className="min-h-screen bg-[#0A0A1A] flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo — সরাসরি ব্যবহার (Logo নিজেই Link) */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Auth Card */}
        <div
          ref={cardRef}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-white/60 text-sm">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-6">
          <Link href="/" className="text-white/40 text-sm hover:text-white/70 transition-colors">
            ← Home এ ফিরে যাও
          </Link>
        </div>
      </div>
    </div>
  );
}
