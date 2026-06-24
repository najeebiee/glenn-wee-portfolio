"use client";

import { useEffect, useRef, useState } from "react";
import { type ThemeId, useTheme } from "@/components/ThemeProvider";

const themes: Array<{
  id: ThemeId;
  label: string;
  shortLabel: string;
}> = [
  { id: "paper", label: "Paper", shortLabel: "W" },
  { id: "cobalt", label: "Cobalt", shortLabel: "E" },
  { id: "inverse", label: "Full dark", shortLabel: "E" },
];

function ThemeOptions({
  className = "",
  onSelect,
}: {
  className?: string;
  onSelect?: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      aria-label="Choose site theme"
      className={`theme-options ${className}`}
      role="radiogroup"
    >
      {themes.map((option) => {
        const isSelected = theme === option.id;

        return (
          <button
            key={option.id}
            aria-checked={isSelected}
            aria-label={`${option.label} theme${
              isSelected ? ", selected" : ""
            }`}
            className={`theme-option theme-option-${option.id} ${
              isSelected ? "is-selected" : ""
            }`}
            data-theme-option={option.id}
            role="radio"
            type="button"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setTheme(option.id, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
              onSelect?.();
            }}
          >
            <span aria-hidden="true" className="theme-option-preview">
              {option.shortLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function DesktopThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      selectorRef.current
        ?.querySelector<HTMLButtonElement>("[data-theme-option]")
        ?.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={selectorRef}
      className={`theme-selector-desktop ${isOpen ? "is-open" : ""}`}
      data-navbar-reveal
    >
      <button
        aria-controls="desktop-theme-popover"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Close theme selector" : "Choose site theme"}
        className="theme-trigger"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true" className="theme-trigger-icon" />
      </button>

      {isOpen ? (
        <div
          aria-label="Site themes"
          className="theme-popover"
          id="desktop-theme-popover"
          role="dialog"
        >
          <ThemeOptions onSelect={() => setIsOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

export function MobileThemeSelector() {
  return (
    <section
      aria-label="Choose site theme"
      className="theme-selector-mobile"
      style={{ "--menu-item-delay": "50ms" } as React.CSSProperties}
    >
      <ThemeOptions className="theme-options-mobile" />
    </section>
  );
}
