"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Gentle hint that scrolling is the whole interface. Fades out on first move. */
export default function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex flex-col items-center gap-3"
    >
      <span className="text-sm tracking-[0.16em] text-[#e8b450]/70">
        ወደ ታች ይሸብልሉ
      </span>
      <motion.div
        animate={{ y: [0, 9, 0], opacity: [0.9, 0.35, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-10 w-px bg-gradient-to-b from-[#e8b450] to-transparent"
      />
    </motion.div>
  );
}
