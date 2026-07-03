/**
 * Both halves stay white — atmosphere comes from particle mist, not panel tint.
 */
export function SplitWorldBackground() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[#FFFFFF]">
      {/* Soft clean mist glow — left, emanating from purifier zone.
          Painted full-bleed so the ellipse fully fades to transparent
          before any container edge (no hard clipped seam). */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 39% 39% at 40% 92%, rgba(120, 210, 185, 0.22) 0%, rgba(180, 230, 215, 0.08) 45%, transparent 72%)",
        }}
      />
      {/* Warm pollution mist glow — right, drifting toward purifier.
          Full-bleed for the same reason — the fade completes on-canvas
          so there is no sharp, off-centre vertical edge. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 38% 36% at 58% 93%, rgba(210, 155, 90, 0.18) 0%, rgba(195, 130, 75, 0.1) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
