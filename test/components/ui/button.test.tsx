import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '#src/components/ui/button.js';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    assert.ok(screen.getByText('Click me'));
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    assert.ok(button.classList.contains('px-4'));
    assert.ok(button.classList.contains('py-2'));
    assert.ok(button.classList.contains('rounded'));
    assert.ok(button.classList.contains('transition-colors'));
    assert.ok(button.classList.contains('bg-black'));
    assert.ok(button.classList.contains('text-white'));
    assert.ok(button.classList.contains('text-md'));
  });

  it('applies primary variant classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    assert.ok(button.classList.contains('bg-blue-500'));
    assert.ok(button.classList.contains('text-white'));
    assert.ok(button.classList.contains('hover:bg-blue-600'));
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    assert.ok(button.classList.contains('bg-gray-500'));
    assert.ok(button.classList.contains('text-white'));
    assert.ok(button.classList.contains('hover:bg-gray-600'));
  });

  it('applies different size classes', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    assert.ok(screen.getByRole('button').classList.contains('text-sm'));

    rerender(<Button size="lg">Large Button</Button>);
    assert.ok(screen.getByRole('button').classList.contains('text-lg'));
  });

  it('handles click events', () => {
    const handleClick = mock.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    fireEvent.click(screen.getByText('Clickable Button'));
    assert.strictEqual(handleClick.mock.calls.length, 1);
  });

  it('applies additional className prop', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    assert.ok(screen.getByRole('button').classList.contains('custom-class'));
  });

  it('merges default classes with custom classes', () => {
    render(
      <Button className="custom-class" size="sm" variant="primary">
        Mixed Classes Button
      </Button>
    );
    const button = screen.getByRole('button');
    assert.ok(button.classList.contains('custom-class'));
    assert.ok(button.classList.contains('bg-blue-500'));
    assert.ok(button.classList.contains('text-sm'));
  });
});
