#!/usr/bin/env node
/**
 * Generates marketing pages from product truth.
 * Run: node scripts/generate-site.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

/** @type {const} */
const products = [
  {
    slug: "year-wall",
    id: "yearwall",
    name: "Year Wall",
    tag: "iOS · Web",
    status: "ship",
    statusLabel: "Web live",
    card:
      "A full-year calendar that makes plans feel spatial. See the year, not a list of days.",
    lede: "Plan in space. Year Wall is a calendar you can feel: the whole year on one wall, not a pile of day lists.",
    bullets: [
      "Full-year grid that shows density and room at a glance",
      "Web live today at yearwall.burkettinv.com",
      "iOS in active polish; TestFlight ships when quality clears the bar",
    ],
    external: "https://yearwall.burkettinv.com",
    externalLabel: "Open Year Wall",
    waitlist: false,
  },
  {
    slug: "wandered",
    id: "wandered",
    name: "Wandered",
    tag: "iOS · Web",
    status: "ship",
    statusLabel: "Web live",
    card:
      "Travel map and passport for the places you have been. Quiet, visual, shareable when you want it.",
    lede: "Your world, mapped calmly. Wandered is a travel map and passport for places you have been, not another trip checklist.",
    bullets: [
      "Map-first view of where you have wandered",
      "Passport and trip surfaces that stay out of the way",
      "Web is the primary dogfood surface while iOS TestFlight is held",
    ],
    external: "https://wandered.burkettinv.com",
    externalLabel: "Open Wandered",
    waitlist: false,
  },
  {
    slug: "surrostack",
    id: "surrostack",
    name: "SurroStack",
    tag: "Web",
    status: "ship",
    statusLabel: "Live pilot",
    card:
      "Operational stack for surrogacy journeys: tasks, calendar, and a calm place for the hard logistics.",
    lede: "Logistics for a journey that is already enough. SurroStack keeps tasks, calendar, money, and share surfaces in one calm stack.",
    bullets: [
      "Task portal and calendar built for real journey load",
      "Share Status for partners and support people",
      "Live pilot at app.burkettinv.com/surrostack",
    ],
    external: "https://app.burkettinv.com/surrostack/",
    externalLabel: "Open SurroStack",
    waitlist: false,
  },
  {
    slug: "massagenow",
    id: "massagenow",
    name: "MassageNow",
    tag: "Marketplace",
    status: "build",
    statusLabel: "Pilot",
    card:
      "Last-minute massage marketplace. Open studio slots, booked in a few taps. Nashville pilot.",
    lede: "Same-day massage when a slot opens up. MassageNow connects spontaneous bookers with licensed studios that have last-minute availability.",
    bullets: [
      "Consumer booking in a few taps",
      "Studio partners fill cancelled tables",
      "Nashville pilot; marketing site at getmassagenow.com",
    ],
    external: "https://getmassagenow.com",
    externalLabel: "Visit MassageNow",
    waitlist: true,
    waitlistNote: "Studio partners and early users can also join the studio waitlist below.",
  },
  {
    slug: "orient",
    id: "orient",
    name: "Orient",
    tag: "Guide",
    status: "seed",
    statusLabel: "Seed",
    card:
      "Place guides that feel local, not SEO spam. Starting with a Minnesota pilot region.",
    lede: "Local orientation without the affiliate sludge. Orient is a place guide product starting with a Minnesota pilot.",
    bullets: [
      "Editorial, local voice over generic directory pages",
      "Minnesota pilot region first",
      "No public product URL yet: join the waitlist",
    ],
    external: null,
    externalLabel: null,
    waitlist: true,
  },
  {
    slug: "conflict-patterns",
    id: "conflict",
    name: "Conflict Patterns",
    tag: "Personal",
    status: "seed",
    statusLabel: "Seed",
    card:
      "A private tracker for relationship repair patterns, grounded in research, not gimmicks.",
    lede: "Private pattern tracking for hard conversations. Conflict Patterns is a personal tool grounded in research, not performative relationship tips.",
    bullets: [
      "Built for privacy first",
      "Research-backed structure without gimmicks",
      "In design: waitlist for early access",
    ],
    external: null,
    externalLabel: null,
    waitlist: true,
  },
];

