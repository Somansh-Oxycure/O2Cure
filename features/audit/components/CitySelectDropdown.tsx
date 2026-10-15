"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Curated list of major metropolitan, tier-1, and tier-2 cities across India.
 * Top hubs (Delhi NCR, major metros) are listed first for quick access.
 */
export const POPULAR_CITIES = [
  "Delhi / NCR",
  "Gurugram",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Faridabad",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Lucknow",
] as const;

export const OTHER_MAJOR_CITIES = [
  "Agra",
  "Aligarh",
  "Amritsar",
  "Aurangabad",
  "Bareilly",
  "Bhopal",
  "Bhubaneswar",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Dhanbad",
  "Goa",
  "Guwahati",
  "Gwalior",
  "Hubballi",
  "Indore",
  "Jabalpur",
  "Jalandhar",
  "Jamshedpur",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kolhapur",
  "Kota",
  "Kozhikode",
  "Ludhiana",
  "Madurai",
  "Mangalore",
  "Meerut",
  "Moradabad",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Patna",
  "Prayagraj",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Rourkela",
  "Salem",
  "Siliguri",
  "Sonipat",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Tiruchirappalli",
  "Udaipur",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
] as const;

export const ALL_CITIES: readonly string[] = [
  ...POPULAR_CITIES,
  ...OTHER_MAJOR_CITIES,
  "Other",
];

interface CitySelectDropdownProps {
  id?: string;
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
}

export function CitySelectDropdown({
  id,
  value,
  onChange,
  placeholder = "Select city / area",
  className,
  invalid,
}: CitySelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Filtered cities based on search
  const filteredCities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_CITIES;
    return ALL_CITIES.filter((city) => city.toLowerCase().includes(query));
  }, [searchQuery]);

  const hasExactMatch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_CITIES.some((c) => c.toLowerCase() === q);
  }, [searchQuery]);

  const handleSelect = (city: string) => {
    onChange(city);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "h-11 w-full rounded-full border border-transparent bg-[#F1F1F3] px-4 text-[0.8rem] text-foreground outline-none transition-all duration-300",
          "flex items-center justify-between text-left",
          "hover:bg-[#EAEAEA] focus:border-brand-green/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(58,125,42,0.10)]",
          isOpen && "border-brand-green/40 bg-white shadow-[0_0_0_4px_rgba(58,125,42,0.10)]",
          invalid && "border-destructive/50",
          !value && "text-muted-foreground/70",
        )}
      >
        <span className="flex items-center gap-2 truncate">
          <MapPin
            className={cn(
              "size-3.5 shrink-0 transition-colors",
              value ? "text-brand-green" : "text-muted-foreground/60",
            )}
            aria-hidden
          />
          <span className={cn("truncate", !value && "text-muted-foreground/60")}>
            {value || placeholder}
          </span>
        </span>

        <span className="flex items-center gap-1 shrink-0">
          {value && (
            <span
              role="button"
              tabIndex={0}
              title="Clear selection"
              aria-label="Clear city"
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
              className="rounded-full p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors"
            >
              <X className="size-3" />
            </span>
          )}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-300",
              isOpen && "rotate-180 text-brand-green",
            )}
          />
        </span>
      </button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Cities list"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-border/80 bg-white p-2 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.06)]"
          >
            {/* Search Input Bar */}
            <div className="relative mb-2">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or type custom..."
                className="h-9 w-full rounded-full bg-[#F1F1F3] pl-9 pr-8 text-[0.78rem] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:bg-white focus:ring-2 focus:ring-brand-green/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Scrollable Cities List */}
            <div className="max-h-56 overflow-y-auto overscroll-contain pr-1 space-y-0.5 text-[0.8rem]">
              {/* Option to use custom typed city if not matched or as alternative */}
              {searchQuery.trim().length > 1 && !hasExactMatch && (
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery.trim())}
                  className="flex w-full items-center gap-2 rounded-xl bg-brand-green/10 px-3 py-2 text-left text-[0.78rem] font-medium text-brand-green hover:bg-brand-green/15 transition-colors"
                >
                  <MapPin className="size-3.5 shrink-0 text-brand-green" />
                  <span className="truncate">
                    Use &ldquo;<strong>{searchQuery.trim()}</strong>&rdquo; as location
                  </span>
                </button>
              )}

              {filteredCities.length === 0 && searchQuery.trim().length <= 1 ? (
                <div className="py-6 text-center text-[0.78rem] text-muted-foreground">
                  No cities found
                </div>
              ) : (
                filteredCities.map((city) => {
                  const isSelected = value.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(city)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.8rem] transition-colors",
                        isSelected
                          ? "bg-brand-green/10 font-semibold text-brand-green"
                          : "text-foreground hover:bg-[#F1F1F3] hover:text-foreground",
                      )}
                    >
                      <span className="truncate">{city}</span>
                      {isSelected && (
                        <Check className="size-3.5 shrink-0 text-brand-green" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
