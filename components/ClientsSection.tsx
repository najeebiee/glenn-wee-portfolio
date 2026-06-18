"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollLine from "@/components/ScrollLine";

const clientGroups = [
  {
    title: "Professionals",
    bodyLines: [
      "Build a strong foundation while your income, responsibilities,",
      "and ambitions grow.",
    ],
    cta: "Build Now",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Business professionals collaborating in an office",
    icon: "/icons/briefcase-sharp-svgrepo-com.svg",
    iconClassName: "size-[22px]",
  },
  {
    title: "Families",
    bodyLines: [
      "Protect the people who matter while building toward your",
      "family's next milestones.",
    ],
    cta: "Protect Now",
    image:
      "https://images.pexels.com/photos/9300262/pexels-photo-9300262.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Family spending time together outdoors",
    icon: "/icons/home-svgrepo-com (1).svg",
    iconClassName: "size-[26px]",
  },
  {
    title: "Business Owners",
    bodyLines: [
      "Create resilience through measured risk, sustainable coverage,",
      "and practical planning.",
    ],
    cta: "Create Now",
    image:
      "https://images.pexels.com/photos/6205523/pexels-photo-6205523.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Cafe professional using a tablet at work",
    icon: "/icons/store-svgrepo-com.svg",
    iconClassName: "size-[26px]",
  },
];

function ClientBadge({
  icon,
  iconClassName,
}: {
  icon: string;
  iconClassName: string;
}) {
  return (
    <span className="client-badge absolute left-[23px] top-[18px] grid size-[50px] place-items-center rounded-full bg-ink text-white">
      <Image
        src={icon}
        alt=""
        aria-hidden="true"
        width={26}
        height={26}
        className={`${iconClassName} object-contain invert`}
      />
    </span>
  );
}

function SplitClientTitle({
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
                className="client-title-char"
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

function SplitClientHeading({ text }: { text: string }) {
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
                className="client-heading-char"
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

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [textsVisible, setTextsVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      setIsVisible(true);
      setCardsVisible(true);
      setTextsVisible(true);
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          cardsObserver.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    const textsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextsVisible(true);
          textsObserver.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    if (textsRef.current) {
      textsObserver.observe(textsRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      cardsObserver.disconnect();
      textsObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className={`clients-section scroll-line-host relative mx-auto h-[1080px] max-w-[1800px] border-x border-y border-line bg-paper text-ink ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <ScrollLine direction="x" className="left-0 right-0 top-0" />
      <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      <div className="scroll-line-host relative h-[347px] border-b border-line">
        <p className="clients-kicker absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
          Who I Work With :
        </p>
        <h2 className="absolute left-[670px] top-[72px] w-[1031px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
          <SplitClientHeading text="Financial planning for people building something meaningful." />
        </h2>
        <ScrollLine direction="x" className="bottom-0 left-0 right-0" />
      </div>

      <div
        ref={cardsRef}
        className={`clients-cards grid h-[733px] grid-cols-3 ${
          cardsVisible ? "is-visible" : ""
        }`}
      >
        {clientGroups.map((group, index) => (
          <article
            key={group.title}
            className="client-card scroll-line-host relative border-line px-5 pt-5 first:border-l-0 [&:not(:first-child)]:border-l"
          >
            {index > 0 ? (
              <ScrollLine
                direction="y"
                end="bottom 45%"
                scrub={0.8}
                start="top 98%"
                startScale={0}
                triggerParent
                className="bottom-0 left-0 top-0"
              />
            ) : null}
            <div
              className="client-image-frame relative mx-auto h-[456px] w-[465px] overflow-hidden bg-neutral-100"
              style={{ "--card-delay": `${index * 140}ms` } as CSSProperties}
            >
              <Image
                src={group.image}
                alt={group.alt}
                fill
                className="client-image object-cover"
                sizes="465px"
              />
              <ClientBadge icon={group.icon} iconClassName={group.iconClassName} />
            </div>

            <div
              ref={index === 0 ? textsRef : undefined}
              className={`clients-texts ${textsVisible ? "is-visible" : ""}`}
            >
              <h3 className="mt-[42px] font-manrope text-[24px] font-semibold leading-none">
                <SplitClientTitle text={group.title} delay={index * 140} />
              </h3>
              <p className="mt-[22px] max-w-[465px] font-satoshi text-[16px] font-medium leading-[1.38]">
                {group.bodyLines.map((line, lineIndex) => (
                  <span
                    key={`${group.title}-${line}`}
                    className="client-body-line"
                    style={
                      {
                        "--body-delay": `${420 + index * 140 + lineIndex * 120}ms`,
                      } as CSSProperties
                    }
                  >
                    {line}
                  </span>
                ))}
              </p>

              <a
                href="#contact"
                className="invert-hover-button absolute bottom-[22px] inline-flex h-[58px] items-center gap-3 rounded-full border border-line px-[18px] font-manrope text-[16px] font-semibold"
              >
                {group.cta}
                <Image
                  src="/icons/arrow-right-svgrepo-com.svg"
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={20}
                  className="button-icon h-5 w-12 object-contain"
                />
              </a>
            </div>

            <span className="sr-only">Temporary stock image {index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
