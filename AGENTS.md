# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Purpose SSOT:** [`PURPOSE.md`](./PURPOSE.md)

## Purpose (design around this)

**Burkett Studios makes household software.**

1. Studio one-liner first (company, not a person)
2. Then Walli, using the lock sentence and only the four locked abilities
3. Wandered and MassageNow as their own short faces
4. If people are named or shown: Trey first, then Kyle. Portraits are secondary. No PM/MIS bio.

**Not** build-for-hire. **Not** a SaaS about page. **Not** a Burkett Investments brochure. **Not** a founder about page.

Product name is **Walli** only. Never “Year Wall” on this site.
Do not hard-sell unfinished Walli. No wallicalendar.com, waitlist, or download CTAs.

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

- No em dashes in house copy. The Walli lock sentence is the exception (use it exactly).
- House sans: `system-ui, -apple-system, "Segoe UI", sans-serif`. No Geist. No Inter.
- Studio palette is cream / ink / neutral. Coral `#ff5c54` only on Walli moments.
- Wandered blue `#5b8cff` stays on Wandered. Do not recast it in coral.
- Pages load `/styles.css?v=<hash>` plus inline critical CSS. Never relative `styles.css`.
- No Orient or Conflict Patterns on the public homepage or nav.
- No decorative slabs, fake year-bars, or extra parallax.
