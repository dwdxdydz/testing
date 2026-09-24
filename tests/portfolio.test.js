const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("required portfolio files exist", () => {
  for (const file of ["index.html", "style.css", "script.js", "README.md"]) {
    assert.ok(fs.existsSync(path.join(root, file)), `Missing ${file}`);
  }
});

test("HTML has no duplicate IDs", () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual([...new Set(duplicates)], []);
});

test("all internal links point to existing sections", () => {
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
  const links = [...html.matchAll(/href=["']#([^"']+)["']/g)].map((match) => match[1]);

  for (const target of links) {
    assert.ok(ids.has(target), `Broken internal link: #${target}`);
  }
});

test("local HTML resources exist", () => {
  const localResources = [
    ...html.matchAll(/href=["']([^"'#]+\.(?:css|js))["']/g),
    ...html.matchAll(/src=["']([^"']+\.js)["']/g),
  ].map((match) => match[1]);

  for (const resource of new Set(localResources)) {
    assert.ok(fs.existsSync(path.join(root, resource)), `Missing resource: ${resource}`);
  }
});

test("external links opened in a new tab use safe rel attributes", () => {
  const externalLinks = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/g)].map((match) => match[0]);

  for (const link of externalLinks) {
    assert.match(link, /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/);
  }
});

test("JavaScript has valid syntax", () => {
  assert.doesNotThrow(() => new vm.Script(script, { filename: "script.js" }));
});

test("JavaScript guards optional browser elements and has mobile fallbacks", () => {
  assert.match(script, /navToggle\?\.addEventListener/);
  assert.match(script, /if \(year\)/);
  assert.match(script, /"IntersectionObserver" in window/);
  assert.match(script, /Math\.min\(100, Math\.max\(0, percentage\)\)/);
});

test("portfolio contains the expected navigation and project sections", () => {
  for (const id of ["home", "about", "experience", "projects", "skills", "open-source", "contact"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }

  for (const project of [
    "Flight Alert System",
    "AI Document RAG Assistant",
    "Fourier Image Drawing",
    "Seq2Seq Machine Translation",
    "Sudoku Generator & Solver",
    "LRU Cache",
  ]) {
    assert.match(html, new RegExp(project.replace(/[.*+?^{}()|[\]\\]/g, "\\$&")));
  }
});

test("CSS contains responsive and reduced-motion rules", () => {
  assert.match(css, /@media \(max-width: 800px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
