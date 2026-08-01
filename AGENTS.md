# Burkett Studios marketing site

**Domain:** https://burkettstudios.com  
**Code:** `~/Developer/burkett/burkett-studios`  
**GitHub:** https://github.com/treyburkett/burkett-studios  
**Deploy:** Cloudflare Worker `burkett-studios-site` (static assets + custom domains)  
**Design:** [Figma](https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z)  
**Docs:** Drive `Burkett Studios/`  
**Product truth:** edit `scripts/generate-site.mjs` then `npm run generate`

## What Burkett Studios is

The arm of **Burkett Investments** that **builds, runs, and owns** Burkett digital products
(Year Wall, Wandered, SurroStack, MassageNow, and related).

**Not** a client services shop. **Not** “we build apps for others.”

## Brand boundary

| Domain | Role |
|--------|------|
| burkettstudios.com | Owned digital product portfolio |
| burkettinv.com | Real estate, consulting, company OS |

## Deploy

```bash
cd ~/Developer/burkett/burkett-studios
npm run deploy
```

Worker custom domains auto-manage DNS (`AAAA 100::`). Prefer Worker over Pages for this domain.

## Agentic loop

1. Edit product truth in `scripts/generate-site.mjs` (or styles in `public/styles.css`)
2. `npm run deploy`
3. Figma: keep copy aligned with owned-product positioning
4. Update `CURRENT.md`

## Style

- No em dashes in Trey-facing copy.
- **Brand law = burkettinv.com DESIGN-LOCK:** radius 0, hairlines, black/steel/gold ignition, Burkett blue focus only.
- Positioning: owned product arm of Burkett Investments.
- Do not market Nashville HQ on the public hero.
- Do not use client-services language (start a project, discuss a build, what we deliver for hire).
