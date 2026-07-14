"use client";

/**
 * AqiBackground — Two atmospheric layers that transition as scroll progresses.
 *
 * POLLUTED (progress=0):
 *   Heavy warm ochre haze — feels oppressive and unwell on white.
 *   A richer amber radial centre + warmer edge vignette.
 *
 * CLEAN (progress=1):
 *   Crisp sky-white with a cool blue-mint bloom at centre.
 *   Feels genuinely open and breathable.
 *
 * Light-mode only. No canvas. GPU-composited opacity only.
 */
export function AqiBackground({ progress }: { progress: number }) {
  const eased = easeInOutCubic(progress);
  const pollutedOp = 1 - eased;
  const cleanOp = eased;

  // Vignette: warm amber edge when polluted → almost gone when clean
  const vigOp = Math.max(0, 1 - eased * 0.95);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Base — always crisp white */}
      <div
        className="absolute inset-0"
        style={{ background: "#fafaf8" }}
      />

      {/* Polluted — heavy ochre radial haze */}
      <div
        className="absolute inset-0"
        style={{
          opacity: pollutedOp,
          background: `
            radial-gradient(ellipse 80% 65% at 50% 46%,
              oklch(0.86 0.10 54 / 0.62) 0%,
              oklch(0.80 0.08 48 / 0.40) 38%,
              oklch(0.90 0.04 52 / 0.15) 62%,
              transparent 78%
            ),
            radial-gradient(ellipse 100% 100% at 50% 50%,
              oklch(0.94 0.04 52 / 0.30) 0%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Clean — sky-white with cool blue-mint centre bloom */}
      <div
        className="absolute inset-0"
        style={{
          opacity: cleanOp,
          background: `
            radial-gradient(ellipse 70% 56% at 50% 44%,
              oklch(0.97 0.04 210 / 0.55) 0%,
              oklch(0.95 0.03 215 / 0.32) 42%,
              oklch(0.98 0.01 220 / 0.12) 66%,
              transparent 80%
            ),
            radial-gradient(ellipse 100% 100% at 50% 50%,
              oklch(0.97 0.02 205 / 0.20) 0%,
              transparent 85%
            )
          `,
        }}
      />

      {/* Warm vignette — amber rim, polluted only */}
      <div
        className="absolute inset-0"
        style={{
          opacity: vigOp,
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, oklch(0.80 0.07 50 / 0.18) 100%)",
        }}
      />

      {/* Noise film — very faint, always present */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.016,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}

/** Smoother cubic ease for a more deliberate atmospheric cross-fade */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
