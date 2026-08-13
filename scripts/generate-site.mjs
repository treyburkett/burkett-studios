#!/usr/bin/env node
/**
 * Burkett Studios marketing site generator
 *
 * PURPOSE OF burkettstudios.com
 * -----------------------------
 * Home for Burkett's owned digital products.
 * 1. State who owns the portfolio (Burkett Investments → Studios).
 * 2. List the products we build, run, and own.
 * 3. Send people to each product's own marketing site (and app when separate).
 *
 * Not a consultancy site. Not a second marketing page for every feature.
 * Product story lives on product domains; this site is the map.
 *
 * Brand: burkettinv.com DESIGN-LOCK.
 * Run: node scripts/generate-site.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const PURPOSE = {
  title: "Burkett Studios — Digital products we own",
  description:
    "Burkett Studios is the digital-product arm of Burkett Investments. A map of products we build, run, and own, with links to each product site.",
  heroEyebrow: "Burkett Investments · Digital products",
  heroH1a: "The products",
  heroH1b: "we own.",
  heroLede:
    "Burkett Studios is the arm of Burkett Investments that builds, runs, and owns our digital products. This site is the map: what we hold, and where each product lives online.",
};

/**
 * marketing = public product site (canonical story / waitlist / brand)
 * app = open the product when different from marketing
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
    card: "Dense year wall, continuous plan bars, household cloud. Not a day-list calendar.",
    lede: "Year Wall is a Burkett-owned calendar product: the full year visible at once, continuous plan bars, web and iPhone.",
    bullets: [
      "Whole-year wall with continuous plan bars",
      "Household cloud across web and iPhone",
      "Web live; iOS when quality clears the bar",
    ],
    marketing: {
      href: "https://yearwall.burkettinv.com",
      label: "Go to Year Wall",
      host: "yearwall.burkettinv.com",
    },
    app: null, // product site is the product
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
    card: "Exact coastlines, trip journal, passport that fills as you travel.",
    lede: "Wandered is a Burkett-owned travel map product: where you have been, painted with real precision, plus trips and a passport.",
    bullets: [
      "Unsimplified borders and real coastlines",
      "Trip journal and passport",
      "Marketing site and app are both on wandered.burkettinv.com",
    ],
    marketing: {
      href: "https://wandered.burkettinv.com",
      label: "Go to Wandered",
      host: "wandered.burkettinv.com",
    },
    app: {
      href: "https://wandered.burkettinv.com/app",
      label: "Open the app",
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
    oneLiner: "Ops stack for a high-stakes personal journey.",
    card: "Tasks, calendar, money, and share status for surrogacy logistics.",
    lede: "SurroStack is a Burkett-owned operations product for surrogacy journeys. The live product is a signed-in portal; this page is the public pointer.",
    bullets: [
      "Task portal and calendar for journey load",
      "Share Status for partners and support",
      "No separate public marketing domain yet",
    ],
    marketing: null,
    app: {
      href: "https://app.burkettinv.com/surrostack/",
      label: "Open SurroStack",
    },
    waitlist: false,
    note: "Public marketing site not launched. Use the portal link if you have access.",
  },
  {
    slug: "massagenow",
    id: "massagenow",
    name: "MassageNow",
    tag: "Marketplace",
    status: "build",
    statusLabel: "Pilot",
    oneLiner: "Last-minute openings at licensed studios.",
    card: "Nashville pilot marketplace for same-day massage inventory.",
    lede: "MassageNow is a Burkett-owned marketplace product. Story and waitlist live on getmassagenow.com.",
    bullets: [
      "Consumer booking for open slots",
      "Studio fill for cancellations",
      "Pilot market: Nashville",
    ],
    marketing: {
      href: "https://getmassagenow.com",
      label: "Go to MassageNow",
      host: "getmassagenow.com",
    },
    app: null,
    waitlist: true,
    waitlistNote: "Prefer the product site when it is open; or leave an email below.",
  },
  {
    slug: "orient",
    id: "orient",
    name: "Orient",
    tag: "Guides",
    status: "seed",
    statusLabel: "Seed",
    oneLiner: "Place guides with editorial standards.",
    card: "Local orientation without SEO directory sludge. Region pilots first.",
    lede: "Orient is a Burkett-owned place-guide product in seed. No public product site yet.",
    bullets: [
      "Editorial rules over directory spam",
      "Minnesota pilot first",
      "Waitlist until a product site ships",
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
    card: "Research-backed personal software. Privacy first. Still in design.",
    lede: "Conflict Patterns is a Burkett-owned personal product in seed. No public product site yet.",
    bullets: [
      "Privacy-first design",
      "Research structure, not gimmicks",
      "Waitlist for early access",
    ],
    marketing: null,
    app: null,
    waitlist: true,
  },
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function stripProtocol(href) {
  return String(href).replace(/^https?:\/\//, "");
}

function hrefHost(href) {
  return stripProtocol(href).split("/")[0];
}

function hrefHostPath(href) {
  return stripProtocol(href).replace(/\/$/, "");
}

const head = (title, description, canonical) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
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
        <a href="/#about"${active === "about" ? ' aria-current="page"' : ""}>About</a>
        <a href="/#contact"${active === "contact" ? ' aria-current="page"' : ""}>Contact</a>
        <a class="nav-cta" href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
      </nav>
    </div>
  </header>`;

const footerProductLinks = products
  .filter((p) => p.marketing)
  .map(
    (p) =>
      `        <a href="${p.marketing.href}" rel="noopener">${esc(p.name)}</a>`
  )
  .join("\n");

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <p class="footer-mark">Burkett Studios</p>
        <p class="footer-note">
          Digital products owned by Burkett Investments.
          Map of the portfolio. Product story lives on each product site.
        </p>
      </div>
      <div class="footer-links">
        <a href="/#products">All products</a>
${footerProductLinks}
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

function primaryHref(p) {
  if (p.marketing) return p.marketing.href;
  if (p.app) return p.app.href;
  if (p.waitlist) return `/products/${p.slug}/#waitlist`;
  return `/products/${p.slug}/`;
}

function primaryLabel(p) {
  if (p.marketing) return p.marketing.label;
  if (p.app) return p.app.label;
  if (p.waitlist) return "Join waitlist";
  return "Overview";
}

function waitlistBlock(productName) {
  const id = productName.toLowerCase().replace(/\s+/g, "-");
  return `
      <section class="waitlist-panel" id="waitlist">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Waitlist</p>
        <h2>Early access</h2>
        <p class="section-copy">For seed products without a public site yet. We only write when there is something to try.</p>
        <form class="waitlist-form" data-waitlist="${esc(productName)}">
          <label class="sr-only" for="email-${id}">Email</label>
          <input id="email-${id}" name="email" type="email" required placeholder="you@example.com" autocomplete="email" />
          <label class="sr-only" for="note-${id}">Note</label>
          <input id="note-${id}" name="note" type="text" placeholder="Optional note" />
          <button class="btn btn-primary" type="submit">Join waitlist</button>
        </form>
        <p class="form-note" data-form-note hidden></p>
      </section>`;
}

function productPage(p) {
  const rows = [];
  if (p.marketing) {
    rows.push(`
        <a class="link-row" href="${p.marketing.href}" rel="noopener">
          <span class="link-row-kicker">Product site</span>
          <span class="link-row-title">${esc(p.marketing.label)}</span>
          <span class="link-row-host">${esc(p.marketing.host)}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }
  if (p.app) {
    rows.push(`
        <a class="link-row" href="${p.app.href}" rel="noopener">
          <span class="link-row-kicker">Open product</span>
          <span class="link-row-title">${esc(p.app.label)}</span>
          <span class="link-row-host">${esc(hrefHostPath(p.app.href))}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }

  const actions = [];
  if (p.marketing) {
    actions.push(
      `<a class="btn btn-primary" href="${p.marketing.href}" rel="noopener">${esc(p.marketing.label)}</a>`
    );
  }
  if (p.app) {
    actions.push(
      `<a class="btn ${p.marketing ? "btn-ghost" : "btn-primary"}" href="${p.app.href}" rel="noopener">${esc(p.app.label)}</a>`
    );
  }
  if (p.waitlist) {
    actions.push(`<a class="btn btn-ghost" href="#waitlist">Waitlist</a>`);
  }
  actions.push(`<a class="btn btn-ghost" href="/#products">All products</a>`);

  const linksBlock = rows.length
    ? `
    <section class="shell product-links-block">
      <p class="eyebrow">Where it lives</p>
      <div class="link-rows">${rows.join("")}
      </div>
    </section>
`
    : "";

  const bodyExtras = [];
  if (p.note) {
    bodyExtras.push(
      `      <p class="section-copy callout">${esc(p.note)}</p>`
    );
  }
  if (p.waitlistNote) {
    bodyExtras.push(`      <p class="section-copy">${esc(p.waitlistNote)}</p>`);
  }
  if (p.waitlist) bodyExtras.push(waitlistBlock(p.name).trimEnd());

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
      <p class="owned-tag">Owned by Burkett Studios</p>
      <h1>${esc(p.name)}</h1>
      <p class="one-liner">${esc(p.oneLiner)}</p>
      <p class="lede">${esc(p.lede)}</p>
      <div class="hero-actions">
        ${actions.join("\n        ")}
      </div>
    </section>
${linksBlock}
    <section class="product-body shell">
      <p class="eyebrow">In short</p>
      <ul class="feature-list">
        ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("\n        ")}
      </ul>
${bodyExtras.length ? `${bodyExtras.join("\n")}\n` : ""}    </section>
  </main>
${footer}`;
}

function indexPage() {
  const cards = products
    .map((p) => {
      const primary = primaryHref(p);
      const primaryIsExternal = primary.startsWith("http");
      const secondary =
        p.marketing && p.app
          ? `<a class="product-link secondary" href="${p.app.href}" rel="noopener">${esc(p.app.label)}</a>`
          : `<a class="product-link secondary" href="/products/${p.slug}/">Studios overview</a>`;
      const host = p.marketing
        ? `<span class="product-host">${esc(p.marketing.host)}</span>`
        : p.app
          ? `<span class="product-host">${esc(hrefHost(p.app.href))}</span>`
          : "";

      return `
        <article class="product-card" data-product="${p.id}">
          <div class="product-top">
            <span class="product-tag">${esc(p.tag)}</span>
            <span class="status ${p.status}">${esc(p.statusLabel)}</span>
          </div>
          <h3>
            <a href="${primary}"${primaryIsExternal ? ' rel="noopener"' : ""}>${esc(p.name)}</a>
          </h3>
          <p class="card-one-liner">${esc(p.oneLiner)}</p>
          <p>${esc(p.card)}</p>
          <div class="card-links">
            <a class="product-link" href="${primary}"${primaryIsExternal ? ' rel="noopener"' : ""}>${esc(primaryLabel(p))}</a>
            ${secondary}${host ? `\n            ${host}` : ""}
          </div>
        </article>`;
    })
    .join("\n");

  return `${head(PURPOSE.title, PURPOSE.description, "https://burkettstudios.com/")}
<body>
${header()}
  <main id="main">
    <section class="hero shell">
      <span class="gold-rule" aria-hidden="true"></span>
      <p class="eyebrow">${esc(PURPOSE.heroEyebrow)}</p>
      <h1>
        ${esc(PURPOSE.heroH1a)}<br />
        <span class="hero-accent">${esc(PURPOSE.heroH1b)}</span>
      </h1>
      <p class="lede">${esc(PURPOSE.heroLede)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#products">View products</a>
        <a class="btn btn-ghost" href="https://burkettinv.com" rel="noopener">Company site</a>
      </div>
    </section>

    <section class="purpose-strip" aria-label="What this site is">
      <div class="shell purpose-grid">
        <div class="purpose-cell">
          <p class="purpose-label">This site is</p>
          <p class="purpose-value">A map of digital products Burkett owns</p>
        </div>
        <div class="purpose-cell">
          <p class="purpose-label">This site is not</p>
          <p class="purpose-value">A consultancy or build-for-hire shop</p>
        </div>
        <div class="purpose-cell">
          <p class="purpose-label">Product story</p>
          <p class="purpose-value">Lives on each product’s own site</p>
        </div>
        <div class="purpose-cell">
          <p class="purpose-label">Parent</p>
          <p class="purpose-value"><a href="https://burkettinv.com" rel="noopener">Burkett Investments</a></p>
        </div>
      </div>
    </section>

    <section id="products" class="section shell">
      <div class="section-head">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Portfolio</p>
        <h2>Owned products</h2>
        <p class="section-copy">
          Primary link goes to the product’s marketing site when one exists.
          Use “Studios overview” for a short owned-by-Burkett note.
        </p>
      </div>
      <div class="product-grid">
${cards}
      </div>
    </section>

    <section id="about" class="section shell">
      <div class="about-band">
        <div class="about-main">
          <span class="gold-rule" aria-hidden="true"></span>
          <p class="eyebrow">About</p>
          <h2>Studios under Burkett Investments</h2>
          <p class="section-copy">
            Burkett Investments runs real estate consulting and investment management on
            <a class="inline-link" href="https://burkettinv.com" rel="noopener">burkettinv.com</a>.
            Burkett Studios is the digital-product arm: we hold title to the software listed above,
            operate it, and point the public to each product’s home on the web.
          </p>
        </div>
        <ul class="about-points">
          <li>
            <strong>Build</strong>
            <span>We invent and ship the product.</span>
          </li>
          <li>
            <strong>Run</strong>
            <span>We keep it live and maintained.</span>
          </li>
          <li>
            <strong>Own</strong>
            <span>Burkett keeps the asset.</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="contact" class="section shell">
      <div class="contact-panel">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="eyebrow">Contact</p>
        <h2>Portfolio questions</h2>
        <p class="section-copy">
          Press, partnership, or feedback about Burkett digital products.
          For product-specific support, use that product’s own site when available.
        </p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="mailto:trey@burkettinv.com?subject=Burkett%20Studios">Email Trey</a>
          <a class="btn btn-ghost" href="https://burkettinv.com" rel="noopener">Burkett Investments</a>
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
  JSON.stringify({ purpose: PURPOSE, products }, null, 2) + "\n"
);
writeFileSync(
  join(root, "PURPOSE.md"),
  `# Purpose of burkettstudios.com

## One sentence

**Home and map for digital products Burkett Investments owns through Burkett Studios.**

## Jobs to do

1. **Ownership** — Make clear these products are Burkett’s (built, run, owned), not client work.
2. **Directory** — List the portfolio with honest status (live / pilot / seed).
3. **Handoff** — Send people to each product’s own marketing site (and app when separate).
4. **Boundary** — Separate Studios (digital assets) from burkettinv.com (RE / consulting / company OS).

## Jobs not to do

- Sell software consulting or “build for hire”
- Replace Year Wall / Wandered / MassageNow marketing sites with a mega brochure
- Deep product docs or app UI chrome

## Design consequence

Lead with portfolio. Primary CTA per product = product marketing site.
Studios product pages = short ownership overview + links out.
Minimal about/contact only.

Last locked: 2026-08-01
`
);
console.log("Generated purpose-led home + product pages.");
