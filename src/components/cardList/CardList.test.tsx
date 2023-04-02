import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import CardList from './CardList';

describe('Rendering Card List', () => {
  it('Renders 12 cards', () => {
    render(<CardList />);
    const items = screen.queryAllByText(/name/i);
    expect(items).toHaveLength(12);
  });
});
