/**
 * Interaction smoke test: mobile menu, catalogue filters/search, product
 * variant selection, contact validation and submission.
 *
 * Usage: node scripts/interactions.mjs
 */
import puppeteer from "puppeteer";
import { join } from "node:path";

const BASE = "http://localhost:3001";
const OUT = join(process.env.TEMP ?? "/tmp", "citrava-preview");

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

/* ---------------------------------------------------------------- */
/* 1. Mobile navigation                                             */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });

  const menuButton = await page.$('button[aria-controls="mobile-navigation"]');
  check("mobile: menu button present", Boolean(menuButton));
  await menuButton?.click();
  await page.waitForSelector("#mobile-navigation", { visible: true, timeout: 5000 });

  const drawerVisible = await page.$eval("#mobile-navigation", (el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
  check("mobile: drawer opens", drawerVisible);

  const bodyLocked = await page.evaluate(() => document.body.style.overflow === "hidden");
  check("mobile: body scroll locked", bodyLocked);

  const productLink = await page.$('#mobile-navigation a[href="/products"]');
  await productLink?.click();
  await page.waitForFunction(() => location.pathname === "/products", { timeout: 8000 });
  check("mobile: drawer link navigates", page.url().includes("/products"));

  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));
  const drawerClosed = await page.$("#mobile-navigation");
  check("mobile: Escape closes drawer", drawerClosed === null);
  await page.close();
}

/* ---------------------------------------------------------------- */
/* 2. Catalogue filters + search                                    */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/products`, { waitUntil: "networkidle0" });

  const initialCount = await page.$$eval("ul li article", (els) => els.length);
  check("catalog: 7 products rendered", initialCount === 7, `got ${initialCount}`);

  const chips = await page.$$('button[aria-pressed]');
  // first chip is "Semua"; second is "Sabun Cuci Piring"
  await chips[1]?.click();
  await new Promise((r) => setTimeout(r, 300));
  const filteredCount = await page.$$eval("ul li article", (els) => els.length);
  check("catalog: category filter", filteredCount === 3, `got ${filteredCount}`);
  check("catalog: URL updated", page.url().includes("kategori=sabun-cuci-piring"), page.url());

  await page.type("#product-search", "charcoal");
  await new Promise((r) => setTimeout(r, 400));
  const emptyState = await page.$eval("body", (el) => el.textContent?.includes("Produk tidak ditemukan"));
  check("catalog: empty state for no match", Boolean(emptyState));

  await page.click('button[aria-pressed="false"]').catch(() => {});
  await page.type("#product-search", "");
  await new Promise((r) => setTimeout(r, 300));
  await page.close();
}

/* ---------------------------------------------------------------- */
/* 3. Product detail variants & gallery                             */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/products/mama-lemon-jeruk-nipis`, { waitUntil: "networkidle0" });

  const sizeButtons = await page.$$('button[aria-pressed]');
  check("product: size buttons present", sizeButtons.length >= 9, `got ${sizeButtons.length}`);

  // Select the 1.5 L size (last option) and confirm the summary updates.
  await sizeButtons[sizeButtons.length - 1]?.click();
  await new Promise((r) => setTimeout(r, 250));
  const summary = await page.$eval('[aria-live="polite"]', (el) => el.textContent ?? "");
  check("product: selected size reflected", summary.includes("1.500") || summary.includes("1500") || summary.includes("1.5"), summary.trim());

  const gallery = await page.$$('ul[aria-label="Pilih tampilan gambar"] button');
  check("product: gallery thumbnails", gallery.length === 3, `got ${gallery.length}`);
  if (gallery[2]) {
    await gallery[2].click();
    await new Promise((r) => setTimeout(r, 350));
    const pressed = await page.$eval('ul[aria-label="Pilih tampilan gambar"] button[aria-pressed="true"]', () => true);
    check("product: gallery switches", pressed);
  }
  await page.close();
}

/* ---------------------------------------------------------------- */
/* 4. Contact form validation + submission                          */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle0" });

  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 350));
  const alertCount = await page.$$eval('[role="alert"]', (els) => els.length);
  check("contact: empty submit shows errors", alertCount >= 4, `${alertCount} alerts`);

  const ariaInvalid = await page.$eval("#contact-name", (el) => el.getAttribute("aria-invalid"));
  check("contact: aria-invalid set", ariaInvalid === "true");

  await page.type("#contact-name", "Budi Santoso");
  await page.type("#contact-email", "budi@example.com");
  await page.type("#contact-phone", "081234567890");
  await page.type("#contact-subject", "Pertanyaan produk");
  await page.type("#contact-message", "Halo, saya ingin bertanya tentang ketersediaan ukuran 1,5 liter untuk kebutuhan usaha kecil.");

  await page.click('button[type="submit"]');
  await page.waitForFunction(
    () => document.body.textContent?.includes("Formulir berhasil divalidasi"),
    { timeout: 10000 },
  );
  const successVisible = await page.$eval("body", (el) =>
    Boolean(el.textContent?.includes("Formulir berhasil divalidasi")),
  );
  check("contact: valid submit succeeds", successVisible);

  const emailCleared = await page.$eval("#contact-email", (el) => el.value === "");
  check("contact: form resets after success", emailCleared);

  const shot = join(OUT, "contact-success.png");
  await page.screenshot({ path: shot });
  console.log("saved", shot);
  await page.close();
}

/* ---------------------------------------------------------------- */
/* 5. Internal link integrity                                       */
/* ---------------------------------------------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const paths = ["/", "/products", "/products/mama-lemon-jeruk-nipis", "/articles", "/articles/mengangkat-lemak-piring", "/about", "/contact", "/privacy", "/terms"];
  const hrefs = new Set();

  for (const path of paths) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0" });
    const found = await page.$$eval("a[href]", (links) => links.map((a) => a.getAttribute("href")));
    found.filter((href) => href && href.startsWith("/") && !href.startsWith("//")).forEach((href) => hrefs.add(href.split("#")[0]));
  }

  const statuses = [];
  for (const href of hrefs) {
    if (!href) continue;
    const response = await page.goto(`${BASE}${href}`, { waitUntil: "domcontentloaded" });
    statuses.push({ href, status: response?.status() ?? 0 });
  }
  const broken = statuses.filter((entry) => entry.status >= 400);
  check(
    "links: all internal routes resolve",
    broken.length === 0,
    broken.length ? JSON.stringify(broken) : `${statuses.length} checked`,
  );
  await page.close();
}

await browser.close();

const failed = results.filter((result) => !result.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) process.exitCode = 1;
