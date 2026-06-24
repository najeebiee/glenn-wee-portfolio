"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteEntrance } from "@/components/SiteEntranceProvider";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSiteEntrance();

  useEffect(() => {
    if (status !== "ready") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });

    document.documentElement.classList.add("lenis-active");

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );

      if (!link) {
        return;
      }

      const hash = link.hash;

      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, { offset: 0 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.cancelAnimationFrame(rafId);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-active");
    };
  }, [status]);

  return children;
}
