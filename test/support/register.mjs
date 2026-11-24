/**
 * Test bootstrap, wired in via `node --import`.
 *
 * Installs the TypeScript/JSX module hooks and the DOM globals before any test
 * file is loaded. See ./loader.mjs and ./dom.mjs.
 */
// registerHooks is still flagged experimental, but it is the non-deprecated
// replacement for module.register() (DEP0205) and this is test-only code
// running on the Node 26 pinned in "engines".
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { registerHooks } from 'node:module';

import { load, resolve } from './loader.mjs';

registerHooks({ load, resolve });

await import('./dom.mjs');
