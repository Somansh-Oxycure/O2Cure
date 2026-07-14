"use client";

import { motion } from "framer-motion";

import { easings } from "@/components/motion/easings";
import type { PurificationPhase } from "@/features/aqi/types";
import { cn } from "@/lib/utils";

interface ActivationButtonProps {
  phase: PurificationPhase;
  disabled?: boolean;
  onActivate: () => void;
  className?: string;
}

/**
 * Central O₂Cure Effect control — slow idle pulse; deliberate activation.
 */
export function ActivationButton({
  phase,
  disabled = false,
  onActivate,
  className,
}: ActivationButtonProps) {
  const isIdle = phase === "idle";
  const isActivating = phase !== "idle" && phase !== "complete";
  const isComplete = phase === "complete";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {isIdle && (
        <motion.span
          aria-hidden
          className="absolute size-[clamp(6.5rem,20vw,9rem)] rounded-full border border-primary/18"
          animate={{ scale: [1, 1.32, 1], opacity: [0.3, 0, 0.3] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: easings.idle,
          }}
        />
      )}

      {phase === "button" && (
        <>
          <motion.span
            aria-hidden
            className="absolute size-[clamp(6.5rem,20vw,9rem)] rounded-full border border-primary/30"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: easings.premium }}
          />
          <motion.span
            aria-hidden
            className="absolute size-[clamp(9rem,28vw,13rem)] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120, 210, 185, 0.32) 0%, transparent 68%)",
            }}
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1.8, opacity: [0, 0.65, 0] }}
            transition={{ duration: 1.2, ease: easings.premium }}
          />
        </>
      )}

      <motion.button
        type="button"
        aria-label="Activate O₂Cure Effect"
        disabled={disabled || isActivating || isComplete}
        onClick={onActivate}
        className={cn(
          "relative z-10 flex size-[clamp(6rem,19vw,8.5rem)] items-center justify-center rounded-full",
          "border border-primary/15 bg-primary text-primary-foreground shadow-elevated",
          "text-center text-xs font-medium leading-tight tracking-wide sm:text-sm",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-default",
          isComplete && "border-brand-green/30 bg-brand-green/90",
        )}
        animate={{
          rotate: phase === "button" ? 5 : 0,
          scale: phase === "button" ? [1, 1.03, 1] : isComplete ? 0.97 : 1,
        }}
        transition={{
          duration: phase === "button" ? 1 : 0.5,
          ease: easings.premium,
        }}
        whileTap={isIdle ? { scale: 0.96 } : undefined}
      >
        <span className="max-w-[6.5rem] px-2">
          {isComplete ? "Purified" : "O₂Cure Effect"}
        </span>
      </motion.button>
    </div>
  );
}
