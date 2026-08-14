# Burkett Studios (marketing site)

Public map of products Burkett owns: **https://burkettstudios.com**.

This is not a build-for-hire shop. It is not Johnson Harvesting. Johnson Harvesting lives on **jh.burkettstudios.com** in a different repo. Do not edit that from here.

## How to change a product

1. Edit the product list in `scripts/generate-site.mjs` (that file is the source).
2. Run `npm run generate` to rebuild the pages.
3. Run `npm run check` to confirm the rebuilt pages match what you committed.
4. Commit. Live ship is a separate step: `npm run deploy` only when Trey confirms.

Do not edit `public/*.html` or `products.json` by hand. Those are written by the generator. `PURPOSE.md` is the locked purpose note and is not overwritten.

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
- Look and feel follow burkettinv.com: sharp corners, hairlines, gold.
- Figma: https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z

## Brand boundary

| Domain | What it is |
|--------|--------|
| burkettstudios.com | Product studio / apps Burkett owns |
| burkettinv.com | Real estate, consulting, company OS |
| jh.burkettstudios.com | Johnson Harvesting (different site, different repo) |

## Agent notes

See `AGENTS.md` and `CURRENT.md`.
