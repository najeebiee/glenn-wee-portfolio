"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    number: "01",
    title: "Why I entered the industry",
    body: "I entered financial advisory for income scalability. The reason I stayed became something much more meaningful.",
    icon: "/icons/bar-chart-svgrepo-com.svg",
  },
  {
    number: "02",
    title: "The lesson that changed my thinking",
    body: "In my early twenties, cashflow problems in an overseas F&B venture exposed the cost of planning without forecasting, runway, or stress tests.",
    icon: "/icons/compass-svgrepo-com.svg",
  },
  {
    number: "03",
    title: "How I advise clients today",
    body: "That experience shaped my approach: calculate risk factually, manage decisions behaviourally, and build plans that can withstand real life.",
    icon: "/icons/shield-checkmark-sharp-svgrepo-com.svg",
  },
];

function StoryIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={121}
      height={121}
      className="h-[121px] w-[121px] object-contain invert"
    />
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeStep = storySteps[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(media.matches);

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !pinRef.current) {
        return;
      }

      gsap.set(quoteRef.current, { autoAlpha: 0, y: 48 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: pinRef.current,
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
          gsap.to(progressRef.current, {
            scaleX: Math.max(0.02, storyProgress),
            duration: 0.15,
            ease: "none",
            transformOrigin: "left center",
          });

          const quoteProgress = gsap.utils.clamp(0, 1, (self.progress - 0.84) / 0.14);
          gsap.to(quoteRef.current, {
            autoAlpha: quoteProgress,
            y: 48 - quoteProgress * 48,
            duration: 0.1,
            ease: "none",
          });
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const animatedTargets = [
        numberRef.current,
        iconRef.current,
        contentRef.current,
      ].filter(Boolean) as HTMLElement[];

      gsap.fromTo(
        animatedTargets,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 }
      );
    },
    { dependencies: [activeIndex, reducedMotion], scope: sectionRef }
  );

  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="mx-auto max-w-[1800px] border-x border-line bg-ink text-white"
      >
        <div className="relative border-b border-white/55 px-[81px] py-[72px]">
          <div className="absolute right-[96px] top-[92px]">
            <StoryIcon src={storySteps[0].icon} />
          </div>
          <div className="grid gap-12 pr-[220px]">
            {storySteps.map((step) => (
              <article key={step.number} className="grid grid-cols-[220px_1fr] gap-20">
                <span className="font-manrope text-[120px] font-medium leading-none">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-manrope text-[52px] font-semibold leading-tight">
                    {step.title}
                  </h2>
                  <p className="mt-7 max-w-[760px] font-satoshi text-[28px] leading-[1.35]">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <QuoteBlock />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1800px] border-x border-line bg-paper text-ink"
    >
      <div
        ref={pinRef}
        className="h-[1080px] bg-paper"
      >
        <div
        className="relative h-[642px] overflow-hidden bg-ink text-white"
      >
        <div className="absolute inset-x-[60px] bottom-0 h-px bg-white/55" />
        <p
          ref={numberRef}
          className="absolute left-[81px] top-[72px] font-manrope text-[165px] font-medium leading-none"
        >
          {activeStep.number}
        </p>

        <div ref={iconRef} className="absolute right-[120px] top-[92px] text-white">
          <StoryIcon src={activeStep.icon} />
        </div>

        <div
          ref={contentRef}
          className="absolute left-[496px] top-[92px] h-[270px] w-[850px] text-center"
        >
          <h2 className="absolute inset-x-0 top-0 font-manrope text-[64px] font-semibold leading-[1.08]">
            {activeStep.title}
          </h2>
          <p className="absolute inset-x-0 top-[184px] mx-auto max-w-[760px] font-satoshi text-[32px] leading-[1.35]">
            {activeStep.body}
          </p>
        </div>

        <div className="absolute left-1/2 top-[440px] -translate-x-1/2 text-white">
          <DownArrow />
        </div>

        <div className="absolute left-1/2 top-[606px] h-[2px] w-[300px] -translate-x-1/2 bg-white/45">
          <div ref={progressRef} className="h-full origin-left scale-x-[0.02] bg-white" />
        </div>
      </div>

        <QuoteBlock ref={quoteRef} />
      </div>
    </section>
  );
}

const QuoteBlock = forwardRef<HTMLDivElement>(function QuoteBlock(_, ref) {
  return (
    <div ref={ref} className="relative h-[438px] bg-paper text-ink">
      <p
        aria-hidden="true"
        className="absolute left-[268px] top-[46px] font-manrope text-[320px] font-semibold leading-none"
      >
        &ldquo;
      </p>
      <blockquote className="absolute left-[399px] top-[124px] w-[1066px]">
        <p className="font-manrope text-[48px] font-semibold leading-[1.38]">
          The best plan is not the one that looks best on paper. It is the one
          that can survive real life.
        </p>
        <footer className="mt-[33px] flex items-center gap-6">
          <div className="relative size-14 overflow-hidden rounded-full bg-white">
            <Image
              src="/images/glenn-portrait.png"
              alt="Glenn Wee"
              fill
              className="object-cover object-top"
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
