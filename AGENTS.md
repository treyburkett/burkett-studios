# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Purpose SSOT:** [`PURPOSE.md`](./PURPOSE.md)

## Purpose (design around this)

**Kyle and Trey Burkett make household software in Nashville.**

1. Studio sentence first (who we are)
2. Name Kyle and Trey
3. Walli is the lead product, not the company. Still building. Not public yet.
4. Handoff to Wandered and MassageNow. Keep SurroStack light. Leave Johnson Harvesting off this homepage.

**Not** build-for-hire. **Not** a SaaS about page. **Not** a Burkett Investments brochure.

Product name is **Walli** only. Never “Year Wall” on this site.
Do not hard-sell unfinished Walli.

## Product table

Edit products only in `scripts/generate-site.mjs`. Then `npm run generate` and `npm run check`.

Do not edit `public/*.html` or `products.json` by hand. Those are generated.

`PURPOSE.md` is the locked purpose note. The generator does not overwrite it.

Johnson Harvesting (`jh.burkettstudios.com`) is a different site. Do not change it from this repo. Leave it off the public homepage.

## Deploy

```bash
cd ~/Developer/burkett/burkett-studios
# edit products in scripts/generate-site.mjs
npm run generate
npm run check
# live ship only with Trey confirm
npm run deploy
```

Merge to `main` does not publish. Production is `npm run deploy` (Worker `burkett-studios-site`).

## Style

- No em dashes.
- House sans: `system-ui, -apple-system, "Segoe UI", sans-serif`. No Geist. No Inter.
- Studio palette is cream / ink / neutral. Coral `#ff5c54` only on Walli moments.
- Wandered blue `#5b8cff` stays on Wandered. Do not recast it in coral.
- No Orient or Conflict Patterns on the public homepage or nav.
- No decorative slabs, fake year-bars, or extra parallax.
- Do not write Trey as a solo founder.
