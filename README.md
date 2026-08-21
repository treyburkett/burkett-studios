# Burkett Studios (marketing site)

Public face for Trey Burkett and his husband: **https://burkettstudios.com**.

Two people in Nashville, building products. Led by **Walli**, a year-at-a-glance calendar. This is not a consultancy, and it is not Johnson Harvesting. Johnson Harvesting lives on **jh.burkettstudios.com** in a different repo. Do not edit that from here.

## How to change a product

1. Edit the product list in `scripts/generate-site.mjs` (that file is the source).
2. Run `npm run generate` to rebuild the pages.
3. Run `npm run check` to confirm the rebuilt pages match what you committed.
4. Commit. Live ship is a separate step: `npm run deploy` only when Trey confirms.

Do not edit `public/*.html` or `products.json` by hand. Those are written by the generator. `PURPOSE.md` is the locked purpose note and is not overwritten.

Product name is **Walli** only. Never write “Year Wall” on this site.

## Quick start

```bash
cd ~/Developer/burkett/burkett-studios
npm run generate   # rebuild pages from scripts/generate-site.mjs
npm run check      # confirm generated files match git
npm run dev        # local preview
npm run deploy     # live Cloudflare ship (needs Trey confirm)
```

## How it is built

- A small Node script writes static HTML into `public/`.
- Cloudflare Worker `burkett-studios-site` serves those files on burkettstudios.com and www.
- Look and feel: cream, black, and Walli coral `#ff5c54`. No second accent.

## Brand boundary

| Domain | What it is |
|--------|--------|
| burkettstudios.com | Studio homepage / X-profile public face |
| burkettinv.com | Real estate and the other company |
| jh.burkettstudios.com | Johnson Harvesting (different site, different repo) |

## Agent notes

See `AGENTS.md` and `CURRENT.md`.
