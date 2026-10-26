/**
 * CITRAVA — original artwork generator.
 *
 * Produces every illustration used by the website as a hand-tuned SVG file.
 * Nothing here is traced from, or derived from, third-party packaging.
 * The bottle silhouette, labels, citrus geometry and scenes are original
 * compositions built from primitives so they can be regenerated at any time.
 *
 * Run with:  node scripts/generate-artwork.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "images");

const C = {
  green: "#65B832",
  deep: "#174D32",
  lime: "#B8E54B",
  lemon: "#F8D940",
  offwhite: "#FAFBF6",
  cream: "#FFF8E7",
  charcoal: "#17251B",
};

/* ------------------------------------------------------------------ */
/* primitives                                                          */
/* ------------------------------------------------------------------ */

const rnd = (seed) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

/** Soft round highlight */
const glow = (x, y, r, color, opacity = 0.5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}" filter="url(#soft)"/>`;

/** Bubble cluster — translucent kitchen foam */
function bubbles(seed, { x, y, w, h, count = 14, color = "#ffffff", min = 8, max = 44 }) {
  const rand = rnd(seed);
  let out = "";
  for (let i = 0; i < count; i += 1) {
    const r = min + rand() * (max - min);
    const cx = x + rand() * w;
    const cy = y + rand() * h;
    const o = 0.12 + rand() * 0.38;
    out += `<g>
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${o.toFixed(2)}"/>
      <circle cx="${(cx - r * 0.28).toFixed(1)}" cy="${(cy - r * 0.3).toFixed(1)}" r="${(r * 0.24).toFixed(1)}" fill="#ffffff" opacity="${(o + 0.3).toFixed(2)}"/>
    </g>`;
  }
  return out;
}

/** Citrus wedge / slice. angleOffset rotates the segment fan. */
function citrus({ cx, cy, r, angle = -25, ring = "#FFF3B0", flesh = "#F8D940", zest = "#E9B62A", stroke = "#F2C531", wedge = true }) {
  const segs = 9;
  let lines = "";
  let segsPath = "";
  for (let i = 0; i < segs; i += 1) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const ir = r * 0.17;
    const gap = 0.045;
    const p = (a, rad) => `${(cx + Math.cos(a - Math.PI / 2) * rad).toFixed(2)} ${(cy + Math.sin(a - Math.PI / 2) * rad).toFixed(2)}`;
    segsPath += `M ${p(a0 + gap, ir)} L ${p(a0 + gap, r * 0.88)} A ${r * 0.88} ${r * 0.88} 0 0 1 ${p(a1 - gap, r * 0.88)} L ${p(a1 - gap, ir)} A ${ir} ${ir} 0 0 0 ${p(a0 + gap, ir)} Z `;
    if (wedge) lines += `M ${p(a0, ir)} L ${p(a0, r * 0.86)} `;
  }
  return `<g transform="rotate(${angle} ${cx} ${cy})">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${zest}"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.93}" fill="${ring}"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.88}" fill="${flesh}"/>
    <path d="${segsPath}" fill="${flesh}" stroke="${stroke}" stroke-width="${(r * 0.022).toFixed(2)}" stroke-opacity="0.55"/>
    <path d="${lines}" stroke="#ffffff" stroke-opacity="0.5" stroke-width="${(r * 0.02).toFixed(2)}"/>
    <ellipse cx="${cx - r * 0.22}" cy="${cy - r * 0.26}" rx="${r * 0.32}" ry="${r * 0.2}" fill="#ffffff" opacity="0.22" transform="rotate(-30 ${cx - r * 0.22} ${cy - r * 0.26})"/>
  </g>`;
}

/** A lime / lemon fruit seen from the side */
function fruit({ cx, cy, rx, ry, base = "#B8E54B", dark = "#8CBF2A", angle = 0 }) {
  return `<g transform="rotate(${angle} ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy + ry * 0.06}" rx="${rx}" ry="${ry}" fill="${dark}"/>
    <ellipse cx="${cx - rx * 0.04}" cy="${cy}" rx="${rx * 0.97}" ry="${ry * 0.96}" fill="${base}"/>
    <ellipse cx="${cx - rx * 0.3}" cy="${cy - ry * 0.36}" rx="${rx * 0.34}" ry="${ry * 0.22}" fill="#ffffff" opacity="0.35" transform="rotate(-28 ${cx - rx * 0.3} ${cy - ry * 0.36})"/>
    <circle cx="${cx + rx * 0.92}" cy="${cy}" r="${rx * 0.13}" fill="${dark}" opacity="0.55"/>
  </g>`;
}

function leaf({ x, y, len, rot = 0, fill = "#3E9B4B", dark = "#2C7A38" }) {
  const w = len * 0.42;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M0 0 C ${len * 0.34} ${-w} ${len * 0.78} ${-w * 0.55} ${len} 0 C ${len * 0.78} ${w * 0.55} ${len * 0.34} ${w} 0 0 Z" fill="${fill}"/>
    <path d="M${len * 0.02} 0 C ${len * 0.35} ${-w * 0.16} ${len * 0.72} ${-w * 0.06} ${len * 0.98} 0" stroke="${dark}" stroke-width="${(len * 0.02).toFixed(2)}" fill="none" opacity="0.7"/>
  </g>`;
}

/** Organic blob path around a center with given radii */
function blob(cx, cy, r, seed, squash = 1) {
  const rand = rnd(seed);
  const pts = [];
  const n = 8;
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.82 + rand() * 0.3);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * squash]);
  }
  // Catmull-Rom → cubic bézier
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i += 1) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Water-like liquid ribbon */
function liquid({ x, y, w, h, fill, opacity = 0.5 }) {
  return `<path d="M${x} ${y}
    C ${x + w * 0.2} ${y - h * 0.9} ${x + w * 0.34} ${y + h * 0.7} ${x + w * 0.55} ${y + h * 0.05}
    C ${x + w * 0.72} ${y - h * 0.55} ${x + w * 0.84} ${y + h * 0.6} ${x + w} ${y + h * 0.1}
    L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${fill}" opacity="${opacity}"/>`;
}

