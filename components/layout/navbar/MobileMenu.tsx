"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

import { Button } from "@/components/ui/button";
import { easings } from "@/components/motion/easings";
import { useActiveRoute } from "@/lib/hooks/useActiveRoute";
import { NAV_CTA, NAV_ITEMS } from "@/lib/navigation/navConfig";

import { NavDropdown } from "./NavDropdown";
import { NavLink } from "./NavLink";

const NAVBAR_TRANSITION = 0.45;

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname, hash } = useActiveRoute();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  const overlayTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: NAVBAR_TRANSITION, ease: easings.premium };

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: NAVBAR_TRANSITION, ease: easings.premium };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          className="pointer-events-auto fixed inset-0 z-40 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-background/70 backdrop-blur-xl backdrop-saturate-150"
            onClick={onClose}
          />

          <motion.nav
            id="mobile-nav-panel"
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: prefersReducedMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: prefersReducedMotion ? 0 : "100%" }}
            transition={panelTransition}
            className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-border/60 bg-background/92 px-6 py-8 shadow-elevated backdrop-blur-2xl backdrop-saturate-150 focus:outline-none"
          >
            <div className="mb-10 flex items-center justify-between">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
                Menu
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-300 ease-premium hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
              {NAV_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    pathname={pathname}
                    hash={hash}
                    isCompact
                    onNavigate={onClose}
                  />
                ) : (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    hash={hash}
                    isCompact
                    onNavigate={onClose}
                  />
                ),
              )}
            </div>

            <div className="mt-8 border-t border-border/60 pt-6">
              <Button
                nativeButton={false}
                render={<Link href={NAV_CTA.href} onClick={onClose} />}
                variant="outline"
                className="h-12 w-full rounded-full border-brand-green bg-transparent text-base text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
              >
                {NAV_CTA.label}
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
