import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { render, screen } from '@testing-library/react';

const { default: Home } = await import('#src/app/page.js');

describe('Home Page', () => {
  it('renders the main heading', async () => {
    render(await Home());
    assert.ok(screen.getByRole('heading', { level: 1 }));
  });

  it('renders the hero section', async () => {
    render(await Home());
    assert.ok(screen.getByRole('main'));
  });

  it('renders call-to-action buttons', async () => {
    render(await Home());
    assert.ok(screen.getAllByText(/book a call/i).length > 0);
  });

  it('renders feature sections', async () => {
    render(await Home());
    // query by heading rather than text: the nav repeats several of these
    // labels as jump links, so a bare getByText would match more than one.
    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent ?? '');

    assert.ok(headings.some((text) => /what it does/i.test(text)));
    assert.ok(
      headings.some((text) => /see it running in your stack/i.test(text))
    );
    assert.ok(headings.some((text) => /questions/i.test(text)));
  });

  it('renders valid navigation links', async () => {
    render(await Home());
    const links = screen.getAllByRole('link');
    assert.ok(links.length > 0);
    links.forEach((link) => {
      assert.ok(link.getAttribute('href'));
    });
  });
});