/** The shared SVG defs: soft blur, label gradients, grain */
function defs(extra = "") {
  return `<defs>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="soft20" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
    </filter>
    <filter id="drop" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="26" stdDeviation="26" flood-color="#0d2a1b" flood-opacity="0.22"/>
    </filter>
    <linearGradient id="bottleBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.45" stop-color="#F4FBEF"/>
      <stop offset="1" stop-color="#DDEFD2"/>
    </linearGradient>
    <linearGradient id="bottleGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="0.16" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="0.82" stop-color="#174D32" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#174D32" stop-opacity="0.16"/>
    </linearGradient>
    ${extra}
  </defs>`;
}

/** Grain overlay rect */
const grainOverlay = (w, h, opacity = 0.5) =>
  `<rect width="${w}" height="${h}" filter="url(#grain)" opacity="${opacity}" style="mix-blend-mode:multiply"/>`;

/* ------------------------------------------------------------------ */
/* the bottle                                                          */
/* ------------------------------------------------------------------ */

/**
 * Original CITRAVA bottle mockup.
 * Drawn in a 320 x 720 local space, centred at x=160, standing on y=690.
 */
function bottle({
  id,
  cap = C.deep,
  liquidTop = 240,
  liquid = "#B8E54B",
  liquid2 = "#65B832",
  labelBg = "#FAFBF6",
  labelInk = C.deep,
  accent = C.lemon,
  title = "JERUK NIPIS",
  sub = "",
  variant = "DAUN MINT",
  volume = "680 mL",
  badge = "CITRUS",
  withLeaf = true,
  floral = false,
}) {
  const labelBgId = `labelBg-${id}`;
  const liquidId = `liquid-${id}`;
  const shineId = `shine-${id}`;
  const capId = `cap-${id}`;
  const gradeId = `grade-${id}`;

  const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const lines = title.split(" ");
  const subtitle = sub || "SABUN CUCI PIRING";
  const line1 = esc(lines[0]);
  const line2 = esc(lines.slice(1).join(" "));
  const line2Size = Math.min(20, Math.max(12, Math.round(190 / Math.max(line2.length, 1)) * 2));

  return `<g filter="url(#drop)">
  <defs>
    <clipPath id="sil-${id}">
      <path d="M136 90 h48 v26 c34 10 56 30 56 62 v436 c0 14 -10 24 -24 24 h-96 c-14 0 -24 -10 -24 -24 v-436 c0 -32 22 -52 56 -62 v-26 z"/>
    </clipPath>
    <linearGradient id="${labelBgId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${labelBg}"/>
      <stop offset="1" stop-color="${labelBg}" stop-opacity="0.86"/>
    </linearGradient>
    <linearGradient id="${liquidId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${liquid}"/>
      <stop offset="1" stop-color="${liquid2}"/>
    </linearGradient>
    <linearGradient id="${shineId}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.0"/>
      <stop offset="0.12" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="0.3" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="0.62" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="0.9" stop-color="#174D32" stop-opacity="0.13"/>
      <stop offset="1" stop-color="#174D32" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="${capId}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${cap}" stop-opacity="0.72"/>
      <stop offset="0.2" stop-color="${cap}"/>
      <stop offset="0.72" stop-color="${cap}"/>
      <stop offset="1" stop-color="#0b2a1c"/>
    </linearGradient>
    <linearGradient id="${gradeId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#174D32" stop-opacity="0"/>
      <stop offset="1" stop-color="#174D32" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- contact shadow -->
  <ellipse cx="160" cy="664" rx="112" ry="16" fill="#174D32" opacity="0.16" filter="url(#soft20)"/>

  <!-- cap -->
  <path d="M128 34 h64 a8 8 0 0 1 8 8 v40 h-80 v-40 a8 8 0 0 1 8-8 z" fill="url(#${capId})"/>
  <rect x="120" y="74" width="80" height="16" rx="7" fill="${cap}"/>
  <rect x="120" y="74" width="80" height="5" rx="2.5" fill="#ffffff" opacity="0.18"/>
  <g opacity="0.28" fill="#ffffff">
    ${Array.from({ length: 4 }, (_, i) => `<rect x="${126 + i * 18}" y="40" width="3" height="34" rx="1.5"/>`).join("")}
  </g>

  <!-- neck + shoulder -->
  <path d="M136 90 h48 v26 c34 10 56 30 56 62 v36 h-196 v-36 c0-32 22-52 56-62 v-26 z" fill="url(#bottleBody)"/>

  <!-- liquid, clipped to the bottle silhouette -->
  <g clip-path="url(#sil-${id})">
    <path d="M100 ${liquidTop} h120 v360 h-120 z" fill="url(#${liquidId})" opacity="0.92"/>
    <path d="M100 ${liquidTop} c30 -10 90 -10 120 0 v16 c-30 10 -90 10 -120 0 z" fill="#ffffff" opacity="0.4"/>
  </g>

  <!-- body -->
  <path d="M92 178 c34 -10 102 -10 136 0 c4 20 4 42 4 62 v404 c0 14 -10 24 -24 24 h-96 c-14 0 -24 -10 -24 -24 v-404 c0 -20 0 -42 4 -62 z" fill="url(#bottleGlow)" opacity="0.96"/>

  <!-- embossed ribs -->
  <g opacity="0.25" stroke="#174D32" stroke-width="2">
    ${[0, 1, 2].map((i) => `<path d="M${96 + i * 6} 230 v330" opacity="0.2"/>`).join("")}
    ${[0, 1, 2].map((i) => `<path d="M${214 + i * 6} 230 v330" opacity="0.2"/>`).join("")}
  </g>

  <!-- specular highlight -->
  <rect x="108" y="206" width="20" height="400" rx="10" fill="#ffffff" opacity="0.55" filter="url(#soft20)"/>
  <rect x="112" y="220" width="7" height="360" rx="3.5" fill="#ffffff" opacity="0.9"/>

  <!-- label -->
  <g clip-path="url(#labelClip-${id})">
    <clipPath id="labelClip-${id}"><rect x="88" y="236" width="144" height="286" rx="14"/></clipPath>
    <rect x="88" y="236" width="144" height="286" rx="14" fill="url(#${labelBgId})"/>
    <!-- top citrus band -->
    <rect x="88" y="236" width="144" height="56" fill="${accent}" opacity="0.95"/>
    ${citrus({ cx: 214, cy: 260, r: 21, flesh: "#FFF3B0", zest: C.lemon, ring: "#FFFCEB", angle: 12 })}
    <text x="100" y="256" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="11" font-weight="900" fill="${labelInk}" letter-spacing="2.2">CITRAVA</text>
    <text x="100" y="272" font-family="Arial, Helvetica, sans-serif" font-size="6.4" font-weight="700" fill="${labelInk}" letter-spacing="1.5" opacity="0.72">${esc(badge)}</text>

    <!-- product name -->
    <text x="160" y="336" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="20" font-weight="900" fill="${labelInk}" letter-spacing="-0.4">${line1}</text>
    <text x="160" y="358" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${line2Size}" font-weight="900" fill="${labelInk}" letter-spacing="-0.4">${line2}</text>
    <text x="160" y="378" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="6.6" font-weight="700" fill="${labelInk}" letter-spacing="1.4" opacity="0.7">${esc(subtitle)}</text>

    <line x1="112" y1="394" x2="208" y2="394" stroke="${labelInk}" stroke-opacity="0.16" stroke-width="1"/>

    <!-- variant -->
    <text x="160" y="414" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8.6" font-weight="700" fill="${labelInk}" letter-spacing="0.9">${esc(variant)}</text>
    <g transform="translate(122 426)">
      ${withLeaf ? leaf({ x: 0, y: 0, len: 18, rot: 8, fill: "#4CAF50", dark: "#2C7A38" }) : ""}
      ${withLeaf ? leaf({ x: 30, y: -4, len: 16, rot: 150, fill: "#65B832", dark: "#2C7A38" }) : ""}
      ${!withLeaf ? citrus({ cx: 36, cy: 8, r: 16, flesh: C.lemon, zest: C.lemon, ring: "#FFF6C9", angle: -18 }) : ""}
    </g>

    <!-- volume pill -->
    <rect x="112" y="472" width="96" height="26" rx="13" fill="${labelInk}"/>
    <text x="160" y="489" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9.4" font-weight="700" fill="${labelBg}" letter-spacing="0.8">${esc(volume)}</text>

    ${floral ? `<g opacity="0.5">${fruit({ cx: 112, cy: 440, rx: 9, ry: 8, base: "#8FBF6A", dark: "#618C41", angle: -20 })}</g>` : ""}
  </g>
  <rect x="88" y="236" width="144" height="286" rx="14" fill="none" stroke="${labelInk}" stroke-opacity="0.1" stroke-width="1"/>

  <!-- bottom reflection -->
  <path d="M92 612 c34 8 102 8 136 0 v32 c0 14 -10 24 -24 24 h-96 c-14 0 -24 -10 -24 -24 z" fill="url(#${gradeId})" opacity="0.5"/>
  <ellipse cx="160" cy="640" rx="60" ry="4" fill="#ffffff" opacity="0.35"/>
</g>`;
}

