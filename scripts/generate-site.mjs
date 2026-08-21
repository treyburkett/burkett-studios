import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const siteOrigin = "https://burkettstudios.com";
const generatedAt = new Date().toISOString().slice(0, 10);
const contactEmail = "trey@burkettinv.com";

const walliCoral = "#ff5c54";
const wanderedBlue = "#5b8cff";

const products = [
  {
    slug: "walli",
    name: "Walli",
    status: "building",
    listed: true,
    lead: true,
    href: "/products/walli/",
    outbound: null,
    color: walliCoral,
    oneLiner: "A household year calendar.",
    summary: "Walli is a household year calendar. The whole year sits on one wall so a family can see what's coming, together — not a week agenda you have to hunt through.",
    pageTitle: "Walli",
    abilities: [
      "See the year at a glance. The year is the product.",
      "One wall for the household, not one calendar per person.",
      "Plans as stamps on the year, not a dense agenda.",
      "Invite people onto the same year."
    ],
    letter: [
      "Walli is a household year calendar. The whole year sits on one wall so a family can see what's coming, together — not a week agenda you have to hunt through."
    ]
  },
  {
    slug: "wandered",
    name: "Wandered",
    status: "live",
    listed: true,
    lead: false,
    href: "/products/wandered/",
    outbound: "https://wandered.burkettinv.com",
    color: wanderedBlue,
    oneLiner: "A trip you can still walk after you get home.",
    summary: "Live trip software. The map stays after the flight home.",
    pageTitle: "Wandered",
    letter: [
      "Wandered is for a trip you want to keep.",
      "Not a dump of tickets. A place you can walk after you get home.",
      "It is live. If you have a trip, that is the next step."
    ]
  },
  {
    slug: "massagenow",
    name: "MassageNow",
    status: "live",
    listed: true,
    lead: false,
    href: "/products/massagenow/",
    outbound: "https://getmassagenow.com",
    color: null,
    oneLiner: "A booking site for a real table.",
    summary: "A booking site for a real table. Live.",
    pageTitle: "MassageNow",
    letter: [
      "MassageNow is a booking site for a real table.",
      "Not a marketplace. Not a pitch deck. A working front door.",
      "If you need an appointment, go to the site."
    ]
  },
  {
    slug: "surrostack",
    name: "SurroStack",
    status: "pilot",
    listed: false,
    lead: false,
    href: "/products/surrostack/",
    outbound: "https://app.burkettinv.com",
    color: null,
    oneLiner: "A private pilot. Not a public product.",
    summary: "In use on a small private stack. Not for sale from this page.",
    pageTitle: "SurroStack",
    letter: [
      "SurroStack is a private pilot.",
      "It sits behind app.burkettinv.com. It is not a public product and this page is not a sales letter.",
      "If you already know why you are here, you already have the door."
    ]
  },
  {
    slug: "orient",
    name: "Orient",
    status: "seed",
    listed: false,
    lead: false,
    href: "/products/orient/",
    outbound: null,
    color: null,
    oneLiner: "A seed. Not on the public map.",
    summary: "Unlisted. Kept so the old URL does not 404.",
    pageTitle: "Orient",
    letter: [
      "Orient is a seed. It is not on the public homepage or in the nav.",
      "If you landed here from an old link, go back to the studio."
    ]
  },
  {
    slug: "conflict-patterns",
    name: "Conflict Patterns",
    status: "seed",
    listed: false,
    lead: false,
    href: "/products/conflict-patterns/",
    outbound: null,
    color: null,
    oneLiner: "A seed. Not on the public map.",
    summary: "Unlisted. Kept so the old URL does not 404.",
    pageTitle: "Conflict Patterns",
    letter: [
      "Conflict Patterns is a seed. It is not on the public homepage or in the nav.",
      "If you landed here from an old link, go back to the studio."
    ]
  }
];

