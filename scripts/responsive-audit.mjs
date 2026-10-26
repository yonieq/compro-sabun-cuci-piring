/**
 * Responsive audit: checks every required breakpoint for horizontal overflow,
 * broken images, console errors and touch-target sizing.
 *
 * Usage: node scripts/responsive-audit.mjs
 */
import puppeteer from "puppeteer";

const BASE = process.env.VERIFY_BASE ?? "http://localhost:3001";
const WIDTHS = [375, 430, 768, 1024, 1440, 1920];
const PATHS = ["/", "/products", "/products/mama-lemon-jeruk-nipis", "/about", "/articles", "/contact"];

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const rows = [];
let failures = 0;

for (const width of WIDTHS) {
  for (const path of PATHS) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text().slice(0, 100));
    });
    await page.setViewport({ width, height: 900 });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 450));

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const images = [...document.images];
      const smallTargets = [...document.querySelectorAll("a, button")]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return false;
          if (el.closest("[hidden]")) return false;
          return rect.width < 32 || rect.height < 28;
        })
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          label: (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 30),
          w: Math.round(el.getBoundingClientRect().width),
          h: Math.round(el.getBoundingClientRect().height),
        }));
      return {
        overflowX: doc.scrollWidth - doc.clientWidth,
        broken: images.filter((img) => img.complete && img.naturalWidth === 0).length,
        smallTargets,
        height: doc.scrollHeight,
      };
    });

    const ok = audit.overflowX <= 0 && audit.broken === 0 && consoleErrors.length === 0;
    if (!ok) failures += 1;
    rows.push({
      width,
      path,
      overflowX: audit.overflowX,
      broken: audit.broken,
      errors: consoleErrors.length,
      smallTargets: audit.smallTargets.length,
      sample: audit.smallTargets.slice(0, 3),
    });
    await page.close();
  }
}

await browser.close();

console.table(
  rows.map((row) => ({
    width: row.width,
    path: row.path,
    overflowX: row.overflowX,
    brokenImages: row.broken,
    consoleErrors: row.errors,
    smallTargets: row.smallTargets,
  })),
);

const offenders = rows.filter((row) => row.overflowX > 0 || row.broken > 0 || row.errors > 0);
if (offenders.length) {
  console.log("\nOffending rows:", JSON.stringify(offenders, null, 2));
} else {
  console.log("\nNo overflow, broken images, or console errors at any breakpoint.");
}

const touchIssues = rows.filter((row) => row.smallTargets > 0);
if (touchIssues.length) {
  console.log("\nSmall touch targets (informational):");
  for (const row of touchIssues) console.log(row.width, row.path, JSON.stringify(row.sample));
}

console.log(`\n${failures === 0 ? "PASS" : "FAIL"} — ${rows.length - failures}/${rows.length} checks`);
