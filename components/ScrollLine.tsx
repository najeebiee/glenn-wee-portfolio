"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollLineProps = {
  className?: string;
  completeOnEnter?: boolean;
  direction: "x" | "y";
  initialComplete?: boolean;
  light?: boolean;
  trackPage?: boolean;
};

export default function ScrollLine({
  className = "",
  completeOnEnter = false,
  direction,
  initialComplete = false,
  light = false,
  trackPage = false,
}: ScrollLineProps) {
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const completeOnEnterRef = useRef(completeOnEnter);
  const initialCompleteRef = useRef(initialComplete);

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
    const trigger = trackPage ? document.documentElement : line;
    gsap.set(line, {
      [property]:
        initialCompleteRef.current || completeOnEnterRef.current ? 0 : 0.86,
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
        start: trackPage ? "top top" : "top 90%",
        end: trackPage ? "+=600" : "top 80%",
        scrub: 0.45,
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
        light ? "scroll-line-light" : ""
      } ${className}`}
    />
  );
}
