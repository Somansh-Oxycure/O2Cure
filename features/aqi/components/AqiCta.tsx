"use client";

interface AqiCtaProps {
  /** 0→1 scroll progress */
  progress: number;
  href?: string;
}

/**
 * Resolution CTA — the earned finale of the purification journey.
 *
 * Appears only after progress > 0.82. Consists of:
 *  - A small "✓" success motif
 *  - A compelling action link
 *
 * This component owns NO opacity logic — the parent wrapper handles it,
 * so this component is always fully rendered at full opacity when visible.
 */
export function AqiCta({ href = "#technology" }: AqiCtaProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Success checkmark motif */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "oklch(0.96 0.04 155 / 0.9)",
            border: "1.5px solid oklch(0.58 0.16 152 / 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5.2l2 2 4-4"
              stroke="oklch(0.40 0.16 152)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "oklch(0.35 0.14 152 / 0.9)",
          }}
        >
          Purification Complete
        </span>
      </div>

      {/* CTA button */}
      <a
        href={href}
        id="aqi-cta-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 22px",
          borderRadius: "9999px",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "oklch(0.28 0.14 152)",
          background: "oklch(0.94 0.05 152 / 0.9)",
          border: "1.5px solid oklch(0.58 0.14 152 / 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          textDecoration: "none",
          transition: "background 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
          boxShadow: "0 4px 20px oklch(0.50 0.14 152 / 0.15)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "oklch(0.90 0.07 152 / 0.95)";
          el.style.borderColor = "oklch(0.52 0.16 152 / 0.65)";
          el.style.transform = "translateY(-1px)";
          el.style.boxShadow = "0 6px 24px oklch(0.50 0.14 152 / 0.25)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "oklch(0.94 0.05 152 / 0.9)";
          el.style.borderColor = "oklch(0.58 0.14 152 / 0.4)";
          el.style.transform = "translateY(0px)";
          el.style.boxShadow = "0 4px 20px oklch(0.50 0.14 152 / 0.15)";
        }}
      >
        Discover the technology behind this
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
