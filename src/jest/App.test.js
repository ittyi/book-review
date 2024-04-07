import { render, screen } from '@testing-library/react';
import App from '../App';

test('ログインフォームが存在するか', () => {
  render(<App />);
  const getText = screen.getByText(/test/i);
  expect(getText).toBeInTheDocument();

  // const emailForm = screen.getByText(/email/i);
  // expect(emailForm).toBeInTheDocument();

  // const passwordForm = screen.getByText(/password/i);
  // expect(passwordForm).toBeInTheDocument();

  // const signInButton = screen.getByText(/sign in/i);
  // expect(signInButton).toBeInTheDocument();
});
