# @crown/design

A Svelte 5 component library for The Crown Bar (cocktail bar & event catering, Rapperswil, Switzerland) — the shared UI layer behind Crown's internal web apps (payroll, event planning, shop, etc.).

No Tailwind. Styling is CSS custom properties only, built on a strict black & white brand with warm neutrals, sharp 4px radii, hairline borders, and generous spacing. Tiempos Fine (serif) is used for display text, Helvetica Now (system fallback) for everything else. Dark mode is supported via `[data-theme="dark"]`.

## Stack

- [Svelte 5](https://svelte.dev) (runes mode) + [SvelteKit 2](https://svelte.dev/docs/kit)
- [Bits UI](https://www.bits-ui.com) for complex interactive primitives (Select, Dialog, Menu, Calendar/DateField/TimeField family, etc.)
- [`@internationalized/date`](https://github.com/adobe/react-spectrum/tree/main/packages/%40internationalized/date) for date/time handling
- [`@sveltejs/package`](https://svelte.dev/docs/kit/packaging) for building the publishable package, [`publint`](https://publint.dev) for validating it

## Installation

```sh
npm install @crown/design
```

`svelte ^5.0.0` is a peer dependency.

## Usage

```svelte
<script>
  import { Button, Select } from '@crown/design';
</script>

<Button variant="primary" size="sm">Save</Button>
```

Import the design tokens once, plus the optional reset/utility layer if you want it:

```ts
import '@crown/design/styles'; // tokens only — colors, type, spacing, radii, shadows, motion
import '@crown/design/styles/base'; // opt-in resets + .crown-display / .crown-eyebrow utilities
```

Most components also expose individual token-override props (e.g. `color`, `radius` on `Button`) on top of semantic variants like `variant="primary"` / `size="sm"`.

## Components

**Primitives** — Button, Badge, Avatar, Separator
**Form** — Label, Input, Textarea, Checkbox, Switch, Slider, RadioGroup, Select
**Feedback** — Alert, Toast, Spinner, Progress, Skeleton
**Overlay** — Dialog, Sheet, Popover, Tooltip, Menu
**Navigation** — Tabs
**Layout** — Card, Accordion, SplitPanel
**Date & Time** — Calendar, DateField, TimeField, DatePicker, DateRangePicker, TimePicker, DateTimePicker, DateTimeRangePicker

Compound components (RadioGroup, Select, Dialog, Sheet, Popover, Tooltip, Menu, Tabs, Accordion, SplitPanel) export a namespace (`import { Dialog } from '@crown/design'`, then `<Dialog.Root>`, `<Dialog.Trigger>`, ...) rather than a single default component.

Date/time fields and pickers default to Swiss locale (`de-CH`, Monday-first weeks, 24h time) and open their overlay when clicking anywhere on the field, not just a trigger icon.

## Design tokens

Token source lives in `src/lib/styles/`:

| File | Contents |
| --- | --- |
| `tokens.css` | `@import` entry point that pulls in the rest |
| `fonts.css` | Tiempos Fine `@font-face` declarations (12 weights) |
| `colors.css` | color tokens + dark mode overrides |
| `typography.css` | type scale, weights, line heights, letter spacing |
| `spacing.css` | spacing, radii, shadows, motion, z-index |
| `base.css` | opt-in resets + `.crown-display`, `.crown-eyebrow`, etc. |

Components only ever reference existing tokens (`--action-primary`, `--surface-card`, `--text-primary`, `--border-default`, `--radius-sm`, `--duration-fast`, ...) — no component introduces its own one-off values.

## Development

```sh
npm run dev          # start the dev/demo server
npm run build         # build the demo app
npm run preview       # preview the demo build
npm run package       # build the publishable package into dist/ and validate it with publint
npm run check         # svelte-kit sync + svelte-check
npm run check:watch   # same, in watch mode
```

Two dev-only preview routes (not part of the published package) live in `src/routes/`:

- `/` — kitchen-sink demo of every component
- `/colors` — color token preview

## Project structure

```
src/lib/
  components/<Name>/<Name>.svelte + index.ts   # one folder per component
  styles/                                       # design tokens (see above)
  assets/fonts/                                 # Tiempos Fine font files
  index.ts                                      # public component barrel
src/routes/                                      # dev-only demo pages
```

See `AGENTS.md` for component conventions, prop API patterns, and known gotchas when adding new components.
