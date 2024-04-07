import { render, screen } from '@testing-library/react';
import Signup from '../../component/Signup.jsx';

test('新規作成フォームが存在するか', () => {
  render(<Signup />);

  const nameForm = screen.getByText(/name/i);
  expect(nameForm).toBeInTheDocument();

  const emailForm = screen.getByText(/email/i);
  expect(emailForm).toBeInTheDocument();

  const passwordForm = screen.getByText(/password/i);
  expect(passwordForm).toBeInTheDocument();

  const signInButton = screen.getByText(/sign in/i);
  expect(signInButton).toBeInTheDocument();
});
