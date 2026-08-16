import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const buttonEl = screen.getByText(/Click me/i);
  expect(buttonEl).toBeInTheDocument();
});
