import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import renderWithProviders from '../../utilities/test-utils';

describe('SearchBar', () => {
  it('Renders Icon', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByAltText(/Search Icon/i)).toBeInTheDocument();
  });
  it('Renders Input', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('Renders Placeholder', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
  it('Input change handler work', async () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'React');
    expect(input.value).toBe('React');
  });
});
