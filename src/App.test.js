import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { message } from 'antd';
import App from './App';
import * as db from './db';

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

