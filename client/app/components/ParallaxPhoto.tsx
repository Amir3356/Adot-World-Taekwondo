"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * A photograph that drifts, scales and tilts against the scroll — the page's
 * main depth cue. `depth` scales how far it travels; `tilt` adds 3D rotation.
 */
export default function ParallaxPhoto({
  src,
  alt,
  priority = false,
  depth = 1,
  tilt = 0,
  className = "",
  sizes = "(max-width: 768px) 90vw, 45vw",
  zoom = true,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  depth?: number;
  tilt?: number;
  className?: string;
  sizes?: string;
  zoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [60 * depth, -60 * depth]);
  // Keep a floor above 1 so the drifting layer never reveals the frame edge.
  const scale = useTransform(smooth, [0, 0.5, 1], zoom ? [1.2, 1.08, 1.2] : [1.08, 1.08, 1.08]);
  const rotateY = useTransform(smooth, [0, 1], [tilt, -tilt]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ y, scale, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover contrast-[1.08] brightness-[1.02] saturate-[0.9]"
        />
      </motion.div>
      {/* warm multiply tones the light studio grey toward the page palette */}
      <div className="pointer-events-none absolute inset-0 bg-[#7a6033] mix-blend-multiply" />
      {/* soft vignette + bottom fade so the frame melts into the background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#e8b450]/25" />
    </div>
  );
}
