/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';
import { Country } from '../../interfaces/interfaces';
import COUNTRY_DATA from './data';

class CardList extends React.Component<
  Record<string, never>,
  { cardList: Country[] }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { cardList: COUNTRY_DATA };
  }

  render() {
    const { cardList } = this.state;
    return (
      <div className={styles['card-list']}>
        {cardList.map(
          ({
            name,
            flags,
            currencies,
            capital,
            region,
            population,
            area,
            timezones,
          }: Country) => {
            return (
              cardList.length > 0 && (
                <CardItem
                  key={area}
                  flags={flags}
                  name={name}
                  currencies={currencies}
                  capital={capital}
                  region={region}
                  area={area}
                  population={population}
                  timezones={timezones}
                />
              )
            );
          }
        )}
      </div>
    );
  }
}

export default CardList;