const listed = products.filter((product) => product.listed);
const leadProduct = listed.find((product) => product.lead);
const otherLive = listed.filter((product) => !product.lead);
const walli = products.find((product) => product.slug === "walli");
const wandered = products.find((product) => product.slug === "wandered");
const massageNow = products.find((product) => product.slug === "massagenow");
const surro = products.find((product) => product.slug === "surrostack");

const nav = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/pulse/", label: "Pulse" },
  { href: "/contact/", label: "Contact" }
];

const footerNav = [
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/pulse/", label: "Pulse" },
  { href: "/contact/", label: "Contact" },
  { href: "/notes/household-software/", label: "A note" }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageUrl(path) {
  return new URL(path, `${siteOrigin}/`).href;
}

const houseCss = await readFile(join(publicDir, "styles.css"), "utf8");
if (houseCss.includes("Geist") || houseCss.includes("Inter") || houseCss.includes("slab")) {
  throw new Error("House CSS still carries Geist, Inter, or slab theater. Fix styles.css.");
}
const cssStamp = createHash("sha256").update(houseCss).digest("hex").slice(0, 10);
const stylesheetHref = `/styles.css?v=${cssStamp}`;

const criticalCss = `
:root{color-scheme:light;--bg:#f6f1e8;--ink:#161412;--muted:#5c5752;--dim:#8a847c;--line:rgba(22,20,18,.14);--font:system-ui,-apple-system,"Segoe UI",sans-serif;--shell:min(720px,calc(100% - 3rem))}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;font-family:var(--font);color:var(--ink);background:var(--bg);line-height:1.5}
.top,main,.foot{width:var(--shell);margin-inline:auto}
.top{display:flex;align-items:baseline;justify-content:space-between;gap:1.5rem;padding:1.4rem 0 1.2rem}
.wordmark{font-weight:600;letter-spacing:-.03em;text-decoration:none}
.top nav,.foot nav{display:flex;flex-wrap:wrap;gap:.85rem 1.15rem}
.thesis h1,.letter h1{margin:0;font-weight:600;letter-spacing:-.045em;line-height:.96}
.thesis h1{max-width:22ch;font-size:clamp(2.6rem,8vw,4.4rem)}
.letter h1{font-size:clamp(2.1rem,6vw,3.6rem)}
.faces{margin:2.6rem 0 0}
.faces-row{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}
.faces img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;background:#ddd6c8}
.foot{padding:1.6rem 0 2.6rem;border-top:1px solid var(--line)}
.foot-mark{margin:0 0 .7rem;font-weight:600}
`.replace(/\n/g, "");

function layout({
  title,
  description,
  path,
  bodyClass = "",
  extraHead = "",
  main
}) {
  const canonical = pageUrl(path);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>${criticalCss}</style>
  <link rel="stylesheet" href="${stylesheetHref}">
  ${extraHead}
</head>
<body class="${escapeHtml(bodyClass)}">
  <a class="skip" href="#main">Skip to content</a>
  <header class="top">
    <a class="wordmark" href="/">Burkett Studios</a>
    <nav aria-label="Primary">
      ${nav.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("\n      ")}
    </nav>
  </header>
  <main id="main">
    ${main}
  </main>
  <footer class="foot">
    <p class="foot-mark">Burkett Studios</p>
    <nav aria-label="Directory">
      ${footerNav.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("\n      ")}
    </nav>
    <p class="fine">${escapeHtml(contactEmail)}</p>
  </footer>
</body>
</html>
`;
}

function writeRedirect(fromPath, toPath) {
  const target = pageUrl(toPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${escapeHtml(toPath)}">
  <link rel="canonical" href="${escapeHtml(target)}">
  <title>Moved</title>
  <script>location.replace(${JSON.stringify(toPath)})</script>
</head>
<body>
  <p>Moved to <a href="${escapeHtml(toPath)}">${escapeHtml(toPath)}</a>.</p>
</body>
</html>
`;
}

const photoBlock = `
<figure class="faces">
  <div class="faces-row">
    <figure>
      <img src="/team/trey-burkett.jpg" width="800" height="800" alt="Trey Burkett">
      <figcaption>Trey</figcaption>
    </figure>
    <figure>
      <img src="/team/kyle-burkett.jpg" width="800" height="800" alt="Kyle Burkett">
      <figcaption>Kyle</figcaption>
    </figure>
  </div>
</figure>
`;

const walliLock =
  "Walli is a household year calendar. The whole year sits on one wall so a family can see what's coming, together — not a week agenda you have to hunt through.";

function abilityList(abilities) {
  return `<ul class="abilities">
        ${abilities.map((line) => `<li>${escapeHtml(line)}</li>`).join("\n        ")}
      </ul>`;
}

const home = layout({
  title: "Burkett Studios",
  description: "Burkett Studios makes household software. Walli is a household year calendar.",
  path: "/",
  bodyClass: "home",
  extraHead: `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Burkett Studios",
    url: siteOrigin,
    email: contactEmail,
    founder: [
      { "@type": "Person", name: "Trey Burkett" },
      { "@type": "Person", name: "Kyle Burkett" }
    ]
  })}</script>`,
  main: `
    <section class="fold thesis">
      <h1>Burkett Studios makes household software.</h1>
    </section>
    <section class="fold walli-stage" aria-labelledby="walli-head">
      <p class="kicker walli-kicker">${escapeHtml(walli.name)}</p>
      <h2 id="walli-head">${escapeHtml(walli.oneLiner)}</h2>
      <p class="lead">${escapeHtml(walliLock)}</p>
      ${abilityList(walli.abilities)}
      <p><a class="text-link walli-link" href="${escapeHtml(walli.href)}">More about Walli</a></p>
    </section>
    <section class="fold face" aria-labelledby="wandered-head">
      <h2 id="wandered-head"><a href="${escapeHtml(wandered.href)}">${escapeHtml(wandered.name)}</a></h2>
      <p class="lead">${escapeHtml(wandered.oneLiner)}</p>
      <p><a class="text-link" href="${escapeHtml(wandered.outbound)}">${escapeHtml(wandered.outbound.replace("https://", ""))}</a></p>
    </section>
    <section class="fold face" aria-labelledby="massage-head">
      <h2 id="massage-head"><a href="${escapeHtml(massageNow.href)}">${escapeHtml(massageNow.name)}</a></h2>
      <p class="lead">${escapeHtml(massageNow.oneLiner)}</p>
      <p><a class="text-link" href="${escapeHtml(massageNow.outbound)}">${escapeHtml(massageNow.outbound.replace("https://", ""))}</a></p>
    </section>
    <section class="fold faces-fold" aria-label="Trey and Kyle">
      ${photoBlock}
    </section>
  `
});

const work = layout({
  title: "Work · Burkett Studios",
  description: "Walli, then the live work. A short directory.",
  path: "/work/",
  main: `
    <article class="letter">
      <p class="kicker">Work</p>
      <h1>What is on the table.</h1>
      <p class="lead">Walli is the household year calendar. Wandered and MassageNow keep their own doors.</p>
      <ol class="work-list">
        ${[leadProduct, ...otherLive]
          .map(
            (product) => `
          <li>
            <a href="${escapeHtml(product.href)}">${escapeHtml(product.name)}</a>
            <p>${escapeHtml(product.summary)}</p>
            ${product.outbound ? `<p class="fine"><a href="${escapeHtml(product.outbound)}">${escapeHtml(product.outbound.replace("https://", ""))}</a></p>` : `<p class="fine">Not public yet.</p>`}
          </li>`
          )
          .join("")}
      </ol>
      <p class="aside">SurroStack is a private pilot at <a href="${escapeHtml(surro.outbound)}">app.burkettinv.com</a>. It is not for sale from this page.</p>
    </article>
  `
});

const about = layout({
  title: "About · Burkett Studios",
  description: "Trey and Kyle Burkett. Burkett Studios makes household software in Nashville.",
  path: "/about/",
  main: `
    <article class="letter">
      <p class="kicker">About</p>
      <h1>Trey and Kyle.</h1>
      <p class="lead">Burkett Studios makes household software in Nashville.</p>
      ${photoBlock}
      <p>This site is the studio. Burkett Investments is the parent company. It has its own door. This is not that brochure, and it is not a page about owning assets.</p>
      <p><a class="text-link" href="/contact/">Write Trey</a></p>
    </article>
  `
});

const pulseIndex = layout({
  title: "Pulse · Burkett Studios",
  description: "A short log. One real entry is enough.",
  path: "/pulse/",
  main: `
    <article class="letter">
      <p class="kicker">Pulse</p>
      <h1>What changed.</h1>
      <ol class="pulse-list">
        <li>
          <time datetime="2026-08-21">21 Aug 2026</time>
          <a href="/pulse/2026-08-21-studio-site/">This studio site shipped.</a>
        </li>
      </ol>
    </article>
  `
});

const pulseEntry = layout({
  title: "This studio site shipped · Pulse",
  description: "21 Aug 2026. Burkett Studios got a public face.",
  path: "/pulse/2026-08-21-studio-site/",
  main: `
    <article class="letter">
      <p class="kicker"><a href="/pulse/">Pulse</a> · 21 Aug 2026</p>
      <h1>This studio site shipped.</h1>
      <p>burkettstudios.com was a holding-company map. Today it is the studio: household software, then Walli, then the other live work.</p>
      <p>Wandered and MassageNow stay live on their own sites. Johnson Harvesting stays off this homepage. The seed names are off the public map.</p>
      <p>One dated note. No fake history behind it.</p>
    </article>
  `
});

const note = layout({
  title: "Household software · Burkett Studios",
  description: "Why a studio of two ships the thing they want to live in.",
  path: "/notes/household-software/",
  main: `
    <article class="letter">
      <p class="kicker">A note</p>
      <h1>Ship the thing you want to live in.</h1>
      <p>Most software is for a company you visit. Household software is for a room you already occupy. A year on the wall. A trip you can still walk. A table someone actually books.</p>
      <p>Trey and Kyle are a studio of two. That is the point, not a constraint to apologize for. Two people can finish a thing a household will actually use.</p>
      <p>Walli is the household year calendar. The other live work already has a door. The work is to ship the next true thing, not to look busy.</p>
    </article>
  `
});

const contact = layout({
  title: "Contact · Burkett Studios",
  description: `Write Trey at ${contactEmail}.`,
  path: "/contact/",
  main: `
    <article class="letter">
      <p class="kicker">Contact</p>
      <h1>Write Trey.</h1>
      <p class="lead"><a class="text-link" href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a></p>
      <p>That is the door. Trey and Kyle read what comes in. There is no form and no calendar embed on this page.</p>
    </article>
  `
});

function productPage(product) {
  const isWalli = product.slug === "walli";
  const next = product.outbound
    ? `<p><a class="text-link" href="${escapeHtml(product.outbound)}">${escapeHtml(product.outbound.replace("https://", ""))}</a></p>`
    : isWalli
      ? `<p class="aside">Not public yet. No outbound button until that is true.</p>`
      : `<p class="aside">Not on the public map.</p>`;

  return layout({
    title: `${product.pageTitle} · Burkett Studios`,
    description: product.summary,
    path: product.href,
    bodyClass: isWalli ? "product walli-page" : product.slug === "wandered" ? "product wandered-page" : "product",
    extraHead: product.color ? `<style>:root { --product: ${product.color}; }</style>` : "",
    main: `
      <article class="letter">
        <p class="kicker">${isWalli ? `<span class="walli-kicker">${escapeHtml(product.name)}</span>` : escapeHtml(product.name)}</p>
        <h1>${escapeHtml(product.oneLiner)}</h1>
        ${product.letter.map((para) => `<p>${escapeHtml(para)}</p>`).join("\n        ")}
        ${product.abilities ? abilityList(product.abilities) : ""}
        ${next}
      </article>
    `
  });
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`;

const sitemapPaths = [
  "/",
  "/work/",
  "/about/",
  "/pulse/",
  "/pulse/2026-08-21-studio-site/",
  "/notes/household-software/",
  "/contact/",
  ...products.filter((product) => product.listed || product.slug === "surrostack").map((product) => product.href)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map((path) => `  <url><loc>${pageUrl(path)}</loc><lastmod>${generatedAt}</lastmod></url>`)
  .join("\n")}
</urlset>
`;

const productsSnapshot = `${JSON.stringify(
  {
    generatedAt,
    generatedFrom: "scripts/generate-site.mjs",
    site: siteOrigin,
    contact: contactEmail,
    thesis: "Burkett Studios makes household software.",
    people: ["Trey Burkett", "Kyle Burkett"],
    products: products.map(({ letter, ...rest }) => rest)
  },
  null,
  2
)}\n`;

const files = {
  "index.html": home,
  "work/index.html": work,
  "about/index.html": about,
  "pulse/index.html": pulseIndex,
  "pulse/2026-08-21-studio-site/index.html": pulseEntry,
  "notes/household-software/index.html": note,
  "contact/index.html": contact,
  "robots.txt": robots,
  "sitemap.xml": sitemap
};

for (const product of products) {
  files[`products/${product.slug}/index.html`] = productPage(product);
}
files["products/year-wall/index.html"] = writeRedirect("/products/year-wall/", "/products/walli/");

await mkdir(publicDir, { recursive: true });
await writeFile(join(root, "products.json"), productsSnapshot);
for (const [rel, contents] of Object.entries(files)) {
  const dest = join(publicDir, rel);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, contents);
}

if (
  home.includes("Orient") ||
  home.includes("Conflict") ||
  home.includes("Geist") ||
  home.includes("Inter") ||
  home.includes("Year Wall")
) {
  throw new Error("Homepage leaked a seed name, banned type, or Year Wall.");
}
if (!home.includes("Burkett Studios makes household software.")) {
  throw new Error("Homepage missing the studio one-liner.");
}
if (!home.includes(walliLock)) {
  throw new Error("Homepage missing the Walli lock sentence.");
}
for (const ability of walli.abilities) {
  if (!home.includes(ability)) {
    throw new Error(`Homepage missing Walli ability: ${ability}`);
  }
}
if (home.includes("ten years") || home.includes("MIS") || home.includes("wallicalendar") || home.includes("TestFlight")) {
  throw new Error("Homepage leaked rejected bio or shipping claims.");
}
const treyPhotoAt = home.indexOf("/team/trey-burkett.jpg");
const kylePhotoAt = home.indexOf("/team/kyle-burkett.jpg");
if (treyPhotoAt < 0 || kylePhotoAt < 0 || treyPhotoAt > kylePhotoAt) {
  throw new Error("Homepage must show Trey before Kyle.");
}
if (home.indexOf("Trey") > home.indexOf("Kyle")) {
  throw new Error("Homepage named Kyle before Trey.");
}

const stylesheetRe = /href="([^"]*styles\.css[^"]*)"/g;
for (const [rel, contents] of Object.entries(files)) {
  if (!rel.endsWith(".html") || rel.includes("year-wall")) continue;
  const hrefs = [...contents.matchAll(stylesheetRe)].map((match) => match[1]);
  if (hrefs.length !== 1 || hrefs[0] !== stylesheetHref) {
    throw new Error(`${rel} must load ${stylesheetHref}, got ${JSON.stringify(hrefs)}`);
  }
  if (!contents.includes("<style>") || !contents.includes("--bg:#f6f1e8")) {
    throw new Error(`${rel} is missing inline critical CSS.`);
  }
  if (contents.includes('href="styles.css"') || contents.includes("../styles.css")) {
    throw new Error(`${rel} still uses a relative stylesheet path.`);
  }
}

console.log(`generated ${Object.keys(files).length} files for ${listed.length} listed products (${stylesheetHref})`);
