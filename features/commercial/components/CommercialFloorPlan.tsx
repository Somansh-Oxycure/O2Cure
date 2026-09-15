"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FurnitureItem {
  id: string;
  shape: "rect" | "circle";
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
  rx?: number;
  fill?: string;
  stroke?: string;
}

interface PersonDot {
  id: string;
  x: number;
  y: number;
  r?: number;
}

interface WallLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}

interface ZoneArea {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface LayoutResult {
  furniture: FurnitureItem[];
  people: PersonDot[];
  walls: WallLine[];
  zones: ZoneArea[];
  floor?: { x: number; y: number; w: number; h: number };
}

export interface CommercialFloorPlanProps {
  spaceType: string;
  areaSqFt: number;
  threats: string[];
  isComplete: boolean;
  productImage?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const WALL = "#64748B";
const FURNITURE_FILL = "#E2E8F0";
const FURNITURE_STROKE = "#94A3B8";
const FLOOR_BG = "#F8FAFC";
const PEOPLE_COLOR = "#3B82F6";
const SCREEN_COLOR = "#1E293B";

const THREAT_COLORS: Record<string, string> = {
  "sick-building": "#FBBF24",
  "pathogens": "#F87171",
  "high-co2": "#FB923C",
  "industrial-dust": "#9CA3AF",
  "odours": "#A78BFA",
  "mould-facilities": "#34D399",
};

const AREA_CONFIG: Record<string, { min: number; max: number }> = {
  corporate: { min: 1000, max: 50000 },
  school: { min: 300, max: 2000 },
  gym: { min: 500, max: 10000 },
  cinema: { min: 1000, max: 20000 },
  mall: { min: 5000, max: 100000 },
  cafe: { min: 300, max: 5000 },
};

const SPACE_LABELS: Record<string, string> = {
  corporate: "Corporate Office",
  school: "School",
  gym: "Fitness Centre",
  cinema: "Movie Theatre",
  mall: "Shopping Centre",
  cafe: "Café",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ─── Corporate Office ─────────────────────────────────────────────────────────
function generateCorporate(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];

  // Gentle zoom and dynamic footprint bounds based on area scale
  const zoom = lerp(0.85, 0.45, scale);
  const pr = 1.3 * zoom;

  const floorW = lerp(52, 90, scale);
  const floorH = lerp(55, 90, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;

  // Helper for greenery
  const addPlant = (x: number, y: number, r: number = 2 * zoom) => {
    furniture.push({ id: `pl-${x}-${y}-1`, shape: "circle", x, y, r, fill: "#86EFAC" });
    furniture.push({ id: `pl-${x}-${y}-2`, shape: "circle", x, y, r: r * 0.6, fill: "#22C55E" });
  };

  // 1. Top Area: Cabins & Small Meeting Rooms
  const topY = fy;
  const topH = 18 * zoom;
  let currX = fx;
  let cabIdx = 0;
  
  while (currX + 16 * zoom <= fx + floorW) {
    const isMeeting = cabIdx % 3 === 2; // Every 3rd room is a meeting room
    const w = isMeeting ? 20 * zoom : 15 * zoom;
    if (currX + w > fx + floorW) break;

    // Room Walls
    walls.push(
      { id: `t-w-r-${cabIdx}`, x1: currX + w, y1: topY, x2: currX + w, y2: topY + topH },
      { id: `t-w-b-${cabIdx}`, x1: currX, y1: topY + topH, x2: currX + w, y2: topY + topH, dashed: isMeeting }
    );

    if (isMeeting) {
      furniture.push({ id: `sm-mtg-${cabIdx}`, shape: "circle", x: currX + w/2, y: topY + topH/2, r: 4 * zoom, fill: "#CBD5E1" });
      people.push({ id: `sm-p1-${cabIdx}`, x: currX + w/2 - 5*zoom, y: topY + topH/2, r: pr });
      people.push({ id: `sm-p2-${cabIdx}`, x: currX + w/2 + 5*zoom, y: topY + topH/2, r: pr });
      people.push({ id: `sm-p3-${cabIdx}`, x: currX + w/2, y: topY + topH/2 - 5*zoom, r: pr });
    } else {
      furniture.push({ id: `cab-d-${cabIdx}`, shape: "rect", x: currX + 2*zoom, y: topY + 2*zoom, w: 8*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "#E2E8F0" });
      furniture.push({ id: `cab-mon-${cabIdx}`, shape: "rect", x: currX + 4*zoom, y: topY + 2.5*zoom, w: 4*zoom, h: 1*zoom, rx: 0.2*zoom, fill: "#64748B" });
      people.push({ id: `cab-p-${cabIdx}`, x: currX + 6*zoom, y: topY + 8*zoom, r: pr });
      addPlant(currX + w - 3*zoom, topY + 3*zoom);
    }

    currX += w;
    cabIdx++;
  }

  // 2. Bottom Area: Reception, Cafe/Lounge, Boardroom
  const botH = 26 * zoom;
  const botY = fy + floorH - botH;

  // Boardroom (Right)
  const confW = 32 * zoom;
  const confX = fx + floorW - confW;
  walls.push(
    { id: "br-l", x1: confX, y1: botY, x2: confX, y2: fy + floorH },
    { id: "br-t", x1: confX, y1: botY, x2: fx + floorW, y2: botY, dashed: true }
  );
  furniture.push({ id: "br-tbl", shape: "rect", x: confX + 6*zoom, y: botY + 6*zoom, w: 20*zoom, h: 10*zoom, rx: 2*zoom, fill: "#CBD5E1" });
  const confSeats = Math.max(2, Math.round(20*zoom / (5*zoom)));
  for (let i = 0; i < confSeats; i++) {
    const sx = confX + 6*zoom + (i+0.5)*(20*zoom/confSeats);
    people.push({ id: `br-p-t-${i}`, x: sx, y: botY + 4*zoom, r: pr });
    people.push({ id: `br-p-b-${i}`, x: sx, y: botY + 18*zoom, r: pr });
  }
  addPlant(confX + 3*zoom, fy + floorH - 3*zoom, 3*zoom);

  // Reception (Left)
  const recW = 22 * zoom;
  const recX = fx;
  furniture.push({ id: "rec-desk", shape: "rect", x: recX + 3*zoom, y: botY + 8*zoom, w: 12*zoom, h: 4*zoom, rx: 1*zoom, fill: "#94A3B8" });
  people.push({ id: "rec-p", x: recX + 9*zoom, y: botY + 14*zoom, r: pr });
  furniture.push({ id: "rec-rug", shape: "rect", x: recX + 2*zoom, y: botY + 18*zoom, w: 16*zoom, h: 7*zoom, rx: 1*zoom, fill: "#F1F5F9" });
  furniture.push({ id: "rec-sofa", shape: "rect", x: recX + 4*zoom, y: botY + 19*zoom, w: 12*zoom, h: 3*zoom, rx: 1*zoom, fill: "#CBD5E1" });
  addPlant(recX + 18*zoom, botY + 22*zoom);

  // Café / Breakout Area (Middle Space to fill empty gap)
  const cafeX = recX + recW + 2 * zoom;
  const cafeW = confX - cafeX - 2 * zoom;
  if (cafeW > 15 * zoom) {
    furniture.push({ id: "cafe-rug", shape: "rect", x: cafeX, y: botY + 2*zoom, w: cafeW, h: botH - 4*zoom, rx: 2*zoom, fill: "#F8FAFC" });
    furniture.push({ id: "cafe-ctr", shape: "rect", x: cafeX + 2*zoom, y: botY + 4*zoom, w: cafeW - 4*zoom, h: 3*zoom, rx: 0.5*zoom, fill: "#E2E8F0" });
    const numCafeTbls = Math.max(1, Math.floor(cafeW / (10 * zoom)));
    for (let i = 0; i < numCafeTbls; i++) {
      const cx = cafeX + (i+0.5)*(cafeW/numCafeTbls);
      const cy = botY + 15*zoom;
      furniture.push({ id: `cafe-tbl-${i}`, shape: "circle", x: cx, y: cy, r: 2.5*zoom, fill: "#CBD5E1" });
      people.push({ id: `cafe-p1-${i}`, x: cx - 4*zoom, y: cy, r: pr });
      people.push({ id: `cafe-p2-${i}`, x: cx + 4*zoom, y: cy, r: pr });
    }
  }

  // 3. Middle Area: Open Plan (Varied Benches and Pods)
  const midY = topY + topH + 8 * zoom;
  const midMaxY = botY - 8 * zoom;
  
  let currMidY = midY;
  let rowIndex = 0;
  
  while (currMidY + 10 * zoom <= midMaxY) {
    const isPodRow = rowIndex % 2 === 1;
    
    if (isPodRow) {
      const podW = 12 * zoom;
      const podH = 12 * zoom;
      const podGap = 8 * zoom;
      let currPx = fx + 5 * zoom;
      let pIdx = 0;
      
      if (currMidY + podH <= midMaxY) {
        while (currPx + podW <= fx + floorW - 3*zoom) {
          furniture.push({ id: `pod-${rowIndex}-${pIdx}`, shape: "rect", x: currPx, y: currMidY, w: podW, h: podH, rx: 1*zoom, fill: "#F1F5F9" });
          furniture.push(
            { id: `pod-dv-${rowIndex}-${pIdx}`, shape: "rect", x: currPx + podW/2 - 0.5*zoom, y: currMidY, w: 1*zoom, h: podH, fill: "#94A3B8" },
            { id: `pod-dh-${rowIndex}-${pIdx}`, shape: "rect", x: currPx, y: currMidY + podH/2 - 0.5*zoom, w: podW, h: 1*zoom, fill: "#94A3B8" }
          );
          people.push(
            { id: `pod-p1-${rowIndex}-${pIdx}`, x: currPx + podW/4, y: currMidY - 2*zoom, r: pr },
            { id: `pod-p2-${rowIndex}-${pIdx}`, x: currPx + podW*0.75, y: currMidY - 2*zoom, r: pr },
            { id: `pod-p3-${rowIndex}-${pIdx}`, x: currPx + podW/4, y: currMidY + podH + 2*zoom, r: pr },
            { id: `pod-p4-${rowIndex}-${pIdx}`, x: currPx + podW*0.75, y: currMidY + podH + 2*zoom, r: pr }
          );
          currPx += podW + podGap;
          pIdx++;
        }
        currMidY += podH + 8 * zoom;
      } else {
        break;
      }
    } else {
      const benchH = 7 * zoom;
      const benchW = 24 * zoom;
      const benchGapX = 6 * zoom;
      let currBx = fx + 3 * zoom;
      let bIdx = 0;
      
      if (currMidY + benchH <= midMaxY) {
        while (currBx + benchW <= fx + floorW) {
          furniture.push({ id: `bch-${rowIndex}-${bIdx}`, shape: "rect", x: currBx, y: currMidY, w: benchW, h: benchH, rx: 0.5*zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
          furniture.push({ id: `bch-div-${rowIndex}-${bIdx}`, shape: "rect", x: currBx + 1*zoom, y: currMidY + benchH/2 - 0.5*zoom, w: benchW - 2*zoom, h: 1*zoom, fill: "#94A3B8" });
          
          const seats = Math.max(2, Math.round(benchW / (6*zoom)));
          const seatW = benchW / seats;
          for (let s = 0; s < seats; s++) {
            const sx = currBx + (s+0.5)*seatW;
            furniture.push(
              { id: `m-t-${rowIndex}-${bIdx}-${s}`, shape: "rect", x: sx - 1.5*zoom, y: currMidY + 1*zoom, w: 3*zoom, h: 1*zoom, rx: 0.2*zoom, fill: "#475569" },
              { id: `m-b-${rowIndex}-${bIdx}-${s}`, shape: "rect", x: sx - 1.5*zoom, y: currMidY + benchH - 2*zoom, w: 3*zoom, h: 1*zoom, rx: 0.2*zoom, fill: "#475569" }
            );
            people.push(
              { id: `bch-pt-${rowIndex}-${bIdx}-${s}`, x: sx, y: currMidY - 2*zoom, r: pr },
              { id: `bch-pb-${rowIndex}-${bIdx}-${s}`, x: sx, y: currMidY + benchH + 2*zoom, r: pr }
            );
          }
          currBx += benchW + benchGapX;
          bIdx++;
        }
        currMidY += benchH + 10 * zoom;
      } else {
        break;
      }
    }
    rowIndex++;
  }

  if (rowIndex > 1) {
    addPlant(fx + floorW - 5*zoom, midY + 4*zoom, 2.5*zoom);
    addPlant(fx + 5*zoom, midMaxY - 4*zoom, 2.5*zoom);
  }

  const zones: ZoneArea[] = [
    { minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH }
  ];

  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── School / Classroom ──────────────────────────────────────────────────────
function generateSchool(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];

  // Very gentle zoom to keep classroom items realistically sized
  const zoom = lerp(0.9, 0.75, scale);
  const pr = 1.3 * zoom;

  // A classroom floor box that scales precisely from ~20 to ~60 students
  const floorW = lerp(55, 75, scale);
  const floorH = lerp(55, 70, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;

  // Whiteboard (Top center)
  furniture.push({
    id: "whiteboard",
    shape: "rect",
    x: fx + floorW * 0.2, y: fy + 2 * zoom, w: floorW * 0.6, h: 1.5 * zoom, rx: 0.2 * zoom,
    fill: "#F1F5F9", stroke: "#64748B",
  });

  // Teacher desk (centered below whiteboard)
  furniture.push({
    id: "teacher-desk",
    shape: "rect",
    x: fx + floorW / 2 - 7 * zoom, y: fy + 6 * zoom, w: 14 * zoom, h: 4 * zoom, rx: 0.5 * zoom, fill: "#E2E8F0"
  });
  // Teacher monitor
  furniture.push({
    id: "teacher-mon",
    shape: "rect",
    x: fx + floorW / 2 - 2 * zoom, y: fy + 6.5 * zoom, w: 4 * zoom, h: 1 * zoom, rx: 0.2 * zoom, fill: "#64748B"
  });
  people.push({ id: "teacher", x: fx + floorW / 2, y: fy + 12 * zoom, r: pr });

  // Student Desks Grid (fills the rest of the room)
  const startY = fy + 18 * zoom;
  const endY = fy + floorH - 4 * zoom;
  const startX = fx + 4 * zoom;
  const endX = fx + floorW - 4 * zoom;

  const pairW = 12 * zoom; // two desks side by side
  const pairH = 4 * zoom;
  const gapX = 4 * zoom;
  const gapY = 7 * zoom;

  // Calculate dynamic columns to properly center the block in the room
  const availW = endX - startX;
  const possibleCols = Math.floor((availW + gapX) / (pairW + gapX));
  const blockW = possibleCols * pairW + (possibleCols - 1) * gapX;
  const offsetX = startX + (availW - blockW) / 2;

  let currY = startY;
  let r = 0;

  while (currY + pairH <= endY) {
    let currX = offsetX;
    let c = 0;
    while (c < possibleCols) {
      // Left desk
      furniture.push({ id: `stu-L-${r}-${c}`, shape: "rect", x: currX, y: currY, w: 5.5 * zoom, h: pairH, rx: 0.5 * zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
      people.push({ id: `p-L-${r}-${c}`, x: currX + 2.75 * zoom, y: currY + pairH + 1.8 * zoom, r: pr });

      // Right desk
      furniture.push({ id: `stu-R-${r}-${c}`, shape: "rect", x: currX + 6.5 * zoom, y: currY, w: 5.5 * zoom, h: pairH, rx: 0.5 * zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
      people.push({ id: `p-R-${r}-${c}`, x: currX + 9.25 * zoom, y: currY + pairH + 1.8 * zoom, r: pr });

      currX += pairW + gapX;
      c++;
    }
    currY += pairH + gapY;
    r++;
  }

  const zones: ZoneArea[] = [
    { minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH }
  ];

  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── Fitness Centre ──────────────────────────────────────────────────────────
function generateGym(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];
  const zones: ZoneArea[] = [];

  const zoom = lerp(1.1, 0.45, scale);
  const pr = 1.3 * zoom;

  const floorW = lerp(55, 95, scale);
  const floorH = lerp(60, 95, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;
  
  zones.push({ minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH });

  const isLarge = scale > 0.3;
  const topH = isLarge ? floorH * 0.55 : floorH - 12*zoom; 
  
  // --- 1. Cardio Zone (Top Left) ---
  const cardioW = floorW * 0.45;
  const cStartX = fx + 4*zoom;
  const cStartY = fy + 4*zoom;
  
  const tmW = 5 * zoom;
  const tmH = 9 * zoom;
  const tmGapX = 3 * zoom;
  const tmGapY = 6 * zoom;
  
  let currCx = cStartX;
  let tRow = 0;
  while (currCx + tmW <= fx + cardioW) {
    let currCy = cStartY;
    let tCol = 0;
    while (currCy + tmH <= fy + topH - 4*zoom) {
      // Treadmill base/belt
      furniture.push({ id: `tm-b-${tRow}-${tCol}`, shape: "rect", x: currCx + 0.5*zoom, y: currCy, w: tmW - 1*zoom, h: tmH, rx: 0.5*zoom, fill: "#334155" });
      // Side rails
      furniture.push({ id: `tm-rl-${tRow}-${tCol}`, shape: "rect", x: currCx, y: currCy, w: 0.8*zoom, h: tmH, rx: 0.2*zoom, fill: "#94A3B8" });
      furniture.push({ id: `tm-rr-${tRow}-${tCol}`, shape: "rect", x: currCx + tmW - 0.8*zoom, y: currCy, w: 0.8*zoom, h: tmH, rx: 0.2*zoom, fill: "#94A3B8" });
      // Front Console
      furniture.push({ id: `tm-c-${tRow}-${tCol}`, shape: "rect", x: currCx - 0.5*zoom, y: currCy, w: tmW + 1*zoom, h: 2.5*zoom, rx: 0.5*zoom, fill: "#0F172A" });
      // Blue screen
      furniture.push({ id: `tm-s-${tRow}-${tCol}`, shape: "rect", x: currCx + tmW/2 - 1*zoom, y: currCy + 0.5*zoom, w: 2*zoom, h: 1.5*zoom, rx: 0.2*zoom, fill: "#38BDF8" });
      
      people.push({ id: `tm-p-${tRow}-${tCol}`, x: currCx + tmW/2, y: currCy + 5*zoom, r: pr });
      
      currCy += tmH + tmGapY;
      tCol++;
    }
    currCx += tmW + tmGapX;
    tRow++;
  }

  // --- 2. Free Weights Zone (Top Right) ---
  const fwStartX = fx + floorW * 0.5;
  const fwW = floorW * 0.5;
  
  // Floor mat for weights (light grey to contrast floor)
  furniture.push({ id: "fw-mat", shape: "rect", x: fwStartX, y: fy, w: fwW, h: topH, rx: 0, fill: "#E2E8F0" });

  // Dumbbell rack
  const rackW = fwW - 4*zoom;
  furniture.push({ id: "db-rack", shape: "rect", x: fwStartX + 2*zoom, y: fy + 2*zoom, w: rackW, h: 2.5*zoom, rx: 0.5*zoom, fill: "#1E293B" });
  const numDb = Math.floor(rackW / (1.5*zoom));
  for(let d=0; d<numDb; d++) {
     furniture.push({ id: `db-${d}`, shape: "circle", x: fwStartX + 2*zoom + d*(1.5*zoom) + 0.75*zoom, y: fy + 3.25*zoom, r: 0.6*zoom, fill: "#94A3B8" });
  }
  
  // Benches and Barbells
  const bW = 3.5 * zoom;
  const bH = 8 * zoom;
  const bGapX = 7 * zoom;
  const bGapY = 7 * zoom;
  
  let currBcy = fy + 10*zoom;
  let bRow = 0;
  while (currBcy + bH <= fy + topH - 4*zoom) {
    let currBcx = fwStartX + 4*zoom;
    let bCol = 0;
    while (currBcx + bW + 2*zoom <= fx + floorW - 2*zoom) {
      // Bench pad (Red)
      furniture.push({ id: `wb-${bRow}-${bCol}`, shape: "rect", x: currBcx, y: currBcy, w: bW, h: bH, rx: 1*zoom, fill: "#B91C1C" });
      
      // Barbell resting at top of bench
      const barY = currBcy + 1.5*zoom;
      const barX = currBcx - 2*zoom;
      const barW = bW + 4*zoom;
      
      // The Bar
      furniture.push({ id: `bb-${bRow}-${bCol}`, shape: "rect", x: barX, y: barY, w: barW, h: 0.6*zoom, rx: 0.2*zoom, fill: "#64748B" });
      // Weight Plates (Left)
      furniture.push({ id: `bb-pl1-${bRow}-${bCol}`, shape: "rect", x: barX + 0.5*zoom, y: barY - 1.5*zoom, w: 0.8*zoom, h: 3.6*zoom, rx: 0.2*zoom, fill: "#1E293B" });
      furniture.push({ id: `bb-pl2-${bRow}-${bCol}`, shape: "rect", x: barX + 1.5*zoom, y: barY - 1.2*zoom, w: 0.6*zoom, h: 3*zoom, rx: 0.2*zoom, fill: "#334155" });
      // Weight Plates (Right)
      furniture.push({ id: `bb-pr1-${bRow}-${bCol}`, shape: "rect", x: barX + barW - 1.3*zoom, y: barY - 1.5*zoom, w: 0.8*zoom, h: 3.6*zoom, rx: 0.2*zoom, fill: "#1E293B" });
      furniture.push({ id: `bb-pr2-${bRow}-${bCol}`, shape: "rect", x: barX + barW - 2.1*zoom, y: barY - 1.2*zoom, w: 0.6*zoom, h: 3*zoom, rx: 0.2*zoom, fill: "#334155" });
      
      people.push({ id: `wb-p-${bRow}-${bCol}`, x: currBcx + bW/2, y: currBcy + bH/2 + 1*zoom, r: pr });
      
      currBcx += bW + bGapX;
      bCol++;
    }
    currBcy += bH + bGapY;
    bRow++;
  }

  if (isLarge) {
    const botY = fy + topH;
    const botH = floorH - topH - 12*zoom; 
    
    // --- 3. Stretching / Boxing Zone (Bottom Left) ---
    const yogaW = floorW * 0.45;
    // Wooden Floor for Studio
    furniture.push({ id: "yoga-floor", shape: "rect", x: fx, y: botY, w: yogaW, h: botH, rx: 0, fill: "#FDE68A" });
    
    // Punching bags along left wall
    const numBags = Math.floor(botH / (5*zoom));
    for(let b=0; b<numBags; b++) {
        furniture.push({ id: `bag-${b}`, shape: "circle", x: fx + 3*zoom, y: botY + 3*zoom + b*(5*zoom), r: 1.5*zoom, fill: "#EF4444" });
        furniture.push({ id: `bag-m-${b}`, shape: "circle", x: fx + 3*zoom, y: botY + 3*zoom + b*(5*zoom), r: 0.5*zoom, fill: "#000" });
    }

    const matW = 4 * zoom;
    const matH = 8 * zoom;
    let ymY = botY + 4*zoom;
    let mRow = 0;
    while (ymY + matH <= botY + botH - 2*zoom) {
      let ymX = fx + 8*zoom;
      let mCol = 0;
      while (ymX + matW <= fx + yogaW - 2*zoom) {
        // Yoga mat
        furniture.push({ id: `ym-${mRow}-${mCol}`, shape: "rect", x: ymX, y: ymY, w: matW, h: matH, rx: 0.5*zoom, fill: "#34D399" });
        // Swiss ball next to mat (every other mat)
        if ((mRow + mCol) % 2 === 0) {
            furniture.push({ id: `ball-${mRow}-${mCol}`, shape: "circle", x: ymX + matW + 2*zoom, y: ymY + 2*zoom, r: 2*zoom, fill: "#38BDF8" });
        }
        people.push({ id: `ym-p-${mRow}-${mCol}`, x: ymX + matW/2, y: ymY + matH/2, r: pr });
        ymX += matW + 6*zoom;
        mCol++;
      }
      ymY += matH + 6*zoom;
      mRow++;
    }

    // --- 4. Resistance Machines Zone (Bottom Right) ---
    const machX = fx + floorW * 0.5;
    const machW = floorW * 0.5;
    
    // Large functional rig in center of right area
    const rigW = 12 * zoom;
    const rigH = 12 * zoom;
    const rigX = machX + (machW - rigW)/2;
    const rigY = botY + (botH - rigH)/2;
    // Octagon or frame
    furniture.push({ id: "rig-out", shape: "rect", x: rigX, y: rigY, w: rigW, h: rigH, rx: 2*zoom, fill: "#475569" });
    furniture.push({ id: "rig-in", shape: "rect", x: rigX + 1.5*zoom, y: rigY + 1.5*zoom, w: rigW - 3*zoom, h: rigH - 3*zoom, rx: 1*zoom, fill: FLOOR_BG });
    people.push({ id: "rig-p1", x: rigX + 2*zoom, y: rigY + 2*zoom, r: pr });
    people.push({ id: "rig-p2", x: rigX + rigW - 2*zoom, y: rigY + rigH - 2*zoom, r: pr });

    // Individual machines around the edges
    const mSize = 6 * zoom;
    // Top machines
    for(let m=0; m < machW/(mSize + 4*zoom) - 1; m++) {
      let x = machX + 4*zoom + m*(mSize + 4*zoom);
      furniture.push({ id: `mach-t-${m}`, shape: "rect", x, y: botY + 2*zoom, w: mSize, h: mSize, rx: 1*zoom, fill: "#CBD5E1" });
      furniture.push({ id: `mach-t-pad-${m}`, shape: "rect", x: x + 1*zoom, y: botY + 3*zoom, w: mSize - 2*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#1E293B" });
      people.push({ id: `mach-tp-${m}`, x: x + mSize/2, y: botY + 4*zoom, r: pr });
    }
    // Bottom machines
    for(let m=0; m < machW/(mSize + 4*zoom) - 1; m++) {
      let x = machX + 4*zoom + m*(mSize + 4*zoom);
      let y = botY + botH - mSize - 2*zoom;
      furniture.push({ id: `mach-b-${m}`, shape: "rect", x, y, w: mSize, h: mSize, rx: 1*zoom, fill: "#CBD5E1" });
      furniture.push({ id: `mach-b-pad-${m}`, shape: "rect", x: x + 1*zoom, y: y + mSize - 3*zoom, w: mSize - 2*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#1E293B" });
      people.push({ id: `mach-bp-${m}`, x: x + mSize/2, y: y + mSize - 2*zoom, r: pr });
    }
  }

  // --- Reception / Entrance (Bottom Center) ---
  const entY = fy + floorH - 12*zoom;
  const entX = fx + floorW / 2 - 12*zoom;
  // Entrance rug
  furniture.push({ id: "gym-ent-rug", shape: "rect", x: entX, y: entY, w: 24*zoom, h: 12*zoom, rx: 1*zoom, fill: "#F1F5F9" });
  furniture.push({ id: "gym-rec", shape: "rect", x: entX + 4*zoom, y: entY + 3*zoom, w: 16*zoom, h: 3*zoom, rx: 0.5*zoom, fill: "#94A3B8" });
  people.push({ id: "gym-rec-p", x: entX + 12*zoom, y: entY + 8*zoom, r: pr });

  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── Movie Theatre ───────────────────────────────────────────────────────────
function generateCinema(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];
  const zones: ZoneArea[] = [];

  // Drastically higher zoom to tone down the capacity.
  // At scale=0 (zoom 1.6), we get a tiny 25-seat screening room.
  // At scale=1 (zoom 0.9), we get a large ~450 seat theater.
  const zoom = lerp(1.6, 0.9, scale);
  const pr = 1.0 * zoom; // Decreased size of blue dots

  const floorW = lerp(45, 85, scale);
  const floorH = lerp(50, 85, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;
  
  zones.push({ minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH });

  // 1. Stage and Screen
  const stageH = 6 * zoom;
  furniture.push({ id: "stage", shape: "rect", x: fx, y: fy, w: floorW, h: stageH, rx: 0, fill: "transparent", stroke: "#94A3B8" });
  
  const screenW = floorW * 0.7;
  furniture.push({ id: "screen", shape: "rect", x: fx + floorW * 0.15, y: fy + 2 * zoom, w: screenW, h: 2 * zoom, rx: 1 * zoom, fill: "#475569" });

  // 2. Seating Blocks (Sections)
  const isLarge = scale > 0.4;
  const numAisles = isLarge ? 2 : 1;
  const aisleW = 4 * zoom;
  const totalAisleW = numAisles * aisleW;
  const blocks = numAisles + 1;
  const blockW = (floorW - 6 * zoom - totalAisleW) / blocks; // 3 zoom padding on left/right

  const seatW = 2.5 * zoom;
  const seatH = 2.5 * zoom;
  const seatGapX = 1.2 * zoom; // Increased gap between dots horizontally
  const rowGapY = 2.5 * zoom;  // Increased gap between dots vertically

  const colsPerBlock = Math.floor(blockW / (seatW + seatGapX));
  const seatStartY = fy + stageH + 4 * zoom;
  
  // Leave room for back aisles
  const maxRows = Math.floor((floorH - stageH - 6 * zoom) / (seatH + rowGapY));

  // Cross aisle
  const crossAisleRow = Math.floor(maxRows * 0.4); 

  for (let r = 0; r < maxRows; r++) {
    if (r === crossAisleRow && isLarge) continue; 
    
    // Calculate Y for this row, shifting it down if it's after the cross aisle
    const rowY = seatStartY + r * (seatH + rowGapY) + (r > crossAisleRow && isLarge ? 3 * zoom : 0);

    for (let b = 0; b < blocks; b++) {
      const blockStartX = fx + 3*zoom + b * (blockW + aisleW);
      const actualBlockW = colsPerBlock * (seatW + seatGapX) - seatGapX;
      const blockOffsetX = blockStartX + (blockW - actualBlockW) / 2;

      // Curve effect: outer blocks slightly higher Y
      let curveOffset = 0;
      if (blocks === 3) {
        if (b === 0 || b === 2) curveOffset = 1 * zoom; 
      } else if (blocks === 2) {
        curveOffset = 0.5 * zoom; 
      }
      
      const finalY = rowY + curveOffset;

      for (let c = 0; c < colsPerBlock; c++) {
        // Cutout for front section if large to make a U shape
        if (isLarge && r < 2 && (b === 0 || b === blocks - 1)) continue;

        const sx = blockOffsetX + c * (seatW + seatGapX);
        
        // Simple seat (neutral blueprint aesthetics)
        furniture.push({ id: `seat-${r}-${b}-${c}`, shape: "rect", x: sx, y: finalY, w: seatW, h: seatH, rx: 0.5*zoom, fill: "#CBD5E1" });
        // Armrests
        furniture.push({ id: `arm-${r}-${b}-${c}`, shape: "rect", x: sx - 0.2*zoom, y: finalY + 0.5*zoom, w: 0.5*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#94A3B8" });
        if (c === colsPerBlock - 1) {
          furniture.push({ id: `arm-${r}-${b}-${c}-r`, shape: "rect", x: sx + seatW, y: finalY + 0.5*zoom, w: 0.5*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#94A3B8" });
        }
        
        // People
        people.push({ id: `p-${r}-${b}-${c}`, x: sx + seatW/2, y: finalY + seatH/2, r: pr });
      }
    }
  }

  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── Shopping Centre ─────────────────────────────────────────────────────────
function generateMall(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];
  const zones: ZoneArea[] = [];

  // Toned down scaling so it doesn't get overcrowded
  const zoom = lerp(0.95, 0.65, scale);
  const pr = 1.3 * zoom;

  // Reduced floor expansion bounds
  const floorW = lerp(55, 80, scale);
  const floorH = lerp(60, 80, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;

  zones.push({ minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH });

  // Checkout Area at the bottom
  const checkoutH = 14 * zoom;
  const checkoutY = fy + floorH - checkoutH;

  const mainY = fy + 4 * zoom;
  const mainH = floorH - checkoutH - 8 * zoom;

  // Let's divide the width into 3 sections if it's large, or 2 if medium, 1 if small
  const sections = scale < 0.3 ? 1 : (scale < 0.7 ? 2 : 3);
  const sectionW = (floorW - 8 * zoom) / sections;
  const startX = fx + 4 * zoom;

  // Helper to draw a horizontal shelf
  const drawHorizShelf = (x: number, y: number, w: number, h: number, prefix: string) => {
    furniture.push({ id: `${prefix}-base`, shape: "rect", x, y, w, h, rx: 1 * zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
    const numCols = Math.max(1, Math.floor(w / (6 * zoom)));
    for (let c = 0; c < numCols; c++) {
      const cx = x + c * (w / numCols);
      if (c > 0) {
        furniture.push({ id: `${prefix}-div-${c}`, shape: "rect", x: cx, y, w: 0.5 * zoom, h, fill: "#94A3B8" });
      }
    }
  };

  // Helper to draw a vertical shelf
  const drawVertShelf = (x: number, y: number, w: number, h: number, prefix: string) => {
    furniture.push({ id: `${prefix}-base`, shape: "rect", x, y, w, h, rx: 1 * zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
    const rackH = 6 * zoom;
    const numRacks = Math.max(1, Math.floor(h / rackH));
    for (let r = 0; r < numRacks; r++) {
      const rackY = y + r * (h / numRacks);
      if (r > 0) {
        furniture.push({ id: `${prefix}-div-${r}`, shape: "rect", x, y: rackY, w, h: 0.5 * zoom, fill: "#94A3B8" });
      }
    }
  };

  for (let s = 0; s < sections; s++) {
    const secX = startX + s * sectionW;
    const padding = 2 * zoom;
    const usableW = sectionW - padding * 2;
    
    // Mix different styles to break symmetry
    if (s === 0 || (s === 2 && scale > 0.85)) {
      // Vertical long aisles (Grocery / Long shelves)
      const aisleW = 4 * zoom;
      const shelfW = 5 * zoom;
      const cols = Math.max(1, Math.floor((usableW + aisleW) / (shelfW + aisleW)));
      const actualColsW = cols * shelfW + (cols - 1) * aisleW;
      const offX = secX + padding + (usableW - actualColsW) / 2;
      
      for (let c = 0; c < cols; c++) {
        // Vary the length slightly for a more organic feel
        const varH = mainH - ((c % 2) * 4 * zoom);
        drawVertShelf(offX + c * (shelfW + aisleW), mainY, shelfW, varH, `v-${s}-${c}`);
        
        // People
        if (c < cols - 1) {
          const px = offX + c * (shelfW + aisleW) + shelfW + aisleW / 2;
          const numPeople = Math.max(1, Math.floor(scale * 3));
          for (let p = 0; p < numPeople; p++) {
             const py = mainY + ((p + 0.5) / numPeople) * varH;
             people.push({ id: `shp-l-${s}-${c}-${p}`, x: px, y: py, r: pr });
             if (p % 2 === 0) {
               furniture.push({ id: `cart-${s}-${c}-${p}`, shape: "rect", x: px - 1.5*zoom, y: py + 2*zoom, w: 3*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "transparent", stroke: "#94A3B8" });
             }
          }
        }
      }
    } else if (s === 1) {
      // Middle section: Horizontal short aisles
      const gapY = 6 * zoom;
      const shelfH = 5 * zoom;
      const rows = Math.max(1, Math.floor(mainH / (shelfH + gapY)));
      const actualRowsH = rows * shelfH + (rows - 1) * gapY;
      const offY = mainY + (mainH - actualRowsH) / 2;

      for (let r = 0; r < rows; r++) {
        // Two blocks with a walkway
        const w2 = usableW / 2 - 2 * zoom;
        drawHorizShelf(secX + padding, offY + r * (shelfH + gapY), w2, shelfH, `h1-${s}-${r}`);
        drawHorizShelf(secX + padding + w2 + 4*zoom, offY + r * (shelfH + gapY), w2, shelfH, `h2-${s}-${r}`);
        
        // People in the horizontal aisles
        if (r < rows - 1) {
          const py = offY + r * (shelfH + gapY) + shelfH + gapY / 2;
          people.push({ id: `shp-m1-${s}-${r}`, x: secX + padding + w2 / 2, y: py, r: pr });
          people.push({ id: `shp-m2-${s}-${r}`, x: secX + padding + w2 + 4*zoom + w2 / 2, y: py, r: pr });
        }
      }
    } else {
      // Right section (s=2 normally): Mixed bins
      const boxS = 8 * zoom;
      const gap = 4 * zoom;
      const cols = Math.max(1, Math.floor(usableW / (boxS + gap)));
      const rows = Math.max(1, Math.floor(mainH / (boxS + gap)));
      
      const offX = secX + padding + (usableW - (cols * boxS + (cols - 1) * gap)) / 2;
      const offY = mainY + (mainH - (rows * boxS + (rows - 1) * gap)) / 2;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          furniture.push({ id: `box-${s}-${r}-${c}`, shape: "rect", x: offX + c * (boxS + gap), y: offY + r * (boxS + gap), w: boxS, h: boxS, rx: 1 * zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
          if ((r+c)%3 === 0) {
            people.push({ id: `shp-r-${s}-${r}-${c}`, x: offX + c * (boxS + gap) - 2*zoom, y: offY + r * (boxS + gap) + boxS/2, r: pr });
          }
        }
      }
    }
  }

  // Checkout Area
  const ckGapX = 5 * zoom;
  const ckW = 4 * zoom;
  const ckH = 10 * zoom;
  const ckAreaW = floorW - 8 * zoom;
  const numCheckouts = Math.max(2, Math.floor(ckAreaW / (ckW + ckGapX)));
  const ckStartX = fx + (floorW - (numCheckouts * ckW + (numCheckouts - 1) * ckGapX)) / 2;
  
  walls.push({ id: "ck-div", x1: fx + 2*zoom, y1: checkoutY - 2*zoom, x2: fx + floorW - 2*zoom, y2: checkoutY - 2*zoom, dashed: true });
  
  for (let i = 0; i < numCheckouts; i++) {
    const cx = ckStartX + i * (ckW + ckGapX);
    const cy = checkoutY;
    
    furniture.push({ id: `ck-${i}`, shape: "rect", x: cx, y: cy, w: ckW, h: ckH, rx: 0.5 * zoom, fill: "#E2E8F0" });
    furniture.push({ id: `ck-belt-${i}`, shape: "rect", x: cx + 0.5*zoom, y: cy + 0.5*zoom, w: ckW - 1*zoom, h: 5*zoom, rx: 0.2*zoom, fill: "#334155" });
    furniture.push({ id: `ck-reg-${i}`, shape: "rect", x: cx + 0.5*zoom, y: cy + 6.5*zoom, w: ckW - 1*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#94A3B8" });
    
    people.push({ id: `cashier-${i}`, x: cx + ckW + 2*zoom, y: cy + 7.5*zoom, r: pr });
    people.push({ id: `cust-1-${i}`, x: cx - 2*zoom, y: cy + 3*zoom, r: pr });
    furniture.push({ id: `ck-cart-1-${i}`, shape: "rect", x: cx - 3.5*zoom, y: cy + 5*zoom, w: 3*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "transparent", stroke: "#94A3B8" });

    if (scale > 0.3) {
      people.push({ id: `cust-2-${i}`, x: cx - 2*zoom, y: cy - 3*zoom, r: pr });
      furniture.push({ id: `ck-cart-2-${i}`, shape: "rect", x: cx - 3.5*zoom, y: cy - 1*zoom, w: 3*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "transparent", stroke: "#94A3B8" });
    }
  }

  furniture.push({ id: "entrance-mat", shape: "rect", x: fx + floorW / 2 - 10*zoom, y: fy + floorH - 4*zoom, w: 20*zoom, h: 4*zoom, rx: 0, fill: "#F8FAFC", stroke: "#CBD5E1" });
  
  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── Café / Restaurant ───────────────────────────────────────────────────────
function generateCafe(scale: number): LayoutResult {
  const furniture: FurnitureItem[] = [];
  const people: PersonDot[] = [];
  const walls: WallLine[] = [];
  const zones: ZoneArea[] = [];

  // Decrease overall scale slightly
  const zoom = lerp(1.0, 0.65, scale);
  const pr = 1.3 * zoom;

  const floorW = lerp(70, 95, scale);
  const floorH = lerp(75, 95, scale);
  const fx = 50 - floorW / 2;
  const fy = 50 - floorH / 2;

  zones.push({ minX: fx, maxX: fx + floorW, minY: fy, maxY: fy + floorH });

  // ─── Areas ───
  const patioH = floorH * 0.3;
  const interiorH = floorH - patioH;
  
  // Draw floor split (Patio is at the bottom)
  furniture.push({ id: "patio-floor", shape: "rect", x: fx, y: fy + interiorH, w: floorW, h: patioH, rx: 0, fill: "#E2E8F0", stroke: "none" });

  // Exterior Walls (Interior part)
  walls.push({ id: "w-top", x1: fx, y1: fy, x2: fx + floorW, y2: fy });
  walls.push({ id: "w-left", x1: fx, y1: fy, x2: fx, y2: fy + interiorH });
  walls.push({ id: "w-right", x1: fx + floorW, y1: fy, x2: fx + floorW, y2: fy + interiorH });
  // Glass wall dividing interior and patio (with a door gap in middle)
  const doorW = 8 * zoom;
  walls.push({ id: "w-glass-l", x1: fx, y1: fy + interiorH, x2: fx + floorW/2 - doorW/2, y2: fy + interiorH });
  walls.push({ id: "w-glass-r", x1: fx + floorW/2 + doorW/2, y1: fy + interiorH, x2: fx + floorW, y2: fy + interiorH });

  // ─── Kitchen & Service (Top Right) ───
  const kitW = floorW * 0.35;
  const kitH = interiorH * 0.4;
  const kitX = fx + floorW - kitW;
  const kitY = fy;

  // Kitchen walls
  walls.push({ id: "w-kit-b", x1: kitX, y1: kitY + kitH, x2: kitX + kitW, y2: kitY + kitH });
  walls.push({ id: "w-kit-l", x1: kitX, y1: kitY, x2: kitX, y2: kitY + kitH - 4*zoom });

  // Kitchen internals
  furniture.push({ id: "kit-counter-back", shape: "rect", x: kitX + 2*zoom, y: kitY + 2*zoom, w: kitW - 4*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "#CBD5E1", stroke: "#94A3B8" });
  furniture.push({ id: "kit-island", shape: "rect", x: kitX + 4*zoom, y: kitY + 8*zoom, w: kitW - 8*zoom, h: 3*zoom, rx: 0.5*zoom, fill: "#E2E8F0", stroke: "#94A3B8" });
  people.push({ id: "chef1", x: kitX + kitW/2, y: kitY + 6.5*zoom, r: pr });

  // Front Bar / Service Counter
  const barDepth = 3 * zoom;
  // Horizontal bar part
  furniture.push({ id: "bar-h", shape: "rect", x: kitX - 10*zoom, y: kitY + kitH, w: kitW + 10*zoom - 2*zoom, h: barDepth, rx: 0.5*zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
  // Vertical bar part
  furniture.push({ id: "bar-v", shape: "rect", x: kitX - 10*zoom, y: kitY + kitH - 12*zoom, w: barDepth, h: 12*zoom, rx: 0.5*zoom, fill: "#F1F5F9", stroke: "#CBD5E1" });
  
  // Bar stools along horizontal part
  const numStools = Math.floor((kitW + 6*zoom) / (4*zoom));
  for (let i=0; i<numStools; i++) {
     const sx = kitX - 6*zoom + i*4*zoom;
     furniture.push({ id: `bstool-${i}`, shape: "circle", x: sx, y: kitY + kitH + barDepth + 1.5*zoom, r: 1.2*zoom, fill: "#E2E8F0" });
     if (i % 2 === 0) people.push({ id: `bp-${i}`, x: sx, y: kitY + kitH + barDepth + 1.5*zoom, r: pr });
  }
  // POS
  furniture.push({ id: "pos", shape: "rect", x: kitX - 9*zoom, y: kitY + kitH - 2*zoom, w: 2*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#1E293B" });
  people.push({ id: "barista", x: kitX - 6*zoom, y: kitY + kitH - 2*zoom, r: pr });

  // ─── Perimeter Bench Seating (Top Left and Left) ───
  const benchD = 3 * zoom;
  const bLeftW = kitX - fx; 
  const bLeftH = interiorH; 
  const benchSpacing = 10 * zoom; // Increased gap
  
  // Top bench
  furniture.push({ id: "bench-t", shape: "rect", x: fx, y: fy, w: bLeftW, h: benchD, rx: 0, fill: "#E2E8F0", stroke: "#94A3B8" });
  // Left bench
  furniture.push({ id: "bench-l", shape: "rect", x: fx, y: fy + benchD, w: benchD, h: bLeftH - benchD, rx: 0, fill: "#E2E8F0", stroke: "#94A3B8" });

  // Tables along Top Bench
  const numTopTbl = Math.floor((bLeftW - benchD) / benchSpacing);
  for (let i=0; i<numTopTbl; i++) {
      const tx = fx + benchD + 2*zoom + i*benchSpacing + 2*zoom;
      const ty = fy + benchD + 1*zoom;
      furniture.push({ id: `ttbl-${i}`, shape: "rect", x: tx, y: ty, w: 4*zoom, h: 3*zoom, rx: 0.5*zoom, fill: "#F8FAFC", stroke: "#CBD5E1" });
      furniture.push({ id: `tchr-${i}`, shape: "rect", x: tx + 1*zoom, y: ty + 4*zoom, w: 2*zoom, h: 1.5*zoom, rx: 0.2*zoom, fill: "#E2E8F0" });
      people.push({ id: `tp-${i}`, x: tx + 2*zoom, y: ty - 1*zoom, r: pr }); 
      if (i % 2 !== 0) people.push({ id: `tcp-${i}`, x: tx + 2*zoom, y: ty + 4.5*zoom, r: pr }); 
  }

  // Tables along Left Bench
  const numLeftTbl = Math.floor((bLeftH - benchD - 4*zoom) / benchSpacing);
  for (let i=0; i<numLeftTbl; i++) {
      const tx = fx + benchD + 1*zoom;
      const ty = fy + benchD + 2*zoom + i*benchSpacing + 2*zoom;
      furniture.push({ id: `ltbl-${i}`, shape: "rect", x: tx, y: ty, w: 3*zoom, h: 4*zoom, rx: 0.5*zoom, fill: "#F8FAFC", stroke: "#CBD5E1" });
      furniture.push({ id: `lchr-${i}`, shape: "rect", x: tx + 4*zoom, y: ty + 1*zoom, w: 1.5*zoom, h: 2*zoom, rx: 0.2*zoom, fill: "#E2E8F0" });
      people.push({ id: `lp-${i}`, x: tx - 1*zoom, y: ty + 2*zoom, r: pr });
      if (i % 2 === 0) people.push({ id: `lcp-${i}`, x: tx + 4.5*zoom, y: ty + 2*zoom, r: pr });
  }

  // ─── Center Dining (Grid of Round Tables) ───
  const cxStart = fx + benchD + 8*zoom;
  const cxEnd = fx + floorW - 2*zoom;
  const cyStart = fy + benchD + 8*zoom;
  const cyEnd = fy + interiorH - 2*zoom;
  
  const cCellS = 12 * zoom; // Increased gap
  const cCols = Math.floor((cxEnd - cxStart) / cCellS);
  const cRows = Math.floor((cyEnd - cyStart) / cCellS);
  
  const cOffX = cxStart + ((cxEnd - cxStart) - cCols * cCellS) / 2;
  const cOffY = cyStart + ((cyEnd - cyStart) - cRows * cCellS) / 2;

  let tid = 0;
  for (let r=0; r<cRows; r++) {
      for (let c=0; c<cCols; c++) {
          const cx = cOffX + c * cCellS + cCellS/2;
          const cy = cOffY + r * cCellS + cCellS/2;
          
          const forbidX1 = kitX - 12*zoom;
          const forbidY1 = fy;
          const forbidX2 = fx + floorW;
          const forbidY2 = kitY + kitH + barDepth + 6*zoom;
          
          if (cx > forbidX1 && cx < forbidX2 && cy > forbidY1 && cy < forbidY2) {
              continue; 
          }

          const rTbl = 2.5*zoom;
          furniture.push({ id: `ctbl-${tid}`, shape: "circle", x: cx, y: cy, r: rTbl, fill: "#F8FAFC", stroke: "#CBD5E1" });
          const dirs = [{dx:0,dy:-3.5*zoom}, {dx:0,dy:3.5*zoom}, {dx:-3.5*zoom,dy:0}, {dx:3.5*zoom,dy:0}];
          dirs.forEach((d,i) => {
             furniture.push({ id: `cchr-${tid}-${i}`, shape: "circle", x: cx+d.dx, y: cy+d.dy, r: 1.2*zoom, fill: "#E2E8F0" });
             if ((i + r + c) % 3 === 0) people.push({ id: `cp-${tid}-${i}`, x: cx+d.dx, y: cy+d.dy, r: pr });
          });
          tid++;
      }
  }

  // ─── Patio (Bottom) ───
  const pCellS = 14 * zoom; // Increased gap
  const pCols = Math.floor((floorW - 4*zoom) / pCellS);
  const pRows = Math.floor((patioH - 4*zoom) / pCellS);
  
  const pOffX = fx + 2*zoom + ((floorW - 4*zoom) - pCols * pCellS) / 2;
  const pOffY = fy + interiorH + 2*zoom + ((patioH - 4*zoom) - pRows * pCellS) / 2;

  let pid = 0;
  for (let r=0; r<pRows; r++) {
      for (let c=0; c<pCols; c++) {
          const px = pOffX + c * pCellS + pCellS/2;
          const py = pOffY + r * pCellS + pCellS/2;
          
          if (px > fx + floorW - 2*zoom) continue;
          
          const hasUmbrella = (r+c) % 3 === 0;
          
          furniture.push({ id: `ptbl-${pid}`, shape: "circle", x: px, y: py, r: 2.5*zoom, fill: "#F8FAFC", stroke: "#94A3B8" });
          
          if (hasUmbrella) {
             furniture.push({ id: `pumb-${pid}`, shape: "circle", x: px, y: py, r: 5*zoom, fill: "rgba(248, 250, 252, 0.5)", stroke: "#CBD5E1" });
          }

          const dirs = [{dx:-3.5*zoom,dy:-3.5*zoom}, {dx:3.5*zoom,dy:3.5*zoom}, {dx:3.5*zoom,dy:-3.5*zoom}, {dx:-3.5*zoom,dy:3.5*zoom}];
          dirs.forEach((d,i) => {
             furniture.push({ id: `pchr-${pid}-${i}`, shape: "circle", x: px+d.dx, y: py+d.dy, r: 1.2*zoom, fill: "#CBD5E1" });
             if ((i + r) % 2 === 0) people.push({ id: `pp-${pid}-${i}`, x: px+d.dx, y: py+d.dy, r: pr });
          });
          pid++;
      }
  }

  return { furniture, people, walls, zones, floor: { x: fx, y: fy, w: floorW, h: floorH } };
}

// ─── Layout Dispatcher ───────────────────────────────────────────────────────
function generateLayout(spaceType: string, areaSqFt: number): LayoutResult {
  const config = AREA_CONFIG[spaceType] || AREA_CONFIG.corporate;
  const scale = clamp((areaSqFt - config.min) / (config.max - config.min), 0, 1);

  switch (spaceType) {
    case "corporate": return generateCorporate(scale);
    case "school":    return generateSchool(scale);
    case "gym":       return generateGym(scale);
    case "cinema":    return generateCinema(scale);
    case "mall":      return generateMall(scale);
    case "cafe":      return generateCafe(scale);
    default:          return generateCorporate(scale);
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export function CommercialFloorPlan({
  spaceType,
  areaSqFt,
  threats,
  isComplete,
  productImage,
}: CommercialFloorPlanProps) {
  const layout = useMemo(
    () => generateLayout(spaceType, areaSqFt),
    [spaceType, areaSqFt],
  );

  // Threat particles (same bounce-pattern as DynamicVisualizer)
  const particles = useMemo(() => {
    if (threats.length === 0 || layout.zones.length === 0) return [];
    const list: {
      id: number;
      x: number;
      y: number;
      color: string;
      size: number;
      pathX: number[];
      pathY: number[];
      duration: number;
    }[] = [];

    const count = Math.min(threats.length * 12, 50);
    for (let i = 0; i < count; i++) {
      const threat = threats[i % threats.length];
      const zone = layout.zones[i % layout.zones.length];
      const x = zone.minX + Math.random() * (zone.maxX - zone.minX);
      const y = zone.minY + Math.random() * (zone.maxY - zone.minY);

      const pathX = [x];
      const pathY = [y];
      for (let j = 0; j < 4; j++) {
        pathX.push(zone.minX + Math.random() * (zone.maxX - zone.minX));
        pathY.push(zone.minY + Math.random() * (zone.maxY - zone.minY));
      }
      pathX.push(x);
      pathY.push(y);

      list.push({
        id: i,
        x, y,
        color: THREAT_COLORS[threat] || "#9CA3AF",
        size: 0.8 + Math.random() * 0.4,
        pathX, pathY,
        duration: 4 + Math.random() * 4,
      });
    }
    return list;
  }, [threats, layout.zones]);

  const spaceLabel = SPACE_LABELS[spaceType] || "Space";

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/3] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-4 md:p-8">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        aria-label={`${spaceLabel} floor plan preview`}
      >
        {/* Floor fill */}
        <rect 
          x={layout.floor?.x ?? 5} 
          y={layout.floor?.y ?? 5} 
          width={layout.floor?.w ?? 90} 
          height={layout.floor?.h ?? 90} 
          rx="1" fill={FLOOR_BG} 
        />

        {/* Outer walls */}
        <rect
          x={layout.floor?.x ?? 5} 
          y={layout.floor?.y ?? 5} 
          width={layout.floor?.w ?? 90} 
          height={layout.floor?.h ?? 90} 
          rx="1"
          fill="none" stroke={WALL} strokeWidth="1.5" strokeLinejoin="round"
        />

        {/* Internal walls */}
        <AnimatePresence>
          {layout.walls.map((w) => (
            <motion.line
              key={w.id}
              x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
              stroke={WALL}
              strokeWidth={w.dashed ? 0.5 : 0.9}
              strokeDasharray={w.dashed ? "2 1" : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </AnimatePresence>

        {/* Furniture */}
        <AnimatePresence>
          {layout.furniture.map((item) =>
            item.shape === "circle" ? (
              <motion.circle
                key={item.id}
                cx={item.x}
                cy={item.y}
                r={item.r || 3}
                fill={item.fill || FURNITURE_FILL}
                stroke={item.stroke || FURNITURE_STROKE}
                strokeWidth={0.3}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.rect
                key={item.id}
                x={item.x}
                y={item.y}
                width={item.w || 5}
                height={item.h || 3}
                rx={item.rx || 0.5}
                fill={item.fill || FURNITURE_FILL}
                stroke={item.stroke || FURNITURE_STROKE}
                strokeWidth={0.3}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ),
          )}
        </AnimatePresence>

        {/* People dots */}
        <AnimatePresence>
          {layout.people.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r || 1.3}
              fill={PEOPLE_COLOR}
              stroke="#FFFFFF"
              strokeWidth={0.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, type: "spring", bounce: 0.4 }}
            />
          ))}
        </AnimatePresence>

        {/* Threat particles */}
        <AnimatePresence>
          {!isComplete &&
            particles.map((p) => (
              <motion.circle
                key={`ptcl-${p.id}`}
                r={p.size}
                fill={p.color}
                opacity={0.7}
                initial={{ cx: p.x, cy: p.y, scale: 0, opacity: 0 }}
                animate={{
                  cx: p.pathX,
                  cy: p.pathY,
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                exit={{ cx: 50, cy: 50, scale: 0, opacity: 0 }}
                transition={{
                  cx: { duration: p.duration, repeat: Infinity, ease: "linear" },
                  cy: { duration: p.duration, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2 + Math.random() * 2, repeat: Infinity },
                  opacity: { duration: 2 + Math.random() * 2, repeat: Infinity },
                  // @ts-expect-error – Framer Motion exit transition key
                  exit: { duration: 0.8, ease: "anticipate" },
                }}
              />
            ))}
        </AnimatePresence>

        {/* Clean air pulse when complete */}
        <AnimatePresence>
          {isComplete && (
            <motion.circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.5"
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: [0, 20, 40], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Product image overlay */}
      <AnimatePresence>
        {isComplete && productImage && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border-2 border-blue-100 z-10"
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, delay: 0.5 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImage} alt="Recommended product" className="w-full h-full object-contain" />
              <motion.div
                className="absolute inset-[-4px] border-2 border-blue-400 rounded-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Legend bar */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          {spaceLabel} ({layout.people.length})
        </span>
        {threats.length > 0 && !isComplete && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block animate-pulse" />
            Threats Detected
          </span>
        )}
        {isComplete && (
          <span className="flex items-center gap-1.5 text-blue-500">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-ping" />
            Purifying Air
          </span>
        )}
      </div>
    </div>
  );
}