/* ------------------------------------------------------------------ */
/* product packshots                                                   */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    file: "mama-lemon-jeruk-nipis",
    bg: ["#F3FFE3", "#D8F0BC"],
    accent: C.lime,
    bottle: {
      liquid: "#C8ED54",
      liquid2: "#65B832",
      labelBg: "#FBFDF4",
      labelInk: C.deep,
      accent: C.lime,
      title: "JERUK NIPIS",
      variant: "LIME EXTRACT",
      volume: "680 mL",
      badge: "DISHWASHING",
    },
    decor: "lime",
  },
  {
    file: "mama-lemon-lemon-mint",
    bg: ["#EEFBF3", "#C8EBD4"],
    accent: "#8FD9A8",
    bottle: {
      liquid: "#9ADF8A",
      liquid2: "#3F9A5B",
      labelBg: "#F7FDF8",
      labelInk: "#0F3D2B",
      accent: "#8FDC9E",
      title: "LEMON &",
      sub: "SABUN CUCI PIRING",
      variant: "DAUN MINT",
      volume: "680 mL",
      badge: "DISHWASHING",
    },
    decor: "mint",
  },
  {
    file: "mama-lemon-japanese-yuzu",
    bg: ["#FFF9DC", "#F6E48E"],
    accent: C.lemon,
    bottle: {
      liquid: "#F7D84E",
      liquid2: "#E0A81F",
      labelBg: "#FFFDF2",
      labelInk: "#4A3608",
      accent: C.lemon,
      title: "JAPANESE",
      sub: "YUZU & JERUK NIPIS",
      variant: "SABUN CUCI PIRING",
      volume: "680 mL",
      badge: "YUZU SERIES",
    },
    decor: "yuzu",
  },
  {
    file: "mama-lemon-stain-remover",
    bg: ["#FFF2DE", "#F5D3A1"],
    accent: "#F0A24B",
    bottle: {
      liquid: "#F2B46A",
      liquid2: "#C77A26",
      labelBg: "#FFFBF4",
      labelInk: "#4A2E10",
      accent: "#F3AE5B",
      title: "STAIN",
      sub: "PEMBERSIH DAPUR",
      variant: "MULTI PURPOSE",
      volume: "500 g",
      badge: "KITCHEN CARE",
      withLeaf: false,
      floral: true,
    },
    decor: "amber",
  },
  {
    file: "mama-lime-mineral-salt",
    bg: ["#E6FAF0", "#B7E7D0"],
    accent: "#37B98C",
    bottle: {
      liquid: "#5FD9AE",
      liquid2: "#1E9B78",
      labelBg: "#F6FFFB",
      labelInk: "#0C3B33",
      accent: "#4FD3A6",
      title: "MINERAL",
      sub: "SABUN CUCI PIRING",
      variant: "GARAM MINERAL",
      volume: "680 mL",
      badge: "LIME SERIES",
    },
    decor: "mineral",
  },
  {
    file: "mama-lime-charcoal",
    bg: ["#E8ECEA", "#B9C6C0"],
    accent: "#5E7C70",
    bottle: {
      liquid: "#5C6F68",
      liquid2: "#26332D",
      labelBg: "#F4F7F5",
      labelInk: "#182420",
      accent: "#7C948A",
      title: "CHARCOAL",
      sub: "SABUN CUCI PIRING",
      variant: "ARANG AKTIF",
      volume: "680 mL",
      badge: "LIME SERIES",
      withLeaf: false,
    },
    decor: "charcoal",
  },
  {
    file: "mama-lime-green-tea",
    bg: ["#F2F7E4", "#D3DFB2"],
    accent: "#9DB35B",
    bottle: {
      liquid: "#B9CC72",
      liquid2: "#6E8C33",
      labelBg: "#FBFCF2",
      labelInk: "#2E3A14",
      accent: "#B4C972",
      title: "GREEN TEA",
      sub: "SABUN CUCI PIRING",
      variant: "HABBATUSSAUDA",
      volume: "680 mL",
      badge: "LIME SERIES",
      floral: true,
    },
    decor: "tea",
  },
];

