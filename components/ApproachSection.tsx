"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const approachSteps = [
  {
    number: "01",
    title: "Clarify the goal",
    body: "Understand priorities, responsibilities, and desired outcomes.",
  },
  {
    number: "02",
    title: "Assess the current structure",
    body: "Review risk, policies, investments, and possible overlaps.",
  },
  {
    number: "03",
    title: "Build an intentional plan",
    body: "Keep only what clearly supports the financial goal.",
  },
  {
    number: "04",
    title: "Track and adapt",
    body: "Review progress and adjust when life changes.",
  },
];

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
  cardRef,
}: {
  step: (typeof approachSteps)[number];
  index: number;
  cardRef?: (element: HTMLElement | null) => void;
}) {
  const isDark = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      className={`absolute inset-0 overflow-hidden ${
        isDark ? "bg-ink text-white" : "bg-paper text-ink"
      }`}
    >
      <p className="absolute left-4 top-[73px] font-manrope text-[64px] font-semibold leading-none">
        {step.number}
      </p>
      <h3 className="absolute right-[15px] top-[63px] max-w-[760px] text-right font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
        {step.title}
      </h3>
      <p className="absolute bottom-[92px] left-[105px] w-[784px] text-center font-satoshi text-[32px] font-medium leading-[1.35]">
        {step.body}
      </p>
    </article>
  );
}

function MissionVision() {
  return (
    <div className="grid h-[642px] grid-cols-2">
      <div className="relative border-r border-line bg-paper text-ink">
        <p className="absolute left-[101px] top-[111px] font-satoshi text-[24px] font-medium leading-none">
          Mission
        </p>
        <h3 className="absolute left-[378px] top-[96px] w-[433px] font-manrope text-[36px] font-semibold leading-[1.36] tracking-normal">
          Achieve freedom without repercussions.
        </h3>
        <div className="absolute left-[100px] top-[275px] h-[295px] w-[708px] bg-ink px-20 pt-[83px] text-white">
          <p className="relative z-10 text-center font-satoshi text-[24px] font-medium leading-[1.34]">
            To help people achieve freedom without repercussions by designing
            financial structures that are mathematically sound, behaviourally
            practical, and built to withstand real-life scenarios.
          </p>
          <div className="absolute inset-x-0 top-[118px] h-px bg-white/35" />
          <div className="absolute inset-x-0 top-[150px] h-px bg-white/35" />
          <div className="absolute inset-x-0 top-[182px] h-px bg-white/35" />
          <div className="absolute inset-x-0 top-[214px] h-px bg-white/35" />
        </div>
      </div>

      <div className="relative bg-ink text-white">
        <p className="absolute left-[95px] top-[111px] font-satoshi text-[24px] font-medium leading-none">
          Vision
        </p>
        <h3 className="absolute left-[432px] top-[96px] w-[433px] font-manrope text-[36px] font-semibold leading-[1.36] tracking-normal">
          Raise the standard of advisory work.
        </h3>
        <div className="absolute left-[87px] top-[275px] h-[295px] w-[708px] bg-paper px-20 pt-[83px] text-ink">
          <p className="relative z-10 text-center font-satoshi text-[24px] font-medium leading-[1.34]">
            To place greater emphasis on structured thinking, behaviour, and
            long-term decision quality rather than simply focusing on products.
          </p>
          <div className="absolute inset-x-0 top-[118px] h-px bg-line/35" />
          <div className="absolute inset-x-0 top-[150px] h-px bg-line/35" />
          <div className="absolute inset-x-0 top-[182px] h-px bg-line/35" />
        </div>
      </div>
    </div>
  );
}

export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

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

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      gsap.set(cards.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800",
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
        },
      });

      cards.slice(1).forEach((card) => {
        timeline.to(card, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "none",
        });
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  if (reducedMotion) {
    return (
      <section
        id="approach"
        ref={sectionRef}
        className="mx-auto max-w-[1800px] border-x border-b border-line bg-paper text-ink"
      >
        <div className="grid border-b border-line lg:grid-cols-[45%_55%]">
          <div className="px-5 py-[92px]">
            <p className="font-satoshi text-[24px] font-medium leading-none">
              My Approach :
            </p>
            <h2 className="mt-[33px] max-w-[707px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              A structured approach built for real life.
            </h2>
          </div>
          <div className="grid gap-px bg-line">
            {approachSteps.map((step, index) => (
              <div
                key={step.number}
                className={`grid grid-cols-[120px_1fr] gap-10 px-4 py-10 ${
                  index % 2 === 0 ? "bg-ink text-white" : "bg-paper text-ink"
                }`}
              >
                <p className="font-manrope text-[64px] font-semibold leading-none">
                  {step.number}
                </p>
                <div>
                  <h3 className="font-manrope text-[44px] font-semibold leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 font-satoshi text-[24px] font-medium leading-[1.35]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MissionVision />
      </section>
    );
  }

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="mx-auto max-w-[1800px] border-x border-b border-line bg-paper text-ink"
    >
      <div ref={pinRef} className="h-[1080px] bg-paper">
        <div className="grid h-[438px] grid-cols-[45%_55%] border-b border-line">
          <div className="relative">
            <p className="absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
              My Approach :
            </p>
            <h2 className="absolute left-5 top-[163px] w-[707px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              A structured approach built for real life.
            </h2>
            <div className="absolute left-5 top-[357px]">
              <SmallDownArrow />
            </div>
          </div>

          <div className="relative overflow-hidden border-l border-line">
            {approachSteps.map((step, index) => (
              <ApproachCard
                key={step.number}
                step={step}
                index={index}
                cardRef={(element) => {
                  cardsRef.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>

        <MissionVision />
      </div>
    </section>
  );
}
