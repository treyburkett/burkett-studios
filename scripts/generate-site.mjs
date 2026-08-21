#!/usr/bin/env node
/**
 * Burkett Studios marketing site generator
 *
 * THIS FILE is the product table. Edit products here, then:
 *   npm run generate
 *   npm run deploy    (only when Trey confirms a live ship)
 *
 * products.json is a snapshot this script writes. Do not edit it by hand.
 * public/*.html and public/sitemap.xml are also written here. Do not edit those by hand.
 * PURPOSE.md is the locked purpose note. This script does not overwrite it.
 *
 * Johnson Harvesting (jh.burkettstudios.com) is a different site. Not in this table.
 * Do not put it on the public homepage.
 *
 * PURPOSE OF burkettstudios.com
 * -----------------------------
 * Public face for Trey Burkett and his husband: two people in Nashville
 * building products, led by Walli. Not a holding-company map.
 *
 * Product name is Walli only. Never "Year Wall" on this site.
 * Do not hard-sell unfinished Walli to cold traffic.
 *
 * Brand: Walli coral #ff5c54. Neutrals, black, cream around it.
 * Run: node scripts/generate-site.mjs
 */
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const SITE = {
  title: "Burkett Studios · Building Walli in Nashville",
  description:
    "Trey Burkett and his husband build products in Nashville. Right now that means Walli, a year-at-a-glance calendar.",
  heroEyebrow: "Nashville",
  heroH1a: "We're building",
  heroH1b: "Walli.",
  heroLede:
    "The year-at-a-glance calendar. Whole year on one screen, continuous plan bars, household cloud. Two of us, making products we want to use.",
  voiceLine: "Software PM for 10 years. Building Walli with my husband. Nashville.",
};

/**
 * marketing = public product site (canonical story / waitlist / brand)
 * app = open the product when different from marketing
 * quietOutbound = keep the URL, do not use it as a hard-sell CTA
 */
