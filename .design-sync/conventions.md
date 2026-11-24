## xhrdev UI — conventions

This is a small, curated slice of `@xhrdev/app`'s real UI components (`src/components/ui/`) — not a standalone design-system package. Only components that are safe to bundle for a browser (no Node-only dependencies) are synced.

### Setup

No provider or root wrapper is required — none of these components read from React context. Just render them; all styling resolves from CSS custom properties and Tailwind utility classes already loaded by the bundle's `styles.css`.

### Styling idiom — two systems, both real

This DS mixes **Tailwind utility classes** (for one-off components like `Button`) and **CSS custom-property tokens** consumed via inline `style={{ ... }}` (for layout/brand components like `Navbar` and `Footer`). Match whichever the component you're extending already uses — don't invent a third pattern.

**Tailwind utility classes** (`Button`): ordinary Tailwind v4 classes — `px-4 py-2 rounded transition-colors bg-black text-white hover:bg-gray-900`, etc. Compose new elements the same way.

**CSS custom-property tokens** (`Navbar`, `Footer`, and most of the app's page-level layout): real token names shipped in `_ds_bundle.css` / `styles.css`, used as `var(--token-name)`:

| Token | Use |
|---|---|
| `--fg` | primary text |
| `--mute` / `--faint` | secondary / tertiary text |
| `--bg` / `--bg-2` / `--card` | page background / alt background / card surface |
| `--line` / `--line-2` | hairline borders |
| `--accent` | brand blue accent |
| `--good` | success/positive semantic color |
| `--term` / `--term-fg` / `--term-line` | the dark terminal-card palette (background / text / hairline) |
| `--sans` / `--mono` | font stacks (DM Sans / JetBrains Mono, aliases of `--font-dm-sans` / `--font-jetbrains-mono`) |

Utility classes worth knowing (defined in the shipped CSS, not Tailwind): `.wrap` (page-width container), `.card` (bordered surface), `.btn` / `.btn-a` (primary/accent) / `.btn-b` (secondary outline), `.lk` (muted hover-link), `.mono` (monospace text), `.wash` (decorative radial-gradient background wash).

Example, straight from `Footer`:

```tsx
<span className="mono" style={{ color: 'var(--faint)', fontSize: 11 }}>
  © 2026 xhr.dev software inc.
</span>
```

### Where the truth lives

Read `_ds/xhrdev-ui/styles.css` (and its `@import`s) before styling anything — it's the real compiled Tailwind output plus every token above. Each component's `.prompt.md` carries its own prop docs.

### Example

```tsx
import { Button } from '@xhrdev/app';

<div style={{ display: 'flex', gap: 12 }}>
  <Button variant="primary" size="lg">Book a call</Button>
  <Button variant="secondary">Back to home</Button>
</div>
```
