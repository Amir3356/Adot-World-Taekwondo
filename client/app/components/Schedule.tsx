"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import ParallaxPhoto from "./ParallaxPhoto";
import { Reveal, WordReveal } from "./Reveal";

/**
 * Graduation-day programme.
 *
 * DRAFT TIMES — only the ከጠዋቱ 3:00 start is confirmed by the club's poster
 * and VIP ticket. The rest are placeholders for the club to correct.
 * Times are Ethiopian (ከጠዋቱ 3:00 = 9:00 AM), matching the poster.
 */
const PROGRAMME = [
  {
    from: "3:00",
    to: "3:30",
    title: "መክፈቻ ፕሮግራም",
    body: "የእንግዶች አቀባበል፣ የክለቡ ሰላምታና የመክፈቻ ንግግር።",
  },
  {
    from: "3:30",
    to: "4:30",
    title: "የቴኳንዶ ዝግጅት",
    body: "ፑምሴ፣ የአቋም ትርኢትና የሰሌዳ ስብራት ማሳያ በተማሪዎች።",
  },
  {
    from: "4:30",
    to: "5:30",
    title: "ግጥሚያ",
    body: "የኪዮሩጊ ግጥሚያዎች በተለያዩ የክብደትና የደረጃ ምድቦች።",
  },
  {
    from: "5:30",
    to: "6:30",
    title: "የቀበቶ ምርቃት",
    body: "ለተመራቂዎች የጥቁር ቀበቶና የምስክር ወረቀት ርክክብ።",
  },
  {
    from: "6:30",
    to: "7:00",
    title: "ሜዳሊያና መዝጊያ",
    body: "የአሸናፊዎች ሽልማት፣ የቡድን ፎቶና የመዝጊያ ንግግር።",
  },
];

/** Vertical timeline of the day, with a rail that fills as you scroll. */
export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="relative z-20 py-20 sm:py-28">
      <Reveal className="mx-auto mb-16 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          የዕለቱ ፕሮግራም
        </p>
        <h2 className="font-serif text-4xl leading-tight font-bold sm:text-6xl">
          <WordReveal text="የምረቃው" className="text-[#f5efe2]" />{" "}
          <WordReveal text="ቅደም ተከተል" className="text-gold-gradient" />
        </h2>
        <p className="mt-6 text-base text-[#f5efe2]/60">
          ጥቅምት 8 ቀን 2019 ዓ/ም · በሰበታ ጂም ሲኒማ ሆል
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div ref={ref} className="relative">
          {/* rail: dim track with a gold fill that follows the scroll */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-[#e8b450]/15" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-[#ffe6a8] via-[#e8b450] to-[#b07d22]"
          />

          <ol className="space-y-9">
            {PROGRAMME.map((item, i) => (
              <li key={item.title} className="relative pl-10">
                <Reveal delay={i * 0.08} y={28}>
                  {/* node */}
                  <span className="absolute top-[6px] left-0 flex h-[15px] w-[15px] items-center justify-center">
                    <span className="h-[15px] w-[15px] rounded-full border border-[#e8b450]/60 bg-[#050505]" />
                    <span className="absolute h-[7px] w-[7px] rounded-full bg-[#e8b450]" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-2xl font-bold text-gold-gradient sm:text-3xl">
                      {item.from}
                    </span>
                    <span className="text-[#e8b450]/45">—</span>
                    <span className="font-serif text-xl text-[#e8b450]/75 sm:text-2xl">
                      {item.to}
                    </span>
                    <span className="text-sm tracking-[0.16em] text-[#e8b450]/60">
                      ከጠዋቱ
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-bold text-[#f5efe2] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[#f5efe2]/60 sm:text-base">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <ParallaxPhoto
          src="/asset/photo_2026-09-20_11-21-10.jpg"
          alt="ተመራቂው የቴኳንዶ አቋም ሲያሳይ"
          depth={0.3}
          tilt={-6}
          className="mx-auto aspect-[3/4] w-full max-w-xs rounded-3xl lg:max-w-none"
          sizes="(max-width: 1024px) 70vw, 340px"
        />
      </div>
    </section>
  );
}
