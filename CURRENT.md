# CURRENT — Burkett Studios marketing site

**Updated:** 2026-08-14  
**Status:** LIVE multi-page site · Identity-aligned · owned-product arm (not services)

## Live

| Item | Value |
|------|--------|
| Apex | https://burkettstudios.com |
| www | https://www.burkettstudios.com (same pages, no redirect to apex) |
| Worker | `burkett-studios-site` |
| GitHub | https://github.com/treyburkett/burkett-studios (`main`) |
| Figma | https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z |
| Product table | `scripts/generate-site.mjs` only (`products.json` is a generated snapshot) |

Johnson Harvesting at https://jh.burkettstudios.com is a different live site. Not in this repo.

## Product truth (checked 2026-08-14)

| Product | Status on this site | Outbound check |
|---------|--------|-----------------|
| Year Wall | Live · https://yearwall.burkettinv.com · page `/products/year-wall/` | **Broken:** hostname does not resolve |
| Wandered | Web live · https://wandered.burkettinv.com · page `/products/wandered/` | HTTP 200 |
| SurroStack | Live pilot · https://app.burkettinv.com/surrostack/ · page `/products/surrostack/` | Opens Cloudflare Access login (expected for a signed-in portal) |
| MassageNow | Pilot · https://getmassagenow.com · waitlist on page | HTTP 200 (waitlist site, `noindex`) |
| Orient | Seed · waitlist `/products/orient/#waitlist` | On this site |
| Conflict Patterns | Seed · waitlist `/products/conflict-patterns/#waitlist` | On this site |

## Ship path

```bash
cd ~/Developer/burkett/burkett-studios
# edit the product table in scripts/generate-site.mjs
npm run generate
npm run check
# live ship only with Trey confirm:
npm run deploy
git add -A && git commit -m "..." && git push
```

`deploy:pages-backup` is an old Cloudflare Pages fallback. Do not use it unless the Worker deploy is down.

## Done this session

1. Product blurb/URL pass (statuses aligned to CURRENT facts)
2. GitHub remote `treyburkett/burkett-studios`
3. Product detail pages + mailto waitlists for seed/pilot
4. Figma: token collection `Studios / Tokens` + Button + Product Card components
5. 2026-08-13: leftover CSS cleanup merged (PR #1). **Not on the live site yet** (live CSS still has the old unused rules).
6. 2026-08-14: full audit. Safe leftover cleanup in this branch. Year Wall public URL does not resolve. Public copy left unchanged.

## Next

1. Fix or replace the Year Wall public URL (DNS or a new address). Do not guess.
2. Run `npm run deploy` so the already-merged CSS cleanup (and this audit cleanup) actually hit the live site.
3. Optional Formspree/Workers form instead of mailto waitlist
4. Product screenshots on each page
5. Custom domain alias for apps under studios later (if desired)
6. Optional: send www to the apex so there is one public address
