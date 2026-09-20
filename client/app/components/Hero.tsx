"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./useReducedMotion";
import Image from "next/image";

/** Opening frame: title recedes into depth as the portrait rises. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const veilScrub = useTransform(scrollYProgress, [0, 1], [0.45, 0.95]);
  const veil = reducedMotion ? 0.62 : veilScrub;

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Portrait anchored behind the title */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/asset/photo_2026-09-20_11-21-24.jpg"
          alt="የአዶት ወርልድ ቴኳንዶ ክለብ ተመራቂ በጥቁር ቀበቶ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_16%] opacity-90 contrast-[1.1] brightness-[0.9] saturate-[0.8]"
        />
      </motion.div>

      {/* multiply crushes the studio grey to near-black */}
      <div className="absolute inset-0 z-[5] bg-[#3a2c12] mix-blend-multiply" />
      <motion.div
        style={{ opacity: veil }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/85 via-[#050505]/45 to-[#050505]"
      />
      {/* vignette focuses the eye on the title */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_50%_38%,transparent_30%,rgba(5,5,5,0.92)_88%)]" />
      {/* Warm ember glow from below, echoing the poster */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(212,104,42,0.28),transparent_65%)]" />

      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="relative z-20 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-sm tracking-[0.18em] text-[#e8b450] sm:text-base"
        >
          አዶት ወርልድ ቴኳንዶ ክለብ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 46, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[3.4rem] leading-[0.95] font-black tracking-tight sm:text-[6rem] lg:text-[8.5rem]"
        >
          <span className="text-gold-gradient block">ታላቅ</span>
          <span className="text-gold-gradient block">ምርቃት</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="gold-rule mt-9 h-px w-56 sm:w-80"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.25 }}
          className="mt-7 max-w-md text-sm leading-relaxed text-[#f5efe2]/70 sm:text-base"
        >
          የዓመታት ወዝ፣ ትዕግሥትና ጽናት የደረሱበት ቀን።
        </motion.p>
      </motion.div>
    </section>
  );
}
