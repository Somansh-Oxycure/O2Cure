import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { ClientLogo } from "@/features/trust/types";

interface LogoWallProps {
  logos: ClientLogo[];
}

/**
 * Premium infinite-scroll logo marquee — two rows, opposite directions,
 * fade masks on the sides for a polished bleed effect.
 * Uses pure CSS @keyframes animation (no JS loop) for best performance.
 */
export function LogoWall({ logos }: LogoWallProps) {
  const half = Math.ceil(logos.length / 2);
  const row1 = logos.slice(0, half);
  const row2 = logos.slice(half);

  return (
    <Reveal delay={0} distance={20} amount={0.2}>
      <div className="relative overflow-hidden">
        {/* Left + right fade masks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 lg:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 lg:w-32"
        />

        {/* Row 1 — scrolls left */}
        <MarqueeRow logos={row1} direction="left" />

        {/* Divider */}
        <div className="my-4 sm:my-5" />

        {/* Row 2 — scrolls right */}
        <MarqueeRow logos={row2} direction="right" />
      </div>
    </Reveal>
  );
}

interface MarqueeRowProps {
  logos: ClientLogo[];
  direction: "left" | "right";
}

function MarqueeRow({ logos, direction }: MarqueeRowProps) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      {/* Copy A */}
      <ul className={`flex shrink-0 items-center ${animationClass}`}>
        {logos.map((logo, i) => (
          <li
            key={`${logo.id}-a-${i}`}
            className="mx-2 flex w-20 shrink-0 items-center justify-center sm:mx-5 sm:w-36 lg:mx-8 lg:w-48"
          >
            <LogoItemInline logo={logo} />
          </li>
        ))}
      </ul>
      {/* Copy B — duplicate for seamless loop */}
      <ul className={`flex shrink-0 items-center ${animationClass}`} aria-hidden>
        {logos.map((logo, i) => (
          <li
            key={`${logo.id}-b-${i}`}
            className="mx-2 flex w-20 shrink-0 items-center justify-center sm:mx-5 sm:w-36 lg:mx-8 lg:w-48"
          >
            <LogoItemInline logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface LogoItemInlineProps {
  logo: ClientLogo;
}

function LogoItemInline({ logo }: LogoItemInlineProps) {
  const hasImage = Boolean(logo.logo.src);

  const content = hasImage ? (
    <Image
      src={logo.logo.src}
      alt={logo.logo.alt}
      width={logo.logo.width ?? 160}
      height={logo.logo.height ?? 48}
      loading="lazy"
      className={`h-full w-full max-h-10 max-w-[9rem] object-contain sm:max-h-11 sm:max-w-[10rem] ${logo.className ?? ""}`}
    />
  ) : (
    <span
      aria-hidden
      className="font-heading text-sm font-medium tracking-tight text-muted-foreground sm:text-base"
    >
      {logo.name}
    </span>
  );

  const sharedClasses =
    "group flex h-[clamp(3.5rem,8vw,5rem)] items-center justify-center px-2 opacity-85 hover:opacity-100 transition-opacity duration-500";

  if (logo.href) {
    return (
      <a
        href={logo.href}
        className={sharedClasses}
        aria-label={logo.name}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <div className={sharedClasses} aria-label={logo.name}>
      {content}
    </div>
  );
}
