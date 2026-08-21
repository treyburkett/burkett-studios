# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Purpose SSOT:** [`PURPOSE.md`](./PURPOSE.md)

## Purpose (design around this)

**Public face for Trey Burkett and his husband: two people in Nashville building products, led by Walli.**

1. Introduce the studio as people, not a holding company
2. Lead with Walli (year-at-a-glance calendar)
3. Honest list of the other real products
4. Quiet handoff to a product site when one already exists

**Not** build-for-hire. **Not** “the products we own.” **Not** a mega brochure that replaces Wandered / MassageNow sites.

Product name is **Walli** only. Never “Year Wall” on this site.
Do not hard-sell unfinished Walli to cold traffic.

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

## Style

- No em dashes.
- Accent is Walli coral `#ff5c54` only. Neutrals, black, cream around it.
- One sans family (Geist). No serif. No gold.
- Nashville is welcome. This site is the X-profile public face.
- Do not write Trey as a solo founder. Do not invent his husband’s name.
