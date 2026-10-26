# CITRAVA — Company Profile Website

A premium, production-oriented company profile site for an Indonesian FMCG
brand specialising in dishwashing liquid and kitchen-cleaning products.

> **Prototype notice.** The site ships with clearly labelled *demo* product
> data. It references publicly listed Mama Lemon / Mama Lime variants only so
> layouts can be tested with realistic content. CITRAVA does not manufacture,
> own, distribute, or claim affiliation with those products. Replace all demo
> content and assets before any public launch.

---

## Quick start

```bash
npm install
npm run dev
npm run build
```

Then open <http://localhost:3000> (or the port printed by Next.js).

Requires **Node.js 20.9+** (developed on Node 24) and npm.

### Environment

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, Open Graph URLs, `sitemap.xml`
and `robots.txt`. Contact email variables are optional and documented below.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, Next core-web-vitals + TS) |
| `npx tsc --noEmit` | TypeScript check (strict mode) |
| `node scripts/generate-artwork.mjs` | Regenerate all SVG artwork |
| `node scripts/verify.mjs / 1440 home` | Capture viewport frames + layout audit |
| `node scripts/responsive-audit.mjs` | Audit 375–1920 px for overflow/errors |
| `node scripts/interactions.mjs` | Menu, filters, variants, form, link checks |
| `node scripts/verify-production.mjs <url>` | Production checks: routes, SEO, JSON-LD, robots/sitemap, contact API |

The QA scripts drive a local Chrome through Puppeteer against a running dev
server on port 3001. They are development tooling, not part of the build.

---

## Tech stack

- **Next.js 16.4** — App Router, Server Components by default, Turbopack
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** — CSS-first `@theme` design tokens
- **Motion for React** (`motion`) — scroll reveals, hero entrance, tabs
- **Lucide React** — interface icons (social marks are original inline SVGs)
- **next/image** — optimised, responsive images (local SVG artwork)
- **next/font/google** — Plus Jakarta Sans (display) + Inter (body)
- **Zod 4** — shared form validation contract
- **npm** as the package manager

No database or external CMS: product/article content lives in typed local
modules.

---

## Project structure

```
src/
  app/
    layout.tsx              Root layout: fonts, metadata, navbar/footer, JSON-LD
    page.tsx                Homepage composition
    globals.css             Design tokens, base styles, utilities
    about/page.tsx
    products/
      page.tsx              Catalogue (static shell + client filters)
      [slug]/page.tsx       Product detail (SSG via generateStaticParams)
    articles/
      page.tsx
      [slug]/page.tsx       Article detail (SSG)
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
    api/contact/route.ts    Validated contact endpoint (provider-ready)
    sitemap.ts robots.ts not-found.tsx
  components/
    layout/                 navbar, mobile-nav, footer, announcement, back-to-top
    home/                   hero, highlights, about preview, products, benefits
    products/               card, carousel, catalogue filter, detail, related
    articles/               card, filtered list
    contact/                contact form
    shared/                 container, buttons, headings, reveals, legal shell
  config/
    site.ts                 ALL brand, company, contact, social, marketplace data
    theme.ts                Raw colour tokens for inline SVG / metadata
  data/
    products.ts             Typed demo product catalogue + selectors
    articles.ts             Typed demo editorial content
    navigation.ts           Primary nav, footer columns, product categories
    highlights.ts           Benefit copy + interactive chapter content
  lib/                      utils, SEO metadata builder, contact schema
  types/product.ts          Domain types
public/images/              Original generated SVG artwork (see manifest.json)
scripts/                    Artwork generator + visual/interaction QA tooling
```

### Rendering model

| Route | Rendering |
| --- | --- |
| `/`, `/about`, `/articles`, `/contact`, legal pages | Static |
| `/products` | Static shell; category/search filtering is client-side and synced to the URL |
| `/products/[slug]`, `/articles/[slug]` | Statically generated (`generateStaticParams`) |
| `/api/contact` | Dynamic route handler |

Client Components are used only where interaction requires them: navigation
drawer, carousel controls, filters, gallery/variant selector, form, and motion
wrappers. Everything else is a Server Component.

---

## Brand customisation

Everything brand-facing is centralised:

1. **`src/config/site.ts`** — name, tagline, description, contact details,
   address, social links, marketplaces, announcement bar, vision/mission/values,
   demo notice.
2. **`src/config/theme.ts`** — raw palette values consumed by inline SVG and
   metadata.
3. **`src/app/globals.css`** — `@theme` tokens that generate Tailwind utilities
   (`bg-brand-green`, `text-brand-deep`, `text-h2`, …). Change colours here to
   restyle the entire site.
