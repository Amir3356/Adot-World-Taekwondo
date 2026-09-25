"use client";

import { Reveal } from "./Reveal";
import { motion } from "motion/react";

const DETAILS = [
  { label: "ቀን", value: "ጥቅምት 8 ቀን", sub: "2019 ዓ/ም" },
  { label: "ሰዓት", value: "3:00", sub: "ከጠዋቱ" },
  { label: "መግቢያ", value: "200 ብር", sub: "በአንድ ሰው" },
];

/** Event facts, taken verbatim from the club's poster. */
export default function EventDetails() {
  return (
    <section className="relative z-20 py-28 sm:py-36">
      <Reveal className="mx-auto mb-16 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          የዝግጅቱ ዝርዝር
        </p>
        <h2 className="font-serif text-4xl font-bold sm:text-6xl">
          <span className="text-gold-gradient">መቼና የት</span>
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-5 px-6 sm:grid-cols-3">
        {DETAILS.map((d, i) => (
          <Reveal key={d.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(232,180,80,0.5)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-2xl border border-[#e8b450]/18 bg-white/[0.04] p-8 text-center backdrop-blur-sm"
            >
              <p className="text-sm tracking-[0.16em] text-[#e8b450]">
                {d.label}
              </p>
              <p className="mt-4 font-serif text-3xl font-bold text-[#f5efe2] sm:text-4xl">
                {d.value}
              </p>
              <p className="mt-2 text-sm text-[#f5efe2]/55">{d.sub}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-6 grid max-w-4xl gap-5 px-6 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-[#e8b450]/18 bg-white/[0.04] p-8 backdrop-blur-sm">
            <p className="text-sm tracking-[0.16em] text-[#e8b450]">
              የማስመረቂያ አድራሻ
            </p>
            <p className="mt-4 font-serif text-2xl font-bold text-[#f5efe2]">
              በሰበታ ጂም ሲኒማ ሆል
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="h-full rounded-2xl border border-[#e8b450]/18 bg-white/[0.04] p-8 backdrop-blur-sm">
            <p className="text-sm tracking-[0.16em] text-[#e8b450]">
              የክለቡ አድራሻ
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#f5efe2]/85">
              ዓለምገና በአዲስ ሰፈር ታዴ ባጃጅ መጨረሻ ሳይዶርስ
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
