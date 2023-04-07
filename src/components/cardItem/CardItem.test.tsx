import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import MOCK_CARD from '../../mock/MockData';
import CardItem from './CardItem';

describe('CardList', () => {
  it('Renders Card Correct', () => {
    render(
      <CardItem
        name={MOCK_CARD.name}
        id={MOCK_CARD.id}
        image={MOCK_CARD.image}
        setModalId={() => {}}
      />
    );
    expect(screen.getByText(/RICK/i)).toBeInTheDocument();
  });
});
