# design-sync notes — xhrdev UI

## Re-sync 2026-08-09: cssEntry staleness caught and fixed as designed

PR #493 ("refresh homepage visual design") changed `globals.css` (new blue accent
palette replacing the old red one) and `navbar.tsx`, landing after the last synced
commit (`9a006c3`). Followed the procedure this file already documented: `npm run
build`, found the fresh chunk (`find .next/static/chunks -maxdepth 1 -name '*.css'`),
copied it + its 15 referenced `.woff2`s into `.design-sync/compiled/`, then ran
`resync.mjs`. Confirmed via the `Navbar` spot-check screenshot that the new blue
`book a call` button rendered correctly. **This is the exact failure mode this file
warns about — worth re-reading that warning before every re-sync, it isn't
hypothetical.**

Also fixed a new `[GRID_OVERFLOW]` warn on `Navbar` (fixed/portal nav doesn't fit any
grid cell) by adding `cfg.overrides.Navbar: {"cardMode": "single", "primaryStory":
"Default"}` — now in config.json, clean on re-validate.

## Repo shape

`@xhrdev/app` is a Next.js app, not a published component-library package — no `main`/`module`/`exports`, no `dist/` build. This sync runs in **synth-entry mode**: `cfg.entry` is deliberately set to a path that does **not** exist on disk (`./src/components/ui/index.ts`) purely so `package-build.mjs` walks up from its `dirname()` to find the repo's real `package.json` (see the "In the DS's own source repo" comment in `package-build.mjs`). Don't "fix" this by creating that file — it flips the converter out of synth mode and it can no longer find any components (confirmed: `resolveDistEntry` then finds the real file and tries to parse `.d.ts` siblings that don't exist → `[ZERO_MATCH]`).

`cfg.srcDir` is `src/components/ui` — all 4 components there are synced today: `BookCallButton`, `Button`, `Footer`, `Navbar`.

## Navbar was excluded, now isn't (resolved 2026-08-08)

**History**: `Navbar` used to import `@skilbjo/logger` (for a `handleLogout` error log), which transitively imported `pino` — a Node-only package that touches `process` at module top level and crashes when bundled for a browser. That took down the *entire* bundle, not just Navbar, since all components ship in one IIFE.

**Fixed two layers of this**:
1. `@skilbjo/logger` 1.0.52 made its package-level loggers construct lazily instead of eagerly at module scope (real fix, upstream, independent of design-sync).
2. The homepage got a v3 redesign (2026-08-08) that dropped all auth UI from `Navbar` entirely — it no longer imports Supabase or the logger at all.

**A second, unrelated instance of the same bug class then appeared**: `Navbar`'s logo link used `next/link`, and `next/link` itself references `process.env.__NEXT_*` flags at module scope (Next's own webpack pipeline normally inlines these via `DefinePlugin`; esbuild doesn't). Fixed by swapping the logo link to a plain `<a href="/">` — trivial for a single homepage-logo anchor, and actually more faithful to the original design file anyway (which used a plain `<a href="#">`).

**Lesson for future components**: any `next/*` import (or any other package that assumes a bundler-provided `process` shim) will hit this same wall. Don't add one to a component meant for this sync without checking `package-validate.mjs`'s render check first.

**The forked `source-kit.mjs` from the exclusion era has been deleted** (removed `.design-sync/overrides/source-kit.mjs`, the `componentSrcMap: {"Navbar": null}` config entry, and the `libOverrides` entry) — no longer needed now that nothing needs excluding. If a future component genuinely needs excluding again, re-read the git history for `.design-sync/overrides/source-kit.mjs` (removed in the commit that resolved this) before re-implementing the fork from scratch.

## `cssEntry` is a compiled Tailwind snapshot, not `globals.css`

`globals.css` does `@import "tailwindcss";` — a bundler-resolved package specifier that Tailwind's `@tailwindcss/postcss` plugin expands at Next.js build time. The design-sync converter can't resolve that (`[CSS_IMPORT_MISSING]`); it needs a real, already-compiled stylesheet.

