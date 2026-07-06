# React Project Implementation Guidelines

These guidelines are a set of **defaults**. Do not deviate from them without a reason. When you do deviate (optical correction, project constraints, etc.), state the reason explicitly in a code comment or in your response.

**Priority when rules conflict**: explicit user request > existing project conventions > this document. Deviations are stated in one line, then you move on.

**Deployment**: place this file in the project root as `AGENTS.md` (the cross-tool standard auto-loaded by Cursor, Codex, etc.); for Claude Code add a `CLAUDE.md` that imports it (`@AGENTS.md`). If it approaches ~600 lines, split reference material (variable template, examples) into linked files instead of growing it.

### Hard rules — quick reference (details in the numbered sections)
1. NEVER write literal **design values** (`#hex`, `px` dimensions, shadows, z-index...) in component CSS — always `var()`. Structural values (`0`, `1fr`, `auto`, flex/grid keywords) are exempt (§3, §4).
2. Every variable category = exactly 5 values. NEVER add a 6th — split the category instead (§4).
3. Font size and weight are managed as separate **heading/body sets**, 5 values each (§4).
4. NEVER put `margin` on a reusable component's root — the parent owns spacing via `gap` (§2).
5. NEVER hotlink images — download into `public/images/`, reference local paths only (§7).
6. Pages compose; markup lives in sections (content pages) or feature containers (app pages); components know nothing above them (§1).
7. NEVER name variants by usage site (`heroCta`) — visual-system names only (§2).
8. Actions use `<button>`, navigation uses `<a>` (§2).
9. NEVER mix styling approaches or icon sets within one project (§3, §7).
10. Build in the §5 order; the task is not done until every §8 gate passes (Tier-1 lint, then Tier-2 grep sweep).

---

## 0. Determine Project Type and Tooling First

Before writing any code, classify the project and choose the toolchain. This decision precedes every other rule in this document.

| Type | Traits | Default tooling | Composition (§1) |
|---|---|---|---|
| Marketing / landing / content page | SEO and first-load performance matter | **Next.js (App Router)** or Astro — SSG/SSR | Page → Section → Component |
| Internal tool, dashboard, SPA behind auth | SEO irrelevant, interaction-heavy | **Vite + React** | Page → Feature → UI Component |
| Existing project | Stack already exists | **Follow the existing setup** (never introduce a new paradigm) | Follow the existing structure |

If the type is unclear, ask the user. If asking is not possible, decide with one question: *will this page be found via search or shared publicly?* Yes → Next.js (App Router); no → Vite + React. Do not deliberate further. All rules below apply regardless of tooling.

---

## 1. Folder Structure and Section Separation

```
src/
├── pages/               # One folder per page — the composition root (see below)
│   └── Home/
│       └── Home.jsx     # imports sections/components and arranges them
├── sections/            # Section-level components that compose a page (app-type projects: features/ instead — see below)
│   ├── Hero/
│   ├── Features/
│   └── Footer/
├── components/          # Reusable components — see §2
│   └── Button/
│       ├── Button.jsx
│       └── Button.module.css
├── layouts/             # Page skeleton (Header + main + Footer arrangement)
├── hooks/               # Custom hooks
├── utils/               # Pure utility functions
├── styles/              # Global styles and variables
│   ├── variables.css    # ALL variables — see §4
│   ├── global.css       # Reset + global base styles
│   └── typography.css   # Font definitions
└── App.jsx              # routing only — renders pages
```

### Content pages: Page → Section → Component
**Every screen is built page-first: create the page component, then implement the pieces and import them into the page.** The page is the composition root.

```jsx
// pages/Home/Home.jsx — a page only imports and arranges; it owns no markup
import MainLayout from '../../layouts/MainLayout';
import Hero from '../../sections/Hero/Hero';
import Features from '../../sections/Features/Features';
import Pricing from '../../sections/Pricing/Pricing';

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Pricing />
    </MainLayout>
  );
}
```

- **Imports flow one way, downward: pages import layouts + sections; sections import reusable components; components import nothing above themselves.** A component MUST NOT import a section; a section MUST NOT import a page.
- Pages MUST NOT contain their own markup (no divs, no inline text) — only composition (layout wrapper + ordered sections) and page-level data passing (route params / fetched data in, props down to sections).
- Router wiring — **Vite SPA**: `App.jsx` (or the router config) does nothing but render page components from `pages/`. **Next.js App Router**: do NOT create a `src/pages/` folder (it collides with the legacy Pages Router); the `app/**/page.jsx` file itself is the composition root — compose sections directly there, following the same rules.

### App-type projects: Page → Feature Container → UI Component
The no-markup rule above is calibrated for content/marketing pages. App-type projects (§0 row 2 — dashboards, internal tools, SaaS) keep the same one-way import flow, but the middle layer changes:

- Replace `sections/` with `features/` (`features/InvoiceTable/`, `features/FilterBar/`); the 1 folder = 1 component + 1 style file rule is unchanged.
- The page MAY own **route-level concerns**: data loading for the route, permission guards, error boundaries / `Suspense`, URL-synced filter/tab state, and structural arrangement (split panels, toolbar slots).
- The page still MUST NOT contain presentational markup — styled cards, table rows, form fields live in feature containers or `components/`.
- Unlike marketing sections, a feature container MAY fetch its own data and own feature-local state; it still builds its UI from `components/` atoms, and imports flow one way: pages → features → components.
- Every route mounts inside a **route-level error boundary**, and every async view renders its three states explicitly: **loading** (skeleton sized to the final layout — never a bare full-page spinner), **error** (message + retry action), **empty** (guidance, not a blank area). Add widget-level boundaries around risky third-party components (charts, editors).

### Section rules
- **1 section = 1 folder = 1 component + 1 style file.** A component and its styles always live in the same folder.
- Wrap each section in a semantic tag (`<section>`, `<header>`, `<footer>`, `<nav>`). The page decides section order; each section owns its internal markup.
- NEVER style UI atoms (buttons, cards, badges) directly inside a section. Always compose them from reusable components in `components/` (§2).
- Extract repeated render data (card arrays, etc.) into constant arrays rendered via `.map()`. However, do NOT mechanically extract one-off static copy — prose that appears once reads better (and greps better) inline in JSX.
- Split a component into a child component when **any** of these is true — otherwise do not split:
  1. The same JSX block (same structure + same classes) appears twice.
  2. A block owns both its own state and its own markup (e.g. an interactive card, an accordion item).
  3. The file exceeds 200 lines.

### Reference section — copy this pattern for every section
This example is normative: semantic wrapper, data extracted to a constant array, icons via CSS-sized class, every design value a `var()` reference (structural values like `0`, `1fr`, flex keywords stay literal — §3).

```jsx
// sections/Features/Features.jsx
import styles from './Features.module.css';
import { BarChart3, Shield, Zap } from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, title: 'Analytics', body: 'Track every metric in real time.' },
  { icon: Shield,    title: 'Security',  body: 'SOC 2 compliant by default.' },
  { icon: Zap,       title: 'Speed',     body: 'Sub-second loads on every page.' },
];

export default function Features() {
  return (
    <section className={styles.features} aria-labelledby="features-title">
      <h2 id="features-title" className={styles.title}>Why teams choose us</h2>
      <ul className={styles.grid}>
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <li key={title} className={styles.card}>
            <Icon className={styles.icon} aria-hidden />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardBody}>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```css
/* sections/Features/Features.module.css — zero literal design values */
.features {
  display: flex; flex-direction: column; gap: var(--space-lg);
  padding: var(--space-xl) 0;
}
.title {
  font-size: var(--text-heading-md);
  font-weight: var(--weight-heading-bold);
  line-height: var(--leading-sm);
  color: var(--color-text);
}
.grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);
  list-style: none; margin: 0; padding: 0;
}
.card {
  display: flex; flex-direction: column; gap: var(--space-sm);
  padding: var(--space-md);
  border: var(--border-xs) solid var(--color-border);
  border-radius: var(--radius-md);
}
.icon {
  width: var(--size-icon-lg); height: var(--size-icon-lg);
  color: var(--color-primary);
}
.cardTitle {
  font-size: var(--text-body-lg);
  font-weight: var(--weight-body-semibold);
}
.cardBody {
  font-size: var(--text-body-md);
  line-height: var(--leading-lg);
  color: var(--color-text-muted);
}

@media (max-width: 768px) { /* §4 breakpoint md */
  .grid { grid-template-columns: 1fr; }
}
```

---

## 2. Reusable Components (components/)

**UI atoms that will obviously recur — like buttons — get their own component in `components/` from their very first use.** Do not wait for a second usage site.

### When to extract
1. **Obvious atoms** — Button, Input, Card, Badge, Modal, Spinner: elements that recur on any page. Extract at first use.
2. **Discovered repetition** — the same markup + style combination appears in two or more sections: extract at that moment.
3. Otherwise, keep it inside the section. Do not build generality that will never be used.

### Design rules
- Use the **variant/size props pattern**. Name variants by visual system (`primary` / `secondary` / `ghost`), NEVER by usage site (`heroCta`, `footerButton`). The moment a usage-site name appears, reusability is broken.

```jsx
// components/Button/Button.jsx
import styles from './Button.module.css';

export default function Button({
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost'
  size = 'md',           // 'sm' | 'md' | 'lg'
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

- **No outer margin.** The root element of a reusable component MUST NOT have `margin`. Spacing between siblings is the parent's (section's) responsibility via `gap`. A component with built-in margins misaligns everywhere it lands.
- **No section knowledge.** Reusable components MUST NOT contain business logic, data fetching, or branches for specific sections. Data comes in through props only.
- Component dimensions (height, padding, font) MUST reference the size variables from §4. The size prop exposes the middle 3 of the 5 steps by default (`sm`/`md`/`lg` → `--size-control-sm/md/lg`); open up the outer steps (`xs`/`xl`) only when needed.
- Accept `className` and merge it; spread `...rest` onto the actual element so `onClick`, `aria-*`, `disabled`, etc. pass through.
- Preserve semantics: actions use `<button>` (default `type="button"`), navigation uses `<a>`. For link-shaped buttons, use an `as` prop or a separate component.
- The same principle applies with Tailwind: **when a utility class combination repeats, extract a component — never copy-paste.** Manage variant mappings with an object (`const variants = { primary: '...', ... }`) or cva.
- Keep `components/` flat until it holds **8+ components**; at that point split into `components/ui/` (atoms) and `components/common/` (composed shared blocks, e.g. SectionHeader). Do not create the subfolders earlier.

---

## 3. CSS Management

### Choosing an approach
CSS Modules and Tailwind are **both build-time tools** (build dependency is NOT a differentiator). Decide as follows:

- **Existing project**: follow whatever it already uses. Never mix approaches.
- **New project default: Tailwind (v4)** — variables integrate as CSS variables via `@theme`, arbitrary off-scale values are structurally discouraged, and it is the current ecosystem/collaboration standard.
- **Choose CSS Modules when**: the user rejects utility classes, or semantic class names matter (e.g. handoff to publishers). In that case, global CSS is limited to the 3 files in `styles/` (variables, global, typography).

### Common rules (regardless of approach)
- **No inline styles.** The only exception: passing dynamic values as CSS variables (`style={{ '--delay': i * 100 + 'ms' }}`).
- **No literal design values in CSS bodies.** A *design value* is anything a designer would decide: colors, spacing/size dimensions, font size/weight/line-height/letter-spacing, border width, radius, shadows, opacity, duration/easing, z-index. Every design value MUST be a `var()` reference to a §4 variable. If no step fits, use the nearest step; if it truly doesn't fit, adjust that step's value itself (§4 — never add a step).
- **Structural values are exempt** and stay literal — do NOT create variables for them: `0`, `auto`, `none`, `100%`, `1fr` / `repeat()` / `minmax()`, flex/grid keywords (`flex`, `column`, `center`, `wrap`), `50%` in centering transforms, `currentColor`, `transparent`, `inherit`, and the §4 breakpoint values inside `@media` conditions.
- Layout uses flex/grid. Prefer the parent's `gap` for sibling spacing.
- Responsive breakpoints MUST use only the values documented in §4.
- Respect `prefers-reduced-motion` (WCAG C39): `global.css` always includes this block, so non-essential motion collapses for users who request it:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Per-approach rules
- **Tailwind**: do not abuse `@apply`. Long class lists are a signal to extract a component (§2), not a signal to use `@apply`.
- **CSS Modules**: class names are role-based (`.card`, `.cardTitle`). Appearance-based names (`.redBox`, `.mt20`) are forbidden.

---

## 4. Variable Management

### Principle 1: Every value used in styling is stored as a variable
Colors, spacing, all sizes (control heights, icon sizes, container widths), font size/line-height/letter-spacing/weight, border width, radius, shadows, opacity, motion (duration/easing), z-index — **all of it is defined as CSS custom properties (variables) in `styles/variables.css`**, and component CSS uses only `var()` references. (CSS Modules → define in `:root`; Tailwind v4 → define in `@theme`, which exposes them as CSS variables identically.)

### Principle 2: Every category is managed as exactly 5 values (the 5-value rule)
Each category defines **exactly 5 values**. The ceiling of 5 prevents uncontrolled value proliferation (scale creep); the floor of 5 guarantees enough options from the start.

- **Scale categories** (spacing, sizes, text, radius, shadows, ...): use the 5-step suffix `xs → sm → md → lg → xl`, values sorted ascending. Design the values so the default state lands near the middle of the scale (around `md`).
- **Semantic categories** (colors, easing, z-index): these are not ordinal scales, so manage them as **5 named semantic slots**.
- **Typography is split into heading and body sets.** Font size and font weight are each managed as **two separate 5-value sets** — one for headings (`--text-heading-*`, `--weight-heading-*`) and one for body text (`--text-body-*`, `--weight-body-*`). Headings and body serve different roles and different ranges; forcing them onto one shared scale distorts both. Each set independently follows the 5-value rule.
- **Never add a 6th value.** When a new value seems needed: ① use the nearest existing step, or ② adjust that step's value itself (keep the step count). If 5 is truly insufficient, do not append values — **split the category** (e.g. add a separate 5-slot status-color set), just as typography is split into heading/body.
- Single-value entries (like the `--font-body` font stack) are not scales and are exempt from the 5-value rule.

```css
:root {
  /* ── Colors: 5 semantic slots ── */
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-primary: #2563eb;
  --color-border: #e5e7eb;
  /* need surface/hover/status colors? split the category (§4 Principle 2),
     e.g. a separate 5-slot status set — do not grow this one to 6 */

  /* ── Spacing: 5 steps ── */
  --space-xs: 4px;  --space-sm: 8px;  --space-md: 16px;
  --space-lg: 32px; --space-xl: 96px; /* xl = gap between sections */

  /* ── Control sizes (button/input heights): 5 steps ── */
  --size-control-xs: 24px; --size-control-sm: 32px; --size-control-md: 40px;
  --size-control-lg: 48px; --size-control-xl: 64px;

  /* ── Icon sizes: 5 steps ── */
  --size-icon-xs: 12px; --size-icon-sm: 16px; --size-icon-md: 20px;
  --size-icon-lg: 24px; --size-icon-xl: 32px;

  /* ── Container widths: 5 steps ── */
  --container-xs: 480px; --container-sm: 640px; --container-md: 768px;
  --container-lg: 960px; --container-xl: 1200px; /* xl = default page width */

  /* ── Font sizes: heading set + body set, 5 steps each ── */
  --text-heading-xs: 1.25rem; --text-heading-sm: 1.5rem; --text-heading-md: 2rem;
  --text-heading-lg: 2.5rem;  --text-heading-xl: 3.25rem; /* xl = hero title */
  --text-body-xs: 0.75rem;  --text-body-sm: 0.875rem; --text-body-md: 1rem;
  --text-body-lg: 1.125rem; --text-body-xl: 1.25rem;   /* md = body default */

  /* ── Line heights: 5 steps (xs = tightest) ── */
  --leading-xs: 1;   --leading-sm: 1.2; --leading-md: 1.4;
  --leading-lg: 1.6; --leading-xl: 2;   /* headings ≈ sm, body default = lg */

  /* ── Letter spacing: 5 steps (md = 0, the center) ── */
  --tracking-xs: -0.04em; --tracking-sm: -0.02em; --tracking-md: 0;
  --tracking-lg: 0.04em;  --tracking-xl: 0.12em; /* xl = uppercase labels */

  /* ── Font weights: heading set + body set, 5 slots each ── */
  --weight-heading-medium: 500;   --weight-heading-semibold: 600;
  --weight-heading-bold: 700;     --weight-heading-extrabold: 800;
  --weight-heading-black: 900;    /* heading default = bold */
  --weight-body-light: 300;       --weight-body-regular: 400;
  --weight-body-medium: 500;      --weight-body-semibold: 600;
  --weight-body-bold: 700;        /* body default = regular */

  /* ── Border widths: 5 steps ── */
  --border-xs: 1px; --border-sm: 1.5px; --border-md: 2px;
  --border-lg: 4px; --border-xl: 8px;

  /* ── Radius: 5 steps ── */
  --radius-xs: 2px;  --radius-sm: 4px; --radius-md: 8px;
  --radius-lg: 16px; --radius-xl: 9999px; /* xl = fully rounded */

  /* ── Shadows: 5 steps (elevation) ── */
  --shadow-xs: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px rgb(0 0 0 / 0.08);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.08);
  --shadow-lg: 0 8px 24px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 48px rgb(0 0 0 / 0.16);

  /* ── Opacity: 5 steps ── */
  --opacity-xs: 0.05; --opacity-sm: 0.25; --opacity-md: 0.5;
  --opacity-lg: 0.6;  --opacity-xl: 0.9;
  /* md = disabled, lg = modal overlay dim */

  /* ── Motion durations: 5 steps ── */
  --duration-xs: 0.1s; --duration-sm: 0.15s; --duration-md: 0.2s;
  --duration-lg: 0.4s; --duration-xl: 1s; /* default transition = md */

  /* ── Easing: 5 semantic slots ── */
  --ease-linear: linear;
  --ease-out: ease-out;
  --ease-in-out: ease-in-out;
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── z-index: 5 semantic slots ── */
  --z-raised: 10;  --z-header: 100; --z-dropdown: 200;
  --z-modal: 1000; --z-toast: 1100; /* modal backdrop shares --z-modal */

  /* ── Single values (exempt from the 5-value rule) ── */
  --font-body: system-ui, sans-serif; /* replace with the project font stack */
}

/* ── Breakpoints: 5 steps (documented here) ──
   CSS variables cannot be used in media query conditions, so the values are
   fixed in this comment block and media queries MUST use only these values.
   With Tailwind, define the same values in the `screens` config.
   xs 480px / sm 640px / md 768px / lg 1024px / xl 1280px */
```

### Rules
- **No literal design values.** Never write raw design values (`#2563eb`, `17px`, `0 4px 12px ...`) in component/section CSS — structural values (`0`, `1fr`, `auto`, ...) are exempt per §3. Use the nearest of the 5 steps; if it truly doesn't fit, adjust that step's value itself.
- **The only exception**: one-off correction values — optical alignment (icon-to-text visual centering), font baseline compensation, negative margins for overlap layouts. These MUST carry a reason comment (`margin-top: -2px; /* baseline correction */`). If the same correction appears twice, absorb it by adjusting a step value.
- When a design mockup exists, the mockup wins — redesign the 5 step *values* from the mockup's values (the step *count* stays 5).
- z-index MUST come from variables only. `z-index: 9999` hardcoding is forbidden.
- Do not delete unused steps. The completeness of the scale takes priority over per-step usage.

### Add a primitive tier only conditionally
The default is a **single tier of semantic variables**, as above. A two-tier structure — primitive variables (`--gray-900`, etc.) referenced by semantic variables — is introduced only when at least one of the following is **confirmed**:
- Two or more themes (e.g. dark mode)
- Variables shared across multiple projects/platforms

When introduced, the primitive color palette also follows the 5-value rule (e.g. `--gray-xs`–`--gray-xl`, or 5 chosen steps of 100–900). Otherwise stay single-tier — adding a tier later is a cheap refactor. When adopting dark mode, redefine only the semantic variables under `[data-theme="dark"]`; component CSS stays untouched.

---

## 5. Implementation Order

Follow an **iterative** flow: variables → rough full pass → detail. No stage finalizes anything without something real on screen.

1. **Classify + set up** — decide tooling per §0, scaffold the project, remove boilerplate, create the folder structure, and install the §8 Tier-1 lint gates (stylelint config + `eslint-plugin-jsx-a11y`; TS projects add `tsc --noEmit`) so violations fail from the first commit.
2. **Draft variables** — write every §4 category into `variables.css`, **5 steps each** (typography as heading/body sets, 5 each), as a *draft*. Nothing is final until step 4 completes; revise freely (what changes is each step's *value*, never the step *count*).
3. **Global styles + layout skeleton + page shell** — reset, body defaults, Header/Footer, page container (`--container-xl`, horizontal padding). Then create the page component (the composition root, §1) rendering inside the layout — empty at first. From this point on, everything is built by implementing a piece and importing it into this page; the page MUST stay rendering at every step.
4. **Rough full pass** — create every section *roughly* with real content (structure and approximate spacing only, no detail) and import each one into the page as soon as it exists. Source real assets here per §7 — download images into `public/images/` now, so the rhythm check uses real imagery, not placeholders. The page-level rhythm — inter-section spacing, background alternation, density — is only visible in this state. Adjust and finalize the 5-step values here.
5. **Consolidate reusable components** — obvious atoms (Button, etc.) should already exist; extract anything that revealed repetition during the rough pass into `components/` per §2.
6. **Finish sections in detail (top to bottom)** — on top of the finalized variables and components, complete one section at a time: markup, styles, data extraction.
7. **Interaction/state** — hooks, events, animations. Keep state in the smallest component scope that needs it.
8. **Responsive** — full check at each breakpoint.
9. **Final audit** — check accessibility by hand (focus styles visible, color contrast, heading order) and §7 page metadata, then run §8: Tier-1 lint gates first, Tier-2 grep sweep after; fix until all pass. Remove dead code — but keep unused steps of the 5-step scales.

Verify in the browser after each step before moving on. Variables shifting during step 4 is not a failure — it is the purpose of this ordering.

---

## 6. General Principles

- Start state management with `useState`/`useContext`. Do not introduce an external state library before a clear need emerges. However, never use Context as a global store for frequently changing values (re-render cost) — that need *is* the "clear need".
- App-type projects: **server data belongs to TanStack Query** (caching, retries, invalidation), client UI state stays in `useState`/Zustand. NEVER mirror server responses into client state via `useEffect` + `setState` — that pattern is exactly what TanStack Query replaces.
- New projects default to **TypeScript** (`strict: true`); plain JavaScript only when the user asks for it. Examples in this document are shown as `.jsx` — they apply identically as `.tsx`.
- Forms: every input has an associated `<label>` (or `aria-label`); use native HTML validation (`required`, `type`, `pattern`) first; adopt react-hook-form only for 5+ fields, dynamic fields, or cross-field validation.
- Security defaults: NEVER pass user-provided content to `dangerouslySetInnerHTML` without `DOMPurify.sanitize()`; `target="_blank"` links carry `rel="noopener noreferrer"`; user-supplied URLs render only with `http(s):` protocols; secrets never enter the client bundle — `VITE_*` / `NEXT_PUBLIC_*` variables are public by definition, and `.env*` files stay out of git.
- Minimize added libraries. Do not add framer-motion for what CSS animations can do.
- If props pass through more than 3 levels: first move the state down to the closest common parent of its consumers; only if the value is genuinely app-global (theme, auth, locale) use Context.
- File naming: components `PascalCase.jsx`, hooks `useCamelCase.js`, utils `camelCase.js`. In TypeScript projects, same rules with `.tsx`/`.ts`.
- Use absolute imports via the `@/` alias (`@/components/Button/Button`) — configure `paths` in `jsconfig.json`/`tsconfig.json` (plus `resolve.alias` on Vite). Relative imports only within the same folder.
- Performance defaults: parallelize independent `await`s with `Promise.all` (sequential awaits are the most common self-inflicted latency); lazy-load routes and below-the-fold heavy components with `React.lazy`; the LCP image (usually the hero) loads eagerly with `fetchpriority="high"` — NEVER `loading="lazy"` on it; derive values during render instead of `useEffect`-then-`setState` chains — an effect that only computes state from existing props/state is a bug.
- Performance budget (p75): **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1**. When the project has CI, add Lighthouse CI so builds that regress these fail.

---

## 7. Assets (Icons, Images, Fonts)

Do not ship placeholder boxes or emoji as final UI. Source real assets from these free, license-safe defaults:

- **Icons**: `lucide-react` (npm). One icon set per project — never hand-draw SVGs or mix sets.
- **Photos**: Unsplash / Pexels. **Always download the file — NEVER hotlink.** Follow the image pipeline below.
- **Illustrations**: unDraw — download as SVG into `public/images/`, recolor to `--color-primary`.
- **Fonts**: Google Fonts (Korean projects: Pretendard). Self-host or use the official CDN.

### Image pipeline (download → public → local path)
1. **Download** every external image during implementation (e.g. `curl -L -o public/images/hero-workspace.jpg "<source url>"`).
2. **Store** under `public/images/` with descriptive kebab-case names (`hero-workspace.jpg`, `feature-analytics.png`) — never `image1.jpg` or the source's hash filename.
3. **Reference only local paths** in code (`/images/hero-workspace.jpg`). External image URLs MUST NOT appear in JSX or CSS.
4. **Record provenance** in `public/images/CREDITS.md` — fixed table format, one row per file, `downloadedAt` as `YYYY-MM-DD`:

```markdown
| file | source | license | attributionRequired | downloadedAt |
|---|---|---|---|---|
| hero-workspace.jpg | https://unsplash.com/photos/abc123 | Unsplash License | no | 2026-07-05 |
```

### Rules
- Verify the license allows commercial use before downloading; if attribution is required, add it to the footer as well as CREDITS.md.
- Use variety: each section gets imagery matched to its own content and mood — do not reuse one image across sections.
- If a download fails (no network, dead link), use a neutral CSS placeholder (muted background from existing color variables + `--radius-md`) and leave a `TODO(asset):` comment — never a broken `<img>`, and never fall back to hotlinking.
- Optimize: every `<img>` has explicit `width`/`height` (no CLS) and `loading="lazy"` below the fold (the LCP/hero image is the exception — eager + `fetchpriority="high"`, §6); prefer WebP when conversion is trivial.

### Page metadata (content pages)
Every content page ships with: `<title>` (≤60 chars), meta description (≤155 chars), `<html lang>` matching the content language, canonical URL, Open Graph basics (`og:title`, `og:description`, `og:image` — the OG image is a real downloaded asset in `public/images/`), and a favicon. Next.js: the `metadata` export; Vite: `index.html`. App-type projects behind auth need only `<title>` and favicon.

---

## 8. Verification (definition of done)

Two layers. **Tier 1 (lint gates)** is the real enforcement — set it up in §5 step 1 so violations fail continuously, not only at the end. **Tier 2 (grep sweep)** is a quick self-audit and the fallback when lint isn't configured; grep can false-positive on comments, strings, and `calc()` — when the two disagree, lint output wins. The task is not complete until Tier 1 exits 0 and the Tier 2 sweep is clean.

### Tier 1 — Lint gates (mechanical enforcement)
- **Stylelint** enforces the §3 design-value rule. `variables.css` is the one place literals live, so it is ignored. Starting config — extend the property list per project:

```json
// .stylelintrc.json
{
  "ignoreFiles": ["src/styles/variables.css"],
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-allowed-list": {
      "/^(margin|padding|gap|font|line-height|letter-spacing|border|box-shadow|z-index|opacity|transition|animation)/":
        ["/var\\(--/", "/^(0|auto|none|100%|50%|inherit|initial|unset|transparent|currentColor)( .*)?$/"]
    }
  }
}
```

- **ESLint + `eslint-plugin-jsx-a11y`** (recommended preset) — covers missing `alt`, ARIA misuse, focusability; replaces manual a11y grepping.
- **ESLint architecture gates**: `eslint-plugin-check-file` enforces §6 file naming (components `PascalCase`, hooks `use*`); `import/no-restricted-paths` enforces the §1 one-way import rule:

```js
// eslint.config.js — §1 import direction, mechanically enforced
'import/no-restricted-paths': ['error', { zones: [
  { target: './src/components', from: ['./src/sections', './src/features', './src/pages', './src/layouts'] },
  { target: './src/sections',   from: ['./src/pages'] },
  { target: './src/features',   from: ['./src/pages'] },
]}],
```

- **TypeScript projects**: `tsc --noEmit` passes.
- **Husky + lint-staged**: pre-commit runs stylelint + eslint on staged files, so violations cannot be committed in the first place.
- **Run**: `npm run build && npx stylelint "src/**/*.css" && npx eslint src/` → every command exits 0.
- **Tailwind projects**: utility classes in JSX are exempt (they resolve to `@theme` variables); keep stylelint for the `styles/` CSS files.

### Tier 2 — Grep sweep (self-audit / no-lint fallback)
Run from the project root; fix and re-run the whole list on any failure. Commands assume CSS Modules; on Tailwind projects, checks 2–3 apply only to `styles/` CSS files.

1. **Build passes**
   `npm run build` → must exit 0 with no errors.
2. **No literal colors in CSS**
   `grep -rn --include="*.css" -E "#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(" src/ | grep -v variables.css` → **0 lines**.
3. **No literal px/rem in component CSS**
   `grep -rn --include="*.module.css" -E ":\s*-?[0-9.]+(px|rem|em)" src/ | grep -v "var(" | grep -v "/\*" | grep -v "@media"` → **0 lines** (correction values are exempt because they carry a `/* reason */` comment on the same line — §4).
4. **No inline styles** (CSS-variable passing is the allowed exception)
   `grep -rn --include="*.jsx" --include="*.tsx" "style={{" src/ | grep -v "'--"` → **0 lines**.
5. **No hotlinked images**
   `grep -rn --include="*.jsx" --include="*.tsx" --include="*.css" -E "src=\"https?://|url\(['\"]?https?://" src/` → **0 lines**.
6. **No hardcoded z-index**
   `grep -rn --include="*.css" -E "z-index:\s*[0-9]" src/ | grep -v variables.css` → **0 lines**.
7. **5-value rule holds**
   `grep -oE "^\s*--[a-z]+(-[a-z]+)*-" src/styles/variables.css | sort | uniq -c` — every scale prefix (space, radius, shadow, text-heading, text-body, weight-heading, weight-body, ...) counts exactly **5**.
8. **No missing alt**
   `grep -rn --include="*.jsx" --include="*.tsx" "<img" src/ | grep -v "alt="` → **0 lines**.
9. **No leftover TODOs without owner**
   `grep -rn "TODO(asset)" src/ public/` → each hit is either resolved or reported to the user in the final summary.
10. **CREDITS.md is complete**
   `for f in public/images/*; do b=$(basename "$f"); [ "$b" = "CREDITS.md" ] || grep -q "$b" public/images/CREDITS.md || echo "MISSING: $b"; done` → **0 lines** (every image has a §7 table row).
11. **No unsanitized HTML injection**
   `grep -rn --include="*.jsx" --include="*.tsx" "dangerouslySetInnerHTML" src/ | grep -vi "sanitize"` → **0 lines**.
12. **No unprotected `_blank` links**
   `grep -rn --include="*.jsx" --include="*.tsx" 'target="_blank"' src/ | grep -v "noopener"` → **0 lines**.
