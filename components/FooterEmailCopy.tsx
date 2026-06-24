"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const email = "glennweejl@pruadviser.com.sg";

function SplitFooterEmail() {
  return (
    <span aria-hidden="true">
      {Array.from(email).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="footer-email-char"
          style={
            {
              "--char-delay": `${340 + index * 12}ms`,
            } as CSSProperties
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function FooterEmailCopy({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`email-copy-button group relative mt-[42px] block w-full max-w-full text-left font-manrope text-[clamp(44px,3.35vw,62px)] font-medium leading-[1.08] tracking-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${className}`}
      aria-label={`Copy ${email}`}
    >
      <SplitFooterEmail />
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 rounded-full bg-ink px-6 py-2 font-satoshi text-[16px] font-bold leading-none text-on-ink opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-[-2px] group-hover:opacity-100 group-focus-visible:translate-y-[-2px] group-focus-visible:opacity-100">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
