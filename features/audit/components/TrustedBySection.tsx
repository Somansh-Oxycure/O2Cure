import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";

/**
 * TrustedBySection — "Trusted By / Industry Leaders".
 * Logos are the SVGs in /public/Clients, laid out in three staggered rows
 * as in the Figma. `h` is the rendered height in px (desktop) so visually
 * lighter / heavier marks can be optically balanced; width follows aspect.
 */

interface ClientLogo {
  id: string;
  name: string;
  src: string;
  h: number;
}

const DIR = "/Clients";

/** Global size multiplier for every logo — tweak to grow/shrink the wall. */
const SCALE = 1.7;

const ROWS: readonly (readonly ClientLogo[])[] = [
  [
    { id: "makemytrip", name: "MakeMyTrip", src: `${DIR}/Makemytrip_logo.svg`, h: 24 },
    { id: "pvr", name: "PVR Cinemas", src: `${DIR}/pvr-cinemas-seeklogo-2.svg`, h: 42 },
    { id: "abp", name: "ABP News", src: `${DIR}/ABP_News_logo.svg`, h: 44 },
    { id: "microsoft", name: "Microsoft", src: `${DIR}/microsoft.svg`, h: 22 },
    { id: "hp", name: "HP", src: `${DIR}/HP_logo_2025.svg`, h: 40 },
    { id: "genpact", name: "Genpact", src: `${DIR}/Genpact_logo.svg`, h: 30 },
  ],
  [
    { id: "hdfc", name: "HDFC Bank", src: `${DIR}/HDFC_Bank_Logo.svg`, h: 18 },
    { id: "google", name: "Google", src: `${DIR}/google.svg`, h: 26 },
    { id: "reliance", name: "Reliance Industries Limited", src: `${DIR}/reliance-industries-logo.svg`, h: 50 },
    { id: "amazon", name: "Amazon", src: `${DIR}/Amazon_logo.svg`, h: 32 },
    { id: "ibm", name: "IBM", src: `${DIR}/IBM_logo.svg`, h: 40 },
  ],
  [
    { id: "tcs", name: "Tata Consultancy Services", src: `${DIR}/Tata_Consultancy_Services_old_logo.svg`, h: 30 },
    { id: "adobe", name: "Adobe", src: `${DIR}/Adobe_Corporate_logo.svg`, h: 26 },
    { id: "tata-motors", name: "Tata Motors", src: `${DIR}/Tata_Motors_Logo.svg`, h: 16 },
    { id: "dell", name: "Dell", src: `${DIR}/Dell_Logo.svg`, h: 38 },
    { id: "salesforce", name: "Salesforce", src: `${DIR}/salesforce.svg`, h: 36 },
  ],
];

export function TrustedBySection() {
  return (
    <section
      id="audit-trusted-by"
      aria-labelledby="audit-trusted-heading"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0} distance={18} amount={0.3}>
          <div className="text-center">
            <p className="text-[0.85rem] font-medium tracking-wide text-brand-green">
              Trusted By
            </p>
            <h2
              id="audit-trusted-heading"
              className="mt-1 font-heading text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]"
            >
              Industry Leaders
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} distance={20} amount={0.15}>
          <ul
            aria-label="Our clients"
            className="mt-10 flex flex-col gap-8 rounded-[2.5rem] bg-[#F2F5F1] px-6 py-10 sm:px-10 lg:mt-12 lg:gap-12 lg:px-14 lg:py-14"
          >
            {ROWS.map((row, r) => (
              <li key={r} className="list-none">
                <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 lg:gap-x-10 xl:flex-nowrap xl:justify-between xl:gap-x-6">
                  {row.map((logo) => (
                    <li
                      key={logo.id}
                      id={`audit-client-${logo.id}`}
                      className="flex min-w-0 shrink items-center justify-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={200}
                        height={Math.round(logo.h * SCALE)}
                        unoptimized
                        style={{
                          height: Math.round(logo.h * SCALE),
                          width: "auto",
                          maxWidth: "min(14rem, 100%)",
                        }}
                        className="object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
