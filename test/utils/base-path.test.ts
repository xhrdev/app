import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const { BASE_PATH, withBase } = await import('#src/lib/base-path.js');

describe('withBase', () => {
  it('is a no-op outside of a preview build', () => {
    assert.strictEqual(BASE_PATH, '');
    assert.strictEqual(withBase('/assets/logo.svg'), '/assets/logo.svg');
  });
});
