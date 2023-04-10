import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import AboutUs from './AboutUs';

describe('AboutUs page', () => {
  it('Renders AboutUs Page correctly', () => {
    render(<AboutUs />);
    screen.debug();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });
});
