import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import MainPage from './MainPage';

describe('Render Main page', () => {
  it('On first request show loading then load card', async () => {
    render(<MainPage />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const item = await screen.findByText(/rick/i);
    expect(item).toBeInTheDocument();
  });
  it('On hit Enter it make Api call and search data = morty', async () => {
    render(<MainPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'morty{enter}');
    const rickCard = screen.queryByText(/Character Name: Rick/i);
    expect(rickCard).not.toBeInTheDocument();
  });
  it('On not Found Render', async () => {
    render(<MainPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'mortykjhkjhkjh{enter}');
    const rickCard = screen.getByText(/no characters with such name/i);
    expect(rickCard).toBeInTheDocument();
  });
});
