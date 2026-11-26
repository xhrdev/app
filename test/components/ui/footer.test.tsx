import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { render, screen } from '@testing-library/react';

import { Footer } from '#src/components/ui/footer.js';

describe('Footer Component', () => {
  it('renders the logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('xhr.dev');
    assert.strictEqual(logo.getAttribute('src'), '/assets/logo.svg');
  });

  it('renders copyright information', () => {
    render(<Footer />);
    assert.ok(screen.getByText(/2026 xhr\.dev software inc\./i));
  });

  it('renders the footer links', () => {
    render(<Footer />);
    assert.strictEqual(
      screen.getByText('docs').closest('a')?.getAttribute('href'),
      'https://docs.xhrdev.com/'
    );
    assert.strictEqual(
      screen.getByText('status').closest('a')?.getAttribute('href'),
      'https://status.xhr.dev/'
    );
    assert.strictEqual(
      screen.getByText('linkedin').closest('a')?.getAttribute('href'),
      'https://www.linkedin.com/company/xhrdev/'
    );
    assert.strictEqual(
      screen.getByText('hello@xhr.dev').closest('a')?.getAttribute('href'),
      'mailto:hello@xhr.dev'
    );
  });

  it('opens external links safely but not the mailto', () => {
    render(<Footer />);

    assert.strictEqual(
      screen.getByText('docs').closest('a')?.getAttribute('rel'),
      'noopener noreferrer'
    );
    assert.strictEqual(
      screen.getByText('hello@xhr.dev').closest('a')?.getAttribute('target'),
      null
    );
  });
});