function productDecor(kind) {
  switch (kind) {
    case "lime":
      return `
        ${citrus({ cx: 168, cy: 174, r: 66, flesh: "#D7F26B", zest: "#9ED12F", ring: "#F2FCD2", angle: -18 })}
        ${fruit({ cx: 470, cy: 152, rx: 44, ry: 40, base: "#B8E54B", dark: "#7FAF22", angle: 18 })}
        ${leaf({ x: 492, y: 122, len: 52, rot: -32, fill: "#4CAF50", dark: "#2C7A38" })}
        ${leaf({ x: 300, y: 468, len: 62, rot: 24, fill: "#65B832", dark: "#2C7A38" })}`;
    case "mint":
      return `
        ${leaf({ x: 96, y: 420, len: 96, rot: 34, fill: "#5FBF7C", dark: "#2F8049" })}
        ${leaf({ x: 60, y: 380, len: 70, rot: -26, fill: "#7FD096", dark: "#2F8049" })}
        ${citrus({ cx: 470, cy: 470, r: 54, flesh: "#C8F0B8", zest: "#5FAE76", ring: "#EFFBEB", angle: 12 })}
        ${bubbles(31, { x: 40, y: 80, w: 480, h: 120, count: 9, min: 5, max: 18, color: "#ffffff" })}`;
    case "yuzu":
      return `
        ${citrus({ cx: 300, cy: 520, r: 78, flesh: "#FCE66A", zest: "#E9B62A", ring: "#FFF8CE", angle: -8 })}
        ${fruit({ cx: 118, cy: 190, rx: 40, ry: 36, base: "#F8D940", dark: "#DDAF1C", angle: -22 })}
        ${leaf({ x: 140, y: 160, len: 48, rot: -54, fill: "#65B832", dark: "#2C7A38" })}
        ${glow(430, 200, 90, "#FFF8CE", 0.7)}`;
    case "amber":
      return `
        ${glow(380, 220, 110, "#FFE7BF", 0.85)}
        ${fruit({ cx: 116, cy: 460, rx: 34, ry: 30, base: "#F2B46A", dark: "#C77A26", angle: 30 })}
        ${bubbles(52, { x: 30, y: 60, w: 500, h: 220, count: 12, min: 6, max: 26, color: "#FFF6E6" })}
        ${leaf({ x: 452, y: 470, len: 66, rot: 208, fill: "#7FAE57", dark: "#4B7133" })}`;
    case "mineral":
      return `
        ${citrus({ cx: 300, cy: 200, r: 60, flesh: "#A8F0D2", zest: "#2FB68C", ring: "#E9FFF7", angle: 24 })}
        ${Array.from({ length: 7 }, (_, i) => `<circle cx="${64 + i * 41}" cy="${474 + (i % 2) * 16}" r="${8 + (i % 3) * 5}" fill="#ffffff" opacity="0.5"/>`).join("")}
        ${bubbles(77, { x: 30, y: 60, w: 520, h: 180, count: 10, min: 5, max: 22, color: "#EFFFF9" })}
        ${leaf({ x: 420, y: 120, len: 58, rot: -20, fill: "#3FBF95", dark: "#1C8065" })}`;
    case "charcoal":
      return `
        ${Array.from({ length: 18 }, (_, i) => {
          const a = (i / 18) * Math.PI * 2;
          return `<circle cx="${300 + Math.cos(a) * (170 + (i % 3) * 16)}" cy="${300 + Math.sin(a) * (150 + (i % 4) * 12)}" r="${5 + (i % 4) * 6}" fill="#174D32" opacity="${0.12 + (i % 3) * 0.05}"/>`;
        }).join("")}
        ${glow(170, 470, 90, "#8FA79B", 0.5)}
        ${glow(440, 180, 80, "#CFE0D8", 0.6)}`;
    case "tea":
      return `
        ${leaf({ x: 70, y: 150, len: 86, rot: 28, fill: "#9DB35B", dark: "#657A2F" })}
        ${leaf({ x: 452, y: 430, len: 74, rot: 196, fill: "#B4C972", dark: "#657A2F" })}
        ${citrus({ cx: 300, cy: 516, r: 58, flesh: "#E4F0B8", zest: "#9DB35B", ring: "#F7FBE8", angle: -14 })}
        ${bubbles(91, { x: 300, y: 60, w: 240, h: 140, count: 8, min: 5, max: 18, color: "#FFFFFF" })}`;
    default:
      return "";
  }
}

