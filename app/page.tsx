import Image from "next/image";
import type { CSSProperties } from "react";
import ApproachSection from "@/components/ApproachSection";
import FooterEmailCopy from "@/components/FooterEmailCopy";
import StoryStepper from "@/components/StoryStepper";

const credentials = [
  "Ex-Business owner turned Financial Advisor",
  "Prudential Assurance Company Singapore",
  "4x MDRT",
  "Private Client Advisor",
];

const principles = [
  ["01", "Clarity", "Know what matters and why it belongs in your plan."],
  ["02", "Protection", "Prepare for the setbacks that can disrupt progress."],
  ["03", "Adaptability", "Adjust intentionally as life and priorities change."],
];

const clientGroups = [
  {
    title: "Professionals",
    body: "Build a strong foundation while your income, responsibilities, and ambitions grow.",
    cta: "Build Now",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Business professionals collaborating in an office",
    icon: "/icons/briefcase-sharp-svgrepo-com.svg",
    iconClassName: "size-[22px]",
  },
  {
    title: "Families",
    body: "Protect the people who matter while building toward your family’s next milestones.",
    cta: "Protect Now",
    image:
      "https://images.pexels.com/photos/9300262/pexels-photo-9300262.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Family spending time together outdoors",
    icon: "/icons/home-svgrepo-com (1).svg",
    iconClassName: "size-[26px]",
  },
  {
    title: "Business Owners",
    body: "Create resilience through measured risk, sustainable coverage, and practical planning.",
    cta: "Create Now",
    image:
      "https://images.pexels.com/photos/6205523/pexels-photo-6205523.jpeg?auto=compress&cs=tinysrgb&w=930&h=912&fit=crop",
    alt: "Cafe professional using a tablet at work",
    icon: "/icons/store-svgrepo-com.svg",
    iconClassName: "size-[26px]",
  },
];

const problemRows = [
  ["01", "Over-insuring out of fear"],
  ["02", "Under-insuring to save a few hundred dollars"],
  ["03", "Structures that clients do not understand"],
  ["04", "Investment decisions that break down during volatility"],
];

const services = [
  {
    number: "01",
    title: "Financial analysis",
    body: "Review income, liabilities, cashflow, risks, and existing financial structures.",
  },
  {
    number: "02",
    title: "Financial planning",
    body: "Build an intentional roadmap aligned with your priorities and long-term goals.",
  },
  {
    number: "03",
    title: "Retirement planning",
    body: "Prepare for financial independence with a sustainable, adaptable structure.",
  },
  {
    number: "04",
    title: "Insurance planning",
    body: "Assess life and health insurance needs with clarity and proper risk assessment.",
  },
  {
    number: "05",
    title: "Estate planning support",
    body: "Help you consider legacy goals and coordinate suitable next steps with the appropriate professionals.",
  },
  {
    number: "06",
    title: "Financial advisory",
    body: "Review progress and adapt your financial structure as life changes.",
  },
];

const footerSocials = [
  { label: "Instagram", href: "#", icon: "/icons/instagram.svg" },
  { label: "LinkedIn", href: "#", icon: "/icons/linkedin.svg" },
  { label: "WhatsApp", href: "#", icon: "/icons/whatsapp.svg" },
];

const footerCredentials = [
  "Financial Advisor",
  "Prudential Assurance Company Singapore",
  "Private Client",
];

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

