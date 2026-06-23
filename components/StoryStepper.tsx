"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLine from "@/components/ScrollLine";

gsap.registerPlugin(ScrollTrigger);

const STORY_MOBILE_QUERY = "(max-width: 767.98px)";
const STORY_TRIGGER_IDS = ["story-stepper-entrance", "story-stepper-pin"];

function killStoryStepperTriggers() {
  ScrollTrigger.getAll()
    .filter((trigger) => STORY_TRIGGER_IDS.includes(String(trigger.vars.id)))
    .forEach((trigger) => trigger.kill());
}

const storySteps = [
  {
    number: "1",
    title: "Why I entered the industry",
    bodyLines: [
      "I entered financial advisory for income scalability.",
      "The reason I stayed became something much more meaningful.",
    ],
    icon: "/icons/bar-chart-svgrepo-com.svg",
  },
  {
    number: "2",
    title: "The lesson that changed my thinking",
    bodyLines: [
      "In my early twenties, cashflow problems in an",
      "overseas F&B venture exposed the cost of planning",
      "without forecasting, runway, or stress tests.",
    ],
    icon: "/icons/compass-svgrepo-com.svg",
  },
  {
    number: "3",
    title: "How I advise clients today",
    bodyLines: [
      "That experience shaped my approach: calculate risk",
      "factually, manage decisions behaviourally, and build",
      "plans that can withstand real life.",
    ],
    icon: "/icons/shield-checkmark-sharp-svgrepo-com.svg",
  },
];

function StoryIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={140}
      height={140}
      className="h-[140px] w-[140px] object-contain invert"
    />
  );
}