4. **`src/data/*`** — products, articles, navigation, benefit copy.

Replacing the brand does not require touching component markup.

### Typography

Plus Jakarta Sans for display, Inter for body, loaded with `display: swap` and
exposed as CSS variables. The fluid type scale uses `clamp()` and lives in
`@theme` (`--text-display`, `--text-h2`, `--text-lead`, …).

---

## Artwork

All illustrations are **original SVG compositions** generated by
`scripts/generate-artwork.mjs` — no third-party photography, packaging, or
hotlinked assets. The script renders:

- packshots for all seven demo variants
- a hero campaign composition
- two editorial kitchen scenes and four lifestyle cards
- three article covers, logo mark, favicon and OG image

Regenerate at any time:

```bash
node scripts/generate-artwork.mjs
```

`public/images/manifest.json` records the generated files. Artwork is served
through `next/image`; SVG optimisation is explicitly enabled with a locked-down
CSP in `next.config.ts`.

---

## Demo vs. real content

| Area | Current state | Before launch |
| --- | --- | --- |
| Products | 7 demo variants referencing third-party brands, marked "Demo" | Replace with CITRAVA products, real packaging, sizes, pricing |
| Articles | 6 demo articles, marked as prototype content | Replace or approve editorial content |
| Company story | Placeholder narrative, explicitly labelled | Insert verified company history, founders, legal entity |
| Contact details | `halo@citrava.example`, placeholder phone/address | Replace with verified details |
| Social links | Inert placeholders (not clickable) | Add verified profile URLs |
| Marketplaces | Disabled "segera hadir" tiles | Add verified official-store URLs and set `status: "live"` |
| Legal pages | Sample documents, not legal advice | Legal review and approval |
| Stats | Counts derived from demo data only ("variants", "sizes") | Keep honest or remove |

No certifications, awards, laboratory results, testimonials, or customer counts
are asserted anywhere in the site.

To switch off the demo banner after replacing content, set
`siteConfig.demoMode` to `false` in `src/config/site.ts`.

---

## Contact form

- Shared Zod schema (`src/lib/contact-schema.ts`) validates on the client and
  in the server route.
- Accessible errors: `aria-invalid`, `aria-describedby`, `role="alert"`, focus
  moved to the first invalid field.
- Loading, success and error states; honeypot spam field; no `useEffect` loops.
- The API route **validates but does not deliver email** — no provider is
  configured. The success message says so explicitly.

To enable delivery, implement the marked integration block in
`src/app/api/contact/route.ts` (Resend, Postmark, SES, …) and set the
`CONTACT_*` variables from `.env.example`. Do not claim delivery until the
provider call actually succeeds.

---

## SEO & accessibility

- Metadata API with per-page title/description, canonical URLs, Open Graph and
  Twitter cards (root + every page).
- JSON-LD: `Organization` (root), `Product` (detail), `Article` (article).
- `sitemap.xml` and `robots.txt` generated from the data layer.
- Semantic landmarks, one `h1` per page, ordered headings, skip link.
- Keyboard support: focus-visible rings, Escape closes the drawer, arrow-key
  tab navigation, visible focus states.
- `prefers-reduced-motion` honoured globally and inside every Motion component.
- Alt text on all content images; decorative layers are `aria-hidden`.

---

## Verification results

Measured on the development build in this workspace:

| Check | Result |
| --- | --- |
| `npm run build` | ✅ Compiled successfully; 26 routes generated (23 static/SSG, 1 dynamic API) |
| `npx tsc --noEmit` | ✅ No errors |
| `npm run lint` | ✅ No errors or warnings |
| Responsive audit (375/430/768/1024/1440/1920 × 6 pages) | ✅ 36/36 — no horizontal overflow, broken images, or console errors |
| Interaction suite | ✅ 18/18 — mobile drawer, filters/search/empty state, URL sync, size selector, gallery, form validation/success, internal links (23 checked) |
| Console hydration errors | ✅ None on any route |

Lighthouse scores have **not** been measured and are not claimed here. Run
`npm run build && npm run start` and audit locally before quoting numbers.

---

## Known limitations

- No real product photography or brand-owned packaging exists yet; artwork is
  original vector illustration intended as a premium placeholder.
- Prices, availability, and purchase links are intentionally absent.
- Contact form delivery requires an email provider integration.
- Legal copy is a template and must be reviewed.
- `NEXT_PUBLIC_SITE_URL` must be set to the production domain for correct
  canonical/OG output.

---

## License / usage

Prototype code and original artwork created for CITRAVA. Third-party brand names
appearing in demo data remain the property of their respective owners and are
used only as descriptive references during design testing.
