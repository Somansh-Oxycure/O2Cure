/**
 * Global primary navigation — single source of truth for the Navbar.
 * Dropdown items mirror footer solution routes; placeholder routes are
 * wired for future pages without changing component architecture.
 */

export type NavDropdownLink = {
  label: string;
  href: string;
  /** Route not yet live — rendered but non-navigating until page ships */
  isPlaceholder?: boolean;
};

export type NavLinkItem = {
  type: "link";
  label: string;
  href: string;
};

export type NavDropdownItem = {
  type: "dropdown";
  label: string;
  /** Optional parent href when the label itself should navigate */
  href?: string;
  items: NavDropdownLink[];
};

export type NavItem = NavLinkItem | NavDropdownItem;

export const SOLUTIONS_LINKS: NavDropdownLink[] = [
  { label: "Residential", href: "/solutions/residential", isPlaceholder: true },
  { label: "Corporate", href: "/solutions/corporate", isPlaceholder: true },
  { label: "Industrial", href: "/solutions/industrial", isPlaceholder: true },
  { label: "Healthcare", href: "/solutions/healthcare", isPlaceholder: true },
  { label: "Education", href: "/solutions/education", isPlaceholder: true },
  { label: "Government", href: "/solutions/government", isPlaceholder: true },
  {
    label: "Airports & Transit",
    href: "/solutions/airports-transit",
    isPlaceholder: true,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { type: "dropdown", label: "Solutions", items: SOLUTIONS_LINKS },
  {
    type: "dropdown",
    label: "Technology",
    items: [{ label: "Overview", href: "/#technology" }],
  },
  {
    type: "dropdown",
    label: "Products",
    items: [{ label: "Overview", href: "/#products" }],
  },
  { type: "link", label: "AQI", href: "/#aqi-effect" },
  {
    type: "link",
    label: "Case Studies",
    href: "/case-studies",
  },
  { type: "dropdown", label: "Resources", items: [] },
  { type: "link", label: "About Us", href: "/about" },
];

export const NAV_CTA = {
  label: "Get in Touch",
  href: "/#contact",
} as const;

/** Returns true when `href` matches the current route (path + optional hash). */
export function isNavHrefActive(
  href: string,
  pathname: string,
  hash: string,
): boolean {
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavItemActive(
  item: NavItem,
  pathname: string,
  hash: string,
): boolean {
  if (item.type === "link") {
    return isNavHrefActive(item.href, pathname, hash);
  }

  if (item.href && isNavHrefActive(item.href, pathname, hash)) {
    return true;
  }

  return item.items.some(
    (link) => !link.isPlaceholder && isNavHrefActive(link.href, pathname, hash),
  );
}
