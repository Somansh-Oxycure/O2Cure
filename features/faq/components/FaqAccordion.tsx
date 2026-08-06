"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

import type { FaqItem } from "@/features/faq/types";
import { formatBrandText } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
  /** Pre-open first item for better first-impression UX */
  defaultOpenId?: string;
}

/**
 * Premium animated accordion.
 *
 * Design language:
 * - Glassmorphism card surface: bg-card/90 backdrop-blur-sm
 * - Animated chevron rotation (300ms premium ease)
 * - Answer height animation via AnimatePresence + motion.div (600ms ease-premium)
 * - Optional badge displayed beside question label
 * - Active item gets a brand-green left-border accent
 */
export function FaqAccordion({ items, defaultOpenId }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? items[0]?.id ?? null,
  );

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <div className="flex flex-col gap-3" role="list">
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            role="listitem"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className={cn(
                "group relative overflow-hidden rounded-2xl border transition-all duration-300",
                "bg-card/90 backdrop-blur-sm",
                isOpen
                  ? "border-brand-green/30 shadow-[0_4px_24px_-8px_rgba(58,125,42,0.18)]"
                  : "border-border/60 shadow-soft hover:border-border hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]",
              )}
            >
              {/* Active left accent bar */}
              <motion.div
                className="absolute left-0 top-0 w-[3px] rounded-r-full bg-brand-green"
                initial={false}
                animate={{ height: isOpen ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Question button */}
              <button
                type="button"
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2"
              >
                {/* Question text + badge */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3
                      className={cn(
                        "font-heading text-[clamp(0.9375rem,0.88rem+0.3vw,1.0625rem)] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200",
                        isOpen ? "text-[#0A0A0A]" : "text-[#0A0A0A]/80 group-hover:text-[#0A0A0A]",
                      )}
                    >
                      {formatBrandText(item.question)}
                    </h3>
                    {item.badge && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-brand-green/[0.08] px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.06em] text-brand-green">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <motion.div
                  className={cn(
                    "mt-0.5 shrink-0 transition-colors duration-200",
                    isOpen ? "text-brand-green" : "text-muted-foreground/60 group-hover:text-muted-foreground",
                  )}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ChevronDown className="size-5" aria-hidden />
                </motion.div>
              </button>

              {/* Answer panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="border-t border-border/40 px-6 pb-6 pt-5">
                      <p className="max-w-3xl text-[0.9375rem] leading-[1.7] text-muted-foreground">
                        {formatBrandText(item.answer)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
