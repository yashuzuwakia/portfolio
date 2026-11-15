import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('lib/smoothScroll', () => ({
  initSmoothScroll: () => () => {},
  lockScroll: () => {},
}));

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the portfolio hero and sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/yashwant choudhary/i);
  expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /movie & tv search/i })).toBeInTheDocument();
});
