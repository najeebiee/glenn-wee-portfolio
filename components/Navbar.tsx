"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useSiteEntrance } from "@/components/SiteEntranceProvider";

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
  const { status } = useSiteEntrance();
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const directionStartScrollYRef = useRef(0);
  const lastDirectionRef = useRef<"down" | "up" | null>(null);
  const [activeId, setActiveId] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      const direction = delta > 0 ? "down" : delta < 0 ? "up" : null;

      setIsScrolled(currentScrollY > 12);

      if (!reducedMotion && !isMenuOpen) {
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
  }, [isMenuOpen, reducedMotion]);

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    document.body.classList.add("has-tablet-menu-open");

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("has-tablet-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const tabletQuery = window.matchMedia("(max-width: 1023.98px)");
    const syncTabletMenu = () => {
      if (!tabletQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    syncTabletMenu();
    tabletQuery.addEventListener("change", syncTabletMenu);

    return () => tabletQuery.removeEventListener("change", syncTabletMenu);
  }, []);

  const keepVisible = () => {
    setIsHidden(false);
    setIsMenuOpen(false);
    lastScrollYRef.current = window.scrollY;
    directionStartScrollYRef.current = window.scrollY;
    lastDirectionRef.current = null;
  };

  const toggleTabletMenu = () => {
    setIsHidden(false);
    lastScrollYRef.current = window.scrollY;
    directionStartScrollYRef.current = window.scrollY;
    lastDirectionRef.current = null;
    setIsMenuOpen((current) => !current);
  };

  return (
    <header
      ref={headerRef}
      data-site-navbar
      className={`site-header ${
        status === "ready" ? "entrance-ready" : "entrance-waiting"
      } scroll-line-host relative mx-auto grid h-[74px] max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center border-x border-b border-line px-5 ${
        isHidden ? "is-hidden" : ""
      } ${isScrolled ? "is-scrolled" : ""} ${
        isMenuOpen ? "has-menu-open" : ""
      }`}
    >
      <a
        data-site-navbar-brand
        className="nav-brand split-text font-manrope text-[24px] font-semibold tracking-normal"
        href="#top"
        onClick={keepVisible}
      >
        <SplitNavbarText text="GLENN WEE" />
      </a>
      <nav
        data-navbar-reveal
        className="hidden items-center gap-20 font-satoshi text-[16px] font-medium lg:flex"
      >
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
      <div data-navbar-reveal className="navbar-cta justify-self-end">
        <a
          className="cta-button cta-button-dark rounded-full bg-ink px-8 py-4 font-manrope text-[16px] font-medium text-white"
          href="#contact"
          onClick={keepVisible}
        >
          <span>Book a Consultation</span>
        </a>
      </div>
      <button
        data-navbar-reveal
        aria-controls="tablet-navbar-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="tablet-menu-button"
        type="button"
        onClick={toggleTabletMenu}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      {isMenuOpen ? (
        <div className="tablet-menu-panel" id="tablet-navbar-menu">
          <nav aria-label="Site navigation" className="tablet-menu-nav">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                className={`nav-link tablet-menu-link ${
                  activeId === item.id ? "is-active" : ""
                }`}
                href={item.href}
                onClick={keepVisible}
                style={
                  {
                    "--menu-item-delay": `${
                      120 + (navItems.length - index) * 70
                    }ms`,
                  } as CSSProperties
                }
              >
                <span>{item.label}</span>
                <img
                  alt=""
                  aria-hidden="true"
                  className="tablet-menu-arrow"
                  src="/icons/arrow-right-svgrepo-com.svg"
                />
              </a>
            ))}
            <a
              className="cta-button cta-button-dark tablet-menu-cta rounded-full bg-ink font-manrope font-medium text-white"
              href="#contact"
              onClick={keepVisible}
              style={
                {
                  "--menu-item-delay": "120ms",
                } as CSSProperties
              }
            >
              <span>Book a Consultation</span>
            </a>
          </nav>
        </div>
      ) : null}
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
