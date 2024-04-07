import { render, screen } from '@testing-library/react';
import Login from '../../component/Login.jsx';

test('ログインフォームが存在するか', () => {
  render(<Login />);

  const emailForm = screen.getByText(/email/i);
  expect(emailForm).toBeInTheDocument();

  const passwordForm = screen.getByText(/password/i);
  expect(passwordForm).toBeInTheDocument();

  const signInButton = screen.getByText(/sign in/i);
  expect(signInButton).toBeInTheDocument();
});
