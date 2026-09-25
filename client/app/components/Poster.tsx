"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "./useReducedMotion";

/**
 * The club's official announcement poster, shown whole as an artifact.
 *
 * Unlike the portraits it is a finished flat design with its own type and
 * borders, so it gets no colour grading or cropping — only a 3D tilt and a
 * gold frame, and it keeps its full 640x1280 aspect so nothing is cut off.
 */
export default function Poster() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const rotateScrub = useTransform(smooth, [0, 0.5, 1], [14, 0, -14]);
  const yScrub = useTransform(smooth, [0, 1], [50, -50]);
  const glowScrub = useTransform(smooth, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  const rotateY = reducedMotion ? 0 : rotateScrub;
  const y = reducedMotion ? 0 : yScrub;
  const glow = reducedMotion ? 0.35 : glowScrub;

  return (
    <section className="relative z-20 py-24 sm:py-32">
      <Reveal className="mx-auto mb-14 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          ይፋዊ ማስታወቂያ
        </p>
        <h2 className="font-serif text-4xl font-bold sm:text-6xl">
          <span className="text-gold-gradient">የምረቃው ፖስተር</span>
        </h2>
      </Reveal>

      <div
        ref={ref}
        className="mx-auto max-w-md overflow-x-clip px-6"
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={{ rotateY, y, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* gold bloom behind the sheet */}
          <motion.div
            style={{ opacity: glow }}
            className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(232,180,80,0.55),transparent_70%)] blur-xl"
          />

          <div className="relative overflow-hidden rounded-2xl ring-1 ring-[#e8b450]/45 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.9)]">
            {/* full poster, uncropped and ungraded so its own type stays crisp */}
            <Image
              src="/asset/photo_2026-09-20_11-20-52.jpg"
              alt="የአዶት ታይገር ወርልድ ቴኳንዶ ክለብ ታላቅ ምርቃት ይፋዊ ፖስተር፤ ዋና አሰልጣኝ ሳቦም ዩሱፍ ሸምሱ እና ማስተር ፈድሉ እድሉ። ጥቅምት 8 ቀን 2019 ዓ/ም፣ ከጠዋቱ 3:00፣ በሰበታ ጂም ሲኒማ ሆል። መግቢያ 200 ብር። ስልክ 0933391182።"
              width={640}
              height={1280}
              sizes="(max-width: 640px) 88vw, 420px"
              className="h-auto w-full"
            />
            {/* faint sheen so it reads as a printed sheet, not a flat PNG */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* VIP ticket — the second event artifact, landscape */}
      <Reveal className="mx-auto mt-20 mb-8 max-w-3xl px-6 text-center" delay={0.1}>
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          የመግቢያ ትኬት
        </p>
        <h3 className="font-serif text-3xl font-bold sm:text-5xl">
          <span className="text-gold-gradient">VIP ቲኬት</span>
        </h3>
      </Reveal>

      <Reveal delay={0.18} className="mx-auto max-w-3xl overflow-x-clip px-6">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-[#e8b450]/45 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <Image
            src="/asset/vip-ticket.jpg"
            alt="የአዶት ታይገር ወርልድ ቴኳንዶ ክለብ ምረቃ VIP የመግቢያ ትኬት። መግቢያ 200 ብር፣ ቦታ ጂም ሲኒማ ሆል፣ ቀን ጥቅምት 8-2019፣ ሰዓት ከጠዋቱ 3:00።"
            width={1280}
            height={640}
            sizes="(max-width: 768px) 88vw, 720px"
            className="h-auto w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}
