"use client";

import { useState } from "react";

const email = "glennweejl@pruadviser.com.sg";

export default function FooterEmailCopy() {
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
      className="group relative mt-[18px] block max-w-full text-left font-manrope text-[clamp(42px,3vw,54px)] font-medium leading-[1.36] tracking-normal transition-colors duration-300 hover:text-[#006cff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      aria-label={`Copy ${email}`}
    >
      <span>{email}</span>
      <span className="pointer-events-none absolute left-[292px] top-[-20px] rounded-full bg-[#006cff] px-6 py-2 font-satoshi text-[16px] font-bold leading-none text-white opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-[-2px] group-hover:opacity-100 group-focus-visible:translate-y-[-2px] group-focus-visible:opacity-100">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
