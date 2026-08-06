"use client";

import Link from "next/link";
import { memo } from "react";

import { isNavHrefActive } from "@/lib/navigation/navConfig";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  label: string;
  href: string;
  pathname: string;
  hash: string;
  isCompact?: boolean;
  onNavigate?: () => void;
  className?: string;
  isNavLight?: boolean;
};

export const NavLink = memo(function NavLink({
  label,
  href,
  pathname,
  hash,
  isCompact = false,
  onNavigate,
  className,
  isNavLight,
}: NavLinkProps) {
  const isActive = isNavHrefActive(href, pathname, hash);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center rounded-sm text-sm transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
        isActive
          ? (isNavLight ? "font-semibold text-white" : "font-semibold text-foreground")
          : (isNavLight ? "font-medium text-white/90 hover:text-white" : "font-medium text-foreground/80 hover:text-foreground"),
        isCompact ? "py-3 text-base" : "py-1",
        className,
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-px origin-left bg-brand-green transition-[width,opacity] duration-300 ease-premium",
          isActive
            ? "w-full opacity-90"
            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50",
        )}
      />
    </Link>
  );
});
