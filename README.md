# Burkett Studios (marketing site)

Public marketing site for **https://burkettstudios.com**.

## Quick start

```bash
cd ~/Developer/burkett/burkett-studios
npm run generate   # rebuild pages from scripts/generate-site.mjs
npm run dev        # local Worker preview
npm run deploy     # Cloudflare Worker + custom domains
```

## Stack

- Static HTML/CSS/JS in `public/` (generated home + product pages)
- Cloudflare Worker `burkett-studios-site` (static assets + custom domains)
- Product truth: `products.json` + `scripts/generate-site.mjs`
- Figma: https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z

## Brand boundary

| Domain | Brand |
|--------|--------|
| burkettstudios.com | Product studio / apps |
| burkettinv.com | Real estate, consulting, company OS |

## Agent notes

See `AGENTS.md` and `CURRENT.md`.
