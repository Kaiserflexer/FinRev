import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input form title', () => {
  render(<App />);
  const title = screen.getByText(/Ввод данных/i);
  expect(title).toBeInTheDocument();
});