function SplitStoryTitle({ text }: { text: string }) {
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
                className="story-split-char"
                style={
                  {
                    "--char-delay": `${currentIndex * 42}ms`,
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

function SplitQuoteText({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) {
  let charIndex = 0;

  return (
    <span aria-label={text} className={isActive ? "is-visible" : undefined}>
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
                className="quote-split-char"
                style={
                  {
                    "--char-delay": `${currentIndex * 11}ms`,
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

function DownArrow() {
  return (
    <Image
      src="/icons/arrow-down-svgrepo-com.svg"
      alt=""
      aria-hidden="true"
      width={58}
      height={150}
      className="h-[150px] w-[58px] object-fill invert"
    />
  );
}

export default function StoryStepper() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [quoteHasEntered, setQuoteHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [storyViewportReady, setStoryViewportReady] = useState(false);
  const [isStoryMobile, setIsStoryMobile] = useState(true);
  const activeStep = storySteps[activeIndex];
  const shouldRenderStatic = reducedMotion || !storyViewportReady || isStoryMobile;

  useEffect(() => {
    const resetStoryState = () => {
      killStoryStepperTriggers();
      setActiveIndex(0);
      setHasEntered(false);
      setQuoteHasEntered(false);
    };
    const media = window.matchMedia(STORY_MOBILE_QUERY);
    const syncStoryViewport = () => {
      const isMobile = media.matches;

      setIsStoryMobile(isMobile);
      setStoryViewportReady(true);

      if (isMobile) {
        resetStoryState();
      }
    };

    syncStoryViewport();
    media.addEventListener("change", syncStoryViewport);

    return () => {
      media.removeEventListener("change", syncStoryViewport);
      killStoryStepperTriggers();
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(media.matches);

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!storyViewportReady || reducedMotion || isStoryMobile) {
      killStoryStepperTriggers();
      setActiveIndex(0);
      setHasEntered(false);
      setQuoteHasEntered(false);
    }
  }, [isStoryMobile, reducedMotion, storyViewportReady]);

  useGSAP(
    () => {
      if (
        reducedMotion ||
        !storyViewportReady ||
        isStoryMobile ||
        !sectionRef.current ||
        !pinRef.current ||
        !progressRef.current ||
        !quoteRef.current
      ) {
        killStoryStepperTriggers();
        return;
      }

      const sectionEl = sectionRef.current;
      const pinEl = pinRef.current;
      const progressEl = progressRef.current;
      const quoteEl = quoteRef.current;

      gsap.set(quoteEl, { autoAlpha: 0, y: 48 });

      const entranceTrigger = ScrollTrigger.create({
        id: "story-stepper-entrance",
        trigger: sectionEl,
        start: "top 75%",
        once: true,
        onEnter: () => setHasEntered(true),
      });

      const trigger = ScrollTrigger.create({
        id: "story-stepper-pin",
        trigger: sectionEl,
        start: "top top",
        end: "+=3800",
        pin: pinEl,
        pinSpacing: true,
        scrub: 0.25,
        anticipatePin: 1,
        onUpdate: (self) => {
          const storyProgress = Math.min(1, self.progress / 0.76);
          const nextIndex = Math.min(
            storySteps.length - 1,
            Math.floor(storyProgress * storySteps.length)
          );
          setActiveIndex(nextIndex);
          gsap.to(progressEl, {
            scaleX: Math.max(0.02, storyProgress),
            duration: 0.15,
            ease: "none",
            transformOrigin: "left center",
          });

          const quoteProgress = gsap.utils.clamp(0, 1, (self.progress - 0.74) / 0.12);
          if (quoteProgress >= 0.65) {
            setQuoteHasEntered(true);
          }
          gsap.to(quoteEl, {
            autoAlpha: quoteProgress,
            y: 48 - quoteProgress * 48,
            duration: 0.1,
            ease: "none",
          });
        },
      });

      return () => {
        entranceTrigger.kill();
        trigger.kill();
      };
    },
    { dependencies: [isStoryMobile, reducedMotion, storyViewportReady], scope: sectionRef }
  );

  useGSAP(
    () => {
      if (reducedMotion || !storyViewportReady || isStoryMobile || !hasEntered) {
        return;
      }

      const animatedTargets = [
        numberRef.current,
        iconRef.current,
      ].filter(Boolean) as HTMLElement[];

      gsap.fromTo(
        animatedTargets,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.16 }
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.95, ease: "power2.out" }
        );
      }
    },
    {
      dependencies: [
        activeIndex,
        hasEntered,
        isStoryMobile,
        reducedMotion,
        storyViewportReady,
      ],
      scope: sectionRef,
    }
  );

  if (shouldRenderStatic) {
    const useMobileStaticLayout = storyViewportReady && isStoryMobile;

    return (
      <section
        ref={sectionRef}
        className="story-stepper-section story-stepper-static scroll-line-host relative mx-auto max-w-[1800px] border-x border-line bg-ink text-white"
      >
        <div className="story-stepper-static-panel scroll-line-host relative border-b border-white/55 px-[81px] py-[72px]">
          {!useMobileStaticLayout ? (
            <div className="story-stepper-static-icon absolute right-[96px] top-[92px]">
              <StoryIcon src={storySteps[0].icon} />
            </div>
          ) : null}
          <div className="story-stepper-static-list grid gap-12 pr-[220px]">
            {storySteps.map((step) => (
              <article key={step.number} className="story-stepper-static-item grid grid-cols-[160px_1fr] gap-20">
                {useMobileStaticLayout ? (
                  <>
                    <div className="story-stepper-static-mobile-top flex items-start justify-between gap-6">
                      <span className="story-stepper-static-number font-manrope text-[120px] font-medium leading-none">
                        {step.number}
                      </span>
                      <div className="story-stepper-static-icon">
                        <StoryIcon src={step.icon} />
                      </div>
                    </div>
                    <div className="story-stepper-static-copy text-center">
                      <h2 className="story-stepper-static-title font-manrope text-[52px] font-semibold leading-tight">
                        {step.title}
                      </h2>
                      <p className="story-stepper-static-body mx-auto mt-7 max-w-[760px] font-satoshi text-[28px] leading-[1.35]">
                        {step.bodyLines.join(" ")}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="story-stepper-static-number font-manrope text-[120px] font-medium leading-none">
                      {step.number}
                    </span>
                    <div>
                      <h2 className="story-stepper-static-title font-manrope text-[52px] font-semibold leading-tight">
                        {step.title}
                      </h2>
                      <p className="story-stepper-static-body mt-7 max-w-[760px] font-satoshi text-[28px] leading-[1.35]">
                        {step.bodyLines.join(" ")}
                      </p>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
          <ScrollLine direction="x" light className="bottom-0 left-0 right-0" />
        </div>
        <QuoteBlock quoteHasEntered />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-rail-pause="story"
      className="story-stepper-section scroll-line-host relative mx-auto max-w-[1800px] border-x border-line bg-paper text-ink"
    >
      <div
        ref={pinRef}
        className="story-stepper-pin h-[1080px] bg-paper"
      >
        <div
        className="story-stepper-panel relative h-[642px] overflow-hidden bg-ink text-white"
      >
        <ScrollLine direction="x" light className="bottom-0 left-[60px] right-[60px]" />
        <div className="absolute inset-x-[60px] bottom-0 h-px bg-white/55" />
        <p
          ref={numberRef}
          className="story-stepper-number absolute left-[81px] top-[72px] font-manrope text-[165px] font-medium leading-none"
        >
          {activeStep.number}
        </p>

        <div ref={iconRef} className="story-stepper-icon absolute right-[112px] top-[82px] text-white">
          <StoryIcon src={activeStep.icon} />
        </div>

        <div
          ref={contentRef}
          className={`story-stepper-content absolute left-1/2 top-[92px] h-[270px] w-[880px] -translate-x-1/2 text-center ${
            hasEntered ? "is-visible" : ""
          }`}
        >
          <h2 className="story-stepper-title absolute inset-x-0 top-0 font-manrope text-[64px] font-semibold leading-[1.08]">
            <SplitStoryTitle text={activeStep.title} />
          </h2>
          <p className="story-stepper-body absolute inset-x-0 top-[184px] mx-auto max-w-[760px] font-satoshi text-[32px] leading-[1.35]">
            {activeStep.bodyLines.map((line, index) => (
              <span
                key={`${activeStep.number}-${line}`}
                className="story-body-line"
                style={
                  {
                    "--text-reveal-delay": `${220 + index * 260}ms`,
                  } as CSSProperties
                }
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="story-stepper-arrow absolute left-1/2 top-[440px] -translate-x-1/2 text-white">
          <DownArrow />
        </div>

        <div className="story-stepper-progress absolute left-1/2 top-[606px] h-[2px] w-[300px] -translate-x-1/2 bg-white/45">
          <div ref={progressRef} className="h-full origin-left scale-x-[0.02] bg-white" />
        </div>
      </div>

        <QuoteBlock ref={quoteRef} quoteHasEntered={quoteHasEntered} />
      </div>
    </section>
  );
}

const quoteText =
  "The best plan is not the one that looks best on paper. It is the one that can survive real life.";

const QuoteBlock = forwardRef<HTMLDivElement, { quoteHasEntered?: boolean }>(
  function QuoteBlock({ quoteHasEntered = false }, ref) {
  return (
    <div ref={ref} className="quote-panel relative h-[438px] bg-paper text-ink">
      <blockquote className="quote-block absolute left-[399px] top-[124px] w-[1066px]">
        <p
          aria-hidden="true"
          className="quote-mark absolute left-0 top-[-78px] font-manrope text-[320px] font-semibold leading-none"
        >
          &ldquo;
        </p>
        <p className="quote-text font-manrope text-[48px] font-semibold leading-[1.38]">
          <SplitQuoteText text={quoteText} isActive={quoteHasEntered} />
        </p>
        <footer className="mt-[33px] flex items-center gap-6">
          <div className="relative size-14 overflow-hidden rounded-full border border-line bg-white">
            <Image
              src="/images/glenn-portrait.png"
              alt="Glenn Wee"
              fill
              className="scale-125 object-cover object-top"
              sizes="56px"
            />
          </div>
          <div>
            <p className="font-manrope text-[20px] font-semibold leading-tight">
              GLENN WEE
            </p>
            <p className="mt-1 font-satoshi text-[14px] font-medium leading-tight">
              Private Client Advisor
            </p>
          </div>
        </footer>
      </blockquote>
    </div>
  );
});
