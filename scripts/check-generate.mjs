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

const pages = spawnSync(
  "git",
  ["grep", "-n", 'rel="stylesheet"', "--", "public"],
  { cwd: root, encoding: "utf8" }
);
if (pages.status !== 0 && pages.status !== 1) {
  process.stderr.write(pages.stderr || "git grep failed\n");
  process.exit(pages.status ?? 1);
}
const bad = (pages.stdout || "")
  .split("\n")
  .filter((line) => line && !line.includes('href="/styles.css?v='));
if (bad.length) {
  process.stderr.write("Stylesheet hrefs must be root-absolute /styles.css?v=...\n");
  process.stderr.write(`${bad.join("\n")}\n`);
  process.exit(1);
}

console.log("Generate check passed: committed pages match the product table.");