const head = (title, description, canonical) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#07080c" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${title.replace(/ — .*$/, "")}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
</head>`;

const header = (active = "") => `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="mark" href="/" aria-label="Burkett Studios home">
        <span class="mark-glyph" aria-hidden="true"></span>
        <span class="mark-text">Burkett <em>Studios</em></span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/#products"${active === "products" ? ' aria-current="page"' : ""}>Products</a>
        <a href="/#studio">Studio</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-inner">
      <p class="footer-mark">Burkett Studios</p>
      <p class="footer-note">
        Product studio for personal apps. Real estate, consulting, and company ops live at
        <a href="https://burkettinv.com" rel="noopener">burkettinv.com</a>.
      </p>
      <p class="footer-legal">© <span data-year></span> Burkett Studios. All rights reserved.</p>
    </div>
  </footer>
  <script src="/site.js" defer></script>
</body>
</html>`;

function waitlistBlock(productName) {
  const id = productName.toLowerCase().replace(/\s+/g, "-");
  return `
      <section class="waitlist-panel" id="waitlist">
        <p class="eyebrow">Waitlist</p>
        <h2>Get early access</h2>
        <p class="section-copy">Leave your email. We only write when there is something real to try.</p>
        <form class="waitlist-form" data-waitlist="${productName}">
          <label class="sr-only" for="email-${id}">Email</label>
          <input id="email-${id}" name="email" type="email" required placeholder="you@example.com" autocomplete="email" />
          <label class="sr-only" for="note-${id}">Note (optional)</label>
          <input id="note-${id}" name="note" type="text" placeholder="Anything we should know? (optional)" />
          <button class="btn btn-primary" type="submit">Join waitlist</button>
        </form>
        <p class="form-note" data-form-note hidden></p>
      </section>`;
}

function productPage(p) {
  const actions = [];
  if (p.external) {
    actions.push(
      `<a class="btn btn-primary" href="${p.external}" rel="noopener">${p.externalLabel}</a>`
    );
  }
  if (p.waitlist) {
    actions.push(
      `<a class="btn btn-ghost" href="#waitlist">${p.external ? "Also join waitlist" : "Join waitlist"}</a>`
    );
  }
  actions.push(`<a class="btn btn-ghost" href="/#products">All products</a>`);

  return `${head(
    `${p.name} — Burkett Studios`,
    p.card,
    `https://burkettstudios.com/products/${p.slug}/`
  )}
<body class="product-page" data-product="${p.id}">
${header("products")}
  <main id="main">
    <section class="product-hero shell">
      <p class="crumb"><a href="/">Studios</a> / <a href="/#products">Products</a> / ${p.name}</p>
      <div class="product-top product-hero-top">
        <span class="product-tag">${p.tag}</span>
        <span class="status ${p.status}">${p.statusLabel}</span>
      </div>
      <h1>${p.name}</h1>
      <p class="lede">${p.lede}</p>
      <div class="hero-actions">
        ${actions.join("\n        ")}
      </div>
    </section>

    <section class="product-body shell">
      <ul class="feature-list">
        ${p.bullets.map((b) => `<li>${b}</li>`).join("\n        ")}
      </ul>
      ${p.waitlistNote ? `<p class="section-copy">${p.waitlistNote}</p>` : ""}
      ${p.waitlist ? waitlistBlock(p.name) : ""}
    </section>
  </main>
