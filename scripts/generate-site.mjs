#!/usr/bin/env node
/**
 * Generates marketing pages from product truth.
 * Brand: burkettinv.com DESIGN-LOCK (Cybertruck / gold ignition).
 * Positioning: Burkett's owned digital products (not client services).
 * Run: node scripts/generate-site.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

/**
 * marketing: public product site (story, waitlist, brand)
 * app: product itself when separate from marketing
 * studios page is always /products/<slug>/
 */
const products = [
  {
    slug: "year-wall",
    id: "yearwall",
    name: "Year Wall",
    tag: "iOS · Web",
    status: "ship",
    statusLabel: "Live",
    oneLiner: "Your whole year on one screen.",
    card: "A dense year wall with continuous plan bars. Household planning at a glance, not another day-list calendar.",
    lede: "Year Wall puts the full year in front of you: continuous plan bars, household cloud, web and iPhone. Built for people who plan in seasons, not scrollable day lists.",
    bullets: [
      "Whole-year wall with continuous plan bars",
      "Household cloud login across web and iPhone",
      "Web live now; iOS ships when quality clears the bar",
    ],
    marketing: {
      href: "https://yearwall.burkettinv.com",
      label: "Year Wall site",
      host: "yearwall.burkettinv.com",
    },
    app: {
      href: "https://yearwall.burkettinv.com",
      label: "Open Year Wall",
    },
    waitlist: false,
  },
  {
    slug: "wandered",
    id: "wandered",
    name: "Wandered",
    tag: "iOS · Web",
    status: "ship",
    statusLabel: "Live",
    oneLiner: "Your world, filled in.",
    card: "Exact coastlines, a real trip journal, and a passport that fills as you go. Travel as a map worth looking at.",
    lede: "Wandered turns where you have been into a map with real precision: countries and provinces painted in, trips kept, passport filling up. Free to start. Your data stays yours.",
    bullets: [
      "Unsimplified borders: fjords, islands, real coastlines",
      "Trip journal and passport that track the real path",
      "iPhone and web; open the app from the marketing site",
    ],
    marketing: {
      href: "https://wandered.burkettinv.com",
      label: "Wandered site",
      host: "wandered.burkettinv.com",
    },
    app: {
      href: "https://wandered.burkettinv.com/app",
      label: "Open Wandered",
    },
    waitlist: false,
  },
  {
    slug: "surrostack",
    id: "surrostack",
    name: "SurroStack",
    tag: "Web",
    status: "ship",
    statusLabel: "Live pilot",
    oneLiner: "Logistics for a journey that is already enough.",
    card: "Tasks, calendar, money, and share status for surrogacy journeys. Operational software for a high-stakes personal process.",
    lede: "SurroStack is the operations layer for a surrogacy journey: task portal, calendar, money, and Share Status for partners and support people. Built for load, not vibes.",
    bullets: [
      "Task and calendar core sized for real journey load",
      "Share Status for partners and the support network",
      "Live pilot portal (sign-in required)",
    ],
    marketing: null,
    app: {
      href: "https://app.burkettinv.com/surrostack/",
      label: "Open SurroStack",
    },
    waitlist: false,
    note: "No separate public marketing site yet. This page is the public face; the product lives behind sign-in.",
  },
  {
    slug: "massagenow",
    id: "massagenow",
    name: "MassageNow",
    tag: "Marketplace",
    status: "build",
    statusLabel: "Pilot",
    oneLiner: "Same-day openings. Licensed studios. A few taps.",
    card: "Last-minute massage marketplace for Nashville. Open studio inventory when a slot frees up; book and pay fast.",
    lede: "MassageNow matches spontaneous demand to last-minute openings at licensed massage studios. Nashville pilot first. Marketing and waitlist live on getmassagenow.com.",
    bullets: [
      "Consumer path built for speed, not browsing theater",
      "Studios fill cancelled tables instead of empty hours",
      "Pilot waitlist and story on getmassagenow.com",
    ],
    marketing: {
      href: "https://getmassagenow.com",
      label: "MassageNow site",
      host: "getmassagenow.com",
    },
    app: null,
    waitlist: true,
    waitlistNote: "Prefer the product site waitlist when it is open; you can also leave your email here.",
  },
  {
    slug: "orient",
    id: "orient",
    name: "Orient",
    tag: "Guides",
    status: "seed",
    statusLabel: "Seed",
    oneLiner: "Local orientation without the affiliate sludge.",
    card: "Place guides with editorial standards. Region pilots first, SEO directories never.",
    lede: "Orient is a place-guide product: local voice, strict content rules, and region pilots before scale. No public product site yet.",
    bullets: [
      "Editorial standards over SEO directory defaults",
      "Minnesota pilot region first",
      "Waitlist here until a public product site ships",
    ],
    marketing: null,
    app: null,
    waitlist: true,
  },
  {
    slug: "conflict-patterns",
    id: "conflict",
    name: "Conflict Patterns",
    tag: "Personal",
    status: "seed",
    statusLabel: "Seed",
    oneLiner: "Private pattern tracking for hard conversations.",
    card: "A private tracker for relationship repair patterns. Research structure, not performative advice.",
    lede: "Conflict Patterns is personal software for noticing and tracking repair patterns with privacy first. Still in design; no public product site yet.",
    bullets: [
      "Privacy-first architecture",
      "Research-backed structure without gimmicks",
      "Waitlist for early access",
    ],
    marketing: null,
    app: null,
    waitlist: true,
  },
];

