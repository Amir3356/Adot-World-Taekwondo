"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * The only persistent chrome on the page: a hairline gold rail showing
 * how far through the story you are. Not navigation — just orientation.
 */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#b07d22] via-[#e8b450] to-[#ffe6a8]"
      style={{ scaleX }}
    />
  );
}
