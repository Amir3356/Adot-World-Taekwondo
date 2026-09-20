"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const WORDS = ["ትሕትና", "ጽናት", "ራስን መግዛት", "የማይበገር መንፈስ", "ጨዋነት"];

/** Scroll-driven ribbon of the tenets — a breath between chapters. */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["12%", "-42%"]);

  return (
    <div
      ref={ref}
      className="relative z-20 overflow-hidden border-y border-[#e8b450]/12 py-10"
    >
      <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap">
        {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
          <span
            key={i}
            className="font-serif text-4xl font-bold tracking-tight text-[#e8b450]/22 sm:text-6xl"
          >
            {w}
            <span className="mx-10 text-[#e8b450]/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
