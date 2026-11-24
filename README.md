# app

[![pages](https://github.com/xhrdev/app/actions/workflows/pages.yml/badge.svg)](https://github.com/xhrdev/app/actions/workflows/pages.yml)

the marketing site for <https://xhr.dev>. a fully static site (`next build` with
`output: 'export'`), deployed to GitHub Pages; there is no server, auth, database, or payment flow.

## quickstart

install the dependencies (`npm i`) and run the development server:

```bash
npm run dev
```

Open <http://localhost:3000> with your browser.

no `.env` is required. `cp env.example .env` if you want to pin `NODE_ENV`.

## tests

```bash
npm test          # unit (node:test + @testing-library/react)
npm run cypress   # e2e (starts a dev server, tears it down after)
```

`node --test` cannot run the suite on its own: it has no JSX transform, no DOM,
and no knowledge of the `@/*` alias. `test/support/` fills those gaps and is
loaded via `--import`:

- `loader.mjs` — module hooks. Resolves `@/*`, `#src/*`, `#test/*` and the
  omitted/`.js`-spelled extensions, then runs `.ts`/`.tsx` through esbuild.
  The extension probing cannot live in package.json `imports` because Node
  commits to the first entry of a fallback array instead of falling through
  when the file is missing, so one wildcard cannot serve both `.ts` and `.tsx`.
- `dom.mjs` — jsdom globals, plus the global `afterEach` that
  `@testing-library/react` needs in order to register its own cleanup.

## deploy

the site is a static export (`npm run build` writes it to `out/`). there is no
server code. it is served from two places (the site on github pages, a redirect domain on aws):

| hostname | served by | what it does |
| --- | --- | --- |
| `xhr.dev` | github pages | the site. `public/CNAME` sets the custom domain; https is enforced. |
| `www.xhr.dev` | github pages | github 301s it to `xhr.dev`. |
| `xhrdev.com`, `www.xhrdev.com` | cloudfront (aws) | a cloudfront function 301s everything (path and query kept) to `https://xhr.dev`. |

github pages can serve only one custom domain, which is why the second registered
domain is a redirect on aws. it is defined in `org-formation`, not in this repo.

### how a push deploys

every push to `master` runs `.github/workflows/pages.yml`:

1. `build`: `npm ci`, lint, test, `npm run build`, then upload `out/` as the
   `site` artifact. everything below depends on this passing.
2. `deploy`: commits `out/` to the `gh-pages` branch, which is the pages
   source. `pr-preview/` is excluded from the clean so previews survive.

the workflow needs no secrets. pushes that only touch `*.md` are skipped. PRs run
`.github/workflows/pr.yml` (shared build/test workflow) and
`.github/workflows/preview.yml`; neither touches production.

### pr previews

every same-repo pr gets `https://xhr.dev/pr-preview/pr-<n>/` (the url is
commented on the pr) and the folder is deleted when the pr closes.
`preview.yml` builds with `NEXT_PUBLIC_BASE_PATH=/pr-preview/pr-<n>`, which
`next.config.ts` turns into `basePath` and `src/lib/base-path.ts` applies to
the few raw `<img>`/`<a>` urls. previews set `robots: noindex`.

- the pages source must be **deploy from a branch: `gh-pages` / `(root)`**
  (settings > pages); pages allows one source, and `deploy-pages` cannot host
  previews alongside production.
- previews are public (the repo is public too), readable by anyone with the url.
  do not open a pr containing anything unannounced.
- fork and dependabot prs get no preview (read-only token).

### dns

lives in `org-formation` at `spec/600-dns/xhrdev.yml` and deploys through its
codepipeline (about 2 minutes after a push to master):

- `xhr.dev`: github pages' four A and four AAAA addresses.
- `www.xhr.dev`: CNAME to `xhrdev.github.io`.
- `xhrdev.com`, `www.xhrdev.com`: alias / CNAME to the cloudfront redirect distribution.

### things that behave differently on pages

- no response headers or redirects can be configured, so there is no CORS
  header and no middleware.
- extensionless files are served as downloads, so `/showhn.txt` and the
  open graph image (`/assets/og.png`) carry extensions.

## archived saas code

the cloud version of the product (supabase auth, stripe webhook, analytics
dashboard, email, the `/api/html` sandbox) is preserved at the `saas-v1` tag.
`git show saas-v1:package.json` and `git show saas-v1:env.example` list what
each piece needs.
