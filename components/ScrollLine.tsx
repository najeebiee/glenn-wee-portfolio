"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollLineProps = {
  className?: string;
  completeOnEnter?: boolean;
  direction: "x" | "y";
  end?: string;
  initialComplete?: boolean;
  light?: boolean;
  scrub?: number | boolean;
  start?: string;
  startScale?: number;
  trackPage?: boolean;
  triggerParent?: boolean;
};

export default function ScrollLine({
  className = "",
  completeOnEnter = false,
  direction,
  end,
  initialComplete = false,
  light = false,
  scrub,
  start,
  startScale = 0.86,
  trackPage = false,
  triggerParent = false,
}: ScrollLineProps) {
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const completeOnEnterRef = useRef(completeOnEnter);
  const endRef = useRef(end);
  const initialCompleteRef = useRef(initialComplete);
  const scrubRef = useRef(scrub);
  const startRef = useRef(start);
  const startScaleRef = useRef(startScale);
  const triggerParentRef = useRef(triggerParent);

  useEffect(() => {
    const line = lineRef.current;

    if (!line) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      gsap.set(line, { scaleX: 1, scaleY: 1 });
      return;
    }

    const property = direction === "x" ? "scaleX" : "scaleY";
    const trigger =
      trackPage || !triggerParentRef.current
        ? trackPage
          ? document.documentElement
          : line
        : line.parentElement ?? line;
    gsap.set(line, {
      [property]:
        initialCompleteRef.current || completeOnEnterRef.current
          ? 0
          : startScaleRef.current,
    });

    if (!trackPage && initialCompleteRef.current) {
      const entranceTween = gsap.to(line, {
        [property]: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.18,
      });
      const completionTimer = window.setTimeout(() => {
        gsap.set(line, { [property]: 1 });
      }, 1250);

      return () => {
        window.clearTimeout(completionTimer);
        entranceTween.kill();
      };
    }

    if (!trackPage && completeOnEnterRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(line, {
            [property]: 1,
            duration: 0.95,
            ease: "power3.out",
          });
          observer.disconnect();
        },
        { threshold: 0.01 }
      );
      observer.observe(line);

      return () => {
        observer.disconnect();
      };
    }

    const tween = gsap.to(line, {
      [property]: 1,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: startRef.current ?? (trackPage ? "top top" : "top 90%"),
        end: endRef.current ?? (trackPage
          ? "+=600"
          : direction === "y"
            ? "bottom 90%"
            : "top 80%"),
        scrub: scrubRef.current ?? 0.45,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, trackPage]);

  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className={`scroll-line scroll-line-${direction} ${
        initialComplete ? "scroll-line-initial-complete" : ""
      } ${
        completeOnEnter ? "scroll-line-complete-on-enter" : ""
      } ${
        startScale === 0 ? "scroll-line-start-zero" : ""
      } ${
        light ? "scroll-line-light" : ""
      } ${className}`}
    />
  );
}
