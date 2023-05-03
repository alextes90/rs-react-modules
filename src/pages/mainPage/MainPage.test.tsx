import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import renderWithProviders from '../../utilities/test-utils';
import MainPage from './MainPage';

describe('Render Main page', () => {
  it('On first request show loading then load card', async () => {
    renderWithProviders(<MainPage />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const item = await screen.findByText(/rick/i);
    expect(item).toBeInTheDocument();
  });
  it('On hit Enter it make Api call and search data = morty', async () => {
    renderWithProviders(<MainPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'morty{enter}');
    const rickCard = screen.queryByAltText(/Rick/i);
    const mortyCard = await screen.findByAltText(/Morty/i);
    expect(rickCard).not.toBeInTheDocument();
    expect(mortyCard).toBeInTheDocument();
  });
  it('On not Found Render', async () => {
    renderWithProviders(<MainPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'mortykjhkjhkjh{enter}');
    const rickCard = screen.getByText(/Try another request/i);
    expect(rickCard).toBeInTheDocument();
  });
});