const howWeWork = [
  {
    num: "01",
    title: "Own the product",
    body: "We invent, ship, and keep operating software under Burkett title. Launch is not a handoff to someone else.",
  },
  {
    num: "02",
    title: "One Identity system",
    body: "Studios products sit under Burkett design law: black, steel, gold ignition, sharp geometry. Same family as burkettinv.com.",
  },
  {
    num: "03",
    title: "Production surfaces",
    body: "iOS, web, and APIs with real deploy paths. Domains stay live; quality gates decide when mobile distribution opens.",
  },
  {
    num: "04",
    title: "Operate what we ship",
    body: "Cloudflare, auth, mail, and agent-operable deploy. Ownership includes the boring work after day one.",
  },
];

const head = (title, description, canonical) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#08080a" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${esc(title.replace(/ — .*$/, ""))}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="/styles.css" />
</head>`;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

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
        <a href="/#how"${active === "how" ? ' aria-current="page"' : ""}>How we work</a>
        <a href="/#about"${active === "about" ? ' aria-current="page"' : ""}>About</a>
        <a href="/#contact"${active === "contact" ? ' aria-current="page"' : ""}>Contact</a>
        <a class="nav-cta" href="/#products">Portfolio</a>
      </nav>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <p class="footer-mark">Burkett Studios</p>
        <p class="footer-note">
          The arm of
          <a href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
          that builds, runs, and owns our digital products.
        </p>
      </div>
      <div class="footer-links">
        <a href="/#products">Products</a>
        <a href="https://yearwall.burkettinv.com" rel="noopener">Year Wall</a>
        <a href="https://wandered.burkettinv.com" rel="noopener">Wandered</a>
        <a href="https://getmassagenow.com" rel="noopener">MassageNow</a>
        <a href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
      </div>
    </div>
    <div class="shell">
      <p class="footer-legal">© <span data-year></span> Burkett Studios. All rights reserved.</p>
    </div>
  </footer>
  <script src="/site.js" defer></script>
</body>
</html>`;

function productLinks(p, { compact = false } = {}) {
  const links = [];
  // Always link to Studios detail page on cards
  if (compact) {
    links.push(
      `<a class="product-link" href="/products/${p.slug}/">Overview</a>`
    );
  }
  if (p.marketing) {
    links.push(
      `<a class="product-link${compact ? " secondary" : ""}" href="${p.marketing.href}" rel="noopener">${compact ? p.marketing.host : p.marketing.label}</a>`
    );
  }
  if (p.app && (!p.marketing || p.app.href !== p.marketing.href)) {
    links.push(
      `<a class="product-link secondary" href="${p.app.href}" rel="noopener">${p.app.label}</a>`
    );
  } else if (p.app && p.marketing && p.app.href === p.marketing.href && !compact) {
    // same URL: only one primary already covered by marketing on detail pages
  }
  if (!p.marketing && !p.app && p.waitlist) {
    links.push(
      `<a class="product-link secondary" href="/products/${p.slug}/#waitlist">Join waitlist</a>`
    );
  }
  return links.join("\n          ");
}

