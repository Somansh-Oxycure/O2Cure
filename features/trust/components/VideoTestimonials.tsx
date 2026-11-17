"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Add or reorder YouTube Shorts links here.
 * Paste any standard YouTube Shorts URL (e.g. "https://www.youtube.com/shorts/<id>")
 * or a plain video ID — the ID is extracted automatically.
 */
const youtubeShorts: string[] = [
  "https://www.youtube.com/shorts/fc51FZ69kkY",
  "https://www.youtube.com/shorts/PdC2_-5jLsE",
  "https://www.youtube.com/shorts/xDGBADvkqGw",
  "https://www.youtube.com/shorts/CFxbInTfEME",
  "https://www.youtube.com/shorts/CI1q_-FyEpE",
  "https://www.youtube.com/shorts/y3wwuVcxt1Y",
  "https://www.youtube.com/shorts/BRcFRQ8wJXk",
  "https://www.youtube.com/shorts/LFLdWeoLCB8",
  "https://www.youtube.com/shorts/CB6Cw3XGtJ8",
  "https://www.youtube.com/shorts/XpJwB3-vX1c",
  "https://www.youtube.com/shorts/l8dBp8_P32U",
  "https://www.youtube.com/shorts/3K4GSlzYYzs",
  "https://www.youtube.com/shorts/DEOUAd5VYyQ",
  "https://www.youtube.com/shorts/8C6UXoqgS0w",
  "https://www.youtube.com/shorts/xznfFyeAPoI",
  "https://www.youtube.com/shorts/PEZGh8rmCQ8",
  "https://www.youtube.com/shorts/P6Chct9ZFCk",
  "https://www.youtube.com/shorts/lz6XPp9JhsE",
  "https://www.youtube.com/shorts/U8Ij_MeD4Gg",
];

function extractShortId(urlOrId: string): string {
  const trimmed = urlOrId.trim();
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
}

const normalizedShorts = youtubeShorts
  .map((url, index) => ({
    id: extractShortId(url),
    url,
    label: `O2Cure Short ${index + 1}`,
  }))
  .filter((item) => Boolean(item.id));

function getPreviewEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&enablejsapi=1`;
}

function sendPlayerCommand(
  iframe: HTMLIFrameElement | null | undefined,
  func: string,
  args: unknown[] = []
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*"
  );
}

export function VideoTestimonials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const prefersReducedMotion = useReducedMotion();

  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  // Determine responsive visible vertical Shorts count client-side
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, normalizedShorts.length - visibleCount);

  // Keep currentIndex in bounds if visibleCount changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const collapseActiveShort = useCallback(() => {
    if (activeVideoId) {
      sendPlayerCommand(iframeRefs.current[activeVideoId], "mute");
    }
    setActiveVideoId(null);
  }, [activeVideoId]);

  const handleNext = useCallback(() => {
    if (maxIndex <= 0) return;
    collapseActiveShort();
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex, collapseActiveShort]);

  const handlePrev = useCallback(() => {
    if (maxIndex <= 0) return;
    collapseActiveShort();
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex, collapseActiveShort]);

  const handleDotClick = (index: number) => {
    collapseActiveShort();
    setCurrentIndex(index);
  };

  // Collapse expanded player on Escape key
  useEffect(() => {
    if (!activeVideoId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        collapseActiveShort();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideoId, collapseActiveShort]);

  const handleToggleShort = useCallback(
    (videoId: string) => {
      if (activeVideoId === videoId) {
        sendPlayerCommand(iframeRefs.current[videoId], "mute");
        setActiveVideoId(null);
        return;
      }

      if (activeVideoId) {
        sendPlayerCommand(iframeRefs.current[activeVideoId], "mute");
      }

      const targetIframe = iframeRefs.current[videoId];
      sendPlayerCommand(targetIframe, "unMute");
      sendPlayerCommand(targetIframe, "setVolume", [100]);
      sendPlayerCommand(targetIframe, "playVideo");
      setActiveVideoId(videoId);
    },
    [activeVideoId]
  );

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 150, damping: 22 };

  if (normalizedShorts.length === 0) return null;

  const activeIndex = activeVideoId
    ? normalizedShorts.findIndex((short) => short.id === activeVideoId)
    : -1;
  const isActiveInWindow =
    activeIndex >= currentIndex && activeIndex < currentIndex + visibleCount;

  const getItemWidthPercent = (index: number, isInWindow: boolean) => {
    if (!isActiveInWindow || !isInWindow) {
      return 100 / visibleCount;
    }
    if (visibleCount === 4) {
      return index === activeIndex ? 34 : 22;
    }
    if (visibleCount === 2) {
      return index === activeIndex ? 58 : 42;
    }
    return 100;
  };

  const sizeTransitionClass = prefersReducedMotion
    ? ""
    : "transition-[width,opacity,transform,box-shadow,max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div className="relative w-full py-8">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-12">
        <div className="relative overflow-hidden py-6">
          <motion.div
            className="flex items-center"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={transition}
          >
            {normalizedShorts.map((short, index) => {
              const isInWindow =
                index >= currentIndex && index < currentIndex + visibleCount;
              const isActive = isActiveInWindow && activeVideoId === short.id;
              const itemWidth = getItemWidthPercent(index, isInWindow);

              return (
                <div
                  key={short.id}
                  className={`shrink-0 px-2 sm:px-2.5 flex flex-col font-sans ${sizeTransitionClass}`}
                  style={{
                    width: `${itemWidth}%`,
                  }}
                >
                  <div
                    className={`relative mx-auto aspect-[9/16] w-full overflow-hidden rounded-2xl bg-[#141414] ${sizeTransitionClass} ${
                      isActive
                        ? "max-w-[360px] sm:max-w-none shadow-elevated ring-2 ring-brand-green/60 opacity-100"
                        : isActiveInWindow
                          ? "max-w-[300px] sm:max-w-none shadow-soft ring-1 ring-black/5 opacity-75 hover:opacity-100"
                          : "max-w-[300px] sm:max-w-none shadow-soft ring-1 ring-black/5 hover:scale-[1.02]"
                    }`}
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                      alt={short.label}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 58vw, 34vw"
                      className="object-cover opacity-75"
                    />
                    {isInWindow && (
                      <iframe
                        ref={(el) => {
                          iframeRefs.current[short.id] = el;
                        }}
                        src={getPreviewEmbedUrl(short.id)}
                        title={short.label}
                        tabIndex={-1}
                        aria-hidden="true"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="pointer-events-none absolute inset-0 h-full w-full border-0"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => handleToggleShort(short.id)}
                      aria-label={
                        isActive
                          ? `Mute and minimize ${short.label}`
                          : `Expand and play ${short.label} with sound`
                      }
                      aria-pressed={isActive}
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    />

                    {isActive && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          collapseActiveShort();
                        }}
                        aria-label={`Minimize ${short.label}`}
                        className="absolute right-2.5 top-2.5 z-20 flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md ring-1 ring-white/20 transition-colors hover:bg-white hover:text-[#1C1C1C] cursor-pointer"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-green hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous YouTube Short"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-green hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next YouTube Short"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Indicators */}
      {maxIndex > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "w-6 bg-brand-green"
                  : "w-2 bg-border/80 hover:bg-border"
              }`}
              aria-label={`Go to YouTube Shorts slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function VideoTestimonialsSection() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="relative bg-background py-3 sm:py-4"
    >
      <div className="px-5 mt-1 sm:mt-2 sm:px-8 lg:px-[clamp(2rem,5vw,4rem)]">
        <header className="mx-auto max-w-5xl text-center">
          <Reveal delay={0} distance={20}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/35" />
              <span className="text-eyebrow font-semibold tracking-[0.15em] text-brand-green">
                Founder’s Perspective
              </span>
              <span className="h-px w-10 bg-brand-green/35" />
            </div>
          </Reveal>

          <Reveal delay={0.12} distance={24}>
            <h2
              id="insights-heading"
              className="font-heading text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-bold leading-[1.1] tracking-[-0.022em] text-[#0A0A0A]"
            >
              Understanding Indoor Air with Kartik
            </h2>
          </Reveal>
        </header>

        <div>
          <VideoTestimonials />
        </div>

        <Reveal delay={0.18} distance={16}>
          <div className="mt-4 flex justify-center pb-4">
            <a
              href="https://www.instagram.com/theairvenger/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white px-6 py-2.5 text-sm font-medium text-brand-green shadow-sm transition-all hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Watch more on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
