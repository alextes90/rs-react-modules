import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import NORFOLK_ISLAND from '../../mockData/MockData';
import CardItem from './CardItem';

const currency = { name: 'bar', symbol: 'foo' };

describe('CardList', () => {
  it('Renders Card Correct', () => {
    render(
      <CardItem
        flags={NORFOLK_ISLAND.flags}
        name={NORFOLK_ISLAND.name}
        currencies={currency}
        capital={NORFOLK_ISLAND.capital}
        region={NORFOLK_ISLAND.region}
        area={NORFOLK_ISLAND.area}
        population={NORFOLK_ISLAND.population}
        timezones={NORFOLK_ISLAND.timezones}
      />
    );
    expect(screen.getByText(/island/i)).toBeInTheDocument();
    expect(screen.getByText(/Oceania/i)).toBeInTheDocument();
  });
});
