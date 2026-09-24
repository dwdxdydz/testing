# Ajit Pal Singh — Portfolio

A responsive personal portfolio website built with plain **HTML, CSS and JavaScript**.

This repository was previously a scratch/test repository. It is now a small, dependency-free portfolio project that can be opened locally or deployed with GitHub Pages.

## What is inside?

The portfolio presents my profile across:

- Business Analytics and Sales Analytics
- Data analysis and reporting
- Backend/software engineering
- AI/NLP projects
- Algorithms and data structures
- Open-source and repository improvement work

## Featured projects

1. [Flight Alert System](https://github.com/dwdxdydz/Flight-Alert-System)
2. [AI Document RAG Assistant](https://github.com/dwdxdydz/RAG-Sytem)
3. [Fourier Image Drawing](https://github.com/dwdxdydz/Fourier-Image-Drawing)
4. [Seq2Seq Machine Translation](https://github.com/dwdxdydz/Seq2Seq-Model)
5. [Sudoku Generator & Solver](https://github.com/dwdxdydz/sudoku)
6. [LRU Cache](https://github.com/dwdxdydz/LRU-Cache)

## Project structure

```text
testing/
├── index.html
├── style.css
├── script.js
├── package.json
├── tests/
│   └── portfolio.test.js
└── README.md
```

## Run locally

No framework, package manager or build step is required to view the site.

### Option 1 — open directly

Open `index.html` in a browser.

### Option 2 — use a local server

From the repository folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Using a local server is useful because it behaves more like a real hosted website.

## Run tests

The repository includes automated tests using Node.js's built-in test runner. No npm dependencies are required.

Make sure Node.js is installed, then run:

```bash
npm test
```

The tests check:

- Required portfolio files exist
- HTML IDs are not duplicated
- Internal navigation links point to real sections
- Local CSS and JavaScript files exist
- External links opened in a new tab use safe `noopener noreferrer` attributes
- JavaScript has valid syntax
- JavaScript contains browser fallbacks for missing elements and unsupported Intersection Observer
- Expected portfolio sections and projects are present
- Responsive and reduced-motion CSS rules are present

## What was fixed

The original page worked as a visual prototype, but the JavaScript and markup were not defensive enough for a portfolio that should be easy to maintain.

The update improves the project by:

- Making the mobile navigation update `aria-expanded` and its accessible label
- Closing the mobile menu when a navigation item is selected
- Closing the mobile menu with the Escape key or an outside click
- Guarding DOM elements before using them
- Clamping the scroll-progress value between 0% and 100%
- Updating scroll progress after page load and browser resize
- Adding a fallback when `IntersectionObserver` is unavailable
- Using `defer` for the main JavaScript file
- Adding visible keyboard focus styling
- Marking decorative elements as hidden from assistive technology where appropriate
- Adding a test suite so common broken-link and markup mistakes can be caught before deployment

## Deploy with GitHub Pages

1. Open the repository's **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Select `master` and the `/ (root)` folder.
4. Save.
5. GitHub will provide the published portfolio URL.

## Tech used

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js built-in test runner
- Responsive design
- Intersection Observer API
- GitHub Pages

## Technical terms explained

**HTML** — Defines the structure and content of the webpage.

**CSS** — Controls the visual design, layout, responsive behaviour and animations.

**JavaScript** — Adds interactive behaviour such as the mobile menu, scroll progress and reveal animations.

**DOM** — The browser's representation of the HTML page that JavaScript can read and modify.

**ARIA** — Accessibility attributes that help assistive technologies understand interactive elements.

**Intersection Observer** — A browser API that detects when an element enters the visible part of the page.

**Fallback** — An alternative behaviour used when a browser does not support a particular feature.

**Node.js test runner** — A testing tool included with modern Node.js installations. It allows the project to run automated JavaScript tests without installing a testing framework.

**Static website** — A website served as files such as HTML, CSS and JavaScript without requiring a backend server.

## Portfolio goal

This repository demonstrates more than a visual portfolio. It also demonstrates basic software-quality practices:

- Defensive JavaScript
- Accessibility
- Responsive design
- Automated testing
- Maintainable project structure
- Documentation

## Links

- GitHub: https://github.com/dwdxdydz
- LinkedIn: https://www.linkedin.com/in/ajitpalsinghiitb
