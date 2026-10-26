import puppeteer from "puppeteer";
import { join } from "node:path";

const OUT = join(process.env.TEMP, "citrava-preview");
const CASES = [
  [375, "/", "home"],
  [430, "/", "home"],
  [768, "/", "home"],
  [1440, "/", "home"],
  [375, "/products", "products"],
  [375, "/about", "about"],
  [375, "/contact", "contact"],
  [375, "/articles", "articles"],
  [375, "/products/mama-lemon-jeruk-nipis", "product-detail"],
];

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"],
});

let failures = 0;

for (const [width, path, name] of CASES) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3001${path}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 700));

  const metrics = await page.evaluate(() => {
    const header = document.querySelector("header");
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    const links = [...document.querySelectorAll("header a, header button")];

    // First meaningful content below the fixed header.
    const candidates = [
      ...document.querySelectorAll("h1, h1 ~ *, main p, main span.rounded-full, main section > div p"),
    ];
    let firstTop = Infinity;
    let firstLabel = "";
    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      if (rect.height < 8 || rect.top < headerBottom) continue;
      if (rect.top < firstTop) {
        firstTop = rect.top;
        firstLabel = (el.textContent ?? "").trim().slice(0, 40);
      }
    }

    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    return {
      headerBottom: +headerBottom.toFixed(1),
      headerHeight: +headerHeight.toFixed(1),
      firstContentTop: Number.isFinite(firstTop) ? +firstTop.toFixed(1) : null,
      clearance: Number.isFinite(firstTop) ? +(firstTop - headerBottom).toFixed(1) : null,
      firstLabel,
      headerOverlapsContent: Number.isFinite(firstTop) && firstTop < headerBottom - 1,
      headerLinksInside: links.every((el) => {
        const r = el.getBoundingClientRect();
        return r.top >= headerBottom - headerHeight - 1 && r.bottom <= headerBottom + 1;
      }),
    };
  });

  const ok = !metrics.headerOverlapsContent && (metrics.clearance ?? 0) >= 12;
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${width}px ${path} — clearance ${metrics.clearance}px (header ${metrics.headerHeight}px)`);

  await page.screenshot({
    path: join(OUT, `offset-${name}-${width}.png`),
    clip: { x: 0, y: 0, width, height: 280 },
  });
  await page.close();
}

await browser.close();
console.log(`\n${CASES.length - failures}/${CASES.length} layouts have adequate header clearance`);
if (failures) process.exitCode = 1;
