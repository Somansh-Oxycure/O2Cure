"use client";

import { useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Layers,
  Play,
  Search,
  Sparkles,
  Tv,
  Volume2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

import {
  AIR_LIBRARY_CATEGORIES,
  AIR_LIBRARY_ITEMS,
  AIR_LIBRARY_MEDIA_TYPES,
  extractYouTubeId,
  getMediaThumbnail,
  getYouTubeEmbedUrl,
} from "@/features/air-library/content";
import type {
  AirLibraryItem,
  MediaCategory,
  MediaType,
} from "@/features/air-library/types";
import { FooterSection } from "@/features/footer";

type MediaTypeFilter = "all" | MediaType;
type CategoryFilter = "All" | MediaCategory;

const MAX_QUEUE_VISIBLE = 6;

function getMediaTypeIcon(type: MediaTypeFilter) {
  switch (type) {
    case "short":
      return Tv;
    case "video":
      return Film;
    case "image":
      return ImageIcon;
    default:
      return Layers;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter & Search Control Bar
// ─────────────────────────────────────────────────────────────────────────────
interface FilterControlsProps {
  mediaType: MediaTypeFilter;
  onMediaTypeChange: (type: MediaTypeFilter) => void;
  category: CategoryFilter;
  onCategoryChange: (cat: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  mediaTypeCounts: Record<MediaTypeFilter, number>;
  categoryCounts: Record<CategoryFilter, number>;
  availableCategories: readonly CategoryFilter[];
}

function FilterControls({
  mediaType,
  onMediaTypeChange,
  category,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  mediaTypeCounts,
  categoryCounts,
  availableCategories,
}: FilterControlsProps) {
  return (
    <div className="mb-4 sm:mb-5 rounded-2xl border border-border bg-white p-3 sm:p-4 shadow-soft">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Media Type Tabs */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by media format"
        >
          {AIR_LIBRARY_MEDIA_TYPES.filter(
            (typeOption) =>
              typeOption.id === "all" ||
              (mediaTypeCounts[typeOption.id] ?? 0) > 0,
          ).map((typeOption) => {
            const count = mediaTypeCounts[typeOption.id] ?? 0;
            const isActive = mediaType === typeOption.id;
            const Icon = getMediaTypeIcon(typeOption.id);

            return (
              <button
                key={typeOption.id}
                type="button"
                onClick={() => onMediaTypeChange(typeOption.id)}
                aria-pressed={isActive}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
                  isActive
                    ? "bg-[#0A0A0A] text-white shadow-xs"
                    : "border border-border bg-background text-foreground/80 hover:border-brand-green/40 hover:text-brand-green",
                ].join(" ")}
              >
                <Icon className="size-3.5" aria-hidden />
                <span>{typeOption.label}</span>
                <span
                  className={[
                    "rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold tabular-nums",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-muted-foreground border border-border/70",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search videos, audits, topics..."
            aria-label="Search The Air Library"
            className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-brand-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-border/60 hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-2.5 border-t border-border/70 pt-2.5">
        <div
          className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="tablist"
          aria-label="Filter media by category"
        >
          {availableCategories.map((cat) => {
            const isActive = category === cat;
            const count = categoryCounts[cat] ?? 0;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat)}
                className={[
                  "relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.78rem] font-semibold transition-all duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
                  isActive
                    ? "bg-brand-green text-white shadow-[0_2px_12px_-4px_rgba(58,125,42,0.45)]"
                    : "border border-border bg-background/70 text-muted-foreground hover:border-brand-green/35 hover:text-foreground",
                ].join(" ")}
              >
                <span>{cat}</span>
                <span
                  className={[
                    "rounded-full px-1.5 py-0.5 text-[0.63rem] font-bold tabular-nums",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-white text-muted-foreground border border-border/60",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Stage Watch Player (Zero-Load Facade + Single Mounted Iframe)
// ─────────────────────────────────────────────────────────────────────────────
interface WatchStageProps {
  item: AirLibraryItem;
  isPlaying: boolean;
  onStartPlayback: () => void;
  canNavigate: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function WatchStage({
  item,
  isPlaying,
  onStartPlayback,
  canNavigate,
  onPrev,
  onNext,
}: WatchStageProps) {
  const thumbnailUrl = getMediaThumbnail(item);
  const videoId =
    item.mediaType === "image" ? "" : extractYouTubeId(item.src);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      {/* Dark Cinema Stage */}
      <div className="relative flex flex-1 min-h-[380px] items-center justify-center overflow-hidden bg-[#0F1110] p-3 sm:min-h-[430px] sm:p-4 lg:min-h-[470px]">
        {/* Ambient cinema glow from active media */}
        <Image
          src={thumbnailUrl}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="pointer-events-none scale-110 object-cover opacity-25 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50"
        />

        {/* Responsive Aspect Player Container */}
        {item.mediaType === "short" ? (
          <div className="relative z-10 aspect-[9/16] h-[360px] overflow-hidden rounded-2xl bg-black shadow-elevated ring-1 ring-white/15 sm:h-[410px] lg:h-[440px]">
            {isPlaying ? (
              <iframe
                key={item.id}
                src={getYouTubeEmbedUrl(videoId, true)}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <StageFacade
                thumbnailUrl={thumbnailUrl}
                title={item.title}
                onPlay={onStartPlayback}
              />
            )}
          </div>
        ) : (
          <div className="relative z-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-elevated ring-1 ring-white/15">
            {item.mediaType === "image" ? (
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 95vw, 60vw"
                className="object-contain"
              />
            ) : isPlaying ? (
              <iframe
                key={item.id}
                src={getYouTubeEmbedUrl(videoId, true)}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <StageFacade
                thumbnailUrl={thumbnailUrl}
                title={item.title}
                onPlay={onStartPlayback}
              />
            )}
          </div>
        )}
      </div>

      {/* Watch Info Bar — Category + Prev/Next Arrows + Title */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {item.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canNavigate}
              aria-label="Play previous item in queue"
              className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-brand-green/40 hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNavigate}
              aria-label="Play next item in queue"
              className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-brand-green/40 hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <h2 className="mt-2.5 font-heading text-lg font-bold leading-snug tracking-[-0.015em] text-[#0A0A0A] sm:text-xl">
          {item.title}
        </h2>
      </div>
    </div>
  );
}

function StageFacade({
  thumbnailUrl,
  title,
  onPlay,
}: {
  thumbnailUrl: string;
  title: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${title} with audio`}
      className="group relative flex h-full w-full cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        priority
        sizes="(max-width: 640px) 260px, 320px"
        className="object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35 transition-opacity duration-300 group-hover:opacity-85"
      />

      {/* Centered O2Cure Play Button */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-green text-white shadow-elevated ring-4 ring-white/20 transition-transform duration-300 ease-premium group-hover:scale-110 group-hover:bg-brand-green-hover">
          <Play className="ml-1 size-7 fill-current" aria-hidden />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
          <Volume2 className="size-3.5 text-brand-green" aria-hidden />
          Click to play with audio
        </span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// "Up Next" Queue Sidebar (YouTube Watch-Page Playlist Panel)
// ─────────────────────────────────────────────────────────────────────────────
interface UpNextQueueProps {
  items: AirLibraryItem[];
  activeIndex: number;
  activeItemId: string;
  isPlaying: boolean;
  onSelect: (id: string) => void;
}

function UpNextQueue({
  items,
  activeIndex,
  activeItemId,
  isPlaying,
  onSelect,
}: UpNextQueueProps) {
  const maxStart = Math.max(0, items.length - MAX_QUEUE_VISIBLE);
  const windowStart = Math.min(Math.max(0, activeIndex - 1), maxStart);
  const visibleItems = items.slice(windowStart, windowStart + MAX_QUEUE_VISIBLE);

  return (
    <aside
      aria-label="Up Next media queue"
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft"
    >
      {/* Queue Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[#FAFAF9] px-5 py-3.5">
        <div>
          <h3 className="font-heading text-base font-bold text-[#0A0A0A]">
            Up Next in Queue
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Click any video to play on stage
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-bold tabular-nums text-accent-foreground">
          {items.length} {items.length === 1 ? "video" : "videos"}
        </span>
      </div>

      {/* Queue List (6-video window aligned with Watch Stage) */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        {visibleItems.map((item, idx) => {
          const isActive = item.id === activeItemId;
          const thumbUrl = getMediaThumbnail(item);
          const isShort = item.mediaType === "short";
          const displayNumber = windowStart + idx + 1;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={[
                "group flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
                isActive
                  ? "bg-accent/70 ring-1 ring-brand-green/40 shadow-xs"
                  : "hover:bg-background",
              ].join(" ")}
            >
              {/* Index / Playing Indicator */}
              <div className="flex w-6 shrink-0 items-center justify-center">
                {isActive ? (
                  <span
                    className="flex size-5 items-center justify-center rounded-full bg-brand-green text-white"
                    aria-label={isPlaying ? "Currently playing" : "Selected"}
                  >
                    <Play className="ml-0.5 size-2.5 fill-current" aria-hidden />
                  </span>
                ) : (
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground group-hover:text-foreground">
                    {String(displayNumber).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Thumbnail */}
              <div
                className={[
                  "relative shrink-0 overflow-hidden rounded-xl bg-[#141414] ring-1 ring-black/10",
                  isShort ? "h-[70px] w-12" : "h-14 w-24",
                ].join(" ")}
              >
                <Image
                  src={thumbUrl}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="96px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isActive ? (
                  <span className="absolute inset-x-1 bottom-1 rounded bg-brand-green/95 py-0.5 text-center text-[0.52rem] font-bold tracking-wider text-white uppercase">
                    {isPlaying ? "Playing" : "On Stage"}
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <span className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#0A0A0A]">
                      <Play className="ml-0.5 size-3 fill-current" />
                    </span>
                  </span>
                )}
              </div>

              {/* Text Metadata */}
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-semibold tracking-wider text-brand-green uppercase">
                  {item.category}
                </p>
                <p
                  className={[
                    "mt-0.5 line-clamp-2 text-sm font-semibold leading-snug",
                    isActive
                      ? "text-[#0A0A0A]"
                      : "text-foreground group-hover:text-brand-green",
                  ].join(" ")}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {item.speaker ?? "O₂Cure"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Browse Full Archive Grid
// ─────────────────────────────────────────────────────────────────────────────
interface ArchiveGridProps {
  items: AirLibraryItem[];
  activeItemId: string;
  onSelectAndScroll: (id: string) => void;
}

function ArchiveGrid({
  items,
  activeItemId,
  onSelectAndScroll,
}: ArchiveGridProps) {
  return (
    <section
      aria-labelledby="air-library-archive-heading"
      className="mt-16 sm:mt-20"
    >
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-green/35" />
            <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green uppercase">
              Organised Media Grid
            </span>
          </div>
          <h2
            id="air-library-archive-heading"
            className="font-heading text-[clamp(1.5rem,1.2rem+1.6vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0A0A0A]"
          >
            Browse Full Archive
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Select any card below to load and play it in the watch theater above.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          const thumbUrl = getMediaThumbnail(item);
          const isShort = item.mediaType === "short";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectAndScroll(item.id)}
              className={[
                "group flex flex-col overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
                isActive
                  ? "border-brand-green ring-2 ring-brand-green/25 shadow-soft"
                  : "border-border hover:-translate-y-0.5 hover:border-brand-green/35 hover:shadow-soft",
              ].join(" ")}
            >
              {/* Thumbnail */}
              <div
                className={[
                  "relative w-full overflow-hidden bg-[#141414]",
                  isShort ? "aspect-[9/14]" : "aspect-video",
                ].join(" ")}
              >
                <Image
                  src={thumbUrl}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                />

                {/* Active or Play Badge */}
                <span
                  aria-hidden
                  className={[
                    "absolute bottom-2.5 right-2.5 flex size-9 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-110",
                    isActive
                      ? "bg-brand-green text-white"
                      : "bg-white/95 text-[#0A0A0A] group-hover:bg-brand-green group-hover:text-white",
                  ].join(" ")}
                >
                  <Play className="ml-0.5 size-4 fill-current" />
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-3.5">
                <span className="text-[0.65rem] font-semibold tracking-wider text-brand-green uppercase">
                  {item.category}
                </span>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#0A0A0A] group-hover:text-brand-green">
                  {item.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom CTA Banner — matches ClienteleCTA
// ─────────────────────────────────────────────────────────────────────────────
function AirLibraryCTA() {
  return (
    <section
      className="bg-background pt-16 pb-24 sm:pt-20 sm:pb-28"
      aria-labelledby="air-library-cta-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-white p-8 sm:p-12 lg:p-14">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-brand-green/35" />
                <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green uppercase">
                  See It In Your Space
                </span>
              </div>
              <h2
                id="air-library-cta-heading"
                className="font-heading text-[clamp(1.65rem,1.3rem+1.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#0A0A0A]"
              >
                Want an Un-Scripted Air Audit for Your Home or Workplace?
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-muted-foreground">
                Our engineering team measures real-time PM2.5, CO₂, VOCs, and
                airflow across homes, offices, gyms, and commercial campuses.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
                <a
                  href="https://www.youtube.com/channel/UC8vNYiYmzdapnOIflSIELtA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-brand-green"
                >
                  <span>O₂Cure on YouTube</span>
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                <span aria-hidden className="text-border">
                  •
                </span>
                <a
                  href="https://www.instagram.com/theairvenger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-brand-green"
                >
                  <span>@theairvenger on Instagram</span>
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-green px-8 text-[0.875rem] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(58,125,42,0.4)] transition-all duration-300 hover:bg-brand-green-hover hover:shadow-[0_6px_28px_-4px_rgba(58,125,42,0.5)]"
              >
                Book an Air Audit
              </Link>
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-[0.875rem] font-semibold text-foreground transition-all duration-300 hover:border-brand-green/40 hover:text-brand-green"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root Page Component
// ─────────────────────────────────────────────────────────────────────────────
export function AirLibraryPage() {
  const prefersReducedMotion = useReducedMotion();
  const [mediaType, setMediaType] = useState<MediaTypeFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemId, setActiveItemId] = useState<string>(
    AIR_LIBRARY_ITEMS[0]?.id ?? "",
  );
  // Zero-load initial state: iframe mounts only after user interaction
  const [isPlaying, setIsPlaying] = useState(false);

  const playerSectionRef = useRef<HTMLDivElement>(null);

  const mediaTypeCounts = useMemo(() => {
    const counts: Record<MediaTypeFilter, number> = {
      all: AIR_LIBRARY_ITEMS.length,
      short: 0,
      video: 0,
      image: 0,
    };
    for (const item of AIR_LIBRARY_ITEMS) {
      counts[item.mediaType] += 1;
    }
    return counts;
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      All: 0,
      "Air Audits": 0,
      "Office & Commercial": 0,
      "Home & Lifestyle": 0,
      "Air Science & AQI": 0,
      "Installations & Gallery": 0,
    };
    const itemsForType =
      mediaType === "all"
        ? AIR_LIBRARY_ITEMS
        : AIR_LIBRARY_ITEMS.filter((item) => item.mediaType === mediaType);

    counts.All = itemsForType.length;
    for (const item of itemsForType) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, [mediaType]);

  const availableCategories = useMemo(
    () =>
      AIR_LIBRARY_CATEGORIES.filter(
        (cat) => cat === "All" || (categoryCounts[cat] ?? 0) > 0,
      ),
    [categoryCounts],
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return AIR_LIBRARY_ITEMS.filter((item) => {
      if (mediaType !== "all" && item.mediaType !== mediaType) return false;
      if (category !== "All" && item.category !== category) return false;
      if (!query) return true;

      const haystack = [
        item.title,
        item.description ?? "",
        item.category,
        item.speaker ?? "",
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [mediaType, category, searchQuery]);

  // Keep activeItem synced cleanly with the active filter results
  const activeIndex = useMemo(() => {
    if (filteredItems.length === 0) return -1;
    const found = filteredItems.findIndex((item) => item.id === activeItemId);
    return found >= 0 ? found : 0;
  }, [filteredItems, activeItemId]);

  const activeItem = activeIndex >= 0 ? filteredItems[activeIndex] : null;

  const handleSelectQueueItem = useCallback((id: string) => {
    setActiveItemId(id);
    setIsPlaying(true);
  }, []);

  const handleSelectFromGrid = useCallback(
    (id: string) => {
      setActiveItemId(id);
      setIsPlaying(true);
      playerSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [prefersReducedMotion],
  );

  const handlePrev = useCallback(() => {
    if (filteredItems.length <= 1) return;
    const prevIdx =
      activeIndex <= 0 ? filteredItems.length - 1 : activeIndex - 1;
    setActiveItemId(filteredItems[prevIdx].id);
    setIsPlaying(true);
  }, [filteredItems, activeIndex]);

  const handleNext = useCallback(() => {
    if (filteredItems.length <= 1) return;
    const nextIdx =
      activeIndex >= filteredItems.length - 1 ? 0 : activeIndex + 1;
    setActiveItemId(filteredItems[nextIdx].id);
    setIsPlaying(true);
  }, [filteredItems, activeIndex]);

  const handleResetFilters = useCallback(() => {
    setMediaType("all");
    setCategory("All");
    setSearchQuery("");
  }, []);

  const handleMediaTypeChange = useCallback((nextType: MediaTypeFilter) => {
    setMediaType(nextType);
    setCategory("All");
  }, []);

  return (
    <main className="bg-background">
      <h1 className="sr-only">The Air Library</h1>

      <section
        id="air-library-player"
        ref={playerSectionRef}
        aria-label="Media watch theater and archive"
        className="scroll-mt-24 mx-auto max-w-7xl px-5 pt-20 pb-4 sm:px-8 sm:pt-24 lg:px-12"
      >
        <FilterControls
          mediaType={mediaType}
          onMediaTypeChange={handleMediaTypeChange}
          category={category}
          onCategoryChange={setCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mediaTypeCounts={mediaTypeCounts}
          categoryCounts={categoryCounts}
          availableCategories={availableCategories}
        />

        {activeItem ? (
          <>
            {/* YouTube-Style Watch Theater + Up Next Queue */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
              <div className="lg:col-span-7 xl:col-span-8">
                <WatchStage
                  item={activeItem}
                  isPlaying={isPlaying}
                  onStartPlayback={() => setIsPlaying(true)}
                  canNavigate={filteredItems.length > 1}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              </div>

              <div className="lg:col-span-5 xl:col-span-4">
                <UpNextQueue
                  items={filteredItems}
                  activeIndex={activeIndex}
                  activeItemId={activeItem.id}
                  isPlaying={isPlaying}
                  onSelect={handleSelectQueueItem}
                />
              </div>
            </div>

            {/* Organised Media Grid */}
            <ArchiveGrid
              items={filteredItems}
              activeItemId={activeItem.id}
              onSelectAndScroll={handleSelectFromGrid}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-white px-6 py-20 text-center shadow-soft">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-brand-green">
              <Sparkles className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-heading text-xl font-bold text-[#0A0A0A]">
              No matching media found
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Try clearing your search term or switching back to all categories
              to view the full O₂Cure Air Library.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      <AirLibraryCTA />
      <FooterSection />
    </main>
  );
}
