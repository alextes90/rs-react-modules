import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Modal from './Modal';

describe('Rendering Modal', () => {
  it('Make API call and check loading and renders correctly', async () => {
    render(<Modal id="1" setModalId={() => {}} />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const item = await screen.findByText(/rick/i);
    expect(item).toBeInTheDocument();
  });
});
