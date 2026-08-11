const fs = require('fs');

const fileContent = fs.readFileSync('c:\\Users\\Somansh\\Desktop\\New folder\\O2Cure\\features\\solutions\\data\\productCatalog.ts', 'utf8');

// We will do string replacements or AST parsing. String replacement for systemName is easy because it looks like:
// systemName: "...",
// Wait, we can just use regex.

let newContent = fileContent;

const updates = [
  { old: `"Air Pollution Control Device (APCD)"`, new: `"Air Pollution Control Device (APCD)"` },
  { old: `"Bipolar FC-3 Air Ionizer"`, new: `"Cassette/Split AC purifier"` },
  { old: `"Car Air Purifier — HEPA + UV LED"`, new: `"Car Air Purifier — HEPA + UV LED"` },
  { old: `"CI-2 Air Ionizer"`, new: `"Cassette/Split AC purifier"` },
  { old: `"DM-48 Duct Mounted NPBI™"`, new: `"Induct bipolar air purifier"` },
  { old: `"DEAC Ductable Electronic Air Cleaner"`, new: `"Air purifier for Ductable ACs"` },
  { old: `"EAC Electronic Air Cleaner"`, new: `"Air purifier for commercial ACs"` },
  { old: `"Fresh Air Energy Recovery Ventilator"`, new: `"6 layer Fresh air purifier"` },
  { old: `"Guardian Air+ In-Duct"`, new: `"guardian air + active purifier"` },
  { old: `"MEAC GxMEAC Air Cleaner"`, new: `"Air purifier for Ductable ACs"` },
  { old: `"O2 Cure Elixir — Purifier + Humidifier"`, new: `"6 layer purifier with humidifier"` },
  { old: `"O2 Cure Hulk — Purifier + Humidifier"`, new: `"6 layer purifier with humidifier"` },
  { old: `"O2 Cure Hybrid Air Purifier"`, new: `"New name to be discussed"` },
  { old: `"O2 Cure REME LED Portable"`, new: `"Travel buddy purifier"` },
  { old: `"O2Cure Kitchen Exhaust Dry Scrubber"`, new: `"Kitchen exhaust scrubber"` },
  { old: `"O2Cure Max Cure Fresh Air Unit"`, new: `"MaxCure unit"` },
  { old: `"O2Cure Molecular Filtration Unit"`, new: `"Gas filtration unit"` },
  { old: `"O2Cure Plug & Play Air Purifier"`, new: `"O₂Cure Plug & Play Air Purifier"` }, // Original had O2Cure
  { old: `"O₂Cure Plug & Play Air Purifier"`, new: `"O₂Cure Plug & Play Air Purifier"` },
  { old: `"O₂Cure Plug N Play MAX — PHI + Bipolar"`, new: `"O₂Cure Plug N Play MAX — PHI + Bipolar"` },
  { old: `"O₂Cure Self-Charging Air Filter"`, new: `"MERV 10 pre filter"` },
  { old: `"O₂Cure UVGI Emitters"`, new: `"UVGI"` },
  { old: `"REME HALO by O₂Cure"`, new: `"Induct REME purifier"` },
  { old: `"REME HALO LED"`, new: `"Induct REME LED purifier"` },
  { old: `"PHI-CELL® Replacement — Plug & Play"`, new: `"PHI-CELL® Replacement — Plug & Play"` }
];

