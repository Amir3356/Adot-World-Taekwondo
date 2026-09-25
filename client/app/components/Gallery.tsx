"use client";

import ParallaxPhoto from "./ParallaxPhoto";
import { Reveal, WordReveal } from "./Reveal";

const SHOTS = [
  {
    src: "/asset/medals-stance.jpg",
    alt: "ተመራቂው ሜዳሊያዎቹን አጥልቆ በአሸናፊነት አቋም",
    tilt: 6,
  },
  {
    src: "/asset/photo_2026-09-20_11-21-14.jpg",
    alt: "ተመራቂው በተዘጋጀ የቴኳንዶ አቋም",
    tilt: -6,
  },
  {
    src: "/asset/photo_2026-09-20_11-21-24.jpg",
    alt: "ተመራቂው ጥቁር ቀበቶውን በእጁ ይዞ",
    tilt: 6,
  },
];

/** Three-up portrait strip of the graduate. */
export default function Gallery() {
  return (
    <section className="relative z-20 py-20 sm:py-28">
      <Reveal className="mx-auto mb-14 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          ተመራቂው
        </p>
        <h2 className="font-serif text-4xl leading-tight font-bold sm:text-6xl">
          <WordReveal text="ጥቁር ቀበቶ" className="text-[#f5efe2]" />{" "}
          <WordReveal text="እና ሜዳሊያ" className="text-gold-gradient" />
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-3">
        {SHOTS.map((s, i) => (
          <Reveal key={s.src} delay={i * 0.1}>
            <ParallaxPhoto
              src={s.src}
              alt={s.alt}
              depth={0.28}
              tilt={s.tilt}
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(max-width: 640px) 88vw, 30vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
