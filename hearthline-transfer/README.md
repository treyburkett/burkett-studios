# Hearthline M1 Gate 1 fix (Mac transfer)

Failed run: https://github.com/treyburkett/hearthline/actions/runs/35021473514

## Minimal incremental bundle (preferred)

`hearthline-m1-gate1-fix.bundle` — requires `ec2854a` already present.

```bash
cd ~/Developer/hearthline
git fetch .
git pull  # ensure ec2854a is local
git fetch /path/to/hearthline-m1-gate1-fix.bundle
git checkout cursor/m1-vertical-slice-c458
git merge --ff-only 7fb127aa366fdd83f32f35c455798c47ba534852   # or: git cherry-pick 7fb127aa366fdd83f32f35c455798c47ba534852
# if tip is exactly ec2854a:
git fetch hearthline-transfer/hearthline-m1-gate1-fix.bundle 'refs/heads/cursor/m1-gate1-lint-c458:refs/heads/cursor/m1-gate1-lint-c458'
git checkout cursor/m1-vertical-slice-c458
git reset --hard 7fb127aa366fdd83f32f35c455798c47ba534852   # only if PR tip should become this SHA
git push --force-with-lease origin cursor/m1-vertical-slice-c458
```

Safer:

```bash
git fetch hearthline-m1-gate1-fix.bundle cursor/m1-gate1-lint-c458:cursor/m1-gate1-lint-c458
git checkout cursor/m1-vertical-slice-c458
git merge cursor/m1-gate1-lint-c458
git push origin cursor/m1-vertical-slice-c458
```

Fix SHA: `7fb127aa366fdd83f32f35c455798c47ba534852` (`7fb127a`)
Parent: `ec2854a`
Local proof: gdformat + gdlint clean; GUT 67/67

Do not touch DEM waterline on main.
