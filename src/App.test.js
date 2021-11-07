import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('should display "Hello, Nick!" after entering name', () => {
  const { getByText, getByLabelText } = render(<App />);

  const nameInput = getByLabelText(/name/i);
  fireEvent.change(nameInput, { target: { value: 'Nick' }});

  fireEvent.click(getByText(/submit/i));

  const expectedMessage = "Hello, Nick!";
  expect(getByText(expectedMessage)).toBeDefined();
});
