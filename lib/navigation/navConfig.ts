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
  { label: "Corporate & Office", href: "/products/corporate-air-purifier" },
  { label: "Healthcare & Clinical", href: "/products/healthcare-air-purifier" },
  { label: "Residential", href: "/residential-air-purifier" },
  { label: "Industrial & Manufacturing", href: "/products/industrial-air-purifier" },
  { label: "Education", href: "/products/education-air-purifier" },
  { label: "Data Centres", href: "/products/datacenter-air-purifier" },
];

export const NAV_ITEMS: NavItem[] = [
  { type: "dropdown", label: "Products", href: "/products", items: SOLUTIONS_LINKS },
  {
    type: "dropdown",
    label: "Solutions",
    items: [
      { label: "Residential", href: "/residential" },
      { label: "Commercial", href: "/commercial-air-purifier" },
    ],
  },
  // {
  //   type: "dropdown",
  //   label: "Technology",
  //   items: [{ label: "Overview", href: "/#technology" }],
  // },
  { type: "link", label: "AQI", href: "/aqi-effect/" },
  { type: "link", label: "Clientele", href: "/clientele" },
  { type: "link", label: "About Us", href: "/about" },
  { type: "link", label: "FAQ", href: "/faq" },
  { type: "link", label: "Blog", href: "/blog" },
];

export const NAV_CTA = {
  label: "Get in Touch",
  href: "/contact",
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
