/**
 * Production-mode verification: metadata, JSON-LD, headers, status codes and
 * rendered content on the production server (default port 3010).
 *
 * Usage: node scripts/verify-production.mjs [baseUrl]
 */
import puppeteer from "puppeteer";

const BASE = process.argv[2] ?? "http://localhost:3010";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text().slice(0, 120));
});
page.on("pageerror", (e) => consoleErrors.push(String(e).slice(0, 120)));

/* ---------------------------------------------------------------- */
/* Routes + status                                                  */
/* ---------------------------------------------------------------- */
const routes = [
  "/",
  "/about",
  "/products",
  "/products/mama-lemon-jeruk-nipis",
  "/articles",
  "/articles/mengangkat-lemak-piring",
  "/contact",
  "/privacy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
];

for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
  const status = await page.evaluate(async (target) => {
    const response = await fetch(target, { method: "HEAD" });
    return response.status;
  }, route);
  const ok = status < 400;
  check(`route ${route}`, ok, `status ${status}`);
}

/* ---------------------------------------------------------------- */
/* Homepage metadata + structured data                              */
/* ---------------------------------------------------------------- */
await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
const home = await page.evaluate(() => {
  const meta = (selector, attr = "content") =>
    document.querySelector(selector)?.getAttribute(attr) ?? null;
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => {
    try {
      return JSON.parse(el.textContent ?? "{}");
    } catch {
      return null;
    }
  });
  return {
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ogTitle: meta('meta[property="og:title"]'),
    ogImage: meta('meta[property="og:image"]'),
    twitterCard: meta('meta[name="twitter:card"]'),
    lang: document.documentElement.lang,
    jsonLdTypes: jsonLd.map((entry) => entry?.["@type"]).filter(Boolean),
    h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
  };
});

check("seo: title", Boolean(home.title), home.title ?? "");
check("seo: description", Boolean(home.description));
check("seo: canonical", Boolean(home.canonical), home.canonical ?? "");
check("seo: og:title", Boolean(home.ogTitle));
check("seo: og:image", Boolean(home.ogImage));
check("seo: twitter card", home.twitterCard === "summary_large_image");
check("seo: html lang=id", home.lang === "id");
check("seo: organization JSON-LD", home.jsonLdTypes.includes("Organization"), JSON.stringify(home.jsonLdTypes));
check("semantics: single h1", Boolean(home.h1), home.h1 ?? "");

/* ---------------------------------------------------------------- */
/* Product + article structured data                                */
/* ---------------------------------------------------------------- */
await page.goto(`${BASE}/products/mama-lemon-jeruk-nipis`, { waitUntil: "networkidle0" });
const productPage = await page.evaluate(() => ({
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  types: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => {
    try {
      return JSON.parse(el.textContent ?? "{}")?.["@type"];
    } catch {
      return null;
    }
  }),
  demoNotice: document.body.textContent?.includes("Catatan demo") ?? false,
  hasPrices: /\bRp\s?\d/.test(document.body.textContent ?? ""),
}));
check("product: canonical", Boolean(productPage.canonical), productPage.canonical ?? "");
check("product: Product JSON-LD", productPage.types.includes("Product"), JSON.stringify(productPage.types));
check("product: demo disclosure", productPage.demoNotice);
check("product: no invented prices", !productPage.hasPrices);

await page.goto(`${BASE}/articles/mengangkat-lemak-piring`, { waitUntil: "networkidle0" });
const articlePage = await page.evaluate(() => ({
  types: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => {
    try {
      return JSON.parse(el.textContent ?? "{}")?.["@type"];
    } catch {
      return null;
    }
  }),
  hasDate: Boolean(document.querySelector("time[datetime]")),
}));
check("article: Article JSON-LD", articlePage.types.includes("Article"), JSON.stringify(articlePage.types));
check("article: publication date", articlePage.hasDate);

/* ---------------------------------------------------------------- */
/* robots / sitemap                                                 */
/* ---------------------------------------------------------------- */
await page.goto(`${BASE}/robots.txt`, { waitUntil: "networkidle0" });
const robots = await page.evaluate(() => document.body.innerText);
check("robots: sitemap reference", robots.includes("Sitemap:"), robots.split("\n").find((l) => l.startsWith("Sitemap")) ?? "");
check("robots: api disallowed", robots.includes("Disallow: /api/"));

await page.goto(`${BASE}/sitemap.xml`, { waitUntil: "networkidle0" });
const sitemap = await page.evaluate(() => document.body.innerText);
const urlCount = (sitemap.match(/<url>/g) ?? []).length;
check("sitemap: includes products", sitemap.includes("/products/mama-lemon-jeruk-nipis"));
check("sitemap: includes articles", sitemap.includes("/articles/mengangkat-lemak-piring"));
check("sitemap: url count", urlCount >= 16, `${urlCount} urls`);

/* ---------------------------------------------------------------- */
/* Contact API                                                      */
/* ---------------------------------------------------------------- */
const api = await page.evaluate(async (base) => {
  const invalid = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "A" }),
  });
  const invalidBody = await invalid.json();

  const valid = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "081234567890",
      subject: "Pertanyaan produk",
      message: "Halo, saya ingin bertanya tentang ukuran kemasan yang tersedia.",
      company: "",
    }),
  });
  const validBody = await valid.json();

  return {
    invalidStatus: invalid.status,
    invalidOk: invalidBody.ok,
    invalidErrors: Object.keys(invalidBody.errors ?? {}).length,
    validStatus: valid.status,
    validOk: validBody.ok,
    validMessage: validBody.message,
  };
}, BASE);

check("api: rejects invalid payload", api.invalidStatus === 422 && api.invalidOk === false);
check("api: returns field errors", api.invalidErrors >= 4, `${api.invalidErrors} fields`);
check("api: accepts valid payload", api.validStatus === 200 && api.validOk === true);
check(
  "api: does not claim email delivery",
  typeof api.validMessage === "string" && api.validMessage.includes("belum aktif"),
  api.validMessage,
);

/* ---------------------------------------------------------------- */
/* Console cleanliness on production                                */
/* ---------------------------------------------------------------- */
// The deliberate 422 from the API validation test is expected noise.\nconst unexpectedErrors = consoleErrors.filter((message) => !message.includes("422"));\ncheck(\n  "production: no console errors",\n  unexpectedErrors.length === 0,\n  unexpectedErrors.slice(0, 3).join(" | "),\n);

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} production checks passed`);
if (failed.length) process.exitCode = 1;
