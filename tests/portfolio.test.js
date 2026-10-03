const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const GITHUB = "https://github.com/dwdxdydz";
const LINKEDIN = "https://www.linkedin.com/in/ajitpalsinghiitb";

test("required portfolio files exist", () => {
  for (const file of ["index.html", "style.css", "script.js", "README.md", "package.json", "tests/portfolio.test.js"]) {
    assert.ok(fs.existsSync(path.join(root, file)), `Missing ${file}`);
  }
});

test("package configuration has a working test command", () => {
  assert.equal(packageJson.scripts?.test, "node --test tests/portfolio.test.js");
});

test("HTML has no duplicate IDs", () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual([...new Set(duplicates)], []);
});

test("all internal links point to existing sections", () => {
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
  const links = [...html.matchAll(/href=["']#([^"']+)["']/g)].map((match) => match[1]);
  for (const target of links) assert.ok(ids.has(target), `Broken internal link: #${target}`);
});

test("local HTML resources exist", () => {
  const resources = [
    ...html.matchAll(/href=["']([^"'#]+\.(?:css|js))["']/g),
    ...html.matchAll(/src=["']([^"']+\.js)["']/g),
  ].map((match) => match[1]);

  for (const resource of new Set(resources)) {
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

test("JavaScript has defensive browser behaviour", () => {
  assert.match(script, /navToggle\?\.addEventListener/);
  assert.match(script, /if \(year\)/);
  assert.match(script, /"IntersectionObserver" in window/);
  assert.match(script, /Math\.min\(100, Math\.max\(0, percentage\)\)/);
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /requestAnimationFrame/);
});

test("portfolio contains the expected sections and projects", () => {
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
    assert.match(html, new RegExp(project.replace(/[.*+?^{}()|[\\]\\\\]/g, "\\\\$&")));
  }
});

test("GitHub profile data is present and linked correctly", () => {
  assert.match(html, new RegExp(GITHUB.replace(/[.*+?^{}()|[\\]\\\\]/g, "\\\\$&")));
  assert.match(html, /Open GitHub/);

  const expectedRepos = [
    "Flight-Alert-System",
    "RAG-Sytem",
    "Fourier-Image-Drawing",
    "Seq2Seq-Model",
    "sudoku",
    "LRU-Cache",
  ];

  for (const repo of expectedRepos) {
    assert.match(html, new RegExp(`github\\.com/dwdxdydz/${repo}`), `Missing GitHub project link: ${repo}`);
  }
});

test("LinkedIn profile data is present and linked correctly", () => {
  assert.match(html, new RegExp(LINKEDIN.replace(/[.*+?^{}()|[\\]\\\\]/g, "\\\\$&")));
  assert.match(html, /Connect on LinkedIn/);
});

test("professional profile data is represented", () => {
  for (const value of [
    "Ajit Pal Singh",
    "IIT Bombay",
    "Business Analyst",
    "Sales Analytics",
    "Emoha Elder Care",
    "Bengaluru, India",
    "Excel",
    "SQL",
    "Power BI",
    "Zoho Analytics",
    "Python",
    "Java",
    "C++",
    "MySQL",
    "MongoDB",
    "300+",
  ]) {
    assert.match(html, new RegExp(value.replace(/[.*+?^{}()|[\\]\\\\]/g, "\\\\$&")), `Missing profile data: ${value}`);
  }
});

test("contact information is present", () => {
  assert.match(html, /mailto:ajitpalsinghiitb@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/ajitpalsinghiitb/);
  assert.match(html, /github\.com\/dwdxdydz/);
});

test("SEO and document metadata are present", () => {
  assert.match(html, /<meta charset=["']UTF-8["']/i);
  assert.match(html, /<meta name=["']viewport["']/i);
  assert.match(html, /<meta name=["']description["']/i);
  assert.match(html, /<meta name=["']theme-color["']/i);
  assert.match(html, /<title>[^<]+<\/title>/i);
});

test("basic accessibility hooks are present", () => {
  assert.match(html, /<html lang=["']en["']/);
  assert.match(html, /aria-label=["'][^"']+["']/);
  assert.match(html, /aria-expanded=["']false["']/);
  assert.match(html, /aria-hidden=["']true["']/);
  assert.match(html, /prefers-reduced-motion/);
});

test("3D visual system is wired into the page", () => {
  const tiltCount = (html.match(/data-tilt/g) || []).length;
  assert.ok(tiltCount >= 6, `Expected multiple 3D tilt surfaces, found ${tiltCount}`);
  assert.match(html, /github-cube/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /perspective:/);
  assert.match(css, /rotateY\(/);
  assert.match(css, /translateZ\(/);
  assert.match(script, /data-tilt/);
});

test("CSS contains responsive and reduced-motion rules", () => {
  assert.match(css, /@media \(max-width: 850px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("portfolio includes useful business-analyst positioning", () => {
  for (const keyword of [
    "sales operations",
    "analytics",
    "automation",
    "CRM",
    "reporting",
    "KPI Analysis",
    "Data Cleaning",
  ]) {
    assert.match(html, new RegExp(keyword.replace(/[.*+?^{}()|[\\]\\\\]/g, "\\\\$&"), "i"));
  }
});
