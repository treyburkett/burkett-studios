#!/usr/bin/env node
/**
 * Confirm the committed pages still match the product table.
 * Run after edits: npm run check
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const gen = spawnSync(process.execPath, [join(root, "scripts/generate-site.mjs")], {
  cwd: root,
  encoding: "utf8",
});
if (gen.status !== 0) {
  process.stderr.write(gen.stderr || gen.stdout || "generate failed\n");
  process.exit(gen.status ?? 1);
}

const diff = spawnSync(
  "git",
  [
    "diff",
    "--exit-code",
    "--",
    "public/index.html",
    "public/products",
    "public/work",
    "public/about",
    "public/pulse",
    "public/notes",
    "public/contact",
    "public/sitemap.xml",
    "public/robots.txt",
    "products.json",
    "PURPOSE.md",
  ],
  { cwd: root, encoding: "utf8" }
);

if (diff.status !== 0) {
  process.stderr.write(
    "Generate produced a git diff. The committed pages no longer match scripts/generate-site.mjs.\n"
  );
  process.stderr.write(diff.stdout || "");
  process.exit(1);
}

console.log("Generate check passed: committed pages match the product table.");
