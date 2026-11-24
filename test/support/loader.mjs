/**
 * Module hooks that let `node --test` run the TypeScript/JSX test suite.
 *
 * Node can strip types from .ts on its own, but it cannot transform JSX, and
 * it knows nothing about the `@/*` path alias that the app source uses. These
 * hooks cover both gaps:
 *
 *   - resolve: maps `@/*`, `#src/*` and `#test/*` onto real files on disk, and
 *     probes the `.ts` / `.tsx` extensions that the specifiers omit (or spell
 *     as `.js`, per the ESM-in-TypeScript convention).
 *   - load: hands .ts/.tsx to esbuild for type stripping + JSX transform.
 *
 * A package.json "imports" map cannot do the resolve half by itself: Node
 * commits to the first entry of a fallback array rather than falling through
 * when the file is missing, so a single wildcard cannot cover both .ts and
 * .tsx. That is why the probing lives here.
 *
 * The hooks are synchronous because they are installed with
 * `module.registerHooks()`; the older async `module.register()` is deprecated
 * as of Node 26.
 */
// Resolving computed paths is the entire job of a module loader; the inputs
// are import specifiers from this repo's own test and source files.
/* eslint-disable security/detect-non-literal-fs-filename */
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { transformSync } from 'esbuild';

const root = fileURLToPath(new URL('../../', import.meta.url));

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

const isFile = (p) => existsSync(p) && statSync(p).isFile();

/** Resolve a bare on-disk path to a real file, probing extensions. */
const probe = (base) => {
  if (isFile(base)) return base;

  // `foo.js` in TypeScript-authored ESM usually means `foo.ts` / `foo.tsx`
  const stripped = base.replace(/\.(js|jsx)$/, '');
  for (const ext of EXTENSIONS) {
    if (isFile(stripped + ext)) return stripped + ext;
  }

  for (const ext of EXTENSIONS) {
    if (isFile(base + ext)) return base + ext;
  }

  for (const ext of EXTENSIONS) {
    const index = path.join(base, `index${ext}`);
    if (isFile(index)) return index;
  }

  return null;
};

/** Map an aliased specifier onto an absolute path, or null if not aliased. */
const fromAlias = (specifier) => {
  if (specifier.startsWith('@/')) {
    return path.join(root, 'src', specifier.slice('@/'.length));
  }
  if (specifier.startsWith('#src/')) {
    return path.join(root, 'src', specifier.slice('#src/'.length));
  }
  if (specifier.startsWith('#test/')) {
    return path.join(root, 'test', specifier.slice('#test/'.length));
  }
  return null;
};

export function load(url, context, next) {
  if (url.startsWith('file://') && /\.(ts|tsx)$/.test(url)) {
    const filename = fileURLToPath(url);
    const { code } = transformSync(readFileSync(filename, 'utf8'), {
      format: 'esm',
      jsx: 'automatic',
      loader: url.endsWith('.tsx') ? 'tsx' : 'ts',
      sourcefile: filename,
      sourcemap: 'inline',
      target: 'node24',
    });
    return { format: 'module', shortCircuit: true, source: code };
  }

  return next(url, context);
}

export function resolve(specifier, context, next) {
  // Stylesheets are not JavaScript; stub them out so importing a component
  // that pulls in globals.css does not explode.
  if (specifier.endsWith('.css')) {
    return {
      shortCircuit: true,
      url: 'data:text/javascript,export default {}',
    };
  }

  const aliased = fromAlias(specifier);
  if (aliased) {
    const resolved = probe(aliased);
    if (resolved) {
      return { shortCircuit: true, url: pathToFileURL(resolved).href };
    }
  }

  // Relative imports from TypeScript sources routinely omit the extension.
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const parent = context.parentURL;
    if (parent?.startsWith('file://')) {
      const candidate = path.resolve(
        path.dirname(fileURLToPath(parent)),
        specifier
      );
      const resolved = probe(candidate);
      if (resolved) {
        return { shortCircuit: true, url: pathToFileURL(resolved).href };
      }
    }
  }

  // Bare subpath imports like `next/server`. Packages that ship an "exports"
  // map resolve these fine, but `next` has none -- it relies on the real file
  // at node_modules/next/server.js and on a bundler to add the extension. Node
  // will not, so probe for it before giving up.
  if (!specifier.startsWith('.') && !specifier.startsWith('#')) {
    try {
      return next(specifier, context);
    } catch (err) {
      const resolved = probe(path.join(root, 'node_modules', specifier));
      if (resolved) {
        return { shortCircuit: true, url: pathToFileURL(resolved).href };
      }
      throw err;
    }
  }

  return next(specifier, context);
}
