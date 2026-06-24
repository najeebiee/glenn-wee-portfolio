"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollLine from "@/components/ScrollLine";

const storyLines = [
  "I did not enter financial advisory because I loved",
  "selling products. I entered for income scalability.",
  "The reason I stayed is very different.",
];

const tabletStoryLines = [
  "I did not enter financial advisory",
  "because I loved selling products.",
  "I entered for income scalability.",
  "The reason I stayed is very different.",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section scroll-line-host relative mx-auto h-[1080px] max-w-[1800px] border-x border-line bg-paper text-primary ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="scroll-line-host relative h-[347px] border-b border-line">
        <p className="about-kicker absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
          My Story :
        </p>

        <Image
          src="/icons/arrow-down-svgrepo-com.svg"
          alt=""
          aria-hidden="true"
          width={50}
          height={50}
          className="about-arrow absolute left-5 top-[202px] h-[50px] w-[50px] object-contain"
        />

        <div className="about-story-copy absolute left-[667px] top-[91px] w-[950px]">
          <h2 className="about-story-heading-default font-manrope text-[40px] font-bold leading-[1.375] tracking-normal">
            {storyLines.map((line, index) => (
              <span
                key={line}
                className="about-story-line"
                style={{ "--about-line-delay": `${360 + index * 420}ms` } as CSSProperties}
              >
                {line}
              </span>
            ))}
          </h2>
          <h2 className="about-story-heading-tablet font-manrope text-[40px] font-bold leading-[1.375] tracking-normal">
            {tabletStoryLines.map((line, index) => (
              <span
                key={line}
                className="about-story-line"
                style={{ "--about-line-delay": `${360 + index * 220}ms` } as CSSProperties}
              >
                {line}
              </span>
            ))}
          </h2>
          {[53, 108, 165].map((top, index) => (
            <div
              key={top}
              className="about-rule absolute left-0 h-px w-full bg-line"
              style={
                  {
                    top,
                  "--about-rule-delay": `${760 + index * 420}ms`,
                  } as CSSProperties
                }
            />
          ))}
        </div>
        <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      </div>

      <div className="about-image-wrap relative h-[733px] overflow-hidden">
        <Image
          src="/images/glenn-wide-portrait.png"
          alt="Glenn Wee standing before a mountain landscape"
          fill
          className="about-image object-cover"
          sizes="min(100vw, 1800px)"
        />
      </div>
    </section>
  );
}
