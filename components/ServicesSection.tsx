"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollLine from "@/components/ScrollLine";

const problemRows = [
  ["01", "Over-insuring out of fear"],
  ["02", "Under-insuring to save a few hundred dollars"],
  ["03", "Structures that clients do not understand"],
  ["04", "Investment decisions that break down during volatility"],
];

const services = [
  {
    number: "01",
    title: "Financial analysis",
    bodyLines: [
      "Review income, liabilities, cashflow, risks,",
      "and existing financial structures.",
    ],
  },
  {
    number: "02",
    title: "Financial planning",
    bodyLines: [
      "Build an intentional roadmap aligned with",
      "your priorities and long-term goals.",
    ],
  },
  {
    number: "03",
    title: "Retirement planning",
    bodyLines: [
      "Prepare for financial independence with a",
      "sustainable, adaptable structure.",
    ],
  },
  {
    number: "04",
    title: "Insurance planning",
    bodyLines: [
      "Assess life and health insurance needs",
      "with clarity and proper risk assessment.",
    ],
  },
  {
    number: "05",
    title: "Estate planning support",
    bodyLines: [
      "Help you consider legacy goals and",
      "coordinate suitable next steps with the",
      "appropriate professionals.",
    ],
  },
  {
    number: "06",
    title: "Financial advisory",
    bodyLines: [
      "Review progress and adapt your financial",
      "structure as life changes.",
    ],
  },
];

function SplitProblemHeadline({
  lines,
}: {
  lines: Array<{ text: string; delay: number }>;
}) {
  let charIndex = 0;

  return (
    <>
      {lines.map((line) => (
        <span key={line.text} className="problem-headline-line">
          <span aria-label={line.text}>
            {line.text.split(" ").map((word, wordIndex, words) => (
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
                      className="problem-headline-char"
                      style={
                        {
                          "--char-delay": `${line.delay + currentIndex * 20}ms`,
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
        </span>
      ))}
    </>
  );
}

function SplitServiceHeading({ text }: { text: string }) {
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
                className="service-heading-char"
                style={
                  {
                    "--char-delay": `${currentIndex * 24}ms`,
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

function SplitServiceTitle({
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
                className="service-title-char"
                style={
                  {
                    "--char-delay": `${delay + currentIndex * 30}ms`,
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

export default function ServicesSection() {
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      setTopVisible(true);
      setBottomVisible(true);
      return;
    }

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopVisible(true);
          topObserver.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomVisible(true);
          bottomObserver.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    if (topRef.current) {
      topObserver.observe(topRef.current);
    }

    if (bottomRef.current) {
      bottomObserver.observe(bottomRef.current);
    }

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="services"
      className="scroll-line-host relative mx-auto h-[1080px] max-w-[1800px] border-x border-b border-line bg-paper text-primary"
    >
      <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      <div
        ref={topRef}
        className={`services-problem scroll-line-host relative grid h-[438px] grid-cols-2 border-b border-line ${
          topVisible ? "is-visible" : ""
        }`}
      >
        <div className="bg-ink px-5 pt-[85px] text-on-ink">
          <p className="problem-kicker font-satoshi text-[24px] font-medium leading-none">
            The Problem I Solve :
          </p>
          <h2 className="mt-[33px] max-w-[803px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
            <SplitProblemHeadline
              lines={[
                { text: "Financially capable people", delay: 180 },
                { text: "can still underperform.", delay: 500 },
              ]}
            />
          </h2>
        </div>

        <div className="scroll-line-host relative border-l border-line px-[70px] pt-[73px]">
          <ScrollLine direction="y" className="bottom-0 left-0 top-0" />
          <div className="space-y-[24px]">
            {problemRows.map(([number, text], index) => (
              <div
                key={number}
                tabIndex={0}
                className="problem-row flex items-center justify-between px-[12px] py-[10px] font-satoshi text-[24px] font-medium leading-none"
                style={{ "--row-delay": `${260 + index * 110}ms` } as CSSProperties}
              >
                <span className="problem-row-fill" aria-hidden="true" />
                <p className="problem-row-text">{text}</p>
                <span className="problem-row-number">{number}</span>
                <span className="problem-row-divider" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      </div>

      <div
        ref={bottomRef}
        className={`services-panel relative h-[642px] bg-ink text-on-ink ${
          bottomVisible ? "is-visible" : ""
        }`}
      >
        <p className="services-kicker absolute left-10 top-[74px] font-satoshi text-[24px] font-medium leading-none">
          Services :
        </p>

        <h2 className="absolute left-[600px] top-[63px] w-[970px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
          <SplitServiceHeading text="Advice grounded in the full financial picture." />
        </h2>

        <div className="absolute left-[600px] top-[274px] grid w-[1031px] grid-cols-3 gap-x-[63px] gap-y-[30px]">
          {services.map((service, index) => (
            <article
              key={service.number}
              className="service-item w-[304px]"
              style={{ "--item-delay": `${520 + index * 110}ms` } as CSSProperties}
            >
              <p className="service-number font-satoshi text-[20px] font-medium leading-none">
                {service.number}
              </p>
              <div className="service-divider mt-[14px] w-full border-t border-dashed border-white/45" />
              <h3 className="mt-[8px] font-manrope text-[24px] font-semibold leading-[1.35]">
                <SplitServiceTitle
                  text={service.title}
                  delay={720 + index * 110}
                />
              </h3>
              <p className="mt-[8px] font-satoshi text-[16px] font-medium leading-[1.38] text-on-ink">
                {service.bodyLines.map((line, lineIndex) => (
                  <span
                    key={`${service.number}-${line}`}
                    className="service-body-line"
                    style={
                      {
                        "--body-delay": `${900 + index * 110 + lineIndex * 95}ms`,
                      } as CSSProperties
                    }
                  >
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
