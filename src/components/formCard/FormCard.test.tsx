import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import FormCard from './FormCard';

const mockData = {
  name: 'Foo',
  date: '1970-01-01 ',
  region: 'Europe',
  isMailing: false,
  gender: 'Male',
  file: null,
  id: 1,
};

const mockDataYes = {
  name: 'Foo',
  date: '1970-01-01 ',
  region: 'Europe',
  isMailing: true,
  gender: 'Male',
  file: null,
  id: 1,
};

describe('FromCard', () => {
  it('Renders Form Card correctly', () => {
    render(<FormCard formData={mockData} />);
    expect(screen.getByText(/Foo/i)).toBeInTheDocument();
    expect(screen.getByText(/Mailing: no/i)).toBeInTheDocument();
    expect(screen.queryByText(/Yes/i)).not.toBeInTheDocument();
  });
  it('Renders Form Card correctly', () => {
    render(<FormCard formData={mockDataYes} />);
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mailing: no/i)).not.toBeInTheDocument();
  });
});
