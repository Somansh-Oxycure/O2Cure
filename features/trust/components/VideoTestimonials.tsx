import { useState, useEffect, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const videoTestimonials = [
  {
    id: "yVhKtdQ8gIs",
    title: "Field Performance Review",
    speaker: "Ms. Veena Chowdhary",
    credentials: [
      "Reliance Chair Professor",
      "IIT Delhi (Rtd.)",
      "Visiting Professor, IIT Roorkee",
    ],
  },
  {
    id: "gcMmTL5UXIc",
    title: "O2Cure Products & Related Technology Review",
    speaker: "Mr. Sachin Panwar",
    credentials: ["Speaking on O2Cure products and related technology"],
  },
  {
    id: "Amnkbw1CeE8",
    title: "HVAC Consultants Review",
    speaker: "Mr. Rajiv Prabhakar",
    credentials: ["Director, Panasea Consultants", "HVAC Consultants"],
  },
  {
    id: "eETcvKTcdqc",
    title: "Dyna Aircon Chairman Review",
    speaker: "Mr. Rakesh Wadhwa",
    credentials: [
      "Chairman, Dyna Aircon",
      "Former President of ISHREA & ASHREA",
    ],
  },
  {
    id: "uB-rBnOLugg",
    title: "Indoor Air Quality Expert Review",
    speaker: "Mr. Tushar Kalra",
    credentials: ["Founder, Air Exchange", "Indoor Air Quality Expert"],
  },
  {
    id: "xvSR-0DEAQM",
    title: "PHI-Cell®️ Technology Review",
    speaker: "PHI-Cell®️ Technology",
    credentials: [
      "Mitigate the effect of pollutants including coronavirus",
    ],
  },
];

export function VideoTestimonials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Determine responsive visible cards count client-side
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, videoTestimonials.length - visibleCount);

  // Keep currentIndex in bounds if visibleCount changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    if (maxIndex <= 0) return;
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay functionality - pauses when hovered or when a video is active
  useEffect(() => {
    if (isHovered || activeVideoId !== null || maxIndex <= 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, activeVideoId, maxIndex, handleNext]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 150, damping: 22 };

  return (
    <div
      className="relative w-full py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Wrapper */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-12">
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={transition}
          >
            {videoTestimonials.map((video) => {
              // Extract base video ID for YouTube URLs (stripping the _dup suffix if present)
              const baseVideoId = video.id.split("_")[0];
              const isActive = activeVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="shrink-0 px-3 flex flex-col gap-4 font-sans"
                  style={{
                    width: `${100 / visibleCount}%`,
                  }}
                >
                  {/* Video Façade */}
                  <div
                    className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-muted shadow-soft transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
                    onClick={() => setActiveVideoId(video.id)}
                  >
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="iframe"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute inset-0 h-full w-full bg-black"
                        >
                          <iframe
                            src={`https://www.youtube.com/embed/${baseVideoId}?autoplay=1`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full border-0"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="thumbnail"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute inset-0 h-full w-full"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://img.youtube.com/vi/${baseVideoId}/hqdefault.jpg`}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110">
                              <Play
                                className="ml-1 h-5 w-5 text-[#1C1C1C]"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <p className="font-heading text-lg font-semibold text-[#1C1C1C]">
                      {video.speaker}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {video.credentials.map((cred, i) => (
                        <span
                          key={i}
                          className="text-[9pt] font-medium tracking-[+0.05em] text-[#6B7280]"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-green hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous video testimonial"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/40 bg-white/90 backdrop-blur-sm text-foreground/75 shadow-sm transition-all hover:bg-white hover:text-brand-green hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next video testimonial"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Indicators */}
      {maxIndex > 0 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                ? "w-6 bg-brand-green"
                : "w-2 bg-border/80 hover:bg-border"
                }`}
              aria-label={`Go to video slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
