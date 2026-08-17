import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Test from './test';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test('renders test page and handles answering', () => {
  render(
    <BrowserRouter>
      <Test />
    </BrowserRouter>
  );
  
  // Wait for questions to render, pick the first option
  const answerBtn = screen.getAllByRole('button')[0];
  expect(answerBtn).toBeInTheDocument();
  
  fireEvent.click(answerBtn);
  // It should advance progress, but we don't mock the whole test length.
  // Just ensuring it doesn't crash is a good start for a basic test.
});
