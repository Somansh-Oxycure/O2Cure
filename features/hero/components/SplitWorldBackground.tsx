/**
 * "Breath Divide" — 80/20 asymmetric canvas.
 *
 * Base: crisp off-white (#F5F5F4) across the entire hero.
 * Right edge (far 20–30%): a very wide, seamless linear gradient mask
 *   fading from transparent into a soft amber/tobacco haze.
 * No hard panel cuts. No dark backgrounds. The transition is imperceptible
 * until the eye reaches the rightmost 25% — then a gentle warm tint signals
 * the polluted world without ever breaking the premium, airy feel.
 */
export function SplitWorldBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#F5F5F4]">

      {/* ── RIGHT EDGE HAZE: Soft amber tobacco gradient ─────────────────
          Starts completely transparent at 65% viewport width, transitions
          into a light, warm amber tone at the far right edge.
          The blend zone spans ~35% of the viewport — very gradual.         */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, transparent 62%, rgba(210, 160, 90, 0.10) 75%, rgba(195, 140, 70, 0.18) 85%, rgba(180, 120, 55, 0.26) 100%)",
        }}
      />

      {/* ── SECONDARY WARM DEPTH: Radial amber pool at bottom-right ─────
          A gentle elliptical warm glow at the bottom-right corner to
          anchor the haze and give it atmospheric depth.                    */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 40% at 92% 95%, rgba(205, 150, 75, 0.20) 0%, rgba(190, 130, 60, 0.10) 45%, transparent 72%)",
        }}
      />

      {/* ── MID HAZE BAND: Faint warm atmosphere at right mid-height ────
          Mimics suspended particulate — a gentle horizontal haze band
          that fades well before the center of the viewport.               */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 30% 28% at 88% 52%, rgba(190, 140, 70, 0.12) 0%, rgba(175, 125, 60, 0.05) 50%, transparent 75%)",
        }}
      />

      {/* ── LEFT SIDE BREATH: Ultra-subtle cool teal mist ───────────────
          Barely perceptible — just enough to signal the clean, purified
          side without competing with the off-white canvas.               */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 36% 32% at 16% 88%, rgba(100, 195, 200, 0.10) 0%, rgba(120, 200, 210, 0.04) 55%, transparent 78%)",
        }}
      />
    </div>
  );
}
