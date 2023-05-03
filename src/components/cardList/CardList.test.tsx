import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import MOCK_CARD from '../../mock/MockData';
import renderWithProviders from '../../utilities/test-utils';
import CardList from './CardList';

const cardListResults = [MOCK_CARD];

describe('Rendering Card List', () => {
  it('Renders a Card correctly', () => {
    render(<CardList results={cardListResults} />);
    const items = screen.queryAllByText(/name/i);
    expect(items).toHaveLength(1);
  });
  it('Open Modal and close Modal', async () => {
    renderWithProviders(<CardList results={cardListResults} />);
    const item = screen.getByText(/name/i);
    await userEvent.click(item);
    const modal = screen.getByText(/Status: status/i);
    expect(modal).toBeInTheDocument();
    const overlay = screen.getByTestId('overlay');
    await userEvent.click(overlay);
    expect(modal).not.toBeInTheDocument();
  });
});
