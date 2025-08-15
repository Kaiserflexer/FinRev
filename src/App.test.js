import { render, screen } from '@testing-library/react';

jest.mock('./db', () => ({
  __esModule: true,
  openDB: () => Promise.resolve(),
  addIncomeEntry: () => Promise.resolve(),
  addExpenseEntry: () => Promise.resolve(),
  getIncomeEntries: () => Promise.resolve([]),
  getExpenseEntries: () => Promise.resolve([]),
  deleteIncomeEntry: () => Promise.resolve(),
  deleteExpenseEntry: () => Promise.resolve(),
}));

import App from './App';

test('renders entry form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Ввод данных/i);
  expect(titleElement).toBeInTheDocument();
});