updates.forEach(u => {
  newContent = newContent.replace(new RegExp(`systemName: ${u.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), `systemName: ${u.new}`);
});

// Remove Fine Filter EU5/F5
newContent = newContent.replace(/\{\s*id: "fine-filter-eu5-f5-high-efficiency-air-filter-for-clean-rooms-hvac"[\s\S]*?challengeScores: [^\}]+\},\s*\}/g, '');

// Remove O2Cure EU4 Pre-Filters
newContent = newContent.replace(/\{\s*id: "o2cure-eu4-pre-filters-merv-7-8-efficiency-for-superior-air-quality"[\s\S]*?challengeScores: [^\}]+\},\s*\}/g, '');


const newProducts = `
  {
    id: "filter-set-hulk",
    systemName: "Filter set - hulk",
    tagline: "Replacement filter set for Hulk air purifier",
    integrationType: "standalone",
    customerType: "b2c",
    capacityMaxSqFt: 850,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases"],
    badges: ["Replacement Filter", "Hulk Compatible"],
    specs: [
      { key: "Type", value: "Consumable replacement" },
      { key: "Application", value: "B2C / Residential" },
    ],
    image: { src: "https://placehold.co/600x400/png?text=Filter+Set+Hulk", alt: "Filter set - hulk" },
    primaryCta: "Add to Basket",
    challengeScores: { particulate: 0.85, "odor-gases": 0.8 },
  },
  {
    id: "filter-set-elixir",
    systemName: "Filter set - elixir",
    tagline: "Replacement filter set for Elixir air purifier",
    integrationType: "standalone",
    customerType: "b2c",
    capacityMaxSqFt: 450,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases"],
    badges: ["Replacement Filter", "Elixir Compatible"],
    specs: [
      { key: "Type", value: "Consumable replacement" },
      { key: "Application", value: "B2C / Residential" },
    ],
    image: { src: "https://placehold.co/600x400/png?text=Filter+Set+Elixir", alt: "Filter set - elixir" },
    primaryCta: "Add to Basket",
    challengeScores: { particulate: 0.85, "odor-gases": 0.9 },
  },
  {
    id: "filter-set-max-cure",
    systemName: "Filter set- max cure",
    tagline: "Replacement filter set for Max Cure air purifier",
    integrationType: "fresh-air",
    customerType: "both",
    capacityMaxSqFt: 2500,
    environments: ["residential", "corporate"],
    challenges: ["particulate", "high-co2"],
    badges: ["Replacement Filter", "Max Cure Compatible"],
    specs: [
      { key: "Type", value: "Consumable replacement" },
      { key: "Application", value: "B2B + B2C / Fresh air" },
    ],
    image: { src: "https://placehold.co/600x400/png?text=Filter+Set+Max+Cure", alt: "Filter set- max cure" },
    primaryCta: "Add to Basket",
    challengeScores: { particulate: 0.9, "high-co2": 0.9 },
  },
  {
    id: "filter-set-hybrid",
    systemName: "Filter set - hybrid",
    tagline: "Replacement filter set for Hybrid air purifier",
    integrationType: "standalone",
    customerType: "both",
    capacityMaxSqFt: 2000,
    environments: ["residential", "corporate", "education"],
    challenges: ["particulate", "odor-gases"],
    badges: ["Replacement Filter", "Hybrid Compatible"],
    specs: [
      { key: "Type", value: "Consumable replacement" },
      { key: "Application", value: "B2C + B2B" },
    ],
    image: { src: "https://placehold.co/600x400/png?text=Filter+Set+Hybrid", alt: "Filter set - hybrid" },
    primaryCta: "Add to Basket",
    challengeScores: { particulate: 0.85, "odor-gases": 0.8 },
  },
  {
    id: "build-your-own-unit",
    systemName: "BUILD YOUR OWN UNIT",
    tagline: "Customise your air purification unit based on your needs",
    integrationType: "standalone",
    customerType: "b2c",
    capacityMaxSqFt: 1000,
    environments: ["residential"],
    challenges: ["particulate", "odor-gases", "pathogens", "high-co2"],
    badges: ["Custom", "Build Your Own"],
    specs: [
      { key: "Type", value: "Customisable Unit" },
      { key: "Application", value: "Indoor / Residential" },
    ],
    image: { src: "https://placehold.co/600x400/png?text=Build+Your+Own+Unit", alt: "BUILD YOUR OWN UNIT" },
    primaryCta: "Start Building",
    challengeScores: { particulate: 1.0, "odor-gases": 1.0, pathogens: 1.0, "high-co2": 1.0 },
  }
];`;

// Insert new products at the end of the array
newContent = newContent.replace(/];$/, newProducts + '\n];');

fs.writeFileSync('c:\\Users\\Somansh\\Desktop\\New folder\\O2Cure\\features\\solutions\\data\\productCatalog.ts', newContent, 'utf8');
console.log("Updated productCatalog.ts");