function ClientBadge({
  icon,
  iconClassName,
}: {
  icon: string;
  iconClassName: string;
}) {
  return (
    <span className="absolute left-[23px] top-[18px] grid size-[50px] place-items-center rounded-full bg-ink text-white">
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

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="mx-auto grid h-[74px] max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center border-x border-b border-line px-5">
        <a className="nav-brand split-text font-manrope text-[24px] font-semibold tracking-normal" href="#top">
          <SplitText text="GLENN WEE" step={34} />
        </a>
        <nav className="hidden items-center gap-20 font-satoshi text-[16px] font-medium lg:flex">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#services">Services</a>
          <a className="nav-link" href="#approach">Approach</a>
          <a className="nav-link" href="#clients">Who I Help</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <div className="justify-self-end">
          <a
            className="cta-button cta-button-dark font-manrope rounded-full bg-ink px-8 py-4 text-[16px] font-medium text-white"
            href="#contact"
          >
            <span>Book a Consultation</span>
          </a>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-[1800px] grid-cols-[55%_45%] border-x border-line"
      >
        <div className="grid h-[934px] grid-rows-[203px_529px_202px]">
          <div className="overflow-hidden border-b border-line px-3 pt-[38px] text-center">
            <p className="split-text font-manrope text-[38px] font-semibold tracking-normal">
              <SplitText text="GLENN WEE" baseDelay={220} step={36} />
            </p>
            <CredentialMarquee />
          </div>

          <div className="border-b border-line px-5 pt-[25px]">
            <h1 className="split-text font-manrope max-w-[900px] text-[clamp(82px,5.55vw,100px)] font-bold leading-[1.26] tracking-normal">
              <SplitText
                text="Financial planning built to hold up in real life."
                baseDelay={430}
                step={22}
              />
            </h1>
            <p
              className="mt-[36px] max-w-[845px] font-satoshi text-[24px] font-medium leading-[1.35] tracking-normal"
            >
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
          </div>

          <div className="grid grid-cols-[minmax(150px,1fr)_auto_auto] items-center gap-[22px] overflow-hidden px-8">
            <Image
              src="/icons/arrow-right-svgrepo-com.svg"
              alt=""
              aria-hidden="true"
              width={376}
              height={112}
              className="h-[207px] w-full min-w-0 object-fill"
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

        <div className="relative h-[934px] overflow-hidden border-l border-line bg-white">
          <Image
            src="/images/glenn-portrait.png"
            alt="Glenn Wee"
            fill
            priority
            className="object-contain object-bottom"
            sizes="45vw"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] grid-cols-[2fr_repeat(3,1fr)] border-x border-y border-line bg-ink text-white">
        <p className="px-24 py-20 text-[34px] leading-[1.35] tracking-[-0.04em]">
          A good financial plan should fit your lifestyle, protect you from
          setbacks, and adapt as life changes.
        </p>
        {principles.map(([number, title, body]) => (
          <article key={title} className="border-l border-white/60 px-6 py-7">
            <span className="text-[16px]">{number}</span>
            <h2 className="mt-20 text-[24px] font-semibold tracking-[-0.04em]">{title}</h2>
            <p className="mt-5 max-w-[260px] text-[17px] leading-[1.45] text-white/90">{body}</p>
          </article>
        ))}
      </section>

      <section
        id="about"
        className="mx-auto h-[1080px] max-w-[1800px] border-x border-line bg-paper text-ink"
      >
        <div className="relative h-[347px] border-b border-line">
          <p className="absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
            My Story :
          </p>

          <Image
            src="/icons/arrow-down-svgrepo-com.svg"
            alt=""
            aria-hidden="true"
            width={50}
            height={50}
            className="absolute left-5 top-[202px] h-[50px] w-[50px] object-contain"
          />

          <div className="absolute left-[667px] top-[91px] w-[950px]">
            <h2 className="font-manrope text-[40px] font-bold leading-[1.375] tracking-normal">
              I did not enter financial advisory because I loved selling
              products. I entered for income scalability. The reason I stayed is
              very different.
            </h2>
            <div className="absolute left-0 top-[53px] h-px w-full bg-line" />
            <div className="absolute left-0 top-[108px] h-px w-full bg-line" />
            <div className="absolute left-0 top-[165px] h-px w-full bg-line" />
          </div>
        </div>

        <div className="relative h-[733px] overflow-hidden">
          <Image
            src="/images/glenn-wide-portrait.png"
            alt="Glenn Wee standing before a mountain landscape"
            fill
            className="object-cover"
            sizes="min(100vw, 1800px)"
          />
        </div>
      </section>

      <StoryStepper />

      <section
        id="clients"
        className="mx-auto h-[1080px] max-w-[1800px] border-x border-y border-line bg-paper text-ink"
      >
        <div className="relative h-[347px] border-b border-line">
          <p className="absolute left-5 top-[92px] font-satoshi text-[24px] font-medium leading-none">
            Who I Work With :
          </p>
          <h2 className="absolute left-[670px] top-[72px] w-[1031px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
            Financial planning for people building something meaningful.
          </h2>
        </div>

        <div className="grid h-[733px] grid-cols-3">
          {clientGroups.map((group, index) => (
            <article
              key={group.title}
              className="relative border-line px-5 pt-5 first:border-l-0 [&:not(:first-child)]:border-l"
            >
              <div className="relative mx-auto h-[456px] w-[465px] overflow-hidden bg-neutral-100">
                <Image
                  src={group.image}
                  alt={group.alt}
                  fill
                  className="object-cover"
                  sizes="465px"
                />
                <ClientBadge icon={group.icon} iconClassName={group.iconClassName} />
              </div>

              <h3 className="mt-[42px] font-manrope text-[24px] font-semibold leading-none">
                {group.title}
              </h3>
              <p className="mt-[22px] max-w-[465px] font-satoshi text-[16px] font-medium leading-[1.38]">
                {group.body}
              </p>

              <a
                href="#contact"
                className="absolute bottom-[22px] inline-flex h-[50px] items-center gap-3 rounded-full border border-line px-[18px] font-manrope text-[16px] font-semibold"
              >
                {group.cta}
                <Image
                  src="/icons/arrow-right-svgrepo-com.svg"
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={20}
                  className="h-5 w-12 object-contain"
                />
              </a>

              <span className="sr-only">Temporary stock image {index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="mx-auto h-[1080px] max-w-[1800px] border-x border-b border-line bg-paper text-ink"
      >
        <div className="grid h-[438px] grid-cols-2 border-b border-line">
          <div className="bg-ink px-5 pt-[85px] text-white">
            <p className="font-satoshi text-[24px] font-medium leading-none">
              The Problem I Solve :
            </p>
            <h2 className="mt-[33px] max-w-[803px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              Financially capable people can still underperform.
            </h2>
          </div>

          <div className="border-l border-line px-[70px] pt-[73px]">
            <div className="space-y-[32px]">
              {problemRows.map(([number, text]) => (
                <div
                  key={number}
                  className="flex items-center justify-between border-b border-dashed border-line pb-[10px] font-satoshi text-[24px] font-medium leading-none"
                >
                  <p>{text}</p>
                  <span>{number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[642px] bg-ink text-white">
          <p className="absolute left-5 top-[85px] font-satoshi text-[24px] font-medium leading-none">
            Services :
          </p>

          <h2 className="absolute left-[667px] top-[63px] w-[970px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
            Advice grounded in the full financial picture.
          </h2>

          <div className="absolute left-[667px] top-[274px] grid w-[1031px] grid-cols-3 gap-x-[63px] gap-y-[30px]">
            {services.map((service) => (
              <article key={service.number} className="w-[304px]">
                <p className="font-satoshi text-[20px] font-medium leading-none">
                  {service.number}
                </p>
                <div className="mt-[14px] w-full border-t border-dashed border-white/45" />
                <h3 className="mt-[8px] font-manrope text-[24px] font-semibold leading-[1.35]">
                  {service.title}
                </h3>
                <p className="mt-[8px] font-satoshi text-[16px] font-medium leading-[1.38] text-white">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ApproachSection />

      <footer
        id="contact"
        className="mx-auto h-[1080px] max-w-[1800px] overflow-hidden border-x border-b border-line bg-paper text-ink"
      >
        <div className="grid h-[367px] grid-cols-[minmax(0,45%)_minmax(0,55%)] border-b border-line">
          <div className="relative min-w-0 overflow-hidden border-r border-line px-5 pt-[92px]">
            <p className="font-satoshi text-[24px] font-medium leading-none">
              &copy; 2026 Glenn Wee Financial Advisory
            </p>
            <h2 className="mt-[33px] max-w-[690px] font-manrope text-[64px] font-semibold leading-[1.36] tracking-normal">
              <span className="block">Build a plan designed</span>
              <span className="mt-[1px] flex items-center gap-[40px]">
                <span>for real life.</span>
                <a
                  href="mailto:glennweejl@pruadviser.com.sg"
                  className="inline-flex h-[43px] shrink-0 items-center rounded-full border border-line px-8 font-satoshi text-[20px] font-medium leading-none transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  Book Consultation
                </a>
              </span>
            </h2>
          </div>

          <div className="grid min-w-0 grid-rows-[255px_112px] overflow-hidden">
            <div className="min-w-0 overflow-hidden px-5 pt-[92px]">
              <p className="font-satoshi text-[24px] font-medium leading-none">
                If you&apos;d like to chat, you can reach me at:
              </p>
              <FooterEmailCopy />
            </div>

            <div className="grid grid-cols-3 border-t border-line">
              {footerSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group grid place-items-center border-line transition-colors duration-300 hover:bg-ink first:border-l-0 [&:not(:first-child)]:border-l"
                >
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
        </div>

        <div className="grid h-[713px] min-w-0 grid-rows-[1fr_74px] overflow-hidden">
          <div className="relative overflow-hidden">
            <p className="absolute left-[10px] top-[56px] whitespace-nowrap font-manrope text-[321px] font-semibold leading-none tracking-normal">
              GLENN WEE
            </p>

            <div className="footer-marquee-mask absolute bottom-[35px] left-0 right-0 overflow-hidden">
              <div className="footer-marquee flex w-max items-center gap-10 whitespace-nowrap font-satoshi text-[48px] font-medium leading-none">
                {[...footerCredentials, ...footerCredentials].map((item, index) => (
                  <span key={`${item}-${index}`} className="flex items-center gap-10">
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="size-5 rounded-full bg-ink"
                      />
                    ) : null}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line px-5">
            <p className="font-manrope text-[24px] font-semibold leading-none">
              GLENN WEE
            </p>
            <p className="font-satoshi text-[16px] font-medium leading-none">
              Created by NCM Creatives
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
