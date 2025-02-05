import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './login';

test('renders login form', () => {
  render(<Login />);
  const loginForm = screen.getByTestId('login-form');
  expect(loginForm).toBeInTheDocument();
});