function packshot(p) {
  const [bg0, bg1] = p.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="1200" height="1200" role="img">
  ${defs(`<linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="${bg0}"/><stop offset="1" stop-color="${bg1}"/></linearGradient>`)}
  <rect width="600" height="600" fill="url(#bg)"/>
  <path d="${blob(300, 320, 236, p.file.length * 13, 0.92)}" fill="#ffffff" opacity="0.5"/>
  <path d="${blob(300, 330, 190, p.file.length * 7, 0.95)}" fill="${p.accent}" opacity="0.18"/>
  ${productDecor(p.decor)}
  <g transform="translate(178 22) scale(0.8)">
    ${bottle({ id: p.file, ...p.bottle })}
  </g>
  ${bubbles(p.file.length * 3, { x: 30, y: 380, w: 200, h: 200, count: 8, min: 4, max: 15, color: "#ffffff" })}
  ${grainOverlay(600, 600, 0.35)}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

function hero() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1600" height="1600" role="img">
  ${defs(`<linearGradient id="heroBg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#FFFDF3"/><stop offset="0.55" stop-color="#F0FADF"/><stop offset="1" stop-color="#D6F0BC"/>
    </linearGradient>`)}
  <rect width="1000" height="1000" fill="url(#heroBg)"/>
  <path d="${blob(510, 470, 360, 21, 0.96)}" fill="#ffffff" opacity="0.55"/>
  <path d="${blob(500, 520, 300, 44, 0.9)}" fill="#B8E54B" opacity="0.35"/>
  <path d="${blob(640, 360, 210, 8, 0.95)}" fill="#F8D940" opacity="0.35"/>
  <circle cx="500" cy="556" r="258" fill="#ffffff" opacity="0.5"/>
  <circle cx="500" cy="560" r="252" fill="none" stroke="#65B832" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="2 14"/>

  <!-- light pool -->
  ${glow(760, 250, 180, "#FFFFFF", 0.9)}
  ${glow(260, 780, 200, "#F8D940", 0.4)}

  <!-- floating fruit -->
  ${citrus({ cx: 246, cy: 236, r: 84, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: -16 })}
  ${citrus({ cx: 742, cy: 620, r: 66, flesh: "#FBE778", zest: "#E9B62A", ring: "#FFF8CE", angle: 22 })}
  ${fruit({ cx: 800, cy: 296, rx: 57, ry: 52, base: "#C4EA59", dark: "#86B728", angle: 22 })}
  ${fruit({ cx: 214, cy: 660, rx: 44, ry: 40, base: "#F8D940", dark: "#DDAF1C", angle: -18 })}
  ${leaf({ x: 820, y: 262, len: 76, rot: -44, fill: "#4CAF50", dark: "#2C7A38" })}
  ${leaf({ x: 196, y: 640, len: 66, rot: 152, fill: "#65B832", dark: "#2C7A38" })}
  ${leaf({ x: 300, y: 760, len: 80, rot: -16, fill: "#3E9B4B", dark: "#245F2E" })}

  <!-- liquid splash -->
  ${liquid({ x: 80, y: 872, w: 840, h: 84, fill: "#B8E54B", opacity: 0.32 })}
  ${liquid({ x: 40, y: 902, w: 920, h: 70, fill: "#65B832", opacity: 0.24 })}

  <!-- bubbles -->
  ${bubbles(5, { x: 120, y: 120, w: 760, h: 620, count: 22, min: 6, max: 46, color: "#ffffff" })}

  <!-- the star product -->
  <g transform="translate(250 196) scale(0.78)">
    ${bottle({
      id: "hero",
      liquid: "#C8ED54",
      liquid2: "#5CB02C",
      labelBg: "#FBFDF4",
      labelInk: "#174D32",
      accent: "#B8E54B",
      title: "JERUK NIPIS",
      sub: "SABUN CUCI PIRING",
      variant: "LIME EXTRACT",
      volume: "680 mL",
      badge: "CITRUS POWER",
    })}
  </g>

  <!-- secondary pack, behind/right -->
  <g transform="translate(548 330) scale(0.62) rotate(7 160 360)" opacity="0.98">
    ${bottle({
      id: "hero2",
      cap: "#174D32",
      liquid: "#F7D84E",
      liquid2: "#DFA61C",
      labelBg: "#FFFDF2",
      labelInk: "#4A3608",
      accent: "#F8D940",
      title: "JAPANESE",
      sub: "YUZU & JERUK NIPIS",
      variant: "YUZU SERIES",
      volume: "680 mL",
      badge: "YUZU LIMITED",
    })}
  </g>

  ${grainOverlay(1000, 1000, 0.3)}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* editorial scenes                                                    */
/* ------------------------------------------------------------------ */

function kitchenScene() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1600" height="1200" role="img">
  ${defs(`<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFDF4"/><stop offset="1" stop-color="#EFF7E3"/></linearGradient>
    <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F3E6"/><stop offset="1" stop-color="#E4EEDB"/></linearGradient>`)}
  <rect width="1200" height="900" fill="url(#wall)"/>
  <!-- tiled wall -->
  <g stroke="#174D32" stroke-opacity="0.07" stroke-width="2">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${40 + i * 74}" x2="1200" y2="${40 + i * 74}"/>`).join("")}
    ${Array.from({ length: 15 }, (_, i) => `<line x1="${40 + i * 82}" y1="40" x2="${40 + i * 82}" y2="560"/>`).join("")}
  </g>
  <!-- window light -->
  <rect x="700" y="40" width="380" height="440" rx="24" fill="#FDFEF7" opacity="0.9"/>
  <rect x="700" y="40" width="380" height="440" rx="24" fill="none" stroke="#174D32" stroke-opacity="0.1" stroke-width="6"/>
  <path d="M890 40 v440 M700 260 h380" stroke="#174D32" stroke-opacity="0.1" stroke-width="6"/>
  ${glow(900, 200, 150, "#FFF6C9", 0.8)}
  <!-- counter -->
  <rect x="0" y="560" width="1200" height="40" fill="#DDE7D3"/>
  <rect x="0" y="600" width="1200" height="300" fill="url(#counter)"/>
  <rect x="0" y="600" width="1200" height="10" fill="#174D32" opacity="0.08"/>
  <!-- sink -->
  <rect x="690" y="600" width="380" height="180" rx="26" fill="#C9D6C5"/>
  <rect x="706" y="616" width="348" height="148" rx="18" fill="#E8F0E4"/>
  <rect x="706" y="616" width="348" height="24" rx="12" fill="#174D32" opacity="0.07"/>
  <path d="M880 420 v70 c0 18 -14 32 -32 32 h-30" stroke="#7C948A" stroke-width="14" fill="none" stroke-linecap="round"/>
  <!-- dishes -->
  ${[0, 1, 2].map((i) => `<ellipse cx="${180 + i * 20}" cy="${620 - i * 26}" rx="${128 - i * 12}" ry="${18 - i * 2}" fill="#FFFFFF" stroke="#174D32" stroke-opacity="0.08" stroke-width="2"/>`).join("")}
  <!-- product -->
  <g transform="translate(430 170) scale(0.72)">
    ${bottle({
      id: "about",
      liquid: "#C8ED54",
      liquid2: "#5CB02C",
      labelBg: "#FBFDF4",
      labelInk: "#174D32",
      accent: "#B8E54B",
      title: "JERUK NIPIS",
      sub: "SABUN CUCI PIRING",
      variant: "LIME EXTRACT",
      volume: "680 mL",
      badge: "CITRUS POWER",
    })}
  </g>
  <!-- bowl of citrus -->
  <ellipse cx="960" cy="590" rx="120" ry="30" fill="#FFFFFF" opacity="0.9"/>
  <path d="M840 590 c0 60 50 84 120 84 s120 -24 120 -84 z" fill="#F2F7E6" stroke="#174D32" stroke-opacity="0.08" stroke-width="3"/>
  ${fruit({ cx: 910, cy: 574, rx: 34, ry: 31, base: "#B8E54B", dark: "#7FAF22", angle: -14 })}
  ${fruit({ cx: 972, cy: 566, rx: 32, ry: 29, base: "#F8D940", dark: "#DDAF1C", angle: 20 })}
  ${fruit({ cx: 1024, cy: 578, rx: 28, ry: 26, base: "#C4EA59", dark: "#86B728", angle: 44 })}
  ${leaf({ x: 900, y: 552, len: 46, rot: -52, fill: "#4CAF50", dark: "#2C7A38" })}
  <!-- plant -->
  <path d="M120 600 h120 l-12 150 h-96 z" fill="#E7D9B8"/>
  ${leaf({ x: 176, y: 600, len: 120, rot: -104, fill: "#4E9E55", dark: "#2C6B33" })}
  ${leaf({ x: 176, y: 600, len: 150, rot: -72, fill: "#65B832", dark: "#2C6B33" })}
  ${leaf({ x: 180, y: 600, len: 100, rot: -128, fill: "#3E9B4B", dark: "#245F2E" })}
  <!-- bubbles -->
  ${bubbles(12, { x: 700, y: 480, w: 360, h: 120, count: 10, min: 5, max: 20, color: "#ffffff" })}
  ${grainOverlay(1200, 900, 0.28)}
</svg>`;
}

function sinkScene() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1600" height="1200" role="img">
  ${defs(`<linearGradient id="bg2" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stop-color="#E9F8EC"/><stop offset="1" stop-color="#BFE3C8"/></linearGradient>`)}
  <rect width="1200" height="900" fill="url(#bg2)"/>
  <circle cx="980" cy="140" r="220" fill="#FFF7CF" opacity="0.5"/>
  <rect x="0" y="540" width="1200" height="360" fill="#F5F8EE"/>
  <rect x="90" y="560" width="1020" height="300" rx="40" fill="#CBD9CB"/>
  <rect x="116" y="586" width="968" height="248" rx="28" fill="#E9F2E7"/>
  <path d="M600 386 v116 c0 26 -20 46 -46 46 h-46" stroke="#93A79B" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M508 548 v-40" stroke="#93A79B" stroke-width="12" stroke-linecap="round"/>
  <!-- water stream + bubbles -->
  <path d="M508 556 c4 30 -6 60 2 90" stroke="#BFE9F5" stroke-width="10" fill="none" opacity="0.8"/>
  ${bubbles(31, { x: 160, y: 580, w: 880, h: 240, count: 26, min: 8, max: 54, color: "#ffffff" })}
  <!-- plates in the suds -->
  ${[0, 1, 2, 3].map((i) => `<ellipse cx="${330 + i * 16}" cy="${740 - i * 18}" rx="${150 - i * 8}" ry="${22 - i * 2}" fill="#FFFFFF" opacity="0.95" stroke="#174D32" stroke-opacity="0.06" stroke-width="3"/>`).join("")}
  <!-- hands-free product -->
  <g transform="translate(790 120) scale(0.62)">
    ${bottle({
      id: "sink",
      liquid: "#C8ED54",
      liquid2: "#5CB02C",
      labelBg: "#FBFDF4",
      labelInk: "#174D32",
      accent: "#B8E54B",
      title: "JERUK NIPIS",
      sub: "SABUN CUCI PIRING",
      variant: "LIME EXTRACT",
      volume: "1 L",
      badge: "REFILL READY",
    })}
  </g>
  ${citrus({ cx: 180, cy: 200, r: 78, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: -12 })}
  ${leaf({ x: 250, y: 150, len: 74, rot: -38, fill: "#4CAF50", dark: "#2C7A38" })}
  ${grainOverlay(1200, 900, 0.28)}
</svg>`;
}

