// lib/gsap.js
// ═══════════════════════════════════════
// 🎬 GSAP + ScrollTrigger Configuration
// ═══════════════════════════════════════

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger Plugin Register
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
