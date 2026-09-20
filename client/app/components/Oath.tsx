"use client";

import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useReducedMotion";
import Image from "next/image";

/**
 * A pinned, scroll-scrubbed moment: the frame opens up and the oath resolves
 * as you scroll through it.
 *
 * Progress is derived from the track's own geometry rather than useScroll
 * offsets: the pane inside is `position: sticky`, so measuring either the
 * pane (pinned, so its box stops moving) or the tall parent (which finishes
 * before the pin does) yields a non-monotonic value that runs backwards
 * partway through the section.
 */
export default function Oath() {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.offsetTop;
      // The pane is pinned for (track height - one viewport) of scrolling.
      const span = el.offsetHeight - window.innerHeight;
      if (span <= 0) return;
      const p = (window.scrollY - top) / span;
      progress.set(Math.min(1, Math.max(0, p)));
    };
    compute();
    const unsub = scrollY.on("change", compute);
    window.addEventListener("resize", compute);
    return () => {
      unsub();
      window.removeEventListener("resize", compute);
    };
  }, [progress, scrollY]);

  const clipScrub = useTransform(
    progress,
    [0, 0.22],
    ["inset(38% 26% 38% 26% round 28px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const imgScaleScrub = useTransform(progress, [0, 1], [1.12, 1]);
  const textOpacityScrub = useTransform(progress, [0.18, 0.32, 0.92, 1], [0, 1, 1, 0]);
  const textYScrub = useTransform(progress, [0.18, 0.38], [40, 0]);
  const dimScrub = useTransform(progress, [0.18, 0.45], [0.25, 0.72]);

  // Reduced motion: no scrub runs, so resolve to the readable end state.
  const clip = reducedMotion ? "inset(0% 0% 0% 0% round 0px)" : clipScrub;
  const imgScale = reducedMotion ? 1 : imgScaleScrub;
  const textOpacity = reducedMotion ? 1 : textOpacityScrub;
  const textY = reducedMotion ? 0 : textYScrub;
  const dim = reducedMotion ? 0.72 : dimScrub;

  return (
    <section ref={ref} className="relative z-20 h-[230svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image
              src="/asset/photo_2026-09-20_11-21-14.jpg"
              alt="ተመራቂው በቴኳንዶ አቋም ላይ"
              fill
              sizes="100vw"
              className="object-cover object-[center_top] contrast-[1.08] brightness-[0.95] saturate-[0.85]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#7a6033] mix-blend-multiply" />
          <motion.div
            style={{ opacity: dim }}
            className="absolute inset-0 bg-[#050505]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,5,0.75)_95%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 max-w-2xl px-6 text-center"
        >
          <p className="mb-6 text-sm tracking-[0.18em] text-[#e8b450]">
            የተመራቂው ቃል ኪዳን
          </p>
          <p className="font-serif text-2xl leading-snug font-bold text-[#f5efe2] sm:text-4xl lg:text-5xl">
            «ቴኳንዶን ለራሴ ክብር፣
            <br />
            ለሌሎች ደኅንነት እጠቀማለሁ።»
          </p>
          <div className="gold-rule mx-auto mt-8 h-px w-40" />
        </motion.div>
      </div>
    </section>
  );
}
