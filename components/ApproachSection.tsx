"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLine from "@/components/ScrollLine";
import useMediaQuery from "@/components/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const approachSteps = [
  {
    number: "01",
    title: "Clarify the goal",
    bodyLines: [
      "Understand priorities, responsibilities, and desired",
      "outcomes.",
    ],
    tabletBodyLines: [
      "Understand priorities, responsibilities,",
      "and desired outcomes.",
    ],
  },
  {
    number: "02",
    title: "Assess current structure",
    bodyLines: ["Review risk, policies, investments, and", "possible overlaps."],
  },
  {
    number: "03",
    title: "Build an intentional plan",
    bodyLines: ["Keep only what clearly supports the", "financial goal."],
  },
  {
    number: "04",
    title: "Track and adapt",
    bodyLines: ["Review progress and adjust when", "life changes."],
  },
];

const missionVisionItems = [
  {
    label: "Mission",
    heading: "Achieve freedom without repercussions.",
    bodyLines: [
      "To help people achieve freedom without",
      "repercussions by designing financial structures",
      "that are mathematically sound, behaviourally",
      "practical, and built to withstand real-life scenarios.",
    ],
    compactBodyLines: [
      "To help people achieve freedom",
      "without repercussions by designing",
      "financial structures that are",
      "mathematically sound,",
      "behaviourally practical, and built",
      "to withstand real-life scenarios.",
    ],
    mobileBodyLines: [
      "To help people achieve freedom",
      "without repercussions by designing",
      "financial structures that are mathematically",
      "sound, behaviourally practical, and built to",
      "withstand real-life scenarios.",
    ],
    smallBodyLines: [
      "To help people achieve freedom",
      "without repercussions by designing",
      "financial structures that are",
      "mathematically sound,",
      "behaviourally practical, and built",
      "to withstand real-life scenarios.",
    ],
    extraSmallBodyLines: [
      "To help people achieve freedom",
      "without repercussions by",
      "designing financial structures",
      "that are mathematically",
      "sound, behaviourally practical,",
      "and built to withstand",
      "real-life scenarios.",
    ],
    panelClassName:
      "relative border-r border-line bg-paper text-primary approach-mv-panel",
    labelClassName:
      "absolute left-[101px] top-[111px] font-satoshi text-[24px] font-medium leading-none",
    headingClassName:
      "absolute left-[378px] top-[96px] w-[433px] font-manrope text-[36px] font-semibold leading-[1.36] tracking-normal",
    boxClassName:
      "absolute left-[100px] top-[275px] h-[295px] w-[708px] bg-ink px-20 pt-[83px] text-on-ink",
  },
  {
    label: "Vision",
    heading: "Raise the standard of advisory work.",
    bodyLines: [
      "To place greater emphasis on structured thinking,",
      "behaviour, and long-term decision quality rather",
      "than simply focusing on products.",
    ],
    compactBodyLines: [
      "To place greater emphasis on",
      "structured thinking, behaviour,",
      "and long-term decision quality",
      "rather than simply focusing",
      "on products.",
    ],
    mobileBodyLines: [
      "To place greater emphasis on",
      "structured thinking, behaviour, and",
      "long-term decision quality rather",
      "than simply focusing on products.",
    ],
    smallBodyLines: [
      "To place greater emphasis on",
      "structured thinking, behaviour, and",
      "long-term decision quality rather",
      "than simply focusing on products.",
    ],
    extraSmallBodyLines: [
      "To place greater emphasis on",
      "structured thinking, behaviour,",
      "and long-term decision quality",
      "rather than simply",
      "focusing on products.",
    ],
    panelClassName: "relative bg-ink text-on-ink approach-mv-panel",
    labelClassName:
      "absolute left-[95px] top-[111px] font-satoshi text-[24px] font-medium leading-none",
    headingClassName:
      "absolute left-[432px] top-[96px] w-[433px] font-manrope text-[36px] font-semibold leading-[1.36] tracking-normal",
    boxClassName:
      "absolute left-[87px] top-[275px] h-[295px] w-[708px] bg-paper px-20 pt-[83px] text-primary",
  },
];

