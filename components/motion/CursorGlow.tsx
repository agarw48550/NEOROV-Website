"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Soft cyan spotlight that follows the pointer across the page. */
export function CursorGlow({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const x = useSpring(rawX, { stiffness: 120, damping: 28, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.4 });
  const background = useMotionTemplate`
    radial-gradient(520px circle at ${x}px ${y}px,
      color-mix(in srgb, var(--secondary) 16%, transparent),
      transparent 55%)
  `;

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduced]);

  if (reduced) return <>{children}</>;

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
        style={{ background }}
      />
      {children}
    </div>
  );
}

/** Parallax offset driven by pointer — wrap layers with different strengths. */
export function usePointerParallax(strength = 18) {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 22 });
  const y = useSpring(my, { stiffness: 80, damping: 22 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx * strength);
      my.set(ny * strength);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced, strength]);

  return { x, y, reduced };
}
