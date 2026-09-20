"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Whole-document scroll progress (0 → 1) in a ref, so 3D frame loops can
 * read it every frame without triggering React re-renders.
 */
export function useScrollProgress(): RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
