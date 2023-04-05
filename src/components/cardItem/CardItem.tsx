import styles from './CardItem.module.scss';
import { Country } from '../../interfaces/interfaces';

const CardItem = ({
  flags,
  name,
  capital,
  region,
  area,
  population,
  currencies,
}: Country) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={flags.svg} alt={flags.alt} />
      <div className={styles.text}>
        <b>Flag Description </b>
        {flags.alt}
      </div>
      <div className={styles.text}>
        <b>Official Name: </b>
        {name}
      </div>
      <div className={styles.text}>
        <b>Capital: </b>
        {capital}
      </div>
      <div className={styles.text}>
        <b>Area: </b>
        {area.toLocaleString()} km2
      </div>
      <div className={styles.text}>
        <b>Population: </b>
        {population.toLocaleString()}
      </div>
      <div className={styles.text}>
        <b>Region: </b>
        {region}
      </div>
      <div className={styles.text}>
        <b>Currency: </b>
        {currencies.name} | {currencies.symbol}
      </div>
    </div>
  );
};

export default CardItem;
