import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('Renders Icon', () => {
    render(<SearchBar />);
    expect(screen.getByAltText(/Search Icon/i)).toBeInTheDocument();
  });
  it('Renders Input', () => {
    render(<SearchBar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('Renders Placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
  it('Input change handler work', async () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'React');
    expect(input.value).toBe('React');
  });
});
