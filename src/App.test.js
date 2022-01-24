import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';



test("Test checkbox toggle", () => {
  render(<App />);
  const checkbox = screen.getByTestId('chkMenu');
    
  userEvent.click(checkbox);
  expect(checkbox).toHaveTextContent('Show results');
});