function productActions(p) {
  const actions = [];
  if (p.marketing) {
    actions.push(
      `<a class="btn btn-primary" href="${p.marketing.href}" rel="noopener">${p.marketing.label}</a>`
    );
  }
  if (p.app && (!p.marketing || p.app.href !== p.marketing.href)) {
    actions.push(
      `<a class="btn ${p.marketing ? "btn-ghost" : "btn-primary"}" href="${p.app.href}" rel="noopener">${p.app.label}</a>`
    );
  } else if (p.app && p.marketing && p.app.href === p.marketing.href) {
    // marketing already covers open; add ghost to studios portfolio only
  }
  if (p.waitlist) {
    actions.push(
      `<a class="btn btn-ghost" href="#waitlist">${p.marketing || p.app ? "Studios waitlist" : "Join waitlist"}</a>`
    );
  }
  actions.push(`<a class="btn btn-ghost" href="/#products">All products</a>`);
  return actions.join("\n        ");
}

function waitlistBlock(productName) {
  const id = productName.toLowerCase().replace(/\s+/g, "-");
  return `
      <section class="waitlist-panel" id="waitlist">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Waitlist</p>
        <h2>Early access</h2>
        <p class="section-copy">Leave an email. We only write when there is something real to try.</p>
        <form class="waitlist-form" data-waitlist="${esc(productName)}">
          <label class="sr-only" for="email-${id}">Email</label>
          <input id="email-${id}" name="email" type="email" required placeholder="you@example.com" autocomplete="email" />
          <label class="sr-only" for="note-${id}">Note (optional)</label>
          <input id="note-${id}" name="note" type="text" placeholder="Context (optional)" />
          <button class="btn btn-primary" type="submit">Join waitlist</button>
        </form>
        <p class="form-note" data-form-note hidden></p>
      </section>`;
}