const products = [
  {
    slug: "walli",
    id: "walli",
    name: "Walli",
    tag: "Calendar",
    status: "build",
    statusLabel: "Building",
    featured: true,
    quietOutbound: true,
    oneLiner: "Your whole year on one screen.",
    card: "Whole year at a glance, continuous plan bars, household cloud.",
    lede: "Walli is the year-at-a-glance calendar we are building in Nashville. The whole year stays on one screen, so a plan can stretch instead of getting chopped into a stack of days.",
    bullets: [
      "The full year visible at once",
      "Continuous plan bars, not a day list",
      "Household cloud across web and iPhone",
    ],
    marketing: {
      href: "https://yearwall.burkettinv.com",
      label: "In-progress site",
      host: "yearwall.burkettinv.com",
    },
    app: null,
    waitlist: false,
    note: "We are still building Walli. It is not ready to send people into an app yet.",
  },
  {
    slug: "wandered",
    id: "wandered",
    name: "Wandered",
    tag: "Travel map",
    status: "live",
    statusLabel: "Live",
    oneLiner: "Your world, filled in.",
    card: "Exact coastlines, trip journal, a passport that fills as you travel.",
    lede: "Wandered paints where you have been onto a real map. Real coastlines, the trips that got you there, and a passport that fills itself.",
    bullets: [
      "Unsimplified borders and real coastlines",
      "Trip journal and a passport that fills as you go",
      "iPhone and web",
    ],
    marketing: {
      href: "https://wandered.burkettinv.com",
      label: "Wandered site",
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
    tag: "Journey ops",
    status: "private",
    statusLabel: "Private",
    quietOutbound: true,
    oneLiner: "Ops for a surrogacy journey.",
    card: "Tasks, calendar, money, and a way to share status.",
    lede: "SurroStack helps a household keep a surrogacy journey in one place: tasks, calendar, money, and status you can share. It is a private pilot today.",
    bullets: [
      "Tasks and calendar for the journey load",
      "Share status with partners and support",
      "Signed-in portal. Not a public launch.",
    ],
    marketing: null,
    app: {
      href: "https://app.burkettinv.com/surrostack/",
      label: "Portal (if you have access)",
    },
    waitlist: false,
    note: "Private pilot. The portal link only helps if you already have access.",
  },
  {
    slug: "massagenow",
    id: "massagenow",
    name: "MassageNow",
    tag: "Nashville",
    status: "live",
    statusLabel: "Live",
    oneLiner: "Last-minute massage openings in Nashville.",
    card: "Same-day openings at licensed studios.",
    lede: "MassageNow is our Nashville experiment for last-minute massage inventory. The public story and waitlist live on getmassagenow.com.",
    bullets: [
      "Same-day openings at licensed studios",
      "Built for the empty slot, not a six-week book-ahead",
      "Nashville first",
    ],
    marketing: {
      href: "https://getmassagenow.com",
      label: "MassageNow site",
      host: "getmassagenow.com",
    },
    app: null,
    waitlist: true,
    waitlistNote: "The product site is the better waitlist if it is open. Or leave an email below.",
  },
  {
    slug: "orient",
    id: "orient",
    name: "Orient",
    tag: "Guides",
    status: "waitlist",
    statusLabel: "Waitlist",
    oneLiner: "Place guides with a point of view.",
    card: "Local orientation, not an SEO directory.",
    lede: "Orient is a place-guide product in early days. Editorial standards first. No public site yet.",
    bullets: [
      "Guides with a point of view, not directory sludge",
      "Region pilots before a big map",
      "Waitlist until there is something to try",
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
    status: "design",
    statusLabel: "In design",
    oneLiner: "Private pattern tracking for hard conversations.",
    card: "Still in design. Privacy first.",
    lede: "Conflict Patterns is personal software for seeing patterns in hard conversations. Still in design. Privacy first.",
    bullets: [
      "Private by default",
      "Pattern tracking, not a gimmick journal",
      "Waitlist for when there is something to try",
    ],
    marketing: null,
    app: null,
    waitlist: true,
  },
];

const featured = products.find((p) => p.featured);
const rest = products.filter((p) => !p.featured);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
  <meta name="theme-color" content="#f6f1e8" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta property="og:title" content="${esc(title.replace(/ [·—] .*$/, ""))}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:creator" content="@TreyBurkett" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
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
        <a href="/#walli"${active === "walli" ? ' aria-current="page"' : ""}>Walli</a>
        <a href="/#work"${active === "work" ? ' aria-current="page"' : ""}>Work</a>
        <a href="/#about"${active === "about" ? ' aria-current="page"' : ""}>About</a>
      </nav>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <p class="footer-mark">Burkett <em>Studios</em></p>
        <p class="footer-note">
          Two people in Nashville, building products. Led by Walli.
        </p>
      </div>
      <div class="footer-links">
        <a href="/#walli">Walli</a>
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="https://x.com/TreyBurkett" rel="noopener">Trey on X</a>
        <a href="https://burkettinv.com" rel="noopener">burkettinv.com</a>
      </div>
    </div>
    <div class="shell">
      <p class="footer-legal">© <span data-year></span> Burkett Studios. Nashville.</p>
    </div>
  </footer>
  <script src="/site.js" defer></script>
</body>
</html>`;

function primaryHref(p) {
  if (p.featured || p.quietOutbound) return `/products/${p.slug}/`;
  if (p.marketing) return p.marketing.href;
  if (p.waitlist) return `/products/${p.slug}/#waitlist`;
  return `/products/${p.slug}/`;
}

function primaryLabel(p) {
  if (p.featured) return "About Walli";
  if (p.quietOutbound) return "Read more";
  if (p.marketing) return p.marketing.label;
  if (p.waitlist) return "Join waitlist";
  return "Read more";
}

function waitlistBlock(productName) {
  const id = productName.toLowerCase().replace(/\s+/g, "-");
  return `
      <section class="waitlist-panel" id="waitlist">
        <span class="coral-rule" aria-hidden="true"></span>
        <p class="eyebrow">Waitlist</p>
        <h2>Early access</h2>
        <p class="section-copy">We only write when there is something to try.</p>
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

function yearMotif() {
  const columns = [
    [28, 14, 40],
    [18, 46],
    [22, 16, 34],
    [50, 12],
    [16, 24, 20],
    [36, 18],
    [14, 42, 16],
    [24, 30],
    [18, 14, 38],
    [44, 20],
    [16, 28, 18],
    [32, 14, 22],
  ];
  const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const cols = columns
    .map((bars, i) => {
      const barHtml = bars
        .map((h, j) => {
          const tone = j === 0 ? "year-bar-strong" : "year-bar-soft";
          return `<span class="year-bar ${tone}" style="height:${h}%"></span>`;
        })
        .join("");
      return `
          <div class="year-col">
            <div class="year-bars">${barHtml}</div>
            <span class="year-label">${labels[i]}</span>
          </div>`;
    })
    .join("");
  return `
        <div class="year-motif" aria-hidden="true">
${cols}
        </div>`;
}

function productPage(p) {
  const rows = [];
  if (p.marketing && !p.quietOutbound) {
    rows.push(`
        <a class="link-row" href="${esc(p.marketing.href)}" rel="noopener">
          <span class="link-row-kicker">Product site</span>
          <span class="link-row-title">${esc(p.marketing.label)}</span>
          <span class="link-row-host">${esc(p.marketing.host)}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }
  if (p.marketing && p.quietOutbound) {
    rows.push(`
        <a class="link-row quiet" href="${esc(p.marketing.href)}" rel="noopener">
          <span class="link-row-kicker">In progress</span>
          <span class="link-row-title">${esc(p.marketing.label)}</span>
          <span class="link-row-host">${esc(p.marketing.host)}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }
  if (p.app && !p.quietOutbound) {
    rows.push(`
        <a class="link-row" href="${esc(p.app.href)}" rel="noopener">
          <span class="link-row-kicker">Open product</span>
          <span class="link-row-title">${esc(p.app.label)}</span>
          <span class="link-row-host">${esc(hrefHostPath(p.app.href))}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }
  if (p.app && p.quietOutbound) {
    rows.push(`
        <a class="link-row quiet" href="${esc(p.app.href)}" rel="noopener">
          <span class="link-row-kicker">Private</span>
          <span class="link-row-title">${esc(p.app.label)}</span>
          <span class="link-row-host">${esc(hrefHostPath(p.app.href))}</span>
          <span class="link-row-go" aria-hidden="true">→</span>
        </a>`);
  }

  const actions = [];
  if (p.marketing && !p.quietOutbound) {
    actions.push(
      `<a class="btn btn-primary" href="${esc(p.marketing.href)}" rel="noopener">${esc(p.marketing.label)}</a>`
    );
  }
  if (p.app && !p.quietOutbound) {
    actions.push(
      `<a class="btn ${p.marketing && !p.quietOutbound ? "btn-ghost" : "btn-primary"}" href="${esc(p.app.href)}" rel="noopener">${esc(p.app.label)}</a>`
    );
  }
  if (p.waitlist) {
    actions.push(
      `<a class="btn ${actions.length ? "btn-ghost" : "btn-primary"}" href="#waitlist">Join waitlist</a>`
    );
  }
  actions.push(`<a class="btn btn-ghost" href="/#work">Other work</a>`);

  const linksBlock = rows.length
    ? `
    <section class="shell product-links-block">
      <p class="eyebrow">${p.quietOutbound ? "Quiet links" : "Where it lives"}</p>
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

  const pageActive = p.featured ? "walli" : "work";

  return `${head(
    `${p.name} · Burkett Studios`,
    p.card,
    `https://burkettstudios.com/products/${esc(p.slug)}/`
  )}
<body class="product-page" data-product="${p.id}">
${header(pageActive)}
  <main id="main">
    <section class="product-hero shell">
      <p class="crumb"><a href="/">Home</a> / <a href="/#work">Work</a> / ${esc(p.name)}</p>
      <div class="product-top product-hero-top">
        <span class="product-tag">${esc(p.tag)}</span>
        <span class="status ${p.status}">${esc(p.statusLabel)}</span>
      </div>
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

function workRow(p) {
  const primary = primaryHref(p);
  const primaryIsExternal = primary.startsWith("http");
  const extra =
    p.marketing && !p.quietOutbound
      ? `<a class="work-link" href="${esc(p.marketing.href)}" rel="noopener">${esc(p.marketing.host)}</a>`
      : p.waitlist
        ? `<a class="work-link" href="/products/${esc(p.slug)}/#waitlist">Waitlist</a>`
        : "";

  return `
        <article class="work-row" data-product="${p.id}">
          <div class="work-head">
            <h3>
              <a href="${esc(primary)}"${primaryIsExternal ? ' rel="noopener"' : ""}>${esc(p.name)}</a>
            </h3>
            <span class="status ${p.status}">${esc(p.statusLabel)}</span>
          </div>
          <p class="card-one-liner">${esc(p.oneLiner)}</p>
          <p>${esc(p.card)}</p>
          <div class="work-links">
            <a class="work-link primary" href="${esc(primary)}"${primaryIsExternal ? ' rel="noopener"' : ""}>${esc(primaryLabel(p))}</a>
            ${extra}
          </div>
        </article>`;
}

function indexPage() {
  const workRows = rest.map(workRow).join("\n");

  return `${head(SITE.title, SITE.description, "https://burkettstudios.com/")}
<body>
${header()}
  <main id="main">
    <section class="hero shell">
      <span class="coral-rule" aria-hidden="true"></span>
      <p class="eyebrow">${esc(SITE.heroEyebrow)}</p>
      <h1>
        ${esc(SITE.heroH1a)}<br />
        <span class="hero-accent">${esc(SITE.heroH1b)}</span>
      </h1>
      <p class="lede">${esc(SITE.heroLede)}</p>
      <p class="voice-line">${esc(SITE.voiceLine)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#walli">About Walli</a>
        <a class="btn btn-ghost" href="#work">What else we make</a>
      </div>
    </section>

    <section id="walli" class="feature-band">
      <div class="shell feature-grid">
        <div class="feature-copy">
          <span class="coral-rule" aria-hidden="true"></span>
          <p class="eyebrow">What we are building</p>
          <div class="feature-title-row">
            <h2>${esc(featured.name)}</h2>
            <span class="status ${featured.status}">${esc(featured.statusLabel)}</span>
          </div>
          <p class="one-liner">${esc(featured.oneLiner)}</p>
          <p class="section-copy">${esc(featured.lede)}</p>
          <p class="section-copy">${esc(featured.note)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/products/${esc(featured.slug)}/">Read more about Walli</a>
          </div>
        </div>
${yearMotif()}
      </div>
    </section>

    <section id="work" class="section shell">
      <div class="section-head">
        <span class="coral-rule" aria-hidden="true"></span>
        <p class="eyebrow">Also underway</p>
        <h2>What else we make</h2>
        <p class="section-copy">
          Real products, honest status. Live sites stay one click away.
          Unfinished work does not get a hard sell.
        </p>
      </div>
      <div class="work-list">
${workRows}
      </div>
    </section>

    <section id="about" class="section shell">
      <div class="about-band">
        <div class="about-main">
          <span class="coral-rule" aria-hidden="true"></span>
          <p class="eyebrow">About</p>
          <h2>Two people. Nashville.</h2>
          <p class="section-copy">
            Trey spent ten years as a software PM. Now he and his husband build
            products they actually want to use, starting with Walli.
          </p>
          <p class="section-copy">
            This is not a consultancy. We are not for hire. We make our own things.
          </p>
          <p class="voice-line">${esc(SITE.voiceLine)}</p>
        </div>
        <ul class="about-points">
          <li>
            <strong>Walli first</strong>
            <span>The year-at-a-glance calendar is the main work.</span>
          </li>
          <li>
            <strong>Built together</strong>
            <span>Trey and his husband. Not a solo-founder story.</span>
          </li>
          <li>
            <strong>Other company</strong>
            <span>Real estate lives on <a class="inline-link" href="https://burkettinv.com" rel="noopener">burkettinv.com</a>.</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="contact" class="section shell">
      <div class="contact-panel">
        <span class="coral-rule" aria-hidden="true"></span>
        <p class="eyebrow">Contact</p>
        <h2>Say hi.</h2>
        <p class="section-copy">
          Questions, notes, or just hello. Trey reads the mail.
        </p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="mailto:trey@burkettinv.com?subject=Burkett%20Studios">Email Trey</a>
          <a class="btn btn-ghost" href="https://x.com/TreyBurkett" rel="noopener">Trey on X</a>
        </div>
      </div>
    </section>
  </main>
${footer}`;
}

function walliRedirectPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Moved to Walli · Burkett Studios</title>
  <meta http-equiv="refresh" content="0; url=/products/walli/" />
  <link rel="canonical" href="https://burkettstudios.com/products/walli/" />
</head>
<body>
  <p>This page moved to <a href="/products/walli/">Walli</a>.</p>
</body>
</html>
`;
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

rmSync(join(pub, "products", "year-wall"), { recursive: true, force: true });

writeFileSync(join(pub, "index.html"), indexPage());
for (const p of products) {
  const dir = join(pub, "products", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), productPage(p));
}
mkdirSync(join(pub, "products", "year-wall"), { recursive: true });
writeFileSync(join(pub, "products", "year-wall", "index.html"), walliRedirectPage());
writeFileSync(join(pub, "sitemap.xml"), sitemap());
writeFileSync(
  join(root, "products.json"),
  JSON.stringify(
    {
      generatedFrom: "scripts/generate-site.mjs",
      site: SITE,
      products,
    },
    null,
    2
  ) + "\n"
);
console.log("Generated home + product pages from scripts/generate-site.mjs.");
