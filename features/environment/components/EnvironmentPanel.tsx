"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { panelMotion } from "@/features/environment/animation/panelMotion";
import type { Environment } from "@/features/environment/content";
import { environmentContent } from "@/features/environment/content";

interface PanelHeights {
  collapsedHeight: number;
  compressedHeight: number;
  expandedHeight: number;
}

interface EnvironmentPanelProps {
  environment: Environment;
  isExpanded: boolean;
  isCompressed: boolean;
  heights: PanelHeights;
  onExpand: () => void;
  onCollapse: () => void;
  onToggle: () => void;
  useHover: boolean;
  index: number;
}

export function EnvironmentPanel({
  environment,
  isExpanded,
  isCompressed,
  heights,
  onExpand,
  onCollapse,
  onToggle,
  useHover,
  index,
}: EnvironmentPanelProps) {
  const Icon = environment.icon;

  const targetHeight = isExpanded
    ? heights.expandedHeight
    : isCompressed
      ? heights.compressedHeight
      : heights.collapsedHeight;

  const pointerHandlers = useHover
    ? { onPointerEnter: onExpand, onPointerLeave: onCollapse }
    : { onClick: onToggle };

  /** Whether this environment has a separate collapsed-state image */
  const hasCollapsedImage = Boolean(environment.image.collapsedSrc);

  return (
    <motion.article
      layout
      animate={{ height: targetHeight }}
      transition={panelMotion.expand}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded-2xl",
        "transition-shadow duration-500",
        isExpanded
          ? "shadow-[0_24px_64px_-16px_rgba(0,0,0,0.3),0_8px_24px_-8px_rgba(0,0,0,0.15)]"
          : "shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
        // Subtle ring on expanded
        isExpanded && "ring-1 ring-white/20",
      )}
      aria-expanded={isExpanded}
      {...pointerHandlers}
    >
      {/* ── Background media layer ── */}
      <div data-slot="panel-media" className="absolute inset-0">

        {/* ─ EXPANDED image — fades in / scales up on expand ─ */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 1.06,
            filter: isExpanded
              ? "blur(0px) saturate(1.08) brightness(1)"
              : "blur(6px) saturate(0.7) brightness(0.92)",
          }}
          transition={{
            ...panelMotion.image,
            // Slightly stagger the expanded image reveal after height animates
            delay: isExpanded ? 0.08 : 0,
          }}
          style={{ willChange: "transform, filter, opacity" }}
        >
          <Image
            src={environment.image.src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 96vw, 88vw"
            className="object-cover"
            priority={index < 2}
          />
        </motion.div>

        {/* ─ COLLAPSED image — crossfades OUT when expanding ─ */}
        {hasCollapsedImage && (
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isExpanded ? 0 : isCompressed ? 0.7 : 1,
              scale: isExpanded ? 1.04 : isCompressed ? 1.02 : 1,
              filter: isExpanded
                ? "blur(8px) saturate(0.6) brightness(0.88)"
                : isCompressed
                  ? "blur(1.5px) saturate(0.9) brightness(0.95)"
                  : "blur(0px) saturate(1) brightness(1.02)",
            }}
            transition={panelMotion.image}
            style={{ willChange: "transform, filter, opacity" }}
          >
            <Image
              src={environment.image.collapsedSrc!}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 96vw, 88vw"
              className="object-cover"
              priority={index < 3}
            />
          </motion.div>
        )}

        {/* ─ Single-image fallback (no collapsedSrc): blur/scale/saturate treatment ─ */}
        {!hasCollapsedImage && (
          <motion.div
            className="absolute inset-0"
            animate={{
              filter: isExpanded
                ? "blur(0px) saturate(1.08) brightness(1)"
                : isCompressed
                  ? "blur(5px) saturate(0.85) brightness(0.92)"
                  : "blur(2px) saturate(0.95) brightness(0.98)",
              scale: isExpanded ? 1 : isCompressed ? 1.06 : 1.03,
              opacity: isExpanded ? 1 : isCompressed ? 0.75 : 0.95,
            }}
            transition={panelMotion.image}
            style={{ willChange: "transform, filter, opacity" }}
          >
            <Image
              src={environment.image.src}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 96vw, 88vw"
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
        )}

        {/* ─ Collapsed overlay: warm light-tinted scrim (light mode only) ─ */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isExpanded
              ? "linear-gradient(135deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.32) 100%)"
              : isCompressed
                ? "linear-gradient(135deg, rgba(245,245,244,0.7) 0%, rgba(238,238,236,0.65) 100%)"
                : "linear-gradient(135deg, rgba(245,245,244,0.55) 0%, rgba(238,238,236,0.5) 100%)",
            opacity: 1,
          }}
          transition={panelMotion.image}
        />

        {/* ─ Collapsed bottom fade: fades the bottom edge for a cleaner peek ─ */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-16"
          animate={{
            opacity: isExpanded ? 0 : isCompressed ? 0.8 : 0.6,
          }}
          transition={panelMotion.image}
          style={{
            background:
              "linear-gradient(to top, rgba(245,245,244,0.85) 0%, transparent 100%)",
          }}
        />

        {/* ─ Expanded: cinematic bottom vignette for copy legibility ─ */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...panelMotion.image, delay: 0.1 }}
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.04) 70%, transparent 100%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ─ Expanded: subtle top-left light bloom ─ */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
              className="absolute -left-12 -top-12 h-48 w-48 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ─ Collapsed: left-edge color accent strip (brand-green hint) ─ */}
        <AnimatePresence>
          {!isExpanded && !isCompressed && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-[3px] origin-center rounded-l-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(58,125,42,0.5) 0%, rgba(58,125,42,0.15) 100%)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header row — always visible */}
        <div className="flex shrink-0 items-center gap-3.5 px-5 py-4 sm:px-6">
          {/* Icon badge */}
          <motion.span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border"
            animate={{
              borderColor: isExpanded
                ? "rgba(255,255,255,0.25)"
                : "rgba(209,213,219,0.8)",
              backgroundColor: isExpanded
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.82)",
              color: isExpanded ? "rgba(255,255,255,1)" : "rgba(10,10,10,0.95)",
              boxShadow: isExpanded
                ? "0 0 0 0px transparent"
                : "0 1px 3px rgba(0,0,0,0.08)",
            }}
            transition={panelMotion.image}
          >
            <Icon className="size-[1.0625rem]" strokeWidth={1.75} />
          </motion.span>

          {/* Environment name */}
          <motion.h3
            className="font-heading text-[clamp(0.9375rem,0.88rem+0.3vw,1.0625rem)] font-semibold"
            animate={{
              color: isExpanded ? "rgba(255,255,255,1)" : "rgba(10,10,10,1)",
              textShadow: isExpanded
                ? "0 1px 8px rgba(0,0,0,0.4)"
                : "none",
            }}
            transition={panelMotion.image}
          >
            {environment.name}
          </motion.h3>

          {/* Index number — subtle, collapsed state only */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-auto font-mono text-[0.65rem] font-medium tabular-nums text-[#0A0A0A]/50"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Expanded content — description + CTA */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="expanded-copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelMotion.image}
              className="flex flex-1 flex-col justify-end px-5 pb-5 sm:px-6 sm:pb-6"
            >
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ ...panelMotion.image, delay: 0.05 }}
                className="max-w-md text-[0.875rem] leading-relaxed text-white/80 sm:text-[0.9375rem]"
              >
                {environment.description}
              </motion.p>

              {/* CTA button */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ ...panelMotion.cta, delay: 0.1 }}
                className="mt-4 flex items-center gap-4"
              >
                <Button
                  type="button"
                  size="sm"
                  className="rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                >
                  {environmentContent.cta}
                  <ArrowRight className="size-3.5" />
                </Button>

                {/* Subtle "learn more" text link */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                  className="text-[0.75rem] font-medium text-white/45"
                >
                  View case studies →
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed state: subtle description preview */}
        <AnimatePresence>
          {!isExpanded && !isCompressed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-5 pb-3 text-[0.75rem] font-medium leading-snug text-[#0A0A0A]/70 sm:px-6"
            >
              {environment.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Hover glow edge — premium interaction cue */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isExpanded
            ? "inset 0 0 0 1px rgba(255,255,255,0.15)"
            : "inset 0 0 0 1px rgba(209,213,219,0.5)",
        }}
        transition={panelMotion.image}
      />
    </motion.article>
  );
}
