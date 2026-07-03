"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/navbar/MobileMenu";
import { NavDropdown } from "@/components/layout/navbar/NavDropdown";
import { NavLink } from "@/components/layout/navbar/NavLink";
import { Button } from "@/components/ui/button";
import { easings } from "@/components/motion/easings";
import { useActiveRoute } from "@/lib/hooks/useActiveRoute";
import { useNavbarScroll } from "@/lib/hooks/useNavbarScroll";
import { NAV_CTA, NAV_ITEMS } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

const NAVBAR_TRANSITION = 0.45;

export function Navbar() {
  const { isScrolled } = useNavbarScroll();
  const { pathname, hash } = useActiveRoute();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: NAVBAR_TRANSITION, ease: easings.premium };

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 z-50"
        initial={false}
        animate={{ top: isScrolled ? 0 : 32 }}
        transition={transition}
      >
        <motion.div
          className={cn("w-full border-border/50", isScrolled && "border-b")}
          initial={false}
          animate={{
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.86)"
              : "rgba(255, 255, 255, 0.04)",
            backdropFilter: isScrolled
              ? "blur(20px) saturate(180%)"
              : "blur(8px) saturate(120%)",
            boxShadow: isScrolled ? "var(--shadow-soft)" : "0 0 0 transparent",
            paddingTop: isScrolled ? 12 : 20,
            paddingBottom: isScrolled ? 12 : 20,
          }}
          transition={transition}
        >
          <nav
            aria-label="Primary"
            className="relative flex w-full items-center px-[4vw] lg:px-[5vw]"
          >
            <Link
              href="/"
              className="pointer-events-auto flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
              aria-label="O2Cure home"
            >
              <motion.div
                initial={false}
                animate={{ scale: isScrolled ? 0.91 : 1 }}
                transition={transition}
              >
                <Image
                  src="/O2cure-final-logo.png"
                  alt="O2Cure"
                  width={160}
                  height={160}
                  priority
                  className="h-14 w-auto lg:h-16"
                />
              </motion.div>
            </Link>

            <motion.div
              className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
              initial={false}
              animate={{ gap: isScrolled ? 24 : 28 }}
              transition={transition}
            >
              {NAV_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    pathname={pathname}
                    hash={hash}
                  />
                ) : (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    hash={hash}
                  />
                ),
              )}
            </motion.div>

            <div className="pointer-events-auto ml-auto hidden lg:block">
              <Button
                nativeButton={false}
                render={<Link href={NAV_CTA.href} />}
                variant="outline"
                className="rounded-full border-brand-green bg-transparent px-6 text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
              >
                {NAV_CTA.label}
              </Button>
            </div>

            <button
              type="button"
              className="pointer-events-auto ml-auto inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-300 ease-premium hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </nav>
        </motion.div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
