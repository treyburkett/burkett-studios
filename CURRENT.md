# CURRENT. Burkett Studios marketing site

**Updated:** 2026-08-21  
**Status:** Studio homepage rebuilt as a founder public face (Walli-first, coral `#ff5c54`)

## Live

| Item | Value |
|------|--------|
| Apex | https://burkettstudios.com |
| www | https://www.burkettstudios.com (same pages, no redirect to apex) |
| Worker | `burkett-studios-site` |
| GitHub | https://github.com/treyburkett/burkett-studios (`main`) |
| Product table | `scripts/generate-site.mjs` only (`products.json` is a generated snapshot) |

Johnson Harvesting at https://jh.burkettstudios.com is a different live site. Not in this repo. Not on the public homepage.

## Product truth (checked 2026-08-21)

| Product | Status on this site | Outbound |
|---------|--------|-----------------|
| Walli | Building · page `/products/walli/` · old `/products/year-wall/` redirects here | In-progress site kept quiet: yearwall.burkettinv.com. Not a “go use it” CTA. Never call it Year Wall. |
| Wandered | Live · https://wandered.burkettinv.com · page `/products/wandered/` | Public marketing site |
| SurroStack | Private · page `/products/surrostack/` | Login-gated portal. Do not hard-sell. |
| MassageNow | Live · https://getmassagenow.com · waitlist on page | Public waitlist site |
| Orient | Waitlist · `/products/orient/#waitlist` | On this site |
| Conflict Patterns | In design · `/products/conflict-patterns/#waitlist` | On this site |

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

## Voice

Trey’s line, for tone: “Software PM for 10 years. Building Walli with my husband. Nashville.”
X: [@TreyBurkett](https://x.com/TreyBurkett). Do not write Trey as a solo founder. Do not invent his husband’s name.

## Next

1. Live ship only with Trey confirm (`npm run deploy`).
2. Decide later whether Walli’s quiet outbound should become wallicalendar.com.
3. Optional Formspree/Workers form instead of mailto waitlist.
