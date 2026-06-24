"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ENTRANCE_SESSION_KEY = "glenn-wee-site-entrance-v1";
const MINIMUM_ENTRANCE_MS = 1400;
const MAXIMUM_ASSET_WAIT_MS = 1400;

export type SiteEntranceStatus = "pending" | "running" | "ready";

type SiteEntranceContextValue = {
  status: SiteEntranceStatus;
};

const SiteEntranceContext = createContext<SiteEntranceContextValue>({
  status: "ready",
});

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function decodeImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode?.().catch(() => undefined) ?? Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => resolve();
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  }).then(() => image.decode?.().catch(() => undefined));
}

function waitForCriticalAssets() {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("img[data-entrance-critical]")
  );
  const uniqueImages = Array.from(
    new Map(images.map((image) => [image.currentSrc || image.src, image])).values()
  );
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const assetsReady = Promise.all([
    fontsReady,
    ...uniqueImages.map((image) => decodeImage(image)),
  ]).then(() => undefined);

  return Promise.race([assetsReady, wait(MAXIMUM_ASSET_WAIT_MS)]);
}

export function useSiteEntrance() {
  return useContext(SiteEntranceContext);
}

export default function SiteEntranceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<SiteEntranceStatus>("pending");

  useEffect(() => {
    const root = document.documentElement;
    const shouldRun = root.dataset.siteEntrance === "run";
    const overlay = overlayRef.current;
    const frame = frameRef.current;
    const wordmark = wordmarkRef.current;

    if (!shouldRun || !overlay || !frame || !wordmark) {
      root.dataset.siteEntrance = "ready";
      root.classList.remove("site-entrance-active");
      setStatus("ready");
      return;
    }

    let cancelled = false;
    let timeline: gsap.core.Timeline | null = null;
    const startedAt = performance.now();
    const page = document.querySelector<HTMLElement>("main");

    setStatus("running");
    page?.setAttribute("inert", "");
    document.body.classList.add("has-site-entrance");

    const initialTimeline = gsap.timeline();
    const frameLines = frame.querySelectorAll<HTMLElement>(
      ".site-entrance-frame-line"
    );

    gsap.set(frameLines, { scaleX: 0, scaleY: 0 });
    gsap.set(wordmark, { autoAlpha: 0, y: 18 });
    initialTimeline
      .to(frameLines, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.62,
        ease: "power3.out",
        stagger: 0.045,
      })
      .to(
        wordmark,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          ease: "power3.out",
        },
        0.16
      );

    const run = async () => {
      await Promise.all([
        waitForCriticalAssets(),
        wait(Math.max(0, MINIMUM_ENTRANCE_MS - (performance.now() - startedAt))),
        new Promise<void>((resolve) => {
          initialTimeline.eventCallback("onComplete", resolve);
        }),
      ]);

      if (cancelled) {
        return;
      }

      const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
      const navbarBrand =
        document.querySelector<HTMLElement>("[data-site-navbar-brand]");
      const navbarChrome = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-reveal]")
      );
      const navbarLines = Array.from(
        document.querySelectorAll<HTMLElement>(".navbar-frame-line")
      );

      if (!navbar || !navbarBrand) {
        throw new Error("Site entrance targets are unavailable.");
      }

      const navbarBounds = navbar.getBoundingClientRect();
      const brandBounds = navbarBrand.getBoundingClientRect();
      const frameBounds = frame.getBoundingClientRect();
      const wordmarkBounds = wordmark.getBoundingClientRect();

      gsap.set(navbarChrome, { autoAlpha: 0, y: -8 });
      gsap.set(navbarBrand, { autoAlpha: 0 });
      gsap.set(navbarLines, { autoAlpha: 0 });
      // Replace percentage-based centering with measured pixels before the
      // morph so the destination remains exact at every responsive width.
      gsap.set(frame, {
        left: frameBounds.left,
        top: frameBounds.top,
        width: frameBounds.width,
        height: frameBounds.height,
        xPercent: 0,
        yPercent: 0,
      });
      gsap.set(wordmark, {
        left: wordmarkBounds.left,
        top: wordmarkBounds.top,
        width: wordmarkBounds.width,
        height: wordmarkBounds.height,
        xPercent: 0,
        yPercent: 0,
      });

      timeline = gsap.timeline({
        onComplete: () => {
          if (cancelled) {
            return;
          }

          try {
            window.sessionStorage.setItem(ENTRANCE_SESSION_KEY, "complete");
          } catch {
            // Storage can be unavailable in privacy-restricted contexts.
          }

          root.dataset.siteEntrance = "ready";
          root.classList.remove("site-entrance-active");
          document.body.classList.remove("has-site-entrance");
          page?.removeAttribute("inert");
          gsap.set([navbarBrand, ...navbarChrome, ...navbarLines], {
            clearProps: "all",
          });
          gsap.set(overlay, { display: "none" });
          setStatus("ready");
          window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });

      timeline
        .to(frame, {
          left: navbarBounds.left,
          top: navbarBounds.top,
          width: navbarBounds.width,
          height: navbarBounds.height,
          xPercent: 0,
          yPercent: 0,
          duration: 0.62,
          ease: "power4.inOut",
        })
        .to(
          wordmark,
          {
            left: brandBounds.left,
            top: brandBounds.top,
            width: brandBounds.width,
            height: brandBounds.height,
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            fontSize: Number.parseFloat(
              window.getComputedStyle(navbarBrand).fontSize
            ),
            lineHeight: window.getComputedStyle(navbarBrand).lineHeight,
            justifyContent: "flex-start",
            duration: 0.62,
            ease: "power4.inOut",
          },
          "<"
        )
        .to(
          navbarLines,
          {
            autoAlpha: 1,
            duration: 0.12,
            ease: "none",
          },
          "-=0.08"
        )
        .to(
          frame,
          {
            autoAlpha: 0,
            duration: 0.12,
            ease: "none",
          },
          "<"
        )
        .to(
          navbarBrand,
          {
            autoAlpha: 1,
            duration: 0.16,
            ease: "none",
          },
          "-=0.28"
        )
        .to(
          wordmark,
          {
            autoAlpha: 0,
            duration: 0.16,
            ease: "none",
          },
          "<"
        )
        .to(
          navbarChrome,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            stagger: 0.035,
            ease: "power2.out",
          },
          "-=0.14"
        )
        .to(
          overlay,
          {
            backgroundColor: "rgba(255,255,255,0)",
            duration: 0.24,
            ease: "power2.out",
          },
          "-=0.24"
        );
    };

    void run().catch(() => {
      if (cancelled) {
        return;
      }

      root.dataset.siteEntrance = "ready";
      root.classList.remove("site-entrance-active");
      document.body.classList.remove("has-site-entrance");
      page?.removeAttribute("inert");
      gsap.set(overlay, { display: "none" });
      setStatus("ready");
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      initialTimeline.kill();
      timeline?.kill();
      document.body.classList.remove("has-site-entrance");
      page?.removeAttribute("inert");
    };
  }, []);

  const value = useMemo(
    () => ({
      status,
    }),
    [status]
  );

  return (
    <SiteEntranceContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="site-entrance-overlay"
      >
        <div ref={frameRef} className="site-entrance-frame">
          <span className="site-entrance-frame-line site-entrance-frame-line-top" />
          <span className="site-entrance-frame-line site-entrance-frame-line-right" />
          <span className="site-entrance-frame-line site-entrance-frame-line-bottom" />
          <span className="site-entrance-frame-line site-entrance-frame-line-left" />
        </div>
        <div ref={wordmarkRef} className="site-entrance-wordmark">
          GLENN WEE
        </div>
      </div>
    </SiteEntranceContext.Provider>
  );
}
