# 04_SOLUTIONS_BLUEPRINT.md
**Version:** 1.2 (Light & Pure Edition)
**Purpose:** Architecture and interaction logic for the O2Cure Custom Solutions page.
**Core Philosophy:** 100% Lead Generation. The visual tone must be exceptionally light, optimistic, and breathable. It should evoke the feeling of a sunlit, pure environment. ZERO dark backgrounds.

---

## 1. Global Page Architecture & Color Palette

### 1.1 The "Pure Air" Canvas
* **Global Background:** The entire page must rest on a pristine, breathable `Off-White (#F5F5F4)` or `Pure White (#FFFFFF)`. 
* **Shadows:** Do not use harsh black drop-shadows. Use extremely soft, diffused, large-spread shadows (e.g., `rgba(43, 108, 176, 0.08)`) to make cards feel like they are floating gently on a breeze.

### 1.2 The Top Navigation (Environment Sectors)
* **Style:** Clean, typographic tabs using `Plus Jakarta Sans`. 
* **Active State:** A soft, optimistic `O2 Green (#3A7D2A)` text color with a gentle underline. Inactive tabs should be a warm, readable gray (`#6B7280`).
* **Categories:**
    * Corporate & Office Workspaces
    * Healthcare & Clinical
    * Residential & Modern Indian Architecture
    * Mobility & Transport

### 1.3 The Diagnostic Console (Filters)
* **Desktop:** Fixed left-hand sidebar. Feels like a modern, friendly health app.
* **Mobile (Option B):** A sleek, horizontal scrolling pill-menu pinned just below the tabs. 
* **Pill Styling:** White background, thin soft-gray border. When selected, the pill fills with a very soft, pale mint green background and dark green text.

---

## 2. The Main Canvas (Solution Display)

When a user selects an environment and adjusts filters, the Main Canvas smoothly updates (600ms `cubic-bezier(0.16, 1, 0.3, 1)` soft fade) to display the recommended system.

### 2.1 Visual Asset (The "Sunlit" Render)
* **The Look:** The primary image must be rendered on a pure white or softly sunlit background. If showing a room, it should be a bright, daylight-filled space with sheer curtains or smooth white walls.
* **Airflow Visualization:** If visualizing the TriCure™ clean air, use soft cyan and white glowing waves—like a fresh, cool breeze. No aggressive or dark smoke.

### 2.2 The Live Capacity Calculator (Interactive Element)
* **UI:** A sleek, friendly slider input. The \"track\" of the slider should be a soft, happy green when filled.
* **Output Display:** Crisp, dark text on a pure white card. 
* **Text Example:** "For 2,500 Sq. Ft. of pristine, breathable air → Requires 1x REME HALO® HVAC Integration."

### 2.3 Scientific Metadata Badges
* **Style:** Pill-shaped badges with soft, pale-blue or pale-green backgrounds (`#E6F0E9` or similar) and crisp, dark text. This keeps the data looking highly scientific but approachable and light.
* **Content:** e.g., `[ NABL TESTED ]`, `[ ZERO OZONE ]`, `[ 99.9% MICROBIAL CONTAINMENT ]`.

### 2.4 The Conversion Anchor (CTA)
* **Rule:** NO "Buy Now", NO "Add to Cart".
* **Primary Button:** `Request Engineering Consultation` or `Speak with an Air Expert`.
* **Button Style:** Solid `O2 Green (#3A7D2A)` with pure white text. It should look inviting, with a soft hover effect that slightly lifts the button rather than making it darker.

---

## 3. Data Structure (Pre-Sanity CMS Schema)

```typescript
// mockSolutionsData.ts
export const solutionsData = [
  {
    id: "reme-halo-01",
    systemName: "REME Halo® In-Duct HVAC Purifier",
    environmentTarget: ["Corporate", "Healthcare"],
    integrationType: "In-Duct Central HVAC",
    capacityMaxCFM: 6500, 
    badges: ["Advanced Oxidation Plasma", "Dual Ionizers", "NABL Tested"],
    imageAsset: "/images/solutions/reme-halo-bright-render.webp",
    ctaText: "Request Engineering Consultation"
  },
  {
    id: "plug-n-play-02",
    systemName: "Plug & Play MAX Standalone",
    environmentTarget: ["Residential", "Corporate"],
    integrationType: "Ductless/Standalone",
    capacityMaxSqFt: 1000, 
    badges: ["PHI-Cell® Technology", "Zero Installation"],
    imageAsset: "/images/solutions/plug-play-sunlit-room.webp",
    ctaText: "Speak to an Air Expert"
  }
];