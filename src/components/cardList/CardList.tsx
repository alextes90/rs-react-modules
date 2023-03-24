/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';
import { Country } from '../../interfaces/interfaces';
import { result } from './utilfunction';

interface CardListProps {
  [key: string]: string;
}

class CardList extends React.Component<
  CardListProps,
  { cardList: Country[]; loading: boolean; error: boolean }
> {
  constructor(props: CardListProps) {
    super(props);
    this.state = { cardList: [], loading: true, error: false };
  }

  componentDidMount() {
    (async () => {
      try {
        const resultToShow = await result();
        this.setState({
          cardList: resultToShow,
          loading: false,
        });
      } catch (err) {
        this.setState({
          error: true,
        });
      }
    })();
  }

  render() {
    const { cardList, loading, error } = this.state;
    if (loading) {
      return <div className={styles.loading}>loading...</div>;
    }

    if (error) {
      return <div className={styles.loading}> Error occurred</div>;
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
