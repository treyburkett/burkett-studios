# CURRENT. Burkett Studios marketing site

**Updated:** 2026-08-21  
**Status:** Studio homepage: Kyle and Trey, household-software thesis, honest Walli, two live handoffs.

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
| Walli | Building · not public yet · page `/products/walli/` · old `/products/year-wall/` redirects here | No “go use it” CTA. Never call it Year Wall. |
| Wandered | Live · https://wandered.burkettinv.com · page `/products/wandered/` | Public marketing site. Keep blue `#5b8cff`. |
| MassageNow | Live · https://getmassagenow.com · page `/products/massagenow/` | Public site. |
| SurroStack | Private/pilot · page `/products/surrostack/` · light mention on `/work/` | https://app.burkettinv.com. No hard sell. |
| Orient | Unlisted seed. Page kept so the old URL does not 404. | Off homepage and nav. |
| Conflict Patterns | Unlisted seed. Page kept so the old URL does not 404. | Off homepage and nav. |

## Public map

Homepage: thesis, Kyle and Trey, Walli, then Wandered and MassageNow.  
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

## Voice

Kyle and Trey. Nashville. Trey: software PM for 10 years, MIS, building with Kyle.
X: [@TreyBurkett](https://x.com/TreyBurkett). Do not write Trey as a solo founder.

## Next

Live ship is authorized on this pass (`npm run deploy` after merge).
