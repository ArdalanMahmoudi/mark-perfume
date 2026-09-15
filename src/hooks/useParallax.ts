// hooks/useParallax.ts
"use client";

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseParallaxOptions {

  range?: [number, number];

  offset?: ["start end" | "start start" | "end end" | "end start", "start end" | "start start" | "end end" | "end start"];
}

export function useParallax({
  range = [-100, 100],
  offset = ["start end", "end start"],
}: UseParallaxOptions = {}): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], range);

  return { ref, y, scrollYProgress };
}