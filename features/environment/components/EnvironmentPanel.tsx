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

  return (
    <motion.article
      layout
      animate={{ height: targetHeight }}
      transition={panelMotion.expand}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-muted shadow-soft",
        "ring-1 ring-border/60 transition-shadow duration-500",
        isExpanded && "shadow-elevated ring-border/40",
      )}
      aria-expanded={isExpanded}
      {...pointerHandlers}
    >
      {/* Video-ready media slot — blurred preview when collapsed */}
      <div data-slot="panel-media" className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            filter: isExpanded ? "blur(0px)" : "blur(14px)",
            scale: isExpanded ? 1 : 1.06,
          }}
          transition={panelMotion.image}
        >
          <Image
            src={environment.image.src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 96vw, 88vw"
            className="object-cover"
          />
        </motion.div>

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-colors duration-500",
            isExpanded ? "bg-black/25" : "bg-background/55",
          )}
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelMotion.image}
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-[2px]"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex shrink-0 items-center gap-4 px-5 py-4 sm:px-6">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
              isExpanded
                ? "border-white/30 bg-white/15 text-white"
                : "border-border/80 bg-background/80 text-foreground",
            )}
          >
            <Icon className="size-[1.125rem]" strokeWidth={1.75} />
          </span>
          <h3
            className={cn(
              "font-heading text-h3 transition-colors duration-500",
              isExpanded ? "text-white" : "text-foreground",
            )}
          >
            {environment.name}
          </h3>
        </div>

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
              <p className="max-w-md text-sm leading-relaxed text-white/85 sm:text-[0.9375rem]">
                {environment.description}
              </p>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={panelMotion.cta}
              >
                <Button
                  type="button"
                  size="sm"
                  className="mt-4 rounded-full border-white/25 bg-white/10 px-5 text-white hover:bg-white/20 hover:text-white"
                >
                  {environmentContent.cta}
                  <ArrowRight className="size-3.5" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
