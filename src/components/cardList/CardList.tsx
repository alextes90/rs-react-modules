import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';
import { RickMortyCharaterDataResult } from '../../interfaces/interfaces';

interface CardListProps {
  results: RickMortyCharaterDataResult[];
}

const CardList = ({ results }: CardListProps) => {
  return (
    <div className={styles['card-list']}>
      {results.map(({ name, image, id }: RickMortyCharaterDataResult) => {
        return <CardItem key={id} name={name} image={image} />;
      })}
    </div>
  );
};

export default CardList;
