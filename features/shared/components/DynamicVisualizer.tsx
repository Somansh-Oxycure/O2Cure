"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DynamicVisualizerProps {
  layoutType: string;
  bedrooms?: number;
  occupancy: number;
  threats: string[];
  isComplete: boolean;
  productImage?: string;
  productId?: string;
}

type SolutionPhase = "idle" | "animating" | "clean";

interface RoomNode {
  id: string;
  type: "master" | "living" | "kitchen" | "bedroom";
  weight: number;
}

interface RoomRect {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Zone {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

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

interface AirMetrics {
  aqi: number;
  pm25: string | null;
  co2: string | null;
  voc: string | null;
  allergen: string | null;
  pathogen: string | null;
}

// ─── Threat colours ───────────────────────────────────────────────────────────
const THREAT_COLORS: Record<string, string> = {
  particulate: "#9CA3AF",
  allergens: "#FBBF24",
  pets: "#A78BFA",
  kitchen: "#6B7280",
  mould: "#34D399",
  "high-co2": "#F87171",
};

// ─── Metrics calculator ───────────────────────────────────────────────────────
function computeMetrics(threats: string[]): AirMetrics {
  const has = (t: string) => threats.includes(t);
  const aqi = 30 + Math.floor((threats.length * 7 + (has("particulate") ? 6 : 0)) % 21);
  return {
    aqi: Math.min(Math.max(aqi, 30), 50),
    pm25:
      has("particulate") || has("kitchen")
        ? `${8 + Math.floor((threats.length * 3) % 8)} μg/m³`
        : null,
    co2: has("high-co2") ? `${420 + Math.floor((threats.length * 31) % 180)} ppm` : null,
    voc: has("kitchen") || has("pets") || has("mould") ? "< 0.3 mg/m³" : null,
    allergen: has("allergens") || has("pets") ? "< 50 grains/m³" : null,
    pathogen: threats.length > 0 ? "> 99% reduction" : null,
  };
}

// ─── BSP layout generator ─────────────────────────────────────────────────────
function sliceRooms(rooms: RoomNode[], x: number, y: number, w: number, h: number): RoomRect[] {
  if (rooms.length === 1) return [{ ...rooms[0], x, y, w, h }];
  const total = rooms.reduce((s, r) => s + r.weight, 0);
  let left = 0;
  let split = 1;
  for (let i = 0; i < rooms.length - 1; i++) {
    left += rooms[i].weight;
    if (left >= total / 2) {
      split = i + 1;
      if (i > 0) {
        const prev = Math.abs(total / 2 - (left - rooms[i].weight));
        const curr = Math.abs(total / 2 - left);
        if (prev < curr) { split = i; left -= rooms[i].weight; }
      }
      break;
    }
  }
  if (split === 0) split = 1;
  if (split === rooms.length) split = rooms.length - 1;
  left = rooms.slice(0, split).reduce((s, r) => s + r.weight, 0);
  const ratio = left / total;
  if (w >= h) {
    const lw = w * ratio;
    return [...sliceRooms(rooms.slice(0, split), x, y, lw, h), ...sliceRooms(rooms.slice(split), x + lw, y, w - lw, h)];
  }
  const lh = h * ratio;
  return [...sliceRooms(rooms.slice(0, split), x, y, w, lh), ...sliceRooms(rooms.slice(split), x, y + lh, w, h - lh)];
}

function generateLayout(bedrooms: number) {
  const n = Math.max(1, Math.min(9, bedrooms));
  const nodes: RoomNode[] = [{ id: "master", type: "master", weight: 100 }];
  for (let i = 1; i < n; i++) nodes.push({ id: `bed-${i}`, type: "bedroom", weight: 60 });
  nodes.push({ id: "living", type: "living", weight: 80 });
  nodes.push({ id: "kitchen", type: "kitchen", weight: 30 });
  const ordered = [
    ...nodes.filter((r) => r.type === "master" || r.type === "bedroom"),
    ...nodes.filter((r) => r.type === "living" || r.type === "kitchen"),
  ];
  const roomRects = sliceRooms(ordered, 5, 5, 90, 90);
  const zones: Zone[] = [];
  const furniture: FurnitureItem[] = [];
  const walls: { x1: number; y1: number; x2: number; y2: number }[] = [];

  roomRects.forEach((room) => {
    zones.push({ minX: room.x + 2, maxX: room.x + room.w - 2, minY: room.y + 2, maxY: room.y + room.h - 2 });
    walls.push({ x1: room.x, y1: room.y, x2: room.x + room.w, y2: room.y });
    walls.push({ x1: room.x, y1: room.y + room.h, x2: room.x + room.w, y2: room.y + room.h });
    walls.push({ x1: room.x, y1: room.y, x2: room.x, y2: room.y + room.h });
    walls.push({ x1: room.x + room.w, y1: room.y, x2: room.x + room.w, y2: room.y + room.h });
    const cx = room.x + room.w / 2;
    const cy = room.y + room.h / 2;
    const pad = 3;
    if (room.type === "master" || room.type === "bedroom") {
      const m = room.type === "master";
      const bW = m ? 12 : 9; const bH = m ? 14 : 12;
      furniture.push({ id: `bf-${room.id}`, shape: "rect", x: cx - bW / 2, y: cy - bH / 2, w: bW, h: bH, rx: 1, fill: "#E2E8F0", stroke: "#94A3B8" });
      furniture.push({ id: `bb-${room.id}`, shape: "rect", x: cx - bW / 2 + 1, y: cy - bH / 2 + 3, w: bW - 2, h: bH - 4, rx: 1, fill: "#CBD5E1" });
      furniture.push({ id: `bp1-${room.id}`, shape: "rect", x: cx - bW / 2 + 2, y: cy - bH / 2 + 1, w: bW / 2 - 2.5, h: 2, rx: 0.5, fill: "#F8FAFC" });
      furniture.push({ id: `bp2-${room.id}`, shape: "rect", x: cx + 0.5, y: cy - bH / 2 + 1, w: bW / 2 - 2.5, h: 2, rx: 0.5, fill: "#F8FAFC" });
    } else if (room.type === "living") {
      const r = 5; const off = r + 1.5;
      furniture.push({ id: `tbl-${room.id}`, shape: "circle", x: cx, y: cy, r, fill: "#E2E8F0", stroke: "#94A3B8" });
      furniture.push({ id: `c1-${room.id}`, shape: "circle", x: cx, y: cy - off, r: 1.5, fill: "#CBD5E1" });
      furniture.push({ id: `c2-${room.id}`, shape: "circle", x: cx, y: cy + off, r: 1.5, fill: "#CBD5E1" });
      furniture.push({ id: `c3-${room.id}`, shape: "circle", x: cx - off, y: cy, r: 1.5, fill: "#CBD5E1" });
      furniture.push({ id: `c4-${room.id}`, shape: "circle", x: cx + off, y: cy, r: 1.5, fill: "#CBD5E1" });
      if (room.w > 20 && room.h > 20) furniture.push({ id: `sofa-${room.id}`, shape: "rect", x: room.x + pad, y: room.y + pad, w: 12, h: 4, rx: 1, fill: "#94A3B8" });
    } else if (room.type === "kitchen") {
      furniture.push({ id: `kc1-${room.id}`, shape: "rect", x: room.x + pad, y: room.y + pad, w: Math.max(room.w - pad * 2, 8), h: 4, rx: 0, fill: "#64748B" });
      furniture.push({ id: `ks-${room.id}`, shape: "rect", x: room.x + pad + 2, y: room.y + pad + 1, w: 4, h: 2, rx: 0.5, fill: "#E2E8F0" });
      if (room.h > 15) furniture.push({ id: `kc2-${room.id}`, shape: "rect", x: room.x + pad, y: room.y + pad + 4, w: 4, h: Math.min(10, room.h - pad * 2 - 4), rx: 0, fill: "#64748B" });
    }
  });
  return { zones, furniture, walls, roomRects };
}

function getSolutionType(productId?: string): "hybrid" | "maxcure" | null {
  if (!productId) return null;
  if (productId.includes("hybrid")) return "hybrid";
  if (productId.includes("max-cure") || productId.includes("max_cure")) return "maxcure";
  return null;
}

function rng(seed: number, min: number, max: number) {
  const s = Math.sin(seed * 9301 + 49297) * 233280;
  return min + (s - Math.floor(s)) * (max - min);
}

// ─── Hybrid SVG Overlay ───────────────────────────────────────────────────────
// Unit sits at the plan centroid (≈ intersection of all room walls)
function HybridOverlay({
  roomRects,
  zones,
  threats,
  phase,
}: {
  roomRects: RoomRect[];
  zones: Zone[];
  threats: string[];
  phase: SolutionPhase;
}) {
  // Find centroid of all rooms = approx intersection point
  const cx = roomRects.reduce((s, r) => s + r.x + r.w / 2, 0) / roomRects.length;
  const cy = roomRects.reduce((s, r) => s + r.y + r.h / 2, 0) / roomRects.length;
  const us = 6; // unit half-size

  // One "sucker" particle per zone, seeded positions
  const suckers = useMemo(() => {
    const result: { id: number; sx: number; sy: number; color: string; delay: number; dur: number }[] = [];
    let id = 0;
    zones.forEach((z, zi) => {
      const threatColor = THREAT_COLORS[threats[zi % threats.length] || "particulate"] || "#9CA3AF";
      // 4 particles per zone
      for (let p = 0; p < 4; p++) {
        result.push({
          id: id++,
          sx: rng(id * 3 + zi * 7 + p, z.minX, z.maxX),
          sy: rng(id * 5 + zi * 11 + p, z.minY, z.maxY),
          color: threatColor,
          delay: rng(id + p, 0, 1.8),
          dur: rng(id + p + 1, 1.4, 2.2),
        });
      }
    });
    return result;
  }, [zones, threats]);

  const rings = [0, 0.8, 1.6];

  return (
    <g>
      {/* Phase: animating — particles flow toward unit */}
      <AnimatePresence>
        {phase === "animating" &&
          suckers.map((s) => (
            <motion.circle
              key={`suck-${s.id}`}
              r={1.1}
              fill={s.color}
              initial={{ cx: s.sx, cy: s.sy, opacity: 0.85, scale: 1 }}
              animate={{ cx: [s.sx, cx], cy: [s.sy, cy], opacity: [0.85, 0.4, 0], scale: [1, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: s.dur, delay: s.delay, repeat: 3, repeatType: "loop", ease: "easeIn" }}
            />
          ))}
      </AnimatePresence>

      {/* Phase: clean — green room fills */}
      <AnimatePresence>
        {phase === "clean" &&
          roomRects.map((room, i) => (
            <motion.rect
              key={`clean-room-${room.id}`}
              x={room.x + 1}
              y={room.y + 1}
              width={room.w - 2}
              height={room.h - 2}
              fill="#22C55E"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.09] }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Unit body (always visible when isComplete) */}
      <motion.rect
        x={cx - us / 2}
        y={cy - us / 2}
        width={us}
        height={us}
        rx={1.4}
        fill="white"
        stroke="#3B82F6"
        strokeWidth="0.8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.45, delay: 0.2 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Outer glow ring */}
      <motion.rect
        x={cx - us / 2 - 1}
        y={cy - us / 2 - 1}
        width={us + 2}
        height={us + 2}
        rx={2.2}
        fill="none"
        stroke={phase === "clean" ? "#22C55E" : "#93C5FD"}
        strokeWidth="0.35"
        animate={{ opacity: [0.9, 0.2, 0.9] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      {/* Grill lines */}
      {[-1.2, 0, 1.2].map((off, i) => (
        <motion.line
          key={`g-${i}`}
          x1={cx - us / 2 + 0.8} y1={cy + off}
          x2={cx + us / 2 - 0.8} y2={cy + off}
          stroke="#93C5FD" strokeWidth="0.35" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55 + i * 0.08 }}
        />
      ))}
      {/* Status LED */}
      <motion.circle
        cx={cx + us / 2 - 1} cy={cy - us / 2 + 1} r={0.65}
        fill={phase === "clean" ? "#22C55E" : "#60A5FA"}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      />

      {/* Clean phase — radiating green rings */}
      <AnimatePresence>
        {phase === "clean" &&
          rings.map((delay, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={cx} cy={cy}
              fill="none" stroke="#22C55E" strokeWidth="0.45"
              initial={{ r: us / 2 + 1, opacity: 0.85 }}
              animate={{ r: [us / 2 + 1, us / 2 + 20], opacity: [0.85, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Label */}
      <motion.text
        x={cx} y={cy + us / 2 + 3.5}
        textAnchor="middle" fontSize="2.5" fontWeight="700"
        fill={phase === "clean" ? "#22C55E" : "#3B82F6"}
        fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Hybrid
      </motion.text>
    </g>
  );
}

// ─── MaxCure SVG Overlay ──────────────────────────────────────────────────────
// Unit is outside the left wall. Air flows along curved paths into each room.
function MaxCureOverlay({
  roomRects,
  threats,
  phase,
}: {
  roomRects: RoomRect[];
  threats: string[];
  phase: SolutionPhase;
}) {
  // Unit position — outside left wall
  const unitX = -8;
  const unitY = 42;
  const unitW = 8;
  const unitH = 14;
  const unitCx = unitX + unitW / 2;
  const unitCy = unitY + unitH / 2;
  const unitFaceX = unitX + unitW; // right face of the unit (entry point for airflow)

  // For each room, build a curved waypoint path from unit face → room center
  const airPaths = useMemo(() => {
    return roomRects.map((room, i) => {
      const rcx = room.x + room.w / 2;
      const rcy = room.y + room.h / 2;
      // Bezier approximation: midpoint with a slight curve
      const midX = (unitFaceX + rcx) / 2 + rng(i * 3, -4, 4);
      const midY = (unitCy + rcy) / 2 + rng(i * 5, -6, 6);
      // 5-waypoint path for smooth curve
      return {
        id: room.id,
        cx: [unitFaceX, unitFaceX + 4, midX, rcx - 3, rcx],
        cy: [unitCy, unitCy + rng(i, -3, 3), midY, rcy + rng(i * 2, -3, 3), rcy],
        delay: i * 0.35,
        dur: 1.6 + i * 0.15,
        roomX: room.x,
        roomY: room.y,
        roomW: room.w,
        roomH: room.h,
      };
    });
  }, [roomRects, unitFaceX, unitCy]);

  // Seeded dirty-particle outflow (particles flee right edge)
  const outParticles = useMemo(() => {
    return roomRects.flatMap((room, ri) => {
      const threatColor = THREAT_COLORS[threats[ri % threats.length] || "particulate"] || "#9CA3AF";
      return [0, 1, 2, 3].map((p) => {
        const seed = ri * 100 + p;
        return {
          id: ri * 10 + p,
          sx: rng(seed, room.x + 3, room.x + room.w - 3),
          sy: rng(seed + 1, room.y + 3, room.y + room.h - 3),
          ey: rng(seed + 2, room.y + 3, room.y + room.h - 3),
          color: threatColor,
          delay: rng(seed + 3, 0.1, 2.2),
          dur: rng(seed + 4, 1.3, 2.0),
        };
      });
    });
  }, [roomRects, threats]);

  const grillOffsets = [-3, -1.2, 0.6, 2.4];

  return (
    <g>
      {/* Animating phase — airflow dots travel from unit → room centers */}
      <AnimatePresence>
        {phase === "animating" &&
          airPaths.map((path, pi) => (
            <g key={`flow-${path.id}`}>
              {/* Animated airflow dot */}
              {[0, 0.5, 1.0].map((offset, di) => (
                <motion.circle
                  key={`dot-${pi}-${di}`}
                  r={1.0}
                  fill="#22C55E"
                  initial={{ cx: unitFaceX, cy: unitCy, opacity: 0 }}
                  animate={{
                    cx: path.cx,
                    cy: path.cy,
                    opacity: [0, 0.85, 0.85, 0.4, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    cx: { duration: path.dur, ease: "easeInOut" },
                    cy: { duration: path.dur, ease: "easeInOut" },
                    opacity: { duration: path.dur, ease: "easeInOut", times: [0, 0.1, 0.7, 0.9, 1] },
                    delay: path.delay + offset * 0.55,
                    repeat: 3,
                    repeatType: "loop",
                  }}
                />
              ))}
            </g>
          ))}
      </AnimatePresence>

      {/* Animating phase — dirty particles flee to right edge */}
      <AnimatePresence>
        {phase === "animating" &&
          outParticles.map((op) => (
            <motion.circle
              key={`out-${op.id}`}
              r={0.9}
              fill={op.color}
              initial={{ cx: op.sx, cy: op.sy, opacity: 0.8, scale: 1 }}
              animate={{ cx: [op.sx, 98], cy: [op.sy, op.ey], opacity: [0.8, 0.3, 0], scale: [1, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: op.dur, delay: op.delay, repeat: 3, repeatType: "loop", ease: "easeIn" }}
            />
          ))}
      </AnimatePresence>

      {/* Clean phase — rooms fill green one by one */}
      <AnimatePresence>
        {phase === "clean" &&
          airPaths.map((p, i) => (
            <motion.rect
              key={`cr-${p.id}`}
              x={p.roomX + 1} y={p.roomY + 1}
              width={p.roomW - 2} height={p.roomH - 2}
              fill="#22C55E" stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.13, 0.09] }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Unit body */}
      <motion.rect
        x={unitX} y={unitY} width={unitW} height={unitH}
        rx={1.8} fill="white" stroke="#C5A059" strokeWidth="0.8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.35, delay: 0.2 }}
        style={{ transformOrigin: `${unitCx}px ${unitCy}px` }}
      />
      {/* Unit glow */}
      <motion.rect
        x={unitX - 1} y={unitY - 1} width={unitW + 2} height={unitH + 2}
        rx={2.5} fill="none"
        stroke={phase === "clean" ? "#22C55E" : "#C5A059"}
        strokeWidth="0.3"
        animate={{ opacity: [0.9, 0.15, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Grill lines */}
      {grillOffsets.map((off, i) => (
        <motion.line
          key={`g-${i}`}
          x1={unitX + 1} y1={unitCy + off}
          x2={unitX + unitW - 1} y2={unitCy + off}
          stroke="#D4B370" strokeWidth="0.4" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.07 }}
        />
      ))}
      {/* Status LED */}
      <motion.circle
        cx={unitX + unitW - 1.2} cy={unitY + 1.5} r={0.65}
        fill={phase === "clean" ? "#22C55E" : "#C5A059"}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      />
      {/* Label */}
      <motion.text
        x={unitCx} y={unitY + unitH + 3.5}
        textAnchor="middle" fontSize="2.4" fontWeight="700"
        fill={phase === "clean" ? "#22C55E" : "#C5A059"}
        fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Max Cure
      </motion.text>

      {/* Clean phase — gentle push-wave from left */}
      <AnimatePresence>
        {phase === "clean" &&
          [0, 0.9, 1.8].map((delay, i) => (
            <motion.rect
              key={`wave-${i}`}
              x={5} y={5} width={90} height={90}
              fill="#22C55E" stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.07, 0] }}
              transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </AnimatePresence>
    </g>
  );
}

// ─── Metrics panel (HTML, rendered below the SVG card) ────────────────────────
function MetricsPanel({ threats, solutionType }: { threats: string[]; solutionType: "hybrid" | "maxcure" | null }) {
  const m = computeMetrics(threats);

  const cards: { label: string; value: string; icon: string; color: string }[] = [
    { label: "Avg. AQI", value: String(m.aqi), icon: "🌿", color: "text-green-600" },
  ];
  if (m.pm25) cards.push({ label: "PM2.5", value: m.pm25, icon: "💨", color: "text-slate-600" });
  if (m.co2) cards.push({ label: "CO₂", value: m.co2, icon: "🌬️", color: "text-blue-600" });
  if (m.allergen) cards.push({ label: "Allergens", value: m.allergen, icon: "🌾", color: "text-amber-600" });
  if (m.voc) cards.push({ label: "VOCs", value: m.voc, icon: "🧪", color: "text-purple-600" });
  if (m.pathogen) cards.push({ label: "Pathogens", value: m.pathogen, icon: "🦠", color: "text-rose-600" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
        Projected Air Quality After Installation
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.09, type: "spring", bounce: 0.3 }}
            className="flex flex-col gap-0.5 rounded-xl bg-[#F7FAFD] px-3 py-2.5"
          >
            <span className="text-base leading-none">{c.icon}</span>
            <span className={`text-[1rem] font-bold leading-tight ${c.color}`}>{c.value}</span>
            <span className="text-[0.65rem] font-medium text-slate-400">{c.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CTA overlay (HTML, inside the visualizer card) ──────────────────────────
function CleanCTA({ solutionType }: { solutionType: "hybrid" | "maxcure" | null }) {
  const isMaxCure = solutionType === "maxcure";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-end pb-14 pointer-events-none"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-2 px-4 text-center">
        {/* Clean air badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1"
        >
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-green-600">
            ✓ Air Purified
          </span>
        </motion.div>
        {/* CTA button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
          style={{
            background: isMaxCure
              ? "linear-gradient(135deg, #C5A059 0%, #A88746 100%)"
              : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            boxShadow: isMaxCure
              ? "0 4px 14px rgba(197,160,89,0.4)"
              : "0 4px 14px rgba(59,130,246,0.4)",
          }}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Speak to an Air Engineer
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export function DynamicVisualizer({
  layoutType,
  bedrooms,
  occupancy,
  threats,
  isComplete,
  productImage,
  productId,
}: DynamicVisualizerProps) {
  const { zones, furniture, walls, roomRects } = useMemo(
    () => generateLayout(bedrooms || 1),
    [bedrooms]
  );

  const solutionType = getSolutionType(productId);

  // Phase state machine: idle → animating → clean
  const [phase, setPhase] = useState<SolutionPhase>("idle");
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (isComplete) {
      setPhase("animating");
      // Each sucker repeats 3 times (~2s dur × 3 = ~6s), then go clean
      phaseTimer.current = setTimeout(() => setPhase("clean"), 5800);
    } else {
      setPhase("idle");
    }
    return () => { if (phaseTimer.current) clearTimeout(phaseTimer.current); };
  }, [isComplete]);

  // Pre-completion bouncing particles
  const particles = useMemo(() => {
    if (threats.length === 0 || isComplete) return [];
    const count = Math.min(threats.length * 14, 56);
    return Array.from({ length: count }, (_, i) => {
      const threat = threats[i % threats.length];
      const zone = zones[i % zones.length];
      const seed = i * 17;
      const x = rng(seed, zone.minX, zone.maxX);
      const y = rng(seed + 1, zone.minY, zone.maxY);
      const pad = 2;
      const sX1 = zone.minX + pad; const sX2 = zone.maxX - pad;
      const sY1 = zone.minY + pad; const sY2 = zone.maxY - pad;
      const pathX = [x];
      const pathY = [y];
      for (let j = 0; j < 4; j++) {
        const edge = Math.floor(rng(seed + j * 3, 0, 4.99));
        let nx = rng(seed + j * 5, sX1, sX2);
        let ny = rng(seed + j * 7, sY1, sY2);
        if (edge === 0) ny = sY1;
        else if (edge === 1) nx = sX2;
        else if (edge === 2) ny = sY2;
        else nx = sX1;
        pathX.push(nx); pathY.push(ny);
      }
      pathX.push(x); pathY.push(y);
      return {
        id: i, x, y,
        color: THREAT_COLORS[threat] || "#9CA3AF",
        size: 0.9 + rng(seed + 9, 0, 0.4),
        pathX, pathY,
        duration: 4 + rng(seed + 13, 0, 4),
      };
    });
  }, [threats, zones, isComplete]);

  // People dots
  const people = useMemo(() => {
    return Array.from({ length: Math.min(occupancy, 30) }, (_, i) => {
      const zone = zones[i % zones.length];
      const seed = i * 23 + 7;
      return { id: i, x: rng(seed, zone.minX, zone.maxX), y: rng(seed + 1, zone.minY, zone.maxY) };
    });
  }, [occupancy, zones]);

  return (
    <div className="flex flex-col">
      {/* Visualizer card */}
      <div className="relative w-full aspect-square lg:aspect-[4/3] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-4 md:p-8">

        {/* Extended viewBox (negative left) so MaxCure unit is visible outside house */}
        <svg
          className="w-full h-full"
          viewBox="-12 0 117 100"
          fill="none"
          overflow="visible"
        >
          {/* Floor background */}
          <motion.rect
            x="5" y="5" width="90" height="90"
            fill="#F8FAFC" stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Walls */}
          {walls.map((w, i) => (
            <motion.line
              key={`wall-${i}`}
              x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
              stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          ))}

          {/* Furniture */}
          {furniture.map((f) =>
            f.shape === "rect" ? (
              <motion.rect
                key={f.id}
                x={f.x} y={f.y} width={f.w} height={f.h} rx={f.rx || 0}
                fill={f.fill || "#E2E8F0"} stroke={f.stroke || "none"} strokeWidth="0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ transformOrigin: `${f.x + (f.w || 0) / 2}px ${f.y + (f.h || 0) / 2}px` }}
              />
            ) : (
              <motion.circle
                key={f.id}
                cx={f.x} cy={f.y} r={f.r}
                fill={f.fill || "#E2E8F0"} stroke={f.stroke || "none"} strokeWidth="0.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            )
          )}

          {/* People */}
          <AnimatePresence>
            {people.map((p) => (
              <motion.circle
                key={`p-${p.id}`}
                cx={p.x} cy={p.y} r="1.8"
                fill="#3B82F6" stroke="#fff" strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.4 }}
              />
            ))}
          </AnimatePresence>

          {/* Pre-completion: bouncing threat particles */}
          <AnimatePresence>
            {phase === "idle" && particles.map((p) => (
              <motion.circle
                key={`pt-${p.id}`}
                r={p.size} fill={p.color}
                initial={{ cx: p.x, cy: p.y, scale: 0, opacity: 0 }}
                animate={{ cx: p.pathX, cy: p.pathY, scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                exit={{ cx: 50, cy: 50, scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                transition={{
                  cx: { duration: p.duration, repeat: Infinity, ease: "linear" },
                  cy: { duration: p.duration, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.5, repeat: Infinity },
                  opacity: { duration: 2.5, repeat: Infinity },
                }}
              />
            ))}
          </AnimatePresence>

          {/* Solution overlays */}
          <AnimatePresence>
            {phase !== "idle" && solutionType === "hybrid" && (
              <HybridOverlay roomRects={roomRects} zones={zones} threats={threats} phase={phase} />
            )}
            {phase !== "idle" && solutionType === "maxcure" && (
              <MaxCureOverlay roomRects={roomRects} threats={threats} phase={phase} />
            )}
          </AnimatePresence>
        </svg>

        {/* CTA overlay — appears in clean phase */}
        <AnimatePresence>
          {phase === "clean" && <CleanCTA solutionType={solutionType} />}
        </AnimatePresence>

        {/* Status badge (bottom left of card) */}
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[0.62rem] font-bold uppercase tracking-wider text-slate-400 pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Occupants ({occupancy})
          </span>
          {phase === "idle" && threats.length > 0 && (
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block animate-pulse" />
              Threats Detected
            </span>
          )}
          {phase === "animating" && solutionType === "hybrid" && (
            <span className="flex items-center gap-1.5 text-blue-500">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-ping" />
              Purifying…
            </span>
          )}
          {phase === "animating" && solutionType === "maxcure" && (
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-ping" />
              Fresh Air Flowing…
            </span>
          )}
          {phase === "clean" && (
            <span className="flex items-center gap-1.5 text-green-500">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Air Purified ✓
            </span>
          )}
        </div>
      </div>

      {/* Metrics panel — only in clean phase */}
      <AnimatePresence>
        {phase === "clean" && threats.length > 0 && (
          <MetricsPanel threats={threats} solutionType={solutionType} />
        )}
      </AnimatePresence>
    </div>
  );
}
