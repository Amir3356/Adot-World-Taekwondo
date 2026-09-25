"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, WordReveal } from "./Reveal";

/** Closing frame: congratulation, phone number, and the club sign-off. */
export default function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const glow = useTransform(scrollYProgress, [0, 1], [0.05, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section
      ref={ref}
      className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,180,80,0.5),transparent_62%)]"
      />

      <motion.div style={{ y }} className="relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="mb-7 text-sm tracking-[0.18em] text-[#e8b450]">
            እንኳን ደስ አላችሁ
          </p>
        </Reveal>

        <h2 className="font-serif text-[2.6rem] leading-[1.02] font-black tracking-tight sm:text-7xl lg:text-8xl">
          <WordReveal text="ጉዞው" className="text-gold-gradient" />
          <br />
          <WordReveal text="አሁን ይጀምራል" className="text-[#f5efe2]" delay={0.15} />
        </h2>

        <Reveal delay={0.3}>
          <div className="gold-rule mx-auto mt-10 h-px w-64" />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-9 max-w-lg text-base leading-relaxed text-[#f5efe2]/65 sm:text-lg">
            ጥቁር ቀበቶ የመጨረሻ ደረጃ ሳይሆን፣ የአዲስ ኃላፊነት መጀመሪያ ነው።
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <a
            href="tel:0933391182"
            className="group mt-12 inline-flex items-center gap-4 rounded-full border border-[#e8b450]/40 bg-[#e8b450]/[0.08] px-9 py-4 transition-colors duration-300 hover:border-[#e8b450] hover:bg-[#e8b450]/15"
          >
            <span className="text-sm tracking-[0.16em] text-[#e8b450]">
              ለመመዝገብ
            </span>
            <span className="font-serif text-xl font-bold text-[#f5efe2] sm:text-2xl">
              0933391182
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-20 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-2xl" aria-hidden>
              <span>🇪🇹</span>
              <span className="h-px w-8 bg-[#e8b450]/40" />
              <span>🇸🇩</span>
            </div>
            <p className="mt-2 text-sm tracking-[0.18em] text-[#e8b450]/80">
              አዶት ታይገር ወርልድ ቴኳንዶ ክለብ
            </p>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
