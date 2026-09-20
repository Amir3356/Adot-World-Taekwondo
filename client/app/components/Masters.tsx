"use client";

import { Reveal } from "./Reveal";
import { motion } from "motion/react";

const PEOPLE = [
  {
    role: "ዋና አሰልጣኝ",
    name: "ሳቦም ሱፍ ሸምሱ",
    note: "የክለቡ መሥራችና መሪ አሰልጣኝ",
  },
  {
    role: "ማስተር",
    name: "ፈድሉ እድሉ",
    note: "የምረቃው የክብር እንግዳ",
  },
];

/** Recognition of the instructors named on the event poster. */
export default function Masters() {
  return (
    <section className="relative z-20 py-28 sm:py-36">
      <Reveal className="mx-auto mb-16 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          መምህራን
        </p>
        <h2 className="font-serif text-4xl font-bold sm:text-6xl">
          <span className="text-gold-gradient">መሪዎቻችን</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[#f5efe2]/60">
          ከኋላ ያለ እጅ ከሌለ ከፊት ያለ ድል የለም።
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-3xl gap-6 px-6 sm:grid-cols-2">
        {PEOPLE.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[#e8b450]/20 bg-gradient-to-b from-[#e8b450]/[0.07] to-transparent p-8 text-center"
            >
              <div className="mx-auto mb-5 h-px w-12 bg-[#e8b450]/50" />
              <p className="text-sm tracking-[0.16em] text-[#e8b450]">
                {p.role}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-bold text-[#f5efe2] sm:text-3xl">
                {p.name}
              </h3>
              <p className="mt-3 text-sm text-[#f5efe2]/55">{p.note}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
