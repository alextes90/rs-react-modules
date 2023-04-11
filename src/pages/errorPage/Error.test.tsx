import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ErrorPage from './ErrorPage';

describe('Error Page', () => {
  it('Renders Error Page correctly', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/Page not Found/i)).toBeInTheDocument();
  });
});
