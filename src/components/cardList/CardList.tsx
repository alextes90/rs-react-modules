import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';
import { Country } from '../../interfaces/interfaces';
import COUNTRY_DATA from './data';

const CardList = () => {
  return (
    <div className={styles['card-list']}>
      {COUNTRY_DATA.map(
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
};

export default CardList;
