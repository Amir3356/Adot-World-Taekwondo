"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const TENETS = [
  { n: "፩", title: "ትሕትና", body: "ራስን ዝቅ አድርጎ ማየት፤ የእውቀት መጀመሪያ።" },
  { n: "፪", title: "ጽናት", body: "ሳይታክቱ መቀጠል፤ ውድቀትን ወደ ትምህርት መለወጥ።" },
  { n: "፫", title: "ራስን መግዛት", body: "ኃይልን በጥበብ መጠቀም፤ ስሜትን መቆጣጠር።" },
  { n: "፬", title: "የማይበገር መንፈስ", body: "በማንኛውም ፈተና ፊት ያልተንበረከከ ልብ።" },
  { n: "፭", title: "ጨዋነት", body: "ለአስተማሪ፣ ለባልንጀራና ለተቀናቃኝ ክብር።" },
];

/** The five tenets, revealed as a horizontal band that drifts against scroll. */
export default function Tenets() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative z-20 pt-28 pb-12 sm:pt-40 sm:pb-16">
      <Reveal className="mx-auto mb-16 max-w-5xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          የቴኳንዶ መሠረቶች
        </p>
        <h2 className="font-serif text-4xl font-bold text-[#f5efe2] sm:text-6xl">
          አምስቱ <span className="text-gold-gradient">መርሆዎች</span>
        </h2>
      </Reveal>

      <motion.div style={{ x }} className="px-6">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {TENETS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.09}>
              <motion.article
                whileHover={{ y: -8, borderColor: "rgba(232,180,80,0.55)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-2xl border border-[#e8b450]/15 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur-sm"
              >
                <span className="font-serif text-3xl text-gold-gradient">
                  {t.n}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#f5efe2]">
                  {t.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#f5efe2]/60">
                  {t.body}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
