// write test for navbar component
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';



test('renders navbar component', () => {
  render(<Navbar />);
  const navbar = screen.getByTestId('navbar');
  expect(navbar).toBeInTheDocument();
});


