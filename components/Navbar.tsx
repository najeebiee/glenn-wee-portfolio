"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Who I Help", href: "#clients", id: "clients" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Approach", href: "#approach", id: "approach" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function SplitNavbarText({
  text,
  step = 34,
}: {
  text: string;
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
                className="split-char"
                style={
                  {
                    "--char-delay": `${currentIndex * step}ms`,
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

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const directionStartScrollYRef = useRef(0);
  const lastDirectionRef = useRef<"down" | "up" | null>(null);
  const [activeId, setActiveId] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) {
        setIsHidden(false);
      }
    };

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const xLine = header.querySelector(".navbar-frame-line-x");
    const yLines = Array.from(header.querySelectorAll(".navbar-frame-line-y"));

    if (media.matches) {
      gsap.set(xLine, { scaleX: 1 });
      gsap.set(yLines, { scaleY: 1 });
      return;
    }

    gsap.set(xLine, { scaleX: 0 });
    gsap.set(yLines, { scaleY: 0 });

    const timeline = gsap.timeline({ delay: 0.12 });
    timeline.to(yLines, {
      scaleY: 1,
      duration: 0.78,
      ease: "power3.out",
      stagger: 0.05,
    });
    timeline.to(
      xLine,
      {
        scaleX: 1,
        duration: 0.78,
        ease: "power3.out",
      },
      "<"
    );

    const completionTimer = window.setTimeout(() => {
      gsap.set(xLine, { scaleX: 1 });
      gsap.set(yLines, { scaleY: 1 });
    }, 1100);

    return () => {
      window.clearTimeout(completionTimer);
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      const direction = delta > 0 ? "down" : delta < 0 ? "up" : null;

      setIsScrolled(currentScrollY > 12);

      if (!reducedMotion) {
        if (currentScrollY <= 12) {
          setIsHidden(false);
          directionStartScrollYRef.current = currentScrollY;
          lastDirectionRef.current = null;
        } else if (direction) {
          if (direction !== lastDirectionRef.current) {
            directionStartScrollYRef.current = lastScrollYRef.current;
            lastDirectionRef.current = direction;
          }

          const directionalDelta =
            currentScrollY - directionStartScrollYRef.current;

          if (currentScrollY > 120 && directionalDelta > 8) {
            setIsHidden(true);
          } else if (directionalDelta < -8) {
            setIsHidden(false);
          }
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    directionStartScrollYRef.current = window.scrollY;
    lastDirectionRef.current = null;
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (activeEntry?.target.id) {
          setActiveId(activeEntry.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const keepVisible = () => {
    setIsHidden(false);
    lastScrollYRef.current = window.scrollY;
    directionStartScrollYRef.current = window.scrollY;
    lastDirectionRef.current = null;
  };

  return (
    <header
      ref={headerRef}
      className={`site-header scroll-line-host relative mx-auto grid h-[74px] max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center border-x border-b border-line px-5 ${
        isHidden ? "is-hidden" : ""
      } ${isScrolled ? "is-scrolled" : ""}`}
    >
      <a
        className="nav-brand split-text font-manrope text-[24px] font-semibold tracking-normal"
        href="#top"
        onClick={keepVisible}
      >
        <SplitNavbarText text="GLENN WEE" />
      </a>
      <nav className="hidden items-center gap-20 font-satoshi text-[16px] font-medium lg:flex">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={`nav-link ${activeId === item.id ? "is-active" : ""}`}
            href={item.href}
            onClick={keepVisible}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="justify-self-end">
        <a
          className="cta-button cta-button-dark rounded-full bg-ink px-8 py-4 font-manrope text-[16px] font-medium text-white"
          href="#contact"
          onClick={keepVisible}
        >
          <span>Book a Consultation</span>
        </a>
      </div>
      <span
        aria-hidden="true"
        className="navbar-frame-line navbar-frame-line-y left-0"
      />
      <span
        aria-hidden="true"
        className="navbar-frame-line navbar-frame-line-y right-0"
      />
      <span
        aria-hidden="true"
        className="navbar-frame-line navbar-frame-line-x bottom-0 left-0 right-0"
      />
    </header>
  );
}
