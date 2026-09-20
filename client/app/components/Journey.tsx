"use client";

import ParallaxPhoto from "./ParallaxPhoto";
import { Reveal, WordReveal } from "./Reveal";

const CHAPTERS = [
  {
    src: "/asset/photo_2026-09-20_11-21-14.jpg",
    alt: "ተመራቂው በተዘጋጀ የቴኳንዶ አቋም",
    kicker: "ምዕራፍ ፩",
    title: "ጅማሬው",
    body: "ባዶ እጅ፣ ባዶ ቀበቶ። የመጀመሪያው እርምጃ ከሁሉም ይከብዳል። ዶጃንግ ውስጥ የተወሰደው የመጀመሪያ ትንፋሽ የዓመታት ጉዞ መነሻ ሆነ።",
    reverse: false,
  },
  {
    src: "/asset/photo_2026-09-20_11-21-10.jpg",
    alt: "ተመራቂው የመከላከያ አቋም ሲያሳይ",
    kicker: "ምዕራፍ ፪",
    title: "ልምምዱ",
    body: "ሺህ ጊዜ የተደጋገመ ምት። ላብ፣ ውድቀትና እንደገና መነሳት። ሰውነት ከመማሩ በፊት መንፈስ መገራት ነበረበት።",
    reverse: true,
  },
  {
    src: "/asset/photo_2026-09-20_11-21-24.jpg",
    alt: "ተመራቂው ጥቁር ቀበቶውን በእጁ ይዞ",
    kicker: "ምዕራፍ ፫",
    title: "ጥቁር ቀበቶ",
    body: "ጥቁር ቀበቶ መጨረሻ አይደለም። ነጩ ቀበቶ በላብና በጊዜ ተቀይሮ የደረሰበት ምዕራፍ ነው። እውነተኛው ትምህርት ከዚህ በኋላ ይጀምራል።",
    reverse: false,
  },
];

/** Alternating photo/text chapters — the spine of the scroll story. */
export default function Journey() {
  return (
    <section className="relative z-20 py-20 sm:py-28">
      <Reveal className="mx-auto mb-24 max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.18em] text-[#e8b450]/80">
          ጉዞው
        </p>
        <h2 className="font-serif text-4xl leading-tight font-bold sm:text-6xl">
          <WordReveal text="ከነጭ ቀበቶ" className="text-[#f5efe2]" />{" "}
          <WordReveal text="እስከ ጥቁር" className="text-gold-gradient" />
        </h2>
      </Reveal>

      <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6 sm:gap-40">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.title}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              c.reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <ParallaxPhoto
              src={c.src}
              alt={c.alt}
              depth={0.35}
              tilt={c.reverse ? -6 : 6}
              className="mx-auto aspect-[4/5] max-h-[68svh] w-full max-w-sm rounded-3xl lg:max-w-md"
              sizes="(max-width: 1024px) 88vw, 44vw"
            />

            <Reveal delay={0.12} y={52}>
              <span className="text-sm tracking-[0.18em] text-[#e8b450]/80">
                {c.kicker}
              </span>
              <h3 className="mt-5 font-serif text-3xl font-bold text-[#f5efe2] sm:text-5xl">
                {c.title}
              </h3>
              <div className="gold-rule mt-6 h-px w-24" />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#f5efe2]/65 sm:text-lg">
                {c.body}
              </p>
              <p className="mt-6 font-serif text-5xl text-[#e8b450]/12 select-none sm:text-7xl">
                0{i + 1}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
