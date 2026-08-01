# CURRENT — Burkett Studios marketing site

**Updated:** 2026-08-01  
**Status:** LIVE multi-page site · Identity-aligned · owned-product arm (not services)

## Live

| Item | Value |
|------|--------|
| Apex | https://burkettstudios.com |
| www | https://www.burkettstudios.com |
| Worker | `burkett-studios-site` |
| GitHub | https://github.com/treyburkett/burkett-studios (`main`) |
| Figma | https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z |
| Product SSOT | `products.json` + `scripts/generate-site.mjs` |

## Product truth (2026-08-01)

| Product | Status | Live / waitlist |
|---------|--------|-----------------|
| Year Wall | Web live | https://yearwall.burkettinv.com · page `/products/year-wall/` |
| Wandered | Web live | https://wandered.burkettinv.com · page `/products/wandered/` |
| SurroStack | Live pilot | https://app.burkettinv.com/surrostack/ · page `/products/surrostack/` |
| MassageNow | Pilot | https://getmassagenow.com · waitlist on page |
| Orient | Seed | waitlist `/products/orient/#waitlist` |
| Conflict Patterns | Seed | waitlist `/products/conflict-patterns/#waitlist` |

All four live product URLs returned HTTP 200 on last check.

## Ship path

```bash
cd ~/Developer/burkett/burkett-studios
# edit products.json via scripts/generate-site.mjs product table
npm run deploy
git add -A && git commit -m "..." && git push
```

## Done this session

1. Product blurb/URL pass (statuses aligned to CURRENT facts)
2. GitHub remote `treyburkett/burkett-studios`
3. Product detail pages + mailto waitlists for seed/pilot
4. Figma: token collection `Studios / Tokens` + Button + Product Card components

## Next

1. Optional Formspree/Workers form instead of mailto waitlist
2. Product screenshots on each page
3. Custom domain alias for apps under studios later (if desired)
