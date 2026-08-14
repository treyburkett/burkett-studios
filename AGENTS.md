# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Purpose SSOT:** [`PURPOSE.md`](./PURPOSE.md)

## Purpose (design around this)

**Home and map for digital products Burkett owns through Burkett Studios.**

1. Ownership (build / run / own)
2. Portfolio directory with honest status
3. Handoff to each product’s marketing site
4. Boundary vs burkettinv.com (RE / consulting)

**Not** build-for-hire. **Not** a mega brochure that replaces Year Wall / Wandered / MassageNow sites.

Primary CTA per product = product marketing URL when it exists.

## Product table

Edit products only in `scripts/generate-site.mjs`. Then `npm run generate` and `npm run check`.

Do not edit `public/*.html` or `products.json` by hand. Those are generated.

`PURPOSE.md` is the locked purpose note. The generator does not overwrite it.

Johnson Harvesting (`jh.burkettstudios.com`) is a different site. Do not change it from this repo.

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
- burkettinv.com DESIGN-LOCK: radius 0, hairlines, gold ignition.
- Do not market Nashville HQ on the hero.