function lifestyleScene({ file, kicker, palette, motif }) {
  const [bg0, bg1, accent] = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" width="1200" height="933" role="img">
  ${defs(`<linearGradient id="lbg-${file}" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${bg0}"/><stop offset="1" stop-color="${bg1}"/></linearGradient>`)}
  <rect width="900" height="700" fill="url(#lbg-${file})"/>
  <circle cx="720" cy="150" r="180" fill="#ffffff" opacity="0.35"/>
  <path d="${blob(450, 470, 300, file.length * 17, 0.5)}" fill="${accent}" opacity="0.22"/>
  <path d="M0 520 h900 v180 h-900 z" fill="#ffffff" opacity="0.35"/>
  ${motif}
  <g transform="translate(34 28)">
    <rect x="0" y="0" width="196" height="34" rx="17" fill="#FFFFFF" opacity="0.72"/>
    <text x="98" y="22" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10.5" font-weight="700" fill="${C.deep}" letter-spacing="2.2">${kicker}</text>
  </g>
  ${grainOverlay(900, 700, 0.3)}
</svg>`;
}

const LIFESTYLE = [
  {
    file: "tips-mencuci-piring",
    title: "Tips Mencuci Piring",
    kicker: "ROUTINE",
    palette: ["#F7FFE9", "#DDF0C4", "#B8E54B"],
    motif: `
      <g transform="translate(300 150) scale(0.78)">
        ${bottle({ id: "life1", liquid: "#C8ED54", liquid2: "#5CB02C", labelBg: "#FBFDF4", labelInk: "#174D32", accent: "#B8E54B", title: "JERUK NIPIS", sub: "SABUN CUCI PIRING", variant: "LIME EXTRACT", volume: "680 mL", badge: "CITRUS POWER" })}
      </g>
      ${citrus({ cx: 700, cy: 240, r: 92, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: -16 })}
      ${leaf({ x: 780, y: 300, len: 96, rot: 26, fill: "#4CAF50", dark: "#2C7A38" })}
      ${bubbles(21, { x: 80, y: 200, w: 700, h: 300, count: 16, min: 6, max: 30, color: "#ffffff" })}`,
  },
  {
    file: "merawat-peralatan-dapur",
    title: "Merawat Peralatan Dapur",
    kicker: "KITCHEN CARE",
    palette: ["#FFF9E6", "#F6E7AE", "#F8D940"],
    motif: `
      <g stroke="${C.deep}" stroke-opacity="0.16" stroke-width="10" fill="none" stroke-linecap="round">
        <path d="M300 540 v-160 a70 70 0 0 1 140 0 v160"/>
        <path d="M370 310 v-40"/>
        <path d="M560 560 c0 -110 80 -200 180 -200"/>
      </g>
      <g transform="translate(430 240) scale(0.52)">
        ${bottle({ id: "life2", liquid: "#F2B46A", liquid2: "#C77A26", labelBg: "#FFFBF4", labelInk: "#4A2E10", accent: "#F3AE5B", title: "STAIN", sub: "PEMBERSIH DAPUR", variant: "MULTI PURPOSE", volume: "500 g", badge: "KITCHEN CARE", withLeaf: false, floral: true })}
      </g>
      ${citrus({ cx: 720, cy: 470, r: 62, flesh: "#FCE66A", zest: "#E9B62A", ring: "#FFF8CE", angle: 20 })}
      ${leaf({ x: 700, y: 250, len: 72, rot: 40, fill: "#7FAE57", dark: "#4B7133" })}`,
  },
  {
    file: "area-memasak-bersih",
    title: "Area Memasak Bersih",
    kicker: "HABIT",
    palette: ["#E8FAF1", "#C3E8D2", "#4FD3A6"],
    motif: `
      <g stroke="#174D32" stroke-opacity="0.14" stroke-width="3">
        ${Array.from({ length: 6 }, (_, i) => `<line x1="480" y1="${140 + i * 60}" x2="900" y2="${140 + i * 60}"/>`).join("")}
        ${Array.from({ length: 5 }, (_, i) => `<line x1="${480 + i * 105}" y1="140" x2="${480 + i * 105}" y2="440"/>`).join("")}
      </g>
      <g transform="translate(190 170) scale(0.74)">
        ${bottle({ id: "life3", liquid: "#5FD9AE", liquid2: "#1E9B78", labelBg: "#F6FFFB", labelInk: "#0C3B33", accent: "#4FD3A6", title: "MINERAL", sub: "SABUN CUCI PIRING", variant: "GARAM MINERAL", volume: "680 mL", badge: "LIME SERIES" })}
      </g>
      ${fruit({ cx: 750, cy: 520, rx: 46, ry: 42, base: "#B8E54B", dark: "#7FAF22", angle: -18 })}
      ${leaf({ x: 760, y: 486, len: 62, rot: -48, fill: "#3FBF95", dark: "#1C8065" })}`,
  },
  {
    file: "noda-lemak",
    title: "Noda Lemak? Tenang.",
    kicker: "PROBLEM / SOLVED",
    palette: ["#EFF3EF", "#C7D3CB", "#7C948A"],
    motif: `
      <g transform="translate(250 160) scale(0.74)">
        ${bottle({ id: "life4", liquid: "#5C6F68", liquid2: "#26332D", labelBg: "#F4F7F5", labelInk: "#182420", accent: "#7C948A", title: "CHARCOAL", sub: "SABUN CUCI PIRING", variant: "ARANG AKTIF", volume: "680 mL", badge: "LIME SERIES", withLeaf: false })}
      </g>
      ${Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return `<circle cx="${700 + Math.cos(a) * 90}" cy="${360 + Math.sin(a) * 90}" r="${6 + (i % 4) * 5}" fill="#174D32" opacity="0.16"/>`;
      }).join("")}
      ${glow(700, 360, 110, "#ffffff", 0.8)}
      ${citrus({ cx: 176, cy: 520, r: 54, flesh: "#DDF0E6", zest: "#7C948A", ring: "#F2FAF5", angle: 10 })}`,
  },
];

/* ------------------------------------------------------------------ */
/* article covers                                                      */
/* ------------------------------------------------------------------ */

function articleCover({ file, kicker, tone, motif }) {
  const [a, b] = tone;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="1600" height="1013" role="img">
  ${defs(`<linearGradient id="ac-${file}" x1="0" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`)}
  <rect width="1200" height="760" fill="url(#ac-${file})"/>
  <path d="${blob(920, 620, 330, file.length * 11, 0.6)}" fill="#ffffff" opacity="0.16"/>
  <path d="${blob(200, 120, 260, file.length * 5, 0.7)}" fill="#ffffff" opacity="0.2"/>
  ${motif}
  <g transform="translate(72 72)">
    <rect width="220" height="38" rx="19" fill="#FFFFFF" opacity="0.82"/>
    <text x="110" y="25" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="${C.deep}" letter-spacing="2.2">${kicker}</text>
  </g>

  ${grainOverlay(1200, 760, 0.22)}
</svg>`;
}

