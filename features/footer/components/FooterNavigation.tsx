"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import type { FooterLink, FooterNavGroup } from "@/features/footer/types";
import { useFinePointer } from "@/lib/hooks/useFinePointer";
import { cn } from "@/lib/utils";

interface FooterNavigationProps {
  groups: FooterNavGroup[];
  /** Base delay (seconds) before the first column reveals. */
  baseDelay?: number;
}

function FooterNavLink({ link }: { link: FooterLink }) {
  const isInteractive = link.isActive && !link.isPlaceholder;

  if (!isInteractive) {
    return (
      <span
        className="text-sm text-muted-foreground/80"
        aria-disabled="true"
      >
        {link.label}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      className="text-sm text-muted-foreground transition-colors duration-300 ease-premium hover:text-brand-blue"
      {...(link.href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {link.label}
    </a>
  );
}

function FooterNavColumn({
  group,
  delay,
}: {
  group: FooterNavGroup;
  delay: number;
}) {
  return (
    <Reveal delay={delay} distance={18} amount={0.2}>
      <nav aria-label={group.title}>
        <h3 className="text-eyebrow text-foreground/70">
          {group.title}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {group.links.map((link) => (
            <li key={link.id}>
              <FooterNavLink link={link} />
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}

function FooterNavAccordionItem({
  group,
  isOpen,
  onToggle,
}: {
  group: FooterNavGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="text-eyebrow text-foreground/70">
          {group.title}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-300 ease-premium",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? durations.fast : durations.base,
          ease: easings.premium,
        }}
        className="overflow-hidden"
      >
        <ul className="space-y-2.5 pb-3.5">
          {group.links.map((link) => (
            <li key={link.id}>
              <FooterNavLink link={link} />
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/**
 * Four balanced columns on desktop; accordion stacks on touch devices.
 */
export function FooterNavigation({
  groups,
  baseDelay = 0.24,
}: FooterNavigationProps) {
  const useDesktopLayout = useFinePointer();
  const [openId, setOpenId] = useState<string | null>(groups[0]?.id ?? null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  if (useDesktopLayout) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        {groups.map((group, index) => (
          <FooterNavColumn
            key={group.id}
            group={group}
            delay={baseDelay + index * 0.08}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {groups.map((group, index) => (
        <Reveal key={group.id} delay={baseDelay + index * 0.06} distance={14}>
          <FooterNavAccordionItem
            group={group}
            isOpen={openId === group.id}
            onToggle={() => handleToggle(group.id)}
          />
        </Reveal>
      ))}
    </div>
  );
}
