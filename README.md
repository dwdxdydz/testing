# Ajit Pal Singh — 3D Portfolio

A responsive personal portfolio built with **HTML, CSS and vanilla JavaScript**, now designed around a modern 3D/glass interface.

The goal is to make the portfolio feel like a small interactive product rather than a plain collection of sections.

## What changed in the 3D redesign?

The previous visual style was a flat dark portfolio. This version introduces depth throughout the page:

- 3D glass cards with layered shadows and highlights
- Mouse/pointer tilt on important cards
- Perspective-based project cards
- Floating skill badges around the hero
- Orbit rings around the hero card
- A CSS 3D GitHub cube
- A perspective grid floor
- Neon ambient lighting and glow effects
- Layered gradients and glass surfaces
- Smoother hover states and depth transitions
- Mobile layout preserved
- Reduced-motion support preserved

No external UI framework or 3D library was added.

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

Open `index.html` directly, or use a local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Run tests

Node.js's built-in test runner is used, so no npm dependencies are required.

```bash
npm test
```

The test suite checks:

- Required files
- Duplicate HTML IDs
- Broken internal links
- Missing local CSS/JS resources
- Safe external links
- JavaScript syntax
- Defensive browser behaviour
- Required portfolio sections/projects
- Responsive CSS
- Reduced-motion support
- 3D implementation hooks

## 3D implementation

### CSS 3D

The visual depth is created with native CSS features:

- `perspective`
- `transform-style: preserve-3d`
- `rotateX()`
- `rotateY()`
- `translateZ()`
- layered `box-shadow`
- glass-style transparency and `backdrop-filter`

This means there is no dependency on Three.js just to create the interface depth.

### Pointer tilt

Elements with:

```html
data-tilt
```

are detected by JavaScript.

When the pointer moves over a card, its position is converted into small X/Y rotations. `requestAnimationFrame` keeps the visual update efficient.

The effect is automatically disabled when the user has enabled **reduced motion**.

### CSS 3D cube

The GitHub section contains a six-face cube built entirely with CSS transforms. Each face is positioned in 3D space using `translateZ()` and rotations.

## Technical terms explained

**Perspective** — Controls how strong the 3D depth appears from the viewer's position.

**Transform** — A CSS operation that can move, rotate or scale an element.

**Preserve-3D** — Keeps child elements positioned in the same 3D coordinate space instead of flattening them.

**TranslateZ** — Moves an element toward or away from the viewer.

**Glassmorphism** — A visual style using transparency, blur, borders and layered lighting to create a glass-like surface.

**Pointer tilt** — Rotates a card slightly based on where the mouse or pointer is located.

**RequestAnimationFrame** — A browser API used to schedule animation updates efficiently.

**Reduced motion** — An accessibility preference that allows users to minimise motion and animation.

## Portfolio goal

The portfolio now demonstrates both my professional profile and frontend implementation skills:

- Business Analytics
- Sales Analytics
- Data & AI projects
- Backend/software engineering
- Responsive web design
- CSS 3D
- JavaScript interaction
- Accessibility
- Automated testing
- Documentation

## Links

- GitHub: https://github.com/dwdxdydz
- LinkedIn: https://www.linkedin.com/in/ajitpalsinghiitb
