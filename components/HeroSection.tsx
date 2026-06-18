"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollLine from "@/components/ScrollLine";

const credentials = [
  "Ex-Business owner turned Financial Advisor",
  "Prudential Assurance Company Singapore",
  "4x MDRT",
  "Private Client Advisor",
];

const trailImages = [
  "/images/hero-trail/trail-1.webp",
  "/images/hero-trail/trail-2.webp",
  "/images/hero-trail/trail-3.webp",
  "/images/hero-trail/trail-4.webp",
  "/images/hero-trail/trail-5.webp",
  "/images/hero-trail/trail-6.webp",
];

type TrailItem = {
  id: number;
  rotation: number;
  src: string;
  x: number;
  y: number;
};

function SplitText({
  text,
  className,
  baseDelay = 0,
  step = 28,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
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
                className="split-char"
                style={
                  {
                    "--char-delay": `${baseDelay + currentIndex * step}ms`,
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

function CredentialMarquee() {
  return (
    <div className="hero-marquee-mask mt-[62px] min-w-0 overflow-hidden whitespace-nowrap font-satoshi text-[16px] font-medium leading-none">
      <div className="hero-marquee flex w-max items-center">
        {[...credentials, ...credentials].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-4 pr-8"
          >
            <span>{item}</span>
            <span aria-hidden="true" className="size-2 rounded-full bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroPortraitTrail({ items }: { items: TrailItem[] }) {
  return (
    <div className="hero-portrait-trail absolute inset-0 z-0" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="hero-trail-image absolute"
          style={
            {
              "--trail-rotate": `${item.rotation}deg`,
              left: `${item.x}px`,
              top: `${item.y}px`,
            } as CSSProperties
          }
        >
          <Image
            src={item.src}
            alt=""
            aria-hidden="true"
            width={190}
            height={238}
            className="h-full w-full object-cover"
            sizes="190px"
          />
        </span>
      ))}
    </div>
  );
}

function HeroPortraitPanel() {
  const itemIdRef = useRef(0);
  const imageIndexRef = useRef(0);
  const lastSpawnRef = useRef({ time: 0, x: 0, y: 0 });
  const removeTimersRef = useRef<number[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [items, setItems] = useState<TrailItem[]>([]);

  useEffect(() => {
    const removeTimers = removeTimersRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const syncEnabled = () => {
      setIsEnabled(!reducedMotion.matches && !coarsePointer.matches);
    };

    syncEnabled();
    reducedMotion.addEventListener("change", syncEnabled);
    coarsePointer.addEventListener("change", syncEnabled);

    return () => {
      reducedMotion.removeEventListener("change", syncEnabled);
      coarsePointer.removeEventListener("change", syncEnabled);
      removeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isEnabled) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const now = performance.now();
    const lastSpawn = lastSpawnRef.current;
    const distance = Math.hypot(x - lastSpawn.x, y - lastSpawn.y);

    if (now - lastSpawn.time < 220 || distance < 130) {
      return;
    }

    const id = itemIdRef.current;
    const imageIndex = imageIndexRef.current;
    const rotation = ((id % 7) - 3) * 4.5;

    itemIdRef.current += 1;
    imageIndexRef.current = (imageIndex + 1) % trailImages.length;
    lastSpawnRef.current = { time: now, x, y };

    setItems((currentItems) => [
      ...currentItems.slice(-5),
      {
        id,
        rotation,
        src: trailImages[imageIndex],
        x,
        y,
      },
    ]);

    const timer = window.setTimeout(() => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }, 1100);

    removeTimersRef.current.push(timer);
  };

  return (
    <div
      className="scroll-line-host relative isolate h-[934px] overflow-hidden border-l border-line bg-white"
      onPointerMove={onPointerMove}
    >
      <ScrollLine direction="y" initialComplete className="bottom-0 left-0 top-0" />
      <HeroPortraitTrail items={items} />
      <Image
        src="/images/glenn-portrait.png"
        alt="Glenn Wee"
        fill
        priority
        className="z-10 object-contain object-bottom"
        sizes="45vw"
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="scroll-line-host relative mx-auto grid max-w-[1800px] grid-cols-[55%_45%] border-x border-line"
    >
      <div className="grid h-[934px] grid-rows-[203px_529px_202px]">
        <div className="scroll-line-host relative overflow-hidden border-b border-line px-3 pt-[38px] text-center">
          <p className="split-text font-manrope text-[38px] font-semibold tracking-normal">
            <SplitText text="GLENN WEE" baseDelay={220} step={36} />
          </p>
          <CredentialMarquee />
          <ScrollLine direction="x" initialComplete className="bottom-0 left-0 right-0" />
        </div>

        <div className="scroll-line-host relative border-b border-line px-5 pt-[25px]">
          <h1 className="split-text max-w-[900px] font-manrope text-[clamp(82px,5.55vw,100px)] font-bold leading-[1.26] tracking-normal">
            <SplitText
              text="Financial planning built to hold up in real life."
              baseDelay={430}
              step={22}
            />
          </h1>
          <p className="mt-[36px] max-w-[845px] font-satoshi text-[24px] font-medium leading-[1.35] tracking-normal">
            <span
              className="soft-text-line"
              style={
                {
                  "--text-reveal-delay": "1520ms",
                } as CSSProperties
              }
            >
              Mathematically sound, behaviourally practical financial structures
            </span>
            <span
              className="soft-text-line"
              style={
                {
                  "--text-reveal-delay": "1660ms",
                } as CSSProperties
              }
            >
              designed to protect your progress and adapt as life changes.
            </span>
          </p>
          <ScrollLine direction="x" initialComplete className="bottom-0 left-0 right-0" />
        </div>

        <div className="grid grid-cols-[minmax(150px,1fr)_auto_auto] items-center gap-[22px] overflow-hidden px-8">
          <Image
            src="/icons/arrow-right-svgrepo-com.svg"
            alt=""
            aria-hidden="true"
            width={376}
            height={112}
            className="hero-arrow-reveal h-[207px] w-full min-w-0 object-fill"
          />
          <a
            className="cta-button cta-button-dark shrink-0 whitespace-nowrap rounded-full bg-ink px-8 py-5 font-satoshi text-[20px] font-medium text-white"
            href="#contact"
          >
            <span>Book a Consultation</span>
          </a>
          <a
            className="cta-button cta-button-outline inline-flex shrink-0 whitespace-nowrap rounded-full border border-line px-8 py-5 font-satoshi text-[20px] font-medium"
            href="#approach"
          >
            <span>Explore My Approach</span>
            <Image
              src="/icons/arrow-right-svgrepo-com.svg"
              alt=""
              aria-hidden="true"
              width={52}
              height={24}
              className="cta-arrow-image h-6 w-[52px] object-contain"
            />
          </a>
        </div>
      </div>

      <HeroPortraitPanel />
    </section>
  );
}
