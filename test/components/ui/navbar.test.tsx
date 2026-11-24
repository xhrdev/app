import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { render, screen } from '@testing-library/react';

import { Navbar } from '#src/components/ui/navbar.js';

describe('Navbar Component', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('xhr.dev');
    assert.ok(logo);
    assert.strictEqual(logo.getAttribute('src'), '/assets/logo.svg');
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    assert.ok(screen.getByText('what it does'));
    assert.ok(screen.getByText('maintenance'));
    assert.ok(screen.getByText('self-hosted'));
    assert.ok(screen.getByText('faq'));
    assert.ok(screen.getByText('docs'));
  });

  it('renders the book-a-call call to action', () => {
    render(<Navbar />);
    const cta = screen.getByText(/book a call/i);
    assert.ok(cta);
    assert.ok(
      cta.closest('a')?.getAttribute('href')?.includes('calendar.google.com')
    );
  });

  it('has correct link destinations', () => {
    render(<Navbar />);
    assert.strictEqual(
      screen.getByText('docs').closest('a')?.getAttribute('href'),
      'https://docs.xhr.dev/'
    );
    assert.strictEqual(
      screen.getByText('faq').closest('a')?.getAttribute('href'),
      '#faq'
    );
  });

  it('opens external links safely', () => {
    render(<Navbar />);
    const external = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');

    assert.ok(external.length > 0);
    external.forEach((link) => {
      assert.strictEqual(link.getAttribute('rel'), 'noopener noreferrer');
    });
  });

  it('has accessible navigation', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      assert.ok(link.getAttribute('href'));
    });
  });
});
