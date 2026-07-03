"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { memo, useCallback, useId, useRef, useState } from "react";

import { durations } from "@/components/motion/durations";
import { easings } from "@/components/motion/easings";
import {
  isNavHrefActive,
  isNavItemActive,
  type NavDropdownItem,
} from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  item: NavDropdownItem;
  pathname: string;
  hash: string;
  isCompact?: boolean;
  onNavigate?: () => void;
};

export const NavDropdown = memo(function NavDropdown({
  item,
  pathname,
  hash,
  isCompact = false,
  onNavigate,
}: NavDropdownProps) {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isActive = isNavItemActive(item, pathname, hash);
  const hasItems = item.items.length > 0;

  const close = useCallback(() => setIsOpen(false), []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const triggerClasses = cn(
    "group relative inline-flex items-center gap-1 rounded-sm text-sm text-foreground/80 transition-colors duration-300 ease-premium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
    isActive ? "font-semibold text-foreground" : "font-medium",
    isCompact ? "w-full justify-between py-3 text-base" : "py-1",
  );

  const underline = (
    <span
      aria-hidden
      className={cn(
        "absolute -bottom-0.5 left-0 h-px origin-left bg-brand-green transition-[width,opacity] duration-300 ease-premium",
        isActive || isOpen
          ? "w-full opacity-90"
          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50",
      )}
    />
  );

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: durations.fast, ease: easings.premium };

  return (
    <div
      ref={containerRef}
      className={cn("relative", isCompact && "w-full")}
      onMouseEnter={() => !isCompact && setIsOpen(true)}
      onMouseLeave={() => !isCompact && setIsOpen(false)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${menuId}-menu`}
        onClick={() => setIsOpen((open) => !open)}
        className={triggerClasses}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-60 transition-transform duration-300 ease-premium",
            isOpen && "rotate-180 opacity-90",
          )}
          aria-hidden
        />
        {underline}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${menuId}-menu`}
            role="menu"
            aria-labelledby={`${menuId}-trigger`}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            transition={panelTransition}
            className={cn(
              "z-50 min-w-[13rem] overflow-hidden rounded-xl border border-border/60 bg-background/95 p-1.5 shadow-elevated backdrop-blur-xl backdrop-saturate-150",
              isCompact
                ? "relative mt-2 w-full"
                : "absolute top-[calc(100%+0.65rem)] left-1/2 -translate-x-1/2",
            )}
          >
            {hasItems ? (
              item.items.map((link) => {
                const linkActive = isNavHrefActive(link.href, pathname, hash);

                if (link.isPlaceholder) {
                  return (
                    <span
                      key={link.href}
                      role="menuitem"
                      aria-disabled="true"
                      className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground/70"
                    >
                      {link.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => {
                      close();
                      onNavigate?.();
                    }}
                    aria-current={linkActive ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors duration-300 ease-premium hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
                      linkActive && "font-semibold text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })
            ) : (
              <p className="px-3 py-2.5 text-sm text-muted-foreground">
                More {item.label.toLowerCase()} coming soon.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