function productPage(p) {
  const linkRows = [];
  if (p.marketing) {
    linkRows.push(`
        <a class="link-row" href="${p.marketing.href}" rel="noopener">
          <span class="link-row-kicker">Product site</span>
          <span class="link-row-title">${esc(p.marketing.label)}</span>
          <span class="link-row-host">${esc(p.marketing.host)}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }
  if (p.app && (!p.marketing || p.app.href !== p.marketing.href)) {
    linkRows.push(`
        <a class="link-row" href="${p.app.href}" rel="noopener">
          <span class="link-row-kicker">Open product</span>
          <span class="link-row-title">${esc(p.app.label)}</span>
          <span class="link-row-host">${esc(p.app.href.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }

  return `${head(
    `${p.name} — Burkett Studios`,
    p.card,
    `https://burkettstudios.com/products/${p.slug}/`
  )}
<body class="product-page" data-product="${p.id}">
${header("products")}
  <main id="main">
    <section class="product-hero shell">
      <p class="crumb"><a href="/">Studios</a> / <a href="/#products">Products</a> / ${esc(p.name)}</p>
      <div class="product-top product-hero-top">
        <span class="product-tag">${esc(p.tag)}</span>
        <span class="status ${p.status}">${esc(p.statusLabel)}</span>
      </div>
      <h1>${esc(p.name)}</h1>
      <p class="one-liner">${esc(p.oneLiner)}</p>
      <p class="lede">${esc(p.lede)}</p>
      <div class="hero-actions">
        ${productActions(p)}
      </div>
    </section>

    ${
      linkRows.length
        ? `<section class="shell product-links-block">
      <p class="eyebrow">Go to the product</p>
      <div class="link-rows">
        ${linkRows.join("\n")}
      </div>
    </section>`
        : ""
    }

    <section class="product-body shell">
      <p class="eyebrow">What it is</p>
      <ul class="feature-list">
        ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("\n        ")}
      </ul>
      ${p.note ? `<p class="section-copy callout">${esc(p.note)}</p>` : ""}
      ${p.waitlistNote ? `<p class="section-copy">${esc(p.waitlistNote)}</p>` : ""}
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
            <span class="product-tag">${esc(p.tag)}</span>
            <span class="status ${p.status}">${esc(p.statusLabel)}</span>
          </div>
          <h3><a href="/products/${p.slug}/">${esc(p.name)}</a></h3>
          <p class="card-one-liner">${esc(p.oneLiner)}</p>
          <p>${esc(p.card)}</p>
          <div class="card-links">
          ${productLinks(p, { compact: true })}
          </div>
        </article>`
    )
    .join("\n");

  const how = howWeWork
    .map(
      (c) => `
          <li>
            <span class="cap-num">${c.num}</span>
            <div>
              <strong>${esc(c.title)}</strong>
              <span>${esc(c.body)}</span>
            </div>
          </li>`
    )
    .join("\n");

  return `${head(
    "Burkett Studios — Digital products we build, run, and own",
    "Burkett Studios is the arm of Burkett Investments that builds, runs, and owns Year Wall, Wandered, SurroStack, MassageNow, and more.",
    "https://burkettstudios.com/"
  )}
<body>
${header()}
  <main id="main">
    <section class="hero shell">
      <span class="gold-rule" aria-hidden="true"></span>
      <p class="eyebrow">Burkett Investments · Digital products</p>
      <h1>
        Software we build,<br />
        <span class="hero-accent">run, and own.</span>
      </h1>
      <p class="lede">
        Burkett Studios is where Burkett Investments ships digital products.
        Year Wall, Wandered, SurroStack, MassageNow, and what comes next:
        we invent them, operate them, and keep title. We do not build software for hire.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#products">See the portfolio</a>
        <a class="btn btn-ghost" href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
      </div>
    </section>

    <section class="spec-strip" aria-label="Studios facts">
      <div class="shell">
        <dl class="spec-grid">
          <div class="spec-cell">
            <dt>Role</dt>
            <dd>Owned products</dd>
          </div>
          <div class="spec-cell">
            <dt>Surfaces</dt>
            <dd>iOS · Web · API</dd>
          </div>
          <div class="spec-cell">
            <dt>Stack</dt>
            <dd>Cloudflare</dd>
          </div>
          <div class="spec-cell">
            <dt>Parent</dt>
            <dd>Burkett Investments</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="products" class="section shell">
      <div class="section-head section-head-row">
        <div>
          <span class="gold-rule" aria-hidden="true"></span>
          <p class="eyebrow">Portfolio</p>
          <h2>Products we own</h2>
          <p class="section-copy">
            Each product has a Studios overview. Live products also link to their own marketing site
            and, when separate, the app itself.
          </p>
        </div>
      </div>
      <div class="product-grid">
${cards}
      </div>
    </section>

    <section id="how" class="section shell">
      <div class="section-head">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">How we work</p>
        <h2>How Studios runs</h2>
        <p class="section-copy">
          An internal product practice. Strategy through production for software that stays on our books.
        </p>
      </div>
      <ul class="cap-list">
${how}
      </ul>
    </section>

    <section id="about" class="section shell">
      <div class="section-head">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">About</p>
        <h2>Part of Burkett Investments</h2>
      </div>
      <div class="approach-grid">
        <div class="approach-copy">
          <p class="section-copy" style="margin:0">
            Burkett Investments is multi-avenue. Consulting and investment management live on
            burkettinv.com. Burkett Studios is the digital product arm: we own the code, the
            domains, and day-to-day operation of the portfolio below.
          </p>
        </div>
        <div class="approach-list-wrap">
          <ul class="approach-list">
            <li>
              <strong>Owned digital assets</strong>
              <span>Not a services desk. Consumer apps, marketplaces, and platforms with Burkett on the title.</span>
            </li>
            <li>
              <strong>Same brand law</strong>
              <span>Cybertruck geometry, gold ignition, hairline systems. Digital inherits Burkett Identity.</span>
            </li>
            <li>
              <strong>Ship, then operate</strong>
              <span>Live domains and ongoing ops. Launch is the start of ownership, not a client handoff.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="contact" class="section shell">
      <div class="contact-panel">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Contact</p>
        <h2>Get in touch</h2>
        <p class="section-copy">
          Press, partnership, product feedback, or waitlist questions for our apps.
          Reach Burkett Investments and ask for Studios.
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
