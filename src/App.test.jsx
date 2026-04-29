import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the app shell', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByRole('heading', { name: /meusboleto/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /entre na sua conta/i })).toBeInTheDocument();
});
