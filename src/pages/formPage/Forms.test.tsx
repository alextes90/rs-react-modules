import { screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Forms from './Forms';
import renderWithProviders from '../../utilities/test-utils';

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

vi.mock('../../components/formCard/FormCard', () => ({
  __esModule: true,
  default: () => <div>Hi</div>,
}));

describe('Forms', () => {
  it('Input type work', async () => {
    renderWithProviders(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    await userEvent.type(inputName, 'React');
    expect(inputName.value).toBe('React');
  });
  it('Input have start from UpperCase', async () => {
    renderWithProviders(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button');
    await userEvent.type(inputName, 'react');
    await userEvent.click(submitButton);
    const errorMessage = await screen.findByText(
      /First letter have to be UpperCase/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('Date of birth is chosen', async () => {
    renderWithProviders(<Forms />);
    const inputDate = screen.getByLabelText(
      /Date of birth/i
    ) as HTMLInputElement;
    await userEvent.type(inputDate, '1970-01-01');
    expect(inputDate).toHaveValue('1970-01-01');
  });
  it('If date not chosen there is error', async () => {
    renderWithProviders(<Forms />);
    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);
    const errorMessage = await screen.findByText(/chose the date/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it('Test option selection', async () => {
    renderWithProviders(<Forms />);
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
    renderWithProviders(<Forms />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it('Test if Male radio button is chosen', async () => {
    renderWithProviders(<Forms />);
    const radioMale = screen.getByRole('radio', {
      name: 'Male',
    }) as HTMLInputElement;
    await userEvent.click(radioMale);
    expect(radioMale).toBeChecked();
  });
  it('Test card is added', async () => {
    renderWithProviders(<Forms />);
    const inputName = screen.getByLabelText(
      /personal name/i
    ) as HTMLInputElement;
    const inputDate = screen.getByLabelText(
      /Date of birth/i
    ) as HTMLInputElement;
    const radioMale = screen.getByRole('radio', {
      name: 'Male',
    }) as HTMLInputElement;
    const checkboxMailing = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button');
    const optionSelection = screen.getByRole('combobox');
    const inputFile = screen.getByText(
      /upload your avatar/i
    ) as HTMLInputElement;
    await userEvent.selectOptions(optionSelection, ['Asia']);
    await userEvent.upload(inputFile, file);
    await userEvent.click(radioMale);
    await userEvent.click(checkboxMailing);
    await userEvent.type(inputDate, '1970-01-01');
    await userEvent.type(inputName, 'React');
    await userEvent.click(submitButton);
    const added = await screen.findByText(/successfully added/i);
    expect(added).toBeInTheDocument();
  });
});
