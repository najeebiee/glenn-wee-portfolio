import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import SiteEntranceProvider from "@/components/SiteEntranceProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Glenn Wee | Financial Advisory",
  description:
    "Financial planning built to hold up in real life for professionals, families, and business owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;var k="glenn-wee-site-entrance-v1";var skip=location.hash.length>1||matchMedia("(prefers-reduced-motion: reduce)").matches;try{skip=skip||sessionStorage.getItem(k)==="complete"}catch(e){}r.dataset.siteEntrance=skip?"skip":"run";if(!skip)r.classList.add("site-entrance-active")})();`,
          }}
        />
        <noscript>
          <style>{`.site-entrance-overlay{display:none!important}.site-header.entrance-waiting .nav-brand,.site-header.entrance-waiting [data-navbar-reveal],.site-header.entrance-waiting .navbar-frame-line{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body className={manrope.variable} suppressHydrationWarning>
        <SiteEntranceProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </SiteEntranceProvider>
      </body>
    </html>
  );
}
