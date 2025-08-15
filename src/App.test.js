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

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { message } from 'antd';
import App from './App';
import * as db from './db';

test('renders input form title', () => {
  render(<App />);
  const title = screen.getByText(/Ввод данных/i);
  expect(title).toBeInTheDocument();

test('renders entry form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Ввод данных/i);
  expect(titleElement).toBeInTheDocument();

jest.mock('./EntryForm', () => ({ onSubmit }) => (
  <button onClick={() => onSubmit({ category: 'Test', amount: 100 }, 'income')}>
    submit
  </button>
));

jest.mock('./EntryList', () => ({ entries = [], onDelete }) => (
  entries.length ? <button onClick={() => onDelete(entries[0])}>delete</button> : null
));

jest.mock('./db');

describe('App server failure handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.openDB.mockResolvedValue(undefined);
    db.getIncomeEntries.mockResolvedValue([]);
    db.getExpenseEntries.mockResolvedValue([]);
  });

  test('shows error notification when submit fails', async () => {
    db.addIncomeEntry.mockRejectedValueOnce(new Error('Submit failed'));
    const spy = jest.spyOn(message, 'error').mockImplementation(() => {});

    render(<App />);
    fireEvent.click(screen.getByText('submit'));

    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Submit failed'))
    );
  });

  test('shows error notification when delete fails', async () => {
    db.getIncomeEntries.mockResolvedValueOnce([{ id: 1, category: 'Test', amount: 100 }]);
    db.deleteIncomeEntry.mockRejectedValueOnce(new Error('Delete failed'));
    const spy = jest.spyOn(message, 'error').mockImplementation(() => {});

    render(<App />);

    await waitFor(() => screen.getByText('delete'));
    fireEvent.click(screen.getByText('delete'));

    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Delete failed'))
    );
  });

});

