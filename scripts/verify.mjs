/**
 * Viewport-by-viewport verification.
 *
 * Captures the page one viewport at a time (scrolling naturally between
 * shots), saves each frame, and writes a manifest. Frames are stitched into a
 * contact image by scripts/compose.py — real viewport captures avoid the
 * clipping/rendering artifacts of Chromium's single fullPage shot.
 *
 * Usage: node scripts/verify.mjs [path] [width] [name] [height]
 */
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const path = args[0] ?? "/";
const width = Number(args[1] ?? 1440);
const name = args[2] ?? "page";
const viewportHeight = Number(args[3] ?? 900);

const OUT = join(process.env.TEMP ?? "/tmp", "citrava-preview");
const FRAMES = join(OUT, "frames", name);
await mkdir(FRAMES, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"],
});

const page = await browser.newPage();
const consoleErrors = [];
const pageErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(String(error)));

await page.setViewport({ width, height: viewportHeight, deviceScaleFactor: 1 });
const response = await page.goto(`${process.env.VERIFY_BASE ?? "http://localhost:3001"}${path}`, {
  waitUntil: "networkidle0",
  timeout: 90000,
});
await page.evaluate(() => document.fonts.ready);

const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const maxScroll = Math.max(0, totalHeight - viewportHeight);
const frames = [];
let index = 0;

// Freeze fixed/sticky UI for clean stitched frames (visual QA only).
await page.addStyleTag({
  content:
    "header[class*='fixed'], .fixed { position: static !important; } .back-to-top { display: none !important; }",
});

for (let y = 0; y <= maxScroll; y += viewportHeight) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  // Let lazy images load and in-view animations settle.
  await new Promise((resolve) => setTimeout(resolve, 520));
  await page.evaluate(async () => {
    const imgs = [...document.images].filter((img) => !img.complete);
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
            setTimeout(resolve, 1500);
          }),
      ),
    );
  });
  await new Promise((resolve) => setTimeout(resolve, 220));
  const file = join(FRAMES, `${String(index).padStart(2, "0")}.png`);
  await page.screenshot({ path: file });
  frames.push(file);
  index += 1;
  if (index > 24) break;
}

await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((resolve) => setTimeout(resolve, 300));

const audit = await page.evaluate(() => {
  const doc = document.documentElement;
  const images = [...document.images];
  const offenders = [];
  if (doc.scrollWidth > doc.clientWidth + 1) {
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" || cs.position === "absolute") continue;
      if (rect.right > doc.clientWidth + 2 || rect.left < -2) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 70),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
        if (offenders.length > 6) break;
      }
    }
  }
  return {
    title: document.title,
    status: null,
    height: doc.scrollHeight,
    overflowX: doc.scrollWidth - doc.clientWidth,
    offenders,
    imageCount: images.length,
    broken: images
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
    h1: [...document.querySelectorAll("h1")].map((el) =>
      (el.textContent ?? "").replace(/\s+/g, " ").trim(),
    ),
    missingAlt: images.filter((img) => img.getAttribute("alt") === null).length,
    emptyLinks: [...document.querySelectorAll("a")].filter(
      (a) =>
        !(a.textContent ?? "").trim() &&
        !a.getAttribute("aria-label") &&
        !a.querySelector("img,svg"),
    ).length,
  };
});
audit.status = response?.status() ?? null;

const manifest = { path, width, viewportHeight, name, frames, audit, consoleErrors, pageErrors };
await writeFile(join(OUT, `${name}.json`), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify(manifest, null, 2));

await browser.close();
