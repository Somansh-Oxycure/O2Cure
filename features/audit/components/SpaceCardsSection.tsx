import { ArrowRight, Building2, GraduationCap, Home, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";

/**
 * SpaceCardsSection — "Engineered for Every Space".
 * Set `image` on any item to replace the placeholder; layout needs no change.
 */

interface Space {
  id: string;
  label: string;
  href: string;
  image?: string;
  Icon: typeof Home;
  placeholder: string; // gradient used until a real image is supplied
}

const SPACES: readonly Space[] = [
  {
    id: "homes",
    label: "Homes",
    href: "/residential",
    image: "/Landing Page Assets/Home.webp",
    Icon: Home,
    placeholder: "linear-gradient(160deg,#d9e4d3 0%,#9bb391 100%)",
  },
  {
    id: "offices",
    label: "Offices",
    href: "/commercial",
    image: "/Landing Page Assets/office.webp",
    Icon: Building2,
    placeholder: "linear-gradient(160deg,#cfd8de 0%,#8498a6 100%)",
  },
  {
    id: "schools",
    label: "Schools",
    href: "/commercial",
    image: "/Landing Page Assets/school.webp",
    Icon: GraduationCap,
    placeholder: "linear-gradient(160deg,#e3dccb 0%,#b3a584 100%)",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    href: "/commercial",
    image: "/Landing Page Assets/hospital.webp",
    Icon: Stethoscope,
    placeholder: "linear-gradient(160deg,#d6e2e6 0%,#8fa9b3 100%)",
  },
];

export function SpaceCardsSection() {
  return (
    <section
      id="audit-spaces"
      aria-labelledby="audit-spaces-heading"
      className="bg-[#F2F5F1] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0} distance={18} amount={0.3}>
          <h2
            id="audit-spaces-heading"
            className="text-center font-heading text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]"
          >
            Engineered for Every Space
          </h2>
        </Reveal>

        {/* Swipe hint — mobile / tablet only */}
        <p
          aria-hidden
          className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-brand-green lg:hidden"
        >
          Swipe to explore
          <ArrowRight className="size-3.5 animate-[nudge_1.2s_ease-in-out_infinite]" />
        </p>

        <div className="relative mt-4 lg:mt-14">
        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-color:#3A7D2A55_transparent] [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {SPACES.map((space, i) => (
            <li key={space.id} className="w-[42%] max-w-[190px] shrink-0 snap-start sm:w-[30%] sm:max-w-[220px] lg:w-auto lg:max-w-none">
              <Reveal delay={0.08 * i} distance={20} amount={0.2}>
                <Link
                  id={`audit-space-${space.id}`}
                  href={space.href}
                  aria-label={`Explore ${space.label}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl lg:aspect-[3/3.4] lg:rounded-2xl"
                >
                  {space.image ? (
                    <Image
                      src={space.image}
                      alt={`O₂Cure clean air solutions for ${space.label}`}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      style={{ background: space.placeholder }}
                    >
                      <space.Icon className="size-16 text-white/40" strokeWidth={1} />
                    </div>
                  )}

                  {/* Legibility gradient */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 lg:p-5">
                    <span className="text-sm font-semibold text-white lg:text-base">{space.label}</span>
                    <span className="flex size-7 items-center justify-center rounded-full border border-white/80 text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-brand-green lg:size-9">
                      <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 lg:size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        {/* Right-edge fade signals more cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 -mr-4 w-12 bg-gradient-to-l from-[#F2F5F1] to-transparent sm:-mr-6 lg:hidden"
        />
        </div>
      </div>
    </section>
  );
}
