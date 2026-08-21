# CURRENT. Burkett Studios marketing site

**Updated:** 2026-08-21  
**Status:** Studio one-liner, then Walli lock copy. Trey before Kyle. CSS load-path fix is live.

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
| Walli | Household year calendar · lock sentence + four abilities · Contacts texture under the year (not a fifth card) · page `/products/walli/` · old `/products/year-wall/` redirects here | No download / wallicalendar.com / waitlist CTA. Never call it Year Wall. Contacts merge is in flight: do not ship it as a feature. |
| Wandered | Live · https://wandered.burkettinv.com · page `/products/wandered/` | Public marketing site. Keep blue `#5b8cff`. |
| MassageNow | Live · https://getmassagenow.com · page `/products/massagenow/` | Public site. |
| SurroStack | Private/pilot · page `/products/surrostack/` · light mention on `/work/` | https://app.burkettinv.com. No hard sell. |
| Orient | Unlisted seed. Page kept so the old URL does not 404. | Off homepage and nav. |
| Conflict Patterns | Unlisted seed. Page kept so the old URL does not 404. | Off homepage and nav. |

## Public map

Homepage: studio one-liner, Walli, Wandered, MassageNow, then portraits (Trey then Kyle).  
Directory: `/work/`, `/about/`, `/pulse/`, `/contact/`. One note: `/notes/household-software/`.

Portraits in `public/team/` came from burkettinv.com official team assets. There is no photo of the two of them together in this repo.

## Ship path

```bash
cd ~/Developer/burkett/burkett-studios
# edit the product table in scripts/generate-site.mjs
npm run generate
npm run check
# live ship only with Trey confirm:
npm run deploy
```

Merge to `main` does not publish. `deploy:pages-backup` is an old Cloudflare Pages fallback. Do not use it unless the Worker deploy is down.

Pages load CSS at `/styles.css?v=<hash>` plus a small inline critical block. Do not use relative `styles.css` paths. Worker `not_found_handling` is `none` so missing `.css` / image URLs 404 instead of HTML.

## Voice

Burkett Studios makes household software. Walli lock copy is exact. If people are named: Trey first, then Kyle. No PM/MIS bio on the homepage.
X: [@TreyBurkett](https://x.com/TreyBurkett).

## Next

Live ship is authorized on this pass (`npm run deploy` after merge).
