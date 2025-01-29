import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the App component", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn microfrontends/i); // Adjust text as per your app
  expect(linkElement).toBeInTheDocument();
});
