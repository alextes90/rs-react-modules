import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Forms from './Forms';

describe('Forms', () => {
  it('Input type work', async () => {
    render(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    await userEvent.type(inputName, 'React');
    expect(inputName.value).toBe('React');
  });
  it('Input have start from UpperCase', async () => {
    render(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button');
    await userEvent.type(inputName, 'react');
    await userEvent.click(submitButton);
    const errorMessage = await screen.findByText(
      /start you name with Upper Case/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('Date of birth is chosen', async () => {
    render(<Forms />);
    const inputDate = screen.getByLabelText(
      /Date of birth/i
    ) as HTMLInputElement;
    await userEvent.type(inputDate, '1970-01-01');
    expect(inputDate).toHaveValue('1970-01-01');
  });
  it('If date not chosen there is error', async () => {
    render(<Forms />);
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    const errorMessage = await screen.findByText(/chose the date/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('Test option selection', async () => {
    render(<Forms />);
    const optionSelection = screen.getByRole('combobox');
    await userEvent.selectOptions(optionSelection, ['Asia']);
    const optionEurope = screen.getByRole('option', {
      name: 'Europe',
    }) as HTMLOptionElement;
    const optionAsia = screen.getByRole('option', {
      name: 'Asia',
    }) as HTMLOptionElement;
    expect(optionEurope.selected).toBe(false);
    expect(optionAsia.selected).toBe(true);
  });
  it('Test if subscribed to mail', async () => {
    render(<Forms />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it('Test if Male radio button is chosen', async () => {
    render(<Forms />);
    const radioMale = screen.getByRole('radio', {
      name: 'Male',
    }) as HTMLInputElement;
    await userEvent.click(radioMale);
    expect(radioMale).toBeChecked();
  });
  it('Test card is added', async () => {
    render(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    const inputDate = screen.getByLabelText(
      /Date of birth/i
    ) as HTMLInputElement;
    const radioMale = screen.getByRole('radio', {
      name: 'Male',
    }) as HTMLInputElement;
    const submitButton = screen.getByRole('button');
    await userEvent.click(radioMale);
    await userEvent.type(inputDate, '1970-01-01');
    await userEvent.type(inputName, 'React');
    await userEvent.click(submitButton);
    const added = await screen.findByText(/successfully added/i);
    expect(added).toBeInTheDocument();
  });
});