Fix: run `npm run build` (production, not `next dev`), then copy the actual compiled CSS chunk Next emitted (`.next/static/chunks/<hash>.css`) into `.design-sync/compiled/chunks/tailwind-compiled.css`, along with every `@font-face`-referenced `.woff2` into `.design-sync/compiled/media/` — **mirroring the exact `chunks/` + `../media/` relative-path structure Next used**, so the CSS's relative `url(../media/...)` references still resolve. `cfg.cssEntry` points at that file.

**This is a manual step with no automation — and it silently goes stale.** As of 2026-08-08 this bit for real: the homepage got a full v3 redesign (new palette — blue `--accent` instead of red, new `.card`/`.btn`/`.wrap` classes, all-new token names) and the sync was almost re-run against the **old, pre-redesign** compiled CSS snapshot, which would have shipped every component styled with the wrong (removed) tokens. **Whenever `globals.css` changes, re-run `npm run build` and re-copy the fresh chunk + fonts before re-running the sync** — the hash in the chunk filename changes every build, so find it fresh each time (`find .next/static/chunks -maxdepth 1 -name '*.css'`, or check `ls -t` if more than one is old-timestamped).

## Known gap: `Footer`'s logo image won't survive upload

`Footer` (and now `Navbar` too) render `<img src="/assets/logo.png" ...>` — an absolute path that resolves fine inside the real Next.js app (served from `public/assets/`), but the upload plan's `writes` glob list (`components/**`, `tokens/**`, `fonts/**`, `_vendor/**`, `_preview/**`, `guidelines/**`, plus the bundle/CSS/README/anchor files) has **no `assets/**` entry** — unlike fonts, this converter has no mechanism to detect and copy image assets referenced via a plain absolute `<img src>` (only `@font-face` `url()`s get this treatment). So in `claude.ai/design`, both components will render with a broken logo image. Confirmed this is NOT caught by any validate check — the render check only inspects for JS errors / empty roots, not missing images.

Real fixes, not attempted here (out of scope without user sign-off):
- Change `Navbar`/`Footer` to import the logo via a bundler-resolvable path (e.g. `import logo from '../../../public/assets/logo.png'`) instead of a hardcoded absolute `public/`-served path — this would make esbuild inline/emit it like any other asset and it'd actually ship.
- Or extend the design-sync converter itself with a generic asset-copy config knob (would need an upstream feature — `lib/emit.mjs` is off-limits to fork per the base skill).

**Action required** if the logo rendering correctly in claude.ai/design matters — it currently won't, for either component that uses it.

## Preview scope

All 4 synced components (`BookCallButton`, `Button`, `Footer`, `Navbar`) are authored (`.design-sync/previews/*.tsx`) and graded `good`. No floor cards. `Navbar`'s nav-link row is hidden at narrow preview-card widths by the real `.hide-s` responsive rule (same behavior as an actual mobile viewport) — that's correct, not a bug.

## Re-sync risks (forward-looking)

- **`cfg.cssEntry` snapshot staleness** — see above, highest-risk item. Nothing catches this automatically if `globals.css` changes; re-copy the compiled CSS/fonts *before* every re-sync, not after.
- **Logo asset gap** — see above; not caught by any validate check today (validate only checks font `url()`s, not generic `<img>` refs). Now affects both `Footer` and `Navbar`.
- **New `next/*` imports in synced components** — see the Navbar history above; any framework import assuming a bundler-provided `process` shim will break the whole bundle. Check the render check after adding any new import to a synced component.
- **`.design-sync/compiled/`** is a committed, hand-maintained artifact (not gitignored — it's a durable input, not build output) despite living next to genuinely generated files. Don't delete it as "generated cruft" — but do treat its contents as perishable and regenerate on every `globals.css` change.
