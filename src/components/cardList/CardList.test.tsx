import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { NORFOLK_ISLAND } from '../../mockData/MockData';
import CardList from './CardList';

vi.mock('./utilfunction', () => ({
  __esModule: true,
  result: () => Promise.resolve([NORFOLK_ISLAND]),
}));

describe('CardList', () => {
  it('Renders Loading before getting fetch data', async () => {
    render(<CardList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('loading...')).not.toBeInTheDocument();
    });
  });
});

describe('UtilFunction', () => {
  it('Fetch data', async () => {
    render(<CardList />);
    const items = await screen.findAllByText(/name/i);
    expect(items).toHaveLength(1);
  });
});
