'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroBackground() {
  const containerRef = useRef(null);
  const orbsRef = useRef([]);
  const particlesRef = useRef([]);

  // Orbs Animation — GSAP দিয়ে ধীরে ধীরে নড়াচড়া
  useEffect(() => {
    const orbs = orbsRef.current;

    orbs.forEach((orb, index) => {
      if (!orb) return;

      // প্রতিটা Orb আলাদা Speed এ নড়বে
      gsap.to(orb, {
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        duration: gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
    });

    // Cleanup — Component remove হলে Animation বন্ধ
    return () => {
      orbs.forEach((orb) => {
        if (orb) gsap.killTweensOf(orb);
      });
    };
  }, []);

  // Particles Animation — ছোট ডট গুলো উপর-নিচে
  useEffect(() => {
    const particles = particlesRef.current;

    particles.forEach((particle, index) => {
      if (!particle) return;

      gsap.to(particle, {
        y: gsap.utils.random(-80, 80),
        x: gsap.utils.random(-40, 40),
        opacity: gsap.utils.random(0.2, 0.8),
        duration: gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    return () => {
      particles.forEach((particle) => {
        if (particle) gsap.killTweensOf(particle);
      });
    };
  }, []);

  // Particle Data — Random Position
  const particleData = [
    { top: '10%', left: '5%', size: 3 },
    { top: '20%', left: '80%', size: 2 },
    { top: '35%', left: '15%', size: 4 },
    { top: '45%', left: '90%', size: 2 },
    { top: '55%', left: '40%', size: 3 },
    { top: '65%', left: '70%', size: 2 },
    { top: '75%', left: '25%', size: 3 },
    { top: '80%', left: '60%', size: 4 },
    { top: '15%', left: '50%', size: 2 },
    { top: '85%', left: '85%', size: 3 },
    { top: '30%', left: '35%', size: 2 },
    { top: '70%', left: '55%', size: 3 },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ── Grid Pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Glowing Orb 1 — Primary (বড় বেগুনী) ── */}
      <div
        ref={(el) => {
          orbsRef.current[0] = el;
        }}
        className="absolute rounded-full blur-[120px]"
        style={{
          width: '500px',
          height: '500px',
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* ── Glowing Orb 2 — Secondary (সবুজ) ── */}
      <div
        ref={(el) => {
          orbsRef.current[1] = el;
        }}
        className="absolute rounded-full blur-[120px]"
        style={{
          width: '400px',
          height: '400px',
          top: '50%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* ── Glowing Orb 3 — Accent (হলুদ / সোনালী) ── */}
      <div
        ref={(el) => {
          orbsRef.current[2] = el;
        }}
        className="absolute rounded-full blur-[120px]"
        style={{
          width: '350px',
          height: '350px',
          bottom: '-5%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(255, 184, 0, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Glowing Orb 4 — Extra (হালকা নীল) ── */}
      <div
        ref={(el) => {
          orbsRef.current[3] = el;
        }}
        className="absolute rounded-full blur-[100px]"
        style={{
          width: '300px',
          height: '300px',
          top: '20%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* ── Floating Particles ── */}
      {particleData.map((particle, index) => (
        <div
          key={index}
          ref={(el) => {
            particlesRef.current[index] = el;
          }}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: particle.top,
            left: particle.left,
          }}
        />
      ))}

      {/* ── Bottom Gradient Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, var(--color-dark), transparent)',
        }}
      />
    </div>
  );
}