${footer}`;
}

function indexPage() {
  const cards = products
    .map(
      (p) => `
        <article class="product-card" data-product="${p.id}">
          <div class="product-top">
            <span class="product-tag">${p.tag}</span>
            <span class="status ${p.status}">${p.statusLabel}</span>
          </div>
          <h3><a href="/products/${p.slug}/">${p.name}</a></h3>
          <p>${p.card}</p>
          <a class="product-link" href="/products/${p.slug}/">Product page</a>
          ${
            p.external
              ? `<a class="product-link secondary" href="${p.external}" rel="noopener">${p.external.replace(
                  /^https?:\/\//,
                  ""
                )}</a>`
              : p.waitlist
                ? `<a class="product-link secondary" href="/products/${p.slug}/#waitlist">Join waitlist</a>`
                : ""
          }
        </article>`
    )
    .join("\n");

  return `${head(
    "Burkett Studios — Products for real life",
    "Burkett Studios builds calm, useful apps: Year Wall, Wandered, SurroStack, and more. Nashville product studio.",
    "https://burkettstudios.com/"
  )}
<body>
${header("products")}
  <main id="main">
    <section class="hero shell">
      <p class="eyebrow">Product studio · Nashville</p>
      <h1>
        Apps for the parts of life<br />
        <span class="hero-accent">that deserve better software.</span>
      </h1>
      <p class="lede">
        Burkett Studios designs and ships personal products: calendars you can feel,
        travel you can see, and tools for journeys that do not fit a spreadsheet.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#products">See the products</a>
        <a class="btn btn-ghost" href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
      </div>
      <dl class="hero-meta">
        <div>
          <dt>Focus</dt>
          <dd>Consumer &amp; personal apps</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>iOS · Web · Cloudflare</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>Burkett Studios</dd>
        </div>
      </dl>
    </section>

    <section id="products" class="products shell">
      <div class="section-head">
        <p class="eyebrow">Portfolio</p>
        <h2>What we are building</h2>
        <p class="section-copy">
          Each product has its own page here. Live apps ship on their own domains.
          Seed products take a waitlist.
        </p>
      </div>
      <div class="product-grid">
${cards}
      </div>
    </section>

    <section id="studio" class="studio shell">
      <div class="studio-grid">
        <div>
          <p class="eyebrow">How we work</p>
          <h2>Small studio. Real products.</h2>
          <p class="section-copy">
            We ship software we would use ourselves. Design is not decoration: it is how the product
            earns trust. Hosting lives on Cloudflare. iOS ships when quality clears the bar, not the calendar.
          </p>
        </div>
        <ul class="studio-list">
          <li>
            <strong>Product over platform theater</strong>
            <span>Apps first. Internal OS tools stay on burkettinv.com.</span>
          </li>
          <li>
            <strong>Design in Figma, ship in git</strong>
            <span>Canvas for craft. Code and Cloudflare for production.</span>
          </li>
          <li>
            <strong>One app per deep session</strong>
            <span>Agents and humans stay focused so quality does not blur.</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="contact" class="contact shell">
      <div class="contact-panel">
        <p class="eyebrow">Contact</p>
        <h2>Talk to the studio</h2>
        <p class="section-copy">
          Press, partnership, or product feedback: reach the team at Burkett Investments and ask for Studios.
        </p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="mailto:trey@burkettinv.com?subject=Burkett%20Studios">Email Trey</a>
          <a class="btn btn-ghost" href="https://burkettinv.com" rel="noopener">Company site</a>
        </div>
      </div>
    </section>
  </main>
${footer}`;
}

function sitemap() {
  const urls = [
    "https://burkettstudios.com/",
    ...products.map((p) => `https://burkettstudios.com/products/${p.slug}/`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

// Write pages
writeFileSync(join(pub, "index.html"), indexPage());
for (const p of products) {
  const dir = join(pub, "products", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), productPage(p));
}
writeFileSync(join(pub, "sitemap.xml"), sitemap());
writeFileSync(
  join(root, "products.json"),
  JSON.stringify(products, null, 2) + "\n"
);
console.log(`Generated home + ${products.length} product pages.`);
