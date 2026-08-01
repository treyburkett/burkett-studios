# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Deploy:** Cloudflare Worker `burkett-studios-site` (static assets + custom domains)  
**Design:** [Figma](https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z)  
**Docs:** Drive `Burkett Studios/`  
**Product truth:** edit `scripts/generate-site.mjs` then `npm run generate`

## Brand boundary

| Domain | Role |
|--------|------|
| burkettstudios.com | Product studio / apps portfolio |
| burkettinv.com | Real estate, consulting, company OS |

## Deploy

```bash
cd ~/Developer/burkett/burkett-studios
npm run deploy
```

Worker custom domains auto-manage DNS (`AAAA 100::`). Prefer Worker over Pages for this domain.

## Agentic loop

1. Edit `public/` (code is live SSOT)
2. `npm run deploy`
3. Figma: design frames via `use_figma`, or capture live via `generate_figma_design`
4. Update `CURRENT.md`

## Style

No em dashes in Trey-facing copy. Studio blue accent, not Investments gold OS.
