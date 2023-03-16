/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';

interface CardListProps {
  [key: string]: string;
}

const BASE_URL =
  'https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones,area,capital,region,population';

interface Country {
  flags: { png: string; svg: string; alt: string };
  name: { common: string; official: string };
  currencies: { name: string; symbol: string };
  capital: string[];
  region: string;
  area: number;
  population: number;
  timezones: string[];
}

class CardList extends React.Component<
  CardListProps,
  { cardList: Country[]; loading: boolean }
> {
  constructor(props: CardListProps) {
    super(props);
    this.state = { cardList: [], loading: true };
  }

  componentDidMount() {
    (async () => {
      const data = await fetch(BASE_URL);
      const result = await data.json();
      const resultToShow = result.filter(
        (el: Country, index: number) => index < 12
      );
      this.setState({ cardList: resultToShow, loading: false });
    })();
  }

  render() {
    const { cardList, loading } = this.state;
    if (loading) {
      return <div className={styles.loading}>...loading</div>;
    }
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
            );
          }
        )}
      </div>
    );
  }
}

export default CardList;
