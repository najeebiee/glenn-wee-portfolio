"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import FooterEmailCopy from "@/components/FooterEmailCopy";
import ScrollLine from "@/components/ScrollLine";
import { WHATSAPP_URL } from "@/lib/contact";

const footerSocials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/glennweee/",
    icon: "/icons/instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/glenn-wee-b0b115211/",
    icon: "/icons/linkedin.svg",
  },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: "/icons/whatsapp.svg" },
];

const footerCredentials = [
  "Financial Advisor",
  "Prudential Assurance Company Singapore",
  "Private Client",
];

function SplitFooterHeadingLine({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  let charIndex = 0;

  return (
    <span className="footer-heading-line" aria-label={text}>
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
                className="footer-heading-char"
                style={
                  {
                    "--char-delay": `${delay + currentIndex * 22}ms`,
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

export default function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);
  const wordmarkFrameRef = useRef<HTMLDivElement | null>(null);
  const wordmarkTextRef = useRef<HTMLSpanElement | null>(null);
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
      { threshold: 0.18 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = wordmarkFrameRef.current;
    const text = wordmarkTextRef.current;

    if (!frame || !text) {
      return;
    }

    const updateWordmarkScale = () => {
      const frameWidth = frame.clientWidth;
      const textWidth = text.scrollWidth;

      if (!frameWidth || !textWidth) {
        return;
      }

      const scale = Math.min(1, Math.max(0.1, (frameWidth - 2) / textWidth));
      frame.style.setProperty("--footer-wordmark-scale", scale.toFixed(4));
    };

    updateWordmarkScale();

    const resizeObserver = new ResizeObserver(updateWordmarkScale);
    resizeObserver.observe(frame);
    resizeObserver.observe(text);
    window.addEventListener("resize", updateWordmarkScale);
    void document.fonts?.ready.then(updateWordmarkScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWordmarkScale);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className={`footer-section scroll-line-host relative mx-auto h-auto max-w-[1800px] overflow-hidden border-x border-b border-line bg-paper text-primary md:h-[1080px] ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <ScrollLine
        completeOnEnter
        direction="x"
        className="bottom-0 left-0 right-0"
      />
      <div className="scroll-line-host relative grid h-[367px] grid-cols-[minmax(0,45%)_minmax(0,55%)] border-b border-line">
        <div className="scroll-line-host relative min-w-0 overflow-hidden border-r border-line px-5 pt-[92px]">
          <ScrollLine direction="y" className="bottom-0 right-0 top-0" />
          <ScrollLine
            completeOnEnter
            direction="x"
            className="footer-mobile-divider hidden bottom-0 left-0 right-0"
          />
          <p className="footer-reveal footer-copyright font-satoshi text-[24px] font-medium leading-none">
            &copy; 2026 Glenn Wee Financial Advisory
          </p>
          <h2 className="mt-[33px] max-w-[690px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
            <span className="footer-heading-desktop">
              <SplitFooterHeadingLine text="Build a plan designed" delay={160} />
              <span className="mt-[1px] flex items-center gap-[40px]">
                <SplitFooterHeadingLine text="for real life." delay={520} />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-cta invert-hover-button inline-flex h-[58px] shrink-0 items-center rounded-full border border-line px-8 font-satoshi text-[20px] font-medium leading-none"
                >
                  Book Consultation
                </a>
              </span>
            </span>
            <span className="footer-heading-mobile hidden">
              <SplitFooterHeadingLine text="Build a plan" delay={160} />
              <SplitFooterHeadingLine text="designed for real life." delay={420} />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta invert-hover-button mt-7 inline-flex h-[58px] shrink-0 items-center rounded-full border border-line px-8 font-satoshi text-[20px] font-medium leading-none"
              >
                Book Consultation
              </a>
            </span>
          </h2>
        </div>

        <div className="grid min-w-0 grid-rows-[255px_112px] overflow-hidden">
          <div className="min-w-0 overflow-hidden px-5 pt-[92px]">
            <p className="footer-reveal footer-contact-prompt font-satoshi text-[24px] font-medium leading-none">
              If you&apos;d like to chat, you can reach me at:
            </p>
            <FooterEmailCopy />
          </div>

          <div className="scroll-line-host relative grid grid-cols-3 border-t border-line">
            <ScrollLine direction="x" className="left-0 right-0 top-0" />
            {footerSocials.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-link scroll-line-host group relative grid place-items-center border-line transition-colors duration-300 hover:bg-ink first:border-l-0 [&:not(:first-child)]:border-l"
                style={{ "--footer-delay": `${520 + index * 90}ms` } as CSSProperties}
              >
                {index > 0 ? (
                  <ScrollLine direction="y" className="bottom-0 left-0 top-0" />
                ) : null}
                <span
                  aria-hidden="true"
                  className="footer-social-icon"
                  style={
                    {
                      "--footer-social-icon": `url(${social.icon})`,
                    } as CSSProperties
                  }
                />
              </a>
            ))}
          </div>
        </div>
        <ScrollLine
          completeOnEnter
          direction="x"
          className="bottom-0 left-0 right-0"
        />
      </div>

      <div className="grid h-[713px] min-w-0 grid-rows-[1fr_74px] overflow-hidden">
        <div
          ref={wordmarkFrameRef}
          className="relative overflow-hidden"
          style={{ "--footer-wordmark-scale": 1 } as CSSProperties}
        >
          <p className="footer-wordmark absolute left-[10px] top-[56px] whitespace-nowrap font-manrope text-[321px] font-semibold leading-none tracking-normal">
            <span ref={wordmarkTextRef} className="footer-wordmark-inner">
              GLENN WEE
            </span>
          </p>

          <div className="footer-marquee-mask footer-marquee-reveal absolute bottom-[24px] left-0 right-0 flex h-[86px] items-center overflow-hidden">
            <div className="footer-marquee flex w-max items-center gap-10 whitespace-nowrap font-satoshi text-[48px] font-medium leading-[1.18]">
              {[...footerCredentials, ...footerCredentials].map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-10">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="size-5 rounded-full bg-primary"
                    />
                  ) : null}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar scroll-line-host relative flex items-center justify-between border-t border-line px-5">
          <ScrollLine
            completeOnEnter
            direction="x"
            className="left-0 right-0 top-0"
          />
          <p className="font-manrope text-[24px] font-semibold leading-none">
            GLENN WEE
          </p>
          <p className="font-satoshi text-[16px] font-medium leading-none">
            Created by NCM Creatives
          </p>
        </div>
      </div>
    </footer>
  );
}
