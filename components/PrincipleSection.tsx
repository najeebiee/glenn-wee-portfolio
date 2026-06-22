"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollLine from "@/components/ScrollLine";

const principles = [
  ["01", "Clarity", "Know what matters and why it belongs in your plan."],
  ["02", "Protection", "Prepare for the setbacks that can disrupt progress."],
  ["03", "Adaptability", "Adjust intentionally as life and priorities change."],
];

function AnimatedTitle({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  let charIndex = 0;

  return (
    <span aria-label={text}>
      {text.split(" ").map((word, wordIndex, words) => (
        <span
          key={`${word}-${wordIndex}`}
          className="split-word"
          aria-hidden="true"
        >
          {Array.from(word).map((char) => {
            const currentIndex = charIndex;
            charIndex += 1;

            return (
              <span
                key={`${char}-${currentIndex}`}
                className="principle-split-char"
                style={
                  {
                    "--char-delay": `${delay + currentIndex * 34}ms`,
                  } as CSSProperties
                }
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

export default function PrincipleSection() {
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
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`principle-section scroll-line-host relative mx-auto grid max-w-[1800px] grid-cols-[2fr_repeat(3,1fr)] border-x border-y border-line bg-ink text-white ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <ScrollLine direction="x" light className="left-0 right-0 top-0" />
      <ScrollLine direction="x" light className="bottom-0 left-0 right-0" />
      <p className="relative flex flex-col justify-center px-24 py-20 text-[34px] leading-[1.35] tracking-[-0.04em]">
        <span
          className="principle-line"
          style={{ "--line-delay": "0ms" } as CSSProperties}
        >
          A good financial plan should fit your
        </span>
        <span
          className="principle-line"
          style={{ "--line-delay": "140ms" } as CSSProperties}
        >
          lifestyle, protect you from setbacks,
        </span>
        <span
          className="principle-line"
          style={{ "--line-delay": "280ms" } as CSSProperties}
        >
          and adapt as life changes.
        </span>
        <ScrollLine
          completeOnEnter
          direction="x"
          light
          className="principle-row-divider bottom-0 left-0 right-0"
        />
      </p>
      {principles.map(([number, title, body], index) => {
        const cardDelay = 280 + index * 160;

        return (
          <article
            key={title}
            className="principle-card scroll-line-host relative border-l border-white/60 px-6 py-7"
            style={{ "--card-delay": `${cardDelay}ms` } as CSSProperties}
          >
            <ScrollLine
              direction="y"
              end="bottom 45%"
              light
              scrub={0.8}
              start="top 98%"
              startScale={0}
              triggerParent
              className="bottom-0 left-0 top-0"
            />
            <span className="principle-card-number text-[16px]">{number}</span>
            <h2 className="mt-20 text-[24px] font-semibold tracking-[-0.04em]">
              <AnimatedTitle text={title} delay={cardDelay + 180} />
            </h2>
            <p
              className="principle-card-body mt-5 max-w-[260px] text-[17px] leading-[1.45] text-white/90"
              style={{ "--body-delay": `${cardDelay + 460}ms` } as CSSProperties}
            >
              {body}
            </p>
          </article>
        );
      })}
    </section>
  );
}
