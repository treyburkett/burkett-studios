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

function hrefHostPath(href) {
  return String(href).replace(/^https?:\/\//, "").replace(/\/$/, "");
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
  <link href="https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
</head>`;

const header = (active = "") => `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="mark" href="/" aria-label="Burkett Studios home">Burkett <em>Studios</em></a>
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

function waitlistBlock(productName) {
  const id = productName.toLowerCase().replace(/\s+/g, "-");
  return `
      <section class="waitlist" id="waitlist">
        <h2>Early access</h2>
        <p>We only write when there is something to try.</p>
        <form data-waitlist="${esc(productName)}">
          <label class="sr-only" for="email-${id}">Email</label>
          <input id="email-${id}" name="email" type="email" required placeholder="you@example.com" autocomplete="email" />
          <label class="sr-only" for="note-${id}">Note</label>
          <input id="note-${id}" name="note" type="text" placeholder="Optional note" />
          <button class="btn" type="submit">Join waitlist</button>
        </form>
        <p class="form-note" data-form-note hidden></p>
      </section>`;
}

function yearMotif() {
  const heights = [68, 40, 86, 52, 34, 74, 46, 90, 38, 64, 50, 78];
  const bars = heights
    .map(
      (h, i) =>
        `<span class="year-bar" style="--h:${h}%;--i:${i}"></span>`
    )
    .join("");
  return `<div class="year-motif" aria-hidden="true">${bars}</div>`;
}

function productPage(p) {
  const outs = [];
  if (p.marketing) {
    outs.push(
      `<a href="${esc(p.marketing.href)}" rel="noopener">${esc(p.marketing.host)}</a>${p.quietOutbound ? " <span>(in progress)</span>" : ""}`
    );
  } else if (p.app) {
    outs.push(
      `<a href="${esc(p.app.href)}" rel="noopener">${esc(hrefHostPath(p.app.href))}</a>${p.quietOutbound ? " <span>(if you have access)</span>" : ""}`
    );
  }

  const extras = [];
  if (p.note) extras.push(`      <p class="note">${esc(p.note)}</p>`);
  if (p.waitlistNote) extras.push(`      <p>${esc(p.waitlistNote)}</p>`);
  if (p.waitlist) extras.push(waitlistBlock(p.name).trimEnd());

  const pageActive = p.featured ? "walli" : "work";

  return `${head(
    `${p.name} · Burkett Studios`,
    p.card,
    `https://burkettstudios.com/products/${esc(p.slug)}/`
  )}
<body class="product-page" data-product="${p.id}">
${header(pageActive)}
  <main id="main">
    <article class="product shell">
      <p class="crumb"><a href="/">Home</a> / <a href="/#work">Work</a> / ${esc(p.name)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="one-liner">${esc(p.oneLiner)}</p>
      <p class="lede">${esc(p.lede)}</p>
      ${outs.length ? `<p class="out">${outs.join("<br />")}</p>` : ""}
      <ul class="points">
        ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("\n        ")}
      </ul>
${extras.length ? `${extras.join("\n")}\n` : ""}      <p class="back"><a href="/#work">Other work</a></p>
    </article>
  </main>
${footer}`;
}

function workItem(p) {
  const internal = `/products/${esc(p.slug)}/`;
  const host =
    p.marketing && !p.quietOutbound
      ? `\n          <a class="work-host" href="${esc(p.marketing.href)}" rel="noopener">${esc(p.marketing.host)}</a>`
      : "";
  return `
        <li class="work-item" data-product="${p.id}">
          <a class="work-name" href="${internal}">${esc(p.name)}</a>
          <p class="work-line">${esc(p.oneLiner)}</p>${host}
        </li>`;
}

function indexPage() {
  const workItems = rest.map(workItem).join("\n");

  return `${head(SITE.title, SITE.description, "https://burkettstudios.com/")}
<body class="home">
  <div class="wash wash-a" aria-hidden="true"></div>
  <div class="wash wash-b" aria-hidden="true"></div>
${header()}
  <main id="main">
    <section class="hero shell">
      <div class="hero-layer">
        <p class="place">${esc(SITE.heroEyebrow)}</p>
        <h1>
          ${esc(SITE.heroH1a)}
          <a class="hero-accent" href="#walli">${esc(SITE.heroH1b)}</a>
        </h1>
        <p class="lede">${esc(SITE.heroLede)}</p>
        <p class="voice">${esc(SITE.voiceLine)}</p>
      </div>
    </section>

    <section id="walli" class="walli">
      <div class="shell walli-grid">
        <div class="walli-copy">
          <h2>${esc(featured.name)}</h2>
          <p class="one-liner">${esc(featured.oneLiner)}</p>
          <p>${esc(featured.lede)}</p>
          <p>${esc(featured.note)}</p>
          <p class="more"><a href="/products/${esc(featured.slug)}/">Walli, in a little more detail</a></p>
        </div>
        ${yearMotif()}
      </div>
    </section>

    <section id="work" class="work shell">
      <h2>Also</h2>
      <ul class="work-list">
${workItems}
      </ul>
    </section>

    <section id="about" class="about shell">
      <h2>Two people. Nashville.</h2>
      <p>
        Trey spent ten years as a software PM. Now he and his husband build
        products they want to use, starting with Walli.
      </p>
      <p>
        Real estate lives on
        <a href="https://burkettinv.com" rel="noopener">burkettinv.com</a>.
      </p>
    </section>

    <section id="contact" class="contact shell">
      <h2>Say hi.</h2>
      <p>Questions, notes, or just hello. Trey reads the mail.</p>
      <p class="contact-links">
        <a href="mailto:trey@burkettinv.com?subject=Burkett%20Studios">Email Trey</a>
        <a href="https://x.com/TreyBurkett" rel="noopener">Trey on X</a>
      </p>
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