function SplitChars({
  text,
  className,
  delay = 0,
  step = 28,
}: {
  text: string;
  className: string;
  delay?: number;
  step?: number;
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
                className={className}
                style={
                  {
                    "--char-delay": `${delay + currentIndex * step}ms`,
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

function SplitApproachIntro() {
  return (
    <>
      <span className="approach-intro-line">
        <SplitChars
          text="A structured approach"
          className="approach-intro-char"
          delay={180}
          step={22}
        />
      </span>
      <span className="approach-intro-line">
        <SplitChars
          text="built for real life."
          className="approach-intro-char"
          delay={640}
          step={22}
        />
      </span>
    </>
  );
}

function SplitApproachStepTitle({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  return (
    <SplitChars
      text={text}
      className="approach-step-title-char"
      delay={160 + index * 12}
      step={28}
    />
  );
}

function SplitMissionVisionHeading({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <SplitChars
      text={text}
      className="approach-mv-heading-char"
      delay={delay}
      step={24}
    />
  );
}

function SmallDownArrow() {
  return (
    <Image
      src="/icons/arrow-down-svgrepo-com.svg"
      alt=""
      aria-hidden="true"
      width={50}
      height={50}
      className="h-[50px] w-[50px] object-contain"
    />
  );
}

function ApproachCard({
  step,
  index,
  isActive,
  cardRef,
}: {
  step: (typeof approachSteps)[number];
  index: number;
  isActive: boolean;
  cardRef?: (element: HTMLElement | null) => void;
}) {
  const isDark = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      className={`approach-step-card absolute inset-0 overflow-hidden ${
        isDark ? "bg-ink text-on-ink" : "bg-paper text-primary"
      } ${isActive ? "is-active" : ""}`}
    >
      <p className="approach-step-number absolute left-4 top-[73px] font-manrope text-[64px] font-semibold leading-none">
        {step.number}
      </p>
      <h3 className="absolute right-[15px] top-[63px] max-w-[760px] text-right font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
        <SplitApproachStepTitle text={step.title} index={index} />
      </h3>
      <p className="absolute bottom-[92px] left-[105px] w-[784px] text-center font-satoshi text-[32px] font-medium leading-[1.35]">
        {step.bodyLines.map((line, lineIndex) => (
          <span
            key={`${step.number}-${line}`}
            className="approach-step-body-line"
            style={
              {
                "--body-delay": `${520 + lineIndex * 130}ms`,
              } as CSSProperties
            }
          >
            {line}
          </span>
        ))}
      </p>
    </article>
  );
}

function MissionVision({
  containerRef,
  isVisible = true,
}: {
  containerRef?: (element: HTMLDivElement | null) => void;
  isVisible?: boolean;
}) {
  const useCompactBodyLines = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1499.98px)"
  );
  const useMobileBodyLines = useMediaQuery("(max-width: 448px)");
  const useSmallBodyLines = useMediaQuery("(max-width: 397px)");
  const useExtraSmallBodyLines = useMediaQuery("(max-width: 340px)");

  return (
    <div
      ref={containerRef}
      className={`approach-mission-vision grid h-[642px] grid-cols-2 ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {missionVisionItems.map((item, index) => {
        const bodyLines = useExtraSmallBodyLines
          ? item.extraSmallBodyLines
          : useSmallBodyLines
            ? item.smallBodyLines
            : useMobileBodyLines
              ? item.mobileBodyLines
              : useCompactBodyLines
                ? item.compactBodyLines
                : item.bodyLines;

        return (
          <div
            key={item.label}
            className={`${item.panelClassName} ${index === 0 ? "scroll-line-host" : ""}`}
          >
          {index === 0 ? (
            <ScrollLine direction="y" className="bottom-0 right-0 top-0" />
          ) : null}
          <p
            className={`approach-mv-label ${item.labelClassName}`}
            style={{ "--mv-delay": `${index * 140}ms` } as CSSProperties}
          >
            {item.label}
          </p>
          <h3 className={item.headingClassName}>
            <SplitMissionVisionHeading
              text={item.heading}
              delay={220 + index * 140}
            />
          </h3>
          <div
            className={`approach-mv-box ${item.boxClassName}`}
            style={{ "--mv-delay": `${420 + index * 140}ms` } as CSSProperties}
          >
            <p className="relative z-10 text-center font-satoshi text-[24px] font-medium leading-[1.34]">
              {bodyLines.map((line, lineIndex) => (
                <span
                  key={`${item.label}-${line}`}
                  className="approach-mv-body-line"
                  style={
                    {
                      "--mv-body-delay": `${650 + index * 140 + lineIndex * 110}ms`,
                    } as CSSProperties
                  }
                >
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
        );
      })}
    </div>
  );
}

export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const missionVisionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [missionVisionInView, setMissionVisionInView] = useState(false);
  const [missionVisionVisible, setMissionVisionVisible] = useState(false);
  const [hasCompletedFinalStepHold, setHasCompletedFinalStepHold] =
    useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stackStepsVisible, setStackStepsVisible] = useState(false);
  const stackStepsRef = useRef<HTMLDivElement | null>(null);
  const isTabletPortrait = useMediaQuery("(max-width: 1023.98px)");
  const useTabletStepBodyLines = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023.98px)"
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(media.matches);

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIntroVisible(true);
      setMissionVisionInView(true);
      setMissionVisionVisible(true);
      setHasCompletedFinalStepHold(true);
      return;
    }

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          introObserver.disconnect();
        }
      },
      { threshold: 0.32 }
    );

    const missionVisionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMissionVisionInView(true);
          missionVisionObserver.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    if (introRef.current) {
      introObserver.observe(introRef.current);
    }

    if (missionVisionRef.current) {
      missionVisionObserver.observe(missionVisionRef.current);
    }

    return () => {
      introObserver.disconnect();
      missionVisionObserver.disconnect();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (missionVisionInView && hasCompletedFinalStepHold) {
      setMissionVisionVisible(true);
    }
  }, [hasCompletedFinalStepHold, missionVisionInView]);

  useEffect(() => {
    if (!reducedMotion && !isTabletPortrait) {
      return;
    }

    if (reducedMotion) {
      setStackStepsVisible(true);
      return;
    }

    const node = stackStepsRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStackStepsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isTabletPortrait, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isTabletPortrait) {
      return;
    }

    const firstFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const settleTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 280);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(settleTimeout);
    };
  }, [isTabletPortrait, reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      // Pin/mask sequence is desktop-only. gsap.matchMedia gates it on the
      // viewport AND reverts the pin-spacer cleanly when crossing below 1024px
      // (a bare ScrollTrigger.kill() leaves the spacer orphaned in the DOM).
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!sectionRef.current || !pinRef.current) {
          return;
        }

        const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
        gsap.set(cards.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=4200",
            pin: pinRef.current,
            pinSpacing: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const nextActiveStep =
                progress < 0.22 ? 0 : progress < 0.46 ? 1 : progress < 0.7 ? 2 : 3;

              if (progress >= 0.86) {
                setHasCompletedFinalStepHold(true);
              }

              setActiveStep((currentStep) =>
                currentStep === nextActiveStep ? currentStep : nextActiveStep
              );
            },
          },
        });

        timeline.to({}, { duration: 0.85 });

        cards.slice(1).forEach((card) => {
          timeline.to(card, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "none",
          });
        });

        timeline.to({}, { duration: 0.95 });
      });

      return () => mm.revert();
    },
    { dependencies: [isTabletPortrait, reducedMotion], scope: sectionRef }
  );

  if (reducedMotion || isTabletPortrait) {
    return (
      <section
        id="approach"
        ref={sectionRef}
        className="scroll-line-host relative mx-auto max-w-[1800px] border-x border-b border-line bg-paper text-primary"
      >
        <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
        <div className="scroll-line-host relative grid border-b border-line lg:grid-cols-[45%_55%]">
          <div className="approach-mobile-intro px-5 py-[50px]">
            <p className="font-satoshi text-[24px] font-medium leading-none">
              My Approach :
            </p>
            <h2 className="mt-[33px] max-w-[707px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              A structured approach built for real life.
            </h2>
          </div>
          <div
            ref={stackStepsRef}
            className={`approach-steps-stack grid gap-px bg-line ${
              stackStepsVisible ? "is-visible" : ""
            }`}
          >
            {approachSteps.map((step, index) => (
              <div
                key={step.number}
                className={`approach-stack-step grid grid-cols-[120px_1fr] gap-10 px-4 py-10 ${
                  index % 2 === 0 ? "bg-ink text-on-ink" : "bg-paper text-primary"
                }`}
                style={{ "--stack-delay": `${index * 120}ms` } as CSSProperties}
              >
                <p className="font-manrope text-[64px] font-semibold leading-none">
                  {step.number}
                </p>
                <div>
                  <h3 className="font-manrope text-[44px] font-semibold leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 font-satoshi text-[24px] font-medium leading-[1.35]">
                    {(useTabletStepBodyLines
                      ? step.tabletBodyLines ?? step.bodyLines
                      : step.bodyLines
                    ).map((line) => (
                      <span
                        key={`${step.number}-${line}`}
                        className="approach-stack-body-line block"
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
        </div>
        <MissionVision isVisible />
      </section>
    );
  }

  return (
    <section
      id="approach"
      ref={sectionRef}
      data-rail-pause="approach"
      className="scroll-line-host relative mx-auto max-w-[1800px] border-x border-b border-line bg-paper text-primary"
    >
      <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      <div ref={pinRef} className="approach-pin h-[1080px] bg-paper">
        <div className="scroll-line-host relative grid h-[438px] grid-cols-[45%_55%] border-b border-line">
          <div
            ref={introRef}
            className={`approach-intro relative ${introVisible ? "is-visible" : ""}`}
          >
            <p className="approach-intro-kicker absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
              My Approach :
            </p>
            <h2 className="absolute left-5 top-[163px] w-[707px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              <SplitApproachIntro />
            </h2>
            <div className="approach-intro-arrow absolute left-5 top-[357px]">
              <SmallDownArrow />
            </div>
          </div>

          <div className="scroll-line-host relative overflow-hidden border-l border-line">
            <ScrollLine direction="y" className="bottom-0 left-0 top-0" />
            {approachSteps.map((step, index) => (
              <ApproachCard
                key={step.number}
                step={step}
                index={index}
                isActive={introVisible && index === activeStep}
                cardRef={(element) => {
                  cardsRef.current[index] = element;
                }}
              />
            ))}
          </div>
          <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
        </div>

        <MissionVision
          containerRef={(element) => {
            missionVisionRef.current = element;
          }}
          isVisible={missionVisionVisible}
        />
      </div>
    </section>
  );
}
