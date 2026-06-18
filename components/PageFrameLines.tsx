"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageFrameLines() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const lastHeightRef = useRef(0);
  const introStartRef = useRef(0);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rails = Array.from(frame.querySelectorAll(".page-frame-rail"));

    if (media.matches) {
      gsap.set(rails, { height: "100%" });
      return;
    }

    introStartRef.current = Date.now();
    const introDuration = 1150;
    const introViewportRatio = 0.88;

    const updateRails = () => {
      const introProgress = Math.min(
        1,
        (Date.now() - introStartRef.current) / introDuration
      );
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const isAtPageBottom =
        window.scrollY + viewportHeight >= documentHeight - 4;
      const rawTargetHeight = Math.min(
        documentHeight,
        Math.max(
          0,
          isAtPageBottom
            ? documentHeight
            : window.scrollY + viewportHeight * introViewportRatio * introProgress
        )
      );
      const nextHeight = Math.max(lastHeightRef.current, rawTargetHeight);

      lastHeightRef.current = nextHeight;

      gsap.set(rails, { height: nextHeight });
    };

    updateRails();
    window.addEventListener("scroll", updateRails, { passive: true });
    window.addEventListener("resize", updateRails);
    const updateTimer = window.setInterval(updateRails, 80);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      updateRails();
    }, 450);
    const lateRefreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      updateRails();
    }, 1500);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(lateRefreshTimer);
      window.clearInterval(updateTimer);
      window.removeEventListener("scroll", updateRails);
      window.removeEventListener("resize", updateRails);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="page-frame-lines pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1800px] -translate-x-1/2"
      aria-hidden="true"
    >
      <span className="page-frame-rail page-frame-rail-left" />
      <span className="page-frame-rail page-frame-rail-right" />
    </div>
  );
}
