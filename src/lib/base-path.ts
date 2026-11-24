// pr previews are served from a subpath (/pr-preview/pr-N) of the pages site.
// next prefixes its own links and bundles with `basePath`, but not raw
// `<img src>` / `<a href>` strings, so those go through here. empty in
// production and in tests.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBase = (path: string) => `${BASE_PATH}${path}`;
