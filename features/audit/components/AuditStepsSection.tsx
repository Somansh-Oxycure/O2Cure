import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/motion/Reveal";

/**
 * AuditStepsSection — "Air Audit, Step by Step".
 * Five numbered steps on a rounded panel, linked by dashed curves
 * that alternate above / below the ring line (desktop only).
 *
 * Icons: step 1 uses the supplied asset. Steps 2–5 currently use Lucide
 * stand-ins — set `iconSrc` on a step to swap in the final artwork.
 */

interface Step {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

const ASSET_DIR = "/Landing Page Assets";

const STEPS: readonly Step[] = [
  {
    id: "book",
    title: "Book your audit",
    description: "Share your space type and contact details.",
    iconSrc: `${ASSET_DIR}/document.svg`,
  },
  {
    id: "talk",
    title: "Talk to an air expert",
    description: "A one-on-one call to understand your space.",
    iconSrc: `${ASSET_DIR}/customer-care.svg`,
  },
  {
    id: "draft",
    title: "First air draft",
    description: "Your air solution, mapped before we visit.",
    iconSrc: `${ASSET_DIR}/wind.svg`,
  },
  {
    id: "inspect",
    title: "On-site inspection",
    description: "Our engineers visit and measure your air.",
    iconSrc: `${ASSET_DIR}/inspection.svg`,
  },
  {
    id: "report",
    title: "Detailed air report",
    description: "What's in your air, where it comes from, and what to do about it.",
    iconSrc: `${ASSET_DIR}/report.svg`,
  },
];

/** Blue→green gradient ring with a white disc, drawn in CSS. */
function StepRing({ step }: { step: Step }) {
  return (
    <div
      className="relative z-10 mx-auto rounded-full p-[5px] shadow-[0_10px_16px_rgba(20,60,50,0.22)]"
      style={{
        width: "var(--r)",
        height: "var(--r)",
        background: "linear-gradient(135deg, #1B6CB0 0%, #2A8FA0 50%, #3FA55A 100%)",
      }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
        <Image
          src={step.iconSrc}
          alt=""
          aria-hidden
          unoptimized
          width={86}
          height={86}
          style={{ width: "calc(var(--r) * 0.48)", height: "calc(var(--r) * 0.48)" }}
        />
      </div>
    </div>
  );
}

/** Dashed connector to the next ring; alternates arching up and dipping down. */
function Connector({ up }: { up: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute z-0 hidden lg:block"
      style={{
        left: "calc(50% + var(--r) * 0.44)",
        width: "calc(100% - var(--r) * 0.88)",
        top: "0px",
        height: "var(--r)",
      }}
    >
      <path
        d={
          up
            ? "M 0,34 C 28,2 72,2 100,34"
            : "M 0,66 C 28,98 72,98 100,66"
        }
        fill="none"
        stroke="#8A958A"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Mobile-only vertical dashed arc to the next ring; alternates bulging right / left. */
function MobileConnector({ right }: { right: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 z-0 w-full overflow-visible sm:hidden"
      style={{ top: "calc(100% - 3px)", height: "calc(2.5rem + 6px)" }}
    >
      <path
        d={right ? "M 50,0 C 105,12 105,88 50,100" : "M 50,0 C -5,12 -5,88 50,100"}
        fill="none"
        stroke="#8A958A"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function AuditStepsSection() {
  return (
    <section
      id="audit-steps"
      aria-labelledby="audit-steps-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0} distance={18} amount={0.3}>
          <h2
            id="audit-steps-heading"
            className="text-center font-heading text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]"
          >
            Air Audit, Step by Step
          </h2>
        </Reveal>

        <Reveal delay={0.1} distance={20} amount={0.15}>
          <ol
            className="mt-6 grid grid-cols-1 gap-10 rounded-[2rem] bg-[#F2F5F1] px-4 py-8 sm:mt-10 sm:gap-12 sm:px-6 sm:py-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-0 lg:px-6 lg:py-14"
            style={{ "--r": "clamp(92px, 8.6vw, 128px)" } as CSSProperties}
          >
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                id={`audit-step-${step.id}`}
                className="relative flex flex-col items-center px-2 text-center max-sm:grid max-sm:grid-cols-[1fr_var(--r)_1.5fr] max-sm:items-center max-sm:gap-x-3 max-sm:px-0"
              >
                {/* Mobile ghost number, left of ring */}
                <span
                  aria-hidden
                  className="select-none text-right font-heading font-bold leading-none text-[#CAD3C9] sm:hidden"
                  style={{ fontSize: "calc(var(--r) * 0.42)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Ghost number, beside the ring */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute z-0 hidden select-none font-heading font-bold leading-none text-[#CAD3C9] lg:block"
                  style={{
                    right: "calc(50% + var(--r) * 0.56)",
                    top: "calc(var(--r) / 2)",
                    transform: "translateY(-50%)",
                    fontSize: "calc(var(--r) * 0.42)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="max-sm:relative">
                  <StepRing step={step} />
                  {i < STEPS.length - 1 && <MobileConnector right={i % 2 === 0} />}
                </div>
                {i < STEPS.length - 1 && <Connector up={i % 2 === 0} />}

                <div className="flex flex-col items-center max-sm:items-start max-sm:text-left">
                  <h3 className="relative z-20 mt-6 text-[0.9rem] font-bold text-[#14172B] max-sm:mt-0 lg:mt-[calc(var(--r)*0.14)]">
                    {step.title}
                  </h3>
                  <span aria-hidden className="mt-2.5 h-px w-24 bg-border max-sm:mt-2 max-sm:w-full" />
                  <p className="mt-2.5 max-w-[11rem] text-[0.7rem] leading-relaxed text-muted-foreground max-sm:mt-2 max-sm:max-w-none">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