const ARTICLES = [
  {
    file: "artikel-lemak",
    title: "Angkat Lemak",
    kicker: "TIPS DAPUR",
    tone: ["#3E7A4E", "#174D32"],
    motif: `
      ${citrus({ cx: 940, cy: 300, r: 170, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: -12 })}
      <g transform="translate(330 110) scale(0.62) rotate(-8 160 360)">
        ${bottle({ id: "art1", liquid: "#C8ED54", liquid2: "#5CB02C", labelBg: "#FBFDF4", labelInk: "#174D32", accent: "#B8E54B", title: "JERUK NIPIS", sub: "SABUN CUCI PIRING", variant: "LIME EXTRACT", volume: "680 mL", badge: "CITRUS POWER" })}
      </g>
      ${bubbles(61, { x: 620, y: 80, w: 500, h: 500, count: 14, min: 8, max: 40, color: "#ffffff" })}`,
  },
  {
    file: "artikel-citrus",
    title: "Aroma Citrus",
    kicker: "AROMA STORY",
    tone: ["#F8D940", "#E9A91C"],
    motif: `
      ${citrus({ cx: 860, cy: 340, r: 190, flesh: "#FFF6C9", zest: "#E9B62A", ring: "#FFFDF0", angle: 8 })}
      ${fruit({ cx: 520, cy: 470, rx: 90, ry: 82, base: "#B8E54B", dark: "#7FAF22", angle: -18 })}
      ${leaf({ x: 590, y: 400, len: 130, rot: -46, fill: "#4CAF50", dark: "#2C7A38" })}
      ${glow(300, 200, 160, "#FFF6C9", 0.8)}`,
  },
  {
    file: "artikel-dapur",
    title: "Ritme Dapur",
    kicker: "LIFESTYLE",
    tone: ["#5B8C74", "#1E4436"],
    motif: `
      <g stroke="#FFFFFF" stroke-opacity="0.24" stroke-width="3">
        ${Array.from({ length: 6 }, (_, i) => `<line x1="660" y1="${120 + i * 90}" x2="1200" y2="${120 + i * 90}"/>`).join("")}
        ${Array.from({ length: 6 }, (_, i) => `<line x1="${660 + i * 100}" y1="120" x2="${660 + i * 100}" y2="660"/>`).join("")}
      </g>
      <g transform="translate(200 120) scale(0.66)">
        ${bottle({ id: "art3", liquid: "#C8ED54", liquid2: "#5CB02C", labelBg: "#FBFDF4", labelInk: "#174D32", accent: "#B8E54B", title: "JERUK NIPIS", sub: "SABUN CUCI PIRING", variant: "LIME EXTRACT", volume: "680 ml", badge: "CITRUS POWER" })}
      </g>
      ${citrus({ cx: 1080, cy: 200, r: 80, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: 18 })}`,
  },
];

