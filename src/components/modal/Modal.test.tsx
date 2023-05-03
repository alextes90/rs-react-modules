import { screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import renderWithProviders from '../../utilities/test-utils';
import Modal from './Modal';

describe('Rendering Modal', () => {
  it('Make API call and check loading and renders correctly', async () => {
    renderWithProviders(<Modal id="1" setModalId={() => {}} />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const item = await screen.findByText(/rick/i);
    expect(item).toBeInTheDocument();
  });
});
