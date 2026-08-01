# CURRENT — Burkett Studios marketing site

**Updated:** 2026-08-01  
**Status:** LIVE on burkettstudios.com (Worker assets)

## Live

| Item | Value |
|------|--------|
| Apex | https://burkettstudios.com |
| www | https://www.burkettstudios.com |
| Worker | `burkett-studios-site` |
| Pages backup | `burkett-studios.pages.dev` (not custom-domain primary) |
| Figma | https://www.figma.com/design/2LfrC7rHqG7hSdovic403Z (frames + capture) |
| Zone | active on CF account |

## Ship path

```bash
cd ~/Developer/burkett/burkett-studios && npm run deploy
```

## Next

1. Confirm product blurbs / URLs with Trey
2. Optional product subpages / waitlists
3. GitHub remote when ready
4. Figma polish pass from capture reference

## Notes

- Custom domains use **Workers Static Assets** (auto `AAAA 100::` DNS). Prefer this over Pages for apex domains on this account.
- Wrangler OAuth cannot create manual DNS CNAMEs; Worker custom domains can.
- Registry alias: `bootstrap burkett-studios` / `studios`.
