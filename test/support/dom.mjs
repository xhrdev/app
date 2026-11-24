/**
 * Minimal browser environment for @testing-library/react.
 *
 * `node --test` has no DOM, so render() has nothing to mount into. jsdom
 * supplies one; everything it exposes that Node lacks is copied onto
 * globalThis so component code sees the usual browser globals.
 */
import { afterEach } from 'node:test';

import { JSDOM } from 'jsdom';

// @testing-library/react registers its own `afterEach(cleanup)` at import time,
// but only if a global `afterEach` exists — which it does under jest/mocha and
// does not under node:test. Exposing node:test's hook here is what stops
// renders from piling up in the same document across cases.
globalThis.afterEach = afterEach;

// NOTE: `pretendToBeVisual` is deliberately off. It starts a persistent
// requestAnimationFrame loop that keeps the event loop alive, so the test
// process would never exit. The rAF shim below is enough for React.
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:3000/',
});

const { window } = dom;

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}

// Tell React we are in an act()-aware test environment; without this React 19
// warns on every state update produced by a render.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const define = (key, value) =>
  Object.defineProperty(globalThis, key, {
    configurable: true,
    value,
    writable: true,
  });

// The core three go on first and stay configurable. Node already defines
// `navigator`, and jsdom's own descriptors are accessor-based and
// non-configurable, so plain assignment or a copied descriptor would wedge
// them against later redefinition.
define('window', window);
define('document', window.document);
define('navigator', window.navigator);

// Fill in whatever else the DOM exposes that Node does not (Element, Node,
// getComputedStyle, requestAnimationFrame, ...), leaving Node's own globals
// alone.
for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue;
  const descriptor = Object.getOwnPropertyDescriptor(window, key);
  if (!descriptor) continue;
  Object.defineProperty(globalThis, key, { ...descriptor, configurable: true });
}
