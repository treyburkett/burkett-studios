#!/usr/bin/env node
/**
 * Generates marketing pages from product truth.
 * Brand: burkettinv.com DESIGN-LOCK (Cybertruck / gold ignition).
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
      "Full-year calendar product. Spatial planning surface for people who think in years, not day lists.",
    lede: "Year Wall is a full-year calendar product: density, room, and plans visible in one spatial field.",
    bullets: [
      "Full-year grid engineered for glanceable density",
      "Web product live at yearwall.burkettinv.com",
      "iOS client in active polish; ships when quality clears the bar",
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
      "Travel map and passport product. Places you have been, mapped without the checklist noise.",
    lede: "Wandered is a map-first travel product: a calm passport for where you have been, built for long-term use.",
    bullets: [
      "Map-primary architecture for visited places",
      "Passport and trip surfaces with restrained chrome",
      "Web is the production surface while iOS distribution is held",
    ],
    external: "https://wandered.burkettinv.com",
    externalLabel: "Open Wandered",
    waitlist: false,
  },
  {
    slug: "surrostack",
    id: "surrostack",
    name: "SurroStack",
    tag: "Web platform",
    status: "ship",
    statusLabel: "Live pilot",
    card:
      "Operations platform for surrogacy journeys: tasks, calendar, money, and share surfaces.",
    lede: "SurroStack is an operations stack for a high-stakes personal journey: tasks, calendar, money, and share status in one system.",
    bullets: [
      "Task and calendar core for journey load",
      "Share Status for partners and support networks",
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
      "Two-sided marketplace for last-minute massage inventory. Consumer book, studio fill.",
    lede: "MassageNow is a marketplace product that matches spontaneous demand to open studio capacity.",
    bullets: [
      "Consumer booking path designed for speed",
      "Partner studio surface for cancelled-slot inventory",
      "Pilot market live marketing at getmassagenow.com",
    ],
    external: "https://getmassagenow.com",
    externalLabel: "Visit MassageNow",
    waitlist: true,
    waitlistNote: "Studios and early users can also join the waitlist below.",
  },
  {
    slug: "orient",
    id: "orient",
    name: "Orient",
    tag: "Content product",
    status: "seed",
    statusLabel: "Seed",
    card:
      "Place-guide product with editorial standards. Local orientation without affiliate sludge.",
    lede: "Orient is a place-guide product line: local voice, strict content rules, region pilots before scale.",
    bullets: [
      "Editorial standards over SEO directory defaults",
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
    tag: "Personal software",
    status: "seed",
    statusLabel: "Seed",
    card:
      "Private relationship-pattern tracker. Research structure, not performative advice content.",
    lede: "Conflict Patterns is personal software for tracking repair patterns with privacy-first design.",
    bullets: [
      "Privacy-first product architecture",
      "Research-backed structure without gimmicks",
      "In design: waitlist for early access",
    ],
    external: null,
    externalLabel: null,
    waitlist: true,
  },
];

/** How we run our own products (not client services). */
const capabilities = [
  {
    num: "01",
    title: "Own the product",
    body: "We conceive, build, ship, and operate software we own. Year Wall, Wandered, SurroStack, and the rest sit under Burkett Studios.",
  },
  {
    num: "02",
    title: "Design under Burkett Identity",
    body: "Same design law as burkettinv.com: sharp geometry, gold ignition, production restraint. No second brand system for digital.",
  },
  {
    num: "03",
    title: "iOS and web production",
    body: "Native clients and web platforms run as real products with quality gates, not demos that never leave the lab.",
  },
  {
    num: "04",
    title: "Infrastructure we operate",
    body: "Cloudflare, deploy automation, and agent-operable paths so our products stay live and maintainable.",
  },
  {
    num: "05",
    title: "Company systems when needed",
    body: "When Burkett Investments needs a real product surface for ops, Studios builds and runs it under the same stack.",
  },
];

const approach = [
  {
    title: "Owned digital assets",
    body: "Studios is not a services desk. We build, run, and own the portfolio: consumer apps, marketplaces, and platforms with Burkett on the title.",
  },
  {
    title: "Same brand law as burkettinv.com",
    body: "Cybertruck geometry, gold ignition, hairline systems. Digital products inherit Burkett Identity, not a spin-off look.",
  },
  {
    title: "Ship production, keep operating",
    body: "Live domains, git history, and ongoing ops. Launch is the start of ownership, not the end of a client engagement.",
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
  <meta property="og:title" content="${title.replace(/ — .*$/, "")}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
        <a href="/#how"${active === "how" ? ' aria-current="page"' : ""}>How we work</a>
        <a href="/#about"${active === "about" ? ' aria-current="page"' : ""}>About</a>
        <a href="/#contact"${active === "contact" ? ' aria-current="page"' : ""}>Contact</a>
        <a class="nav-cta" href="/#products">Our products</a>
      </nav>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-inner">
      <p class="footer-mark">Burkett Studios</p>
      <p class="footer-note">
        The arm of
        <a href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
        that builds, runs, and owns our digital products.
        Real estate consulting and investment management remain on burkettinv.com.
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
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Waitlist</p>
        <h2>Request early access</h2>
        <p class="section-copy">Leave your email. We write when there is a build ready to try.</p>
        <form class="waitlist-form" data-waitlist="${productName}">
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
          <a class="product-link" href="/products/${p.slug}/">View product</a>
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

  const caps = capabilities
    .map(
      (c) => `
          <li>
            <span class="cap-num">${c.num}</span>
            <div>
              <strong>${c.title}</strong>
              <span>${c.body}</span>
            </div>
          </li>`
    )
    .join("\n");

  const approachItems = approach
    .map(
      (a) => `
            <li>
              <strong>${a.title}</strong>
              <span>${a.body}</span>
            </li>`
    )
    .join("\n");

  return `${head(
    "Burkett Studios — Digital products we build, run, and own",
    "Burkett Studios is the arm of Burkett Investments that builds, runs, and owns our digital products: Year Wall, Wandered, SurroStack, and more.",
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
        Burkett Studios is the arm of Burkett Investments for digital products.
        We invent, ship, operate, and hold title to apps and platforms such as Year Wall,
        Wandered, and SurroStack. We do not build software for outside clients.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#products">Our products</a>
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
            <dt>Infrastructure</dt>
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
      <div class="section-head">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Portfolio</p>
        <h2>Digital assets we own</h2>
        <p class="section-copy">
          Products Burkett Studios builds, runs, and owns. Live apps ship on their own domains;
          seed products take a waitlist until they are ready.
        </p>
      </div>
      <div class="product-grid">
${cards}
      </div>
    </section>

    <section id="how" class="section shell">
      <div class="section-head">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">How we work</p>
        <h2>How Studios operates</h2>
        <p class="section-copy">
          Internal product practice, not a consultancy. Strategy through production for software
          that stays on our books.
        </p>
      </div>
      <ul class="cap-list">
${caps}
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
            domains, and the ongoing operation of the software listed here.
          </p>
        </div>
        <div class="approach-list-wrap">
          <ul class="approach-list">
${approachItems}
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
          Press, partnership, product feedback, or waitlist questions for our own apps.
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
console.log(`Generated home + ${products.length} product pages (Identity-aligned).`);