/* ------------------------------------------------------------------ */
/* brand + og                                                          */
/* ------------------------------------------------------------------ */

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B8E54B"/><stop offset="1" stop-color="#65B832"/></linearGradient></defs>
  <rect width="64" height="64" rx="18" fill="#174D32"/>
  <circle cx="28" cy="34" r="16" fill="url(#lg)"/>
  <circle cx="28" cy="34" r="11.6" fill="#FAFBF6"/>
  <g stroke="#65B832" stroke-width="1.6" stroke-opacity="0.65" stroke-linecap="round">
    <path d="M28 23.4 v10.6"/><path d="M17.6 30 l10.4 3.6"/><path d="M22 40.6 l5.6 -7.5"/>
  </g>
  <path d="M28 22.4 A11.6 11.6 0 0 1 39.6 34 L28 34 Z" fill="#F8D940"/>
  <path d="M26 15 c7 -7 15 -5 16 2 c-6 6 -14 5 -16 -2 z" fill="#4FA83A"/>
  <circle cx="47" cy="47" r="6.4" fill="#FAFBF6"/>
  <circle cx="45.4" cy="45.4" r="1.9" fill="#B8E54B"/>
</svg>`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <rect width="48" height="48" rx="12" fill="#174D32"/>
  <circle cx="18" cy="23" r="11" fill="#B8E54B"/>
  <circle cx="18" cy="23" r="7.5" fill="#174D32"/>
  <path d="M18 15.5 A7.5 7.5 0 0 1 25.5 23 L18 23 Z" fill="#F8D940"/>
  <circle cx="36" cy="34" r="5" fill="#FAFBF6"/>
</svg>`;
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img">
  ${defs(`<linearGradient id="ogbg" x1="0" y1="0" x2="0.9" y2="1"><stop offset="0" stop-color="#174D32"/><stop offset="0.62" stop-color="#1F5C3C"/><stop offset="1" stop-color="#2D7A45"/></linearGradient>`)}
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  ${glow(980, 200, 240, "#B8E54B", 0.28)}
  ${glow(220, 560, 220, "#F8D940", 0.16)}
  <path d="${blob(1000, 430, 280, 9, 0.8)}" fill="#B8E54B" opacity="0.16"/>
  <g transform="translate(80 84)">
    <circle cx="0" cy="0" r="0" fill="none"/>
    <text x="0" y="42" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="46" font-weight="900" fill="#FAFBF6" letter-spacing="4">CITRAVA</text>
    <rect x="0" y="62" width="84" height="6" rx="3" fill="#B8E54B"/>
  </g>
  <text x="80" y="290" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" fill="#FFFFFF" letter-spacing="-2">Dapur Bersih.</text>
  <text x="80" y="376" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="76" font-weight="900" fill="#B8E54B" letter-spacing="-2">Hidup Lebih Segar.</text>
  <text x="80" y="452" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="400" fill="#E9F5E0" opacity="0.86">Bersih Maksimal, Segar Setiap Hari.</text>
  <rect x="80" y="500" width="232" height="58" rx="29" fill="#F8D940"/>
  <text x="196" y="537" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" fill="#17251B">Jelajahi Produk</text>
  ${citrus({ cx: 986, cy: 330, r: 150, flesh: "#D9F46E", zest: "#9ED12F", ring: "#F3FDD4", angle: -14 })}
  ${leaf({ x: 1040, y: 210, len: 120, rot: -38, fill: "#4CAF50", dark: "#2C7A38" })}
  ${bubbles(8, { x: 820, y: 60, w: 340, h: 500, count: 12, min: 6, max: 26, color: "#ffffff" })}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* write                                                               */
/* ------------------------------------------------------------------ */

const files = [];

files.push([join(OUT, "hero", "hero-product.svg"), hero()]);

for (const p of PRODUCTS) {
  files.push([join(OUT, "products", `${p.file}.svg`), packshot(p)]);
}

files.push([join(OUT, "lifestyle", "tentang-dapur.svg"), kitchenScene()]);
files.push([join(OUT, "lifestyle", "dapur-bersih.svg"), sinkScene()]);

for (const l of LIFESTYLE) {
  files.push([join(OUT, "lifestyle", `${l.file}.svg`), lifestyleScene(l)]);
}

for (const a of ARTICLES) {
  files.push([join(OUT, "articles", `${a.file}.svg`), articleCover(a)]);
}

files.push([join(OUT, "brand", "logo-mark.svg"), logoSvg()]);
files.push([join(OUT, "brand", "favicon.svg"), faviconSvg()]);
files.push([join(OUT, "hero", "og-citrava.svg"), ogImage()]);

for (const [path, content] of files) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf8");
}
console.log(`Wrote ${files.length} SVG assets.`);

// machine-readable index so the app can verify assets exist without guessing
const manifest = {
  generatedAt: new Date().toISOString(),
  note: "Original generated artwork. Regenerate with: node scripts/generate-artwork.mjs",
  assets: files.map(([p]) => p.replace(ROOT, "").replaceAll("\\", "/")),
};
await writeFile(join(OUT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote manifest with ${manifest.assets.length} entries.`);
