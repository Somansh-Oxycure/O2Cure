# O2Cure AI Agent Blueprint: /residential Page

## 1. Page Strategy & Core Intent
* **Primary Objective:** Convert residential visitors into qualified leads through an interactive, diagnostic assessment. We are providing architectural immunity, not off-the-shelf commodities.
* **Aesthetic Direction (Strict):** Light & Pure Edition. Use soft whites, gentle morning-sky blues, and crisp greens to evoke a sunlit room with fresh air. Absolutely NO dark mode.
* **Philosophy:** Show, don't tell. Do not sell "appliances"—deliver custom spatial air purity tailored to the home.

---

## 2. Page Structure & Component Hierarchy

### Section 1: Minimalist Hero (The Hook)
* **Visual:** A bright, sunlit modern interior cutaway showing invisible clean airflow dynamics.
* **Typography:** Large headings, elegant, with very little body copy (maximum 2-3 lines).
  * *Example Headline:* "Pure Air, Engineered for Your Sanctuary."
* **Primary CTA:** "Begin Home Air Diagnosis" (Smooth-scrolls down to Section 2). Button should invite exploration.

---

### Section 2: Interactive Diagnostic Engine (The Core Lead Tool)
Do not build a standard contact form. Structure this as a 3-Step Architectural Air Diagnostic Tool.

#### Step 1: Threat Vectors (What are you experiencing?)
* **UI Element:** Visual selection cards (Clean Icons + Minimal typography). Cards should breathe with strong hierarchy.
* **Options:**
  * External PM2.5 / Smog
  * Persistent Odors & VOCs
  * Dust, Allergens & Pollen
  * Microbial Concerns / Respiratory Sensitivity

#### Step 2: Spatial Blueprint (Where is this occurring?)
* **UI Element:** Interactive architectural layout chips.
* **Options:**
  * Independent Villa / Bungalow
  * Apartment / High-rise Flat
  * Single Dedicated Zone (Master Bedroom, Home Office)
  * Full-Home HVAC / Central Air Integration

#### Step 3: Occupancy & Air Volume (Scale)
* **UI Element:** Dual-control interactive slider.
  * **Control A:** Carpet Area / Square Footage (or Cubic Volume).
  * **Control B:** Resident / Family Occupancy Count.

---

### Section 3: Diagnostic Results & Lead Capture (The Pivot)
Dynamically reveal their Custom Air Purification Recommendation based on the sliders and chips.

#### Dynamic Result Cards
* **Visuals:** Architectural cutaways showing invisible ductwork and active clean-air integration.
* **Data Hierarchy:** Show Hard scientific metadata badges (e.g., Target CFM Range, NABL Tested, TriCure™ pillars).
* **Nomenclature:** Never use "Add to Cart" or "Buy Now". Use frictionless exploration alternatives like "Consult an Engineer" or "Request Technical Specs".

#### High-Intent Lead Form (The Final Step)
Positioned directly alongside or beneath the recommendation card:
* **Inputs:** Name, Phone Number / WhatsApp, City / Area Code.
* **CTA Button:** "Request Custom Home Plan" or "Consult an Air Engineer".
* **Micro-copy:** "An O2Cure Environmental Specialist will review your spatial parameters and provide a tailored system layout."

---

### Section 4: Validation & Peace of Mind (Social Proof)
* **Content:** 2–3 minimalist quote cards from residential clients or architects. Use believable generic copy for placeholders.
* **Data Badges:** Subtle, clean badges showing third-party lab certifications and safety standards.

---

## 3. Mobile Execution Rules (Strict)
1. **Stacking Flow:** Hero $\rightarrow$ Horizontal Pill Filters for Diagnostics $\rightarrow$ Live Capacity Slider $\rightarrow$ Recommendation Card $\rightarrow$ Lead Form.
2. **Sticky CTA:** Once the user scrolls past the hero, the "Request Consultation" CTA becomes a sticky bottom bar floating on a semi-transparent white frosted-glass backdrop (backdrop-blur).

---

## 4. Master AI Execution Prompt
*Copy and paste this into your AI Agent to generate the page:*

> "Read @06_RESIDENTIAL_BLUEPRINT.md and ensure you are strictly adhering to the global design philosophies in @05_AI_AGENT_INSTRUCTIONS.md. We are building the new lead-focused /residential page. 
> 
> Critical Execution Rules:
> 1. Aesthetic: Strictly enforce the 'Light & Pure' aesthetic rules. Use soft off-whites, gentle morning-sky blues, and pure whites. Absolutely no dark mode.
> 2. Core Feature: Build the 3-Step Interactive Diagnostic Engine (Threat Vectors -> Spatial Layout -> Sq Ft / Occupancy Sliders).
> 3. Lead Focus: Attach a high-converting lead form directly to the diagnostic output. Strip out ALL e-commerce elements (no cart, no buy now). Use CTAs like 'Consult an Air Engineer'.
> 4. Mobile UI: Implement horizontal scrolling pill-menus for the diagnostic filters on mobile.
> 5. Placeholder Data: Assume Sanity CMS later. Map the UI cards to a mock JSON structure for now.
> 
> Generate the React/Next.js components using Tailwind CSS now."