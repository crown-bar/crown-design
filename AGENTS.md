# AGENTS.md

## What this is

`@crown/design` — a Svelte 5 (runes mode) component library for The Crown Bar (cocktail bar / event catering, Rapperswil, Switzerland). Provides shared UI components for internal web apps (payroll, event planning, etc.). Built on SvelteKit 2 + `@sveltejs/package`. No Tailwind — styling is CSS custom properties only.

Brand: strict black & white with warm neutrals, sharp radii (4px default), hairline borders, generous spacing. Tiempos Fine (serif, display only) + Helvetica Now (system fallback, all UI).

## Stack

- Svelte 5 (runes), SvelteKit 2
- `bits-ui` for complex interactive primitives (Select, Dialog, Tooltip, Menu, Calendar/DateField/TimeField/DatePicker family, etc.)
- `@internationalized/date` (regular dependency, not peer) for date/time components
- `publint` for package export validation
- No test runner / no lint script configured in `package.json` — only `check` (`svelte-kit sync && svelte-check`)

## Package exports

- `.` → components barrel (`src/lib/index.ts`)
- `./styles` → `dist/styles/tokens.css` (tokens only, no resets)
- `./styles/base` → `dist/styles/base.css` (opt-in resets + `.crown-display`, `.crown-eyebrow`, etc.)

## Token structure (`src/lib/styles/`)

- `tokens.css` — `@import` entry point
- `fonts.css` — Tiempos Fine `@font-face` (12 weights)
- `colors.css` — color tokens + dark mode (`[data-theme="dark"]`)
- `typography.css` — type scale, weights, line heights, letter spacing
- `spacing.css` — spacing, radii, shadows, motion, z-index
- `base.css` — opt-in resets + display/eyebrow utility classes

Always use existing Crown token names (`--action-primary`, `--surface-card`, `--text-primary`, `--border-default`, `--radius-sm`, `--duration-fast`, etc.) — never invent new ones.

## Component conventions

- Each component lives in `src/lib/components/<Name>/` with `<Name>.svelte` + `index.ts`. Namespaced components (Select, Dialog, Tooltip, Menu, Tabs, Accordion, SplitPanel, RadioGroup) export `* as Name` instead of a single default.
- Prop API: semantic variants (`variant="primary"`, `size="sm"`) plus individual token-override props (`color`, `radius`, etc.) applied via Svelte's `style:--var` syntax (e.g. sets `--btn-accent`, `--btn-radius`).
- Bits UI re-exports the same underlying `.svelte` files across related namespaces (e.g. `DatePicker.Header` is literally `Calendar.Header`) — build shared chrome (nav buttons, headers) once and reuse via relative import rather than duplicating.
- Date/time components default to Swiss locale (`locale="de-CH"`, `weekStartsOn={1}`, `hourCycle={24}`), overridable via props.
- Date/time and other overlay-backed inputs default to **click-anywhere-opens-overlay**: clicking any part of the field opens the picker, not just a small trigger icon. Typing into segments still works as a secondary path. Watch for: focus traps stealing focus from editable text (`trapFocus={false}` on `Popover.Content`), and double-toggle bugs if both a wrapper `onclick` and a dedicated trigger button call open/toggle logic.
- `TimePicker` is hand-built (not a Bits UI wrapper) — text input + custom Popover dropdown on desktop, native `<input type="time">` on coarse-pointer/touch devices (checked client-side via `matchMedia('(pointer: coarse)')` in `onMount`). Freeform typed input (e.g. "1900", "730pm") parses on blur/Enter.
- Only reuse an identical CSS class name across components while the rules stay byte-for-byte identical. The moment one needs to diverge, give it its own class name (see `DateField`/`TimeField` history — they used to share `.date-field` with `DatePicker`/`DateRangePicker` until sizing rules diverged).
- Boolean `data-*` attributes: always write `data-foo={cond ? true : undefined}`, never `data-foo={cond}` — Svelte does not omit falsy custom `data-*` attributes, so `data-foo="false"` still matches the CSS `[data-foo]` selector.

## Current component list

Primitives: Button, Badge, Avatar, Separator
Form: Label, Input, Textarea, Checkbox, Switch, Slider, RadioGroup, Select
Feedback: Alert, Toast, Spinner, Progress
Overlay: Dialog, Tooltip, Menu
Navigation: Tabs
Layout: Card, Accordion, SplitPanel
Date/Time: Calendar, DateField, TimeField, DatePicker, DateRangePicker, TimePicker, DateTimePicker, DateTimeRangePicker

This list drifts — verify against `src/lib/index.ts` and `src/lib/components/` before trusting it. `components.md` in the repo root tracks a checklist but is not kept fully in sync (e.g. it still lists Popover/Sheet/Dropdown Menu/Skeleton as unbuilt or missing entirely — check the actual source, not just that file).

## Demo / preview routes

- `src/routes/+page.svelte` — kitchen-sink demo of components
- `src/routes/colors/+page.svelte` — color token preview

These are dev-only preview pages, not part of the published package.

## Working in this repo

- This directory is **not** a git repository — there is no `.git` here. Don't assume git commands work.
- No test suite exists. **Do not test changes in a browser, with Playwright, or any similar browser-automation/visual-testing tool.** The user reviews and tests UI changes themselves.
- To verify a change, it is enough to confirm the project compiles/type-checks cleanly: `npm run check` (runs `svelte-kit sync && svelte-check`). That's the bar for "done" from an agent's side — the user will check the actual behavior and visuals.
