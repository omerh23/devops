import {render, fireEvent} from '@testing-library/react';
import LoginPage from './LoginPage';


// eslint-disable-next-line no-undef
test('displays error message when the grade input is out of range', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  const {getByLabelText, getByTestId} = render(<LoginPage />);
  const grade1Input = getByLabelText(/Grade 1/i);
  const submitButton = getByTestId('submit-button');

  fireEvent.change(grade1Input, {target: {value: '110'}});
  fireEvent.click(submitButton);

  const responseMessage = getByTestId('response-message');
  // eslint-disable-next-line no-undef
  expect(responseMessage.textContent).toBe('Grade should be between 0 to 100');
});

// eslint-disable-next-line no-undef
test('displays error message when the grade is not numbers', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  const {getByLabelText, getByTestId} = render(<LoginPage />);
  const grade2Input = getByLabelText(/Grade 2/i);
  const submitButton = getByTestId('submit-button');

  fireEvent.change(grade2Input, {target: {value: 'hi'}});
  fireEvent.click(submitButton);

  const responseMessage = getByTestId('response-message');
  // eslint-disable-next-line no-undef
  expect(responseMessage.textContent).toBe('Grade should be only numbers');
});

// eslint-disable-next-line no-undef
test('displays error message when the grade is not integers', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  const {getByLabelText, getByTestId} = render(<LoginPage />);
  const grade3Input = getByLabelText(/Grade 3/i);
  const submitButton = getByTestId('submit-button');

  fireEvent.change(grade3Input, {target: {value: '98.5'}});
  fireEvent.click(submitButton);

  const responseMessage = getByTestId('response-message');
  // eslint-disable-next-line no-undef
  expect(responseMessage.textContent).toBe('Grade should be integers');
});
