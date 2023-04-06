import { useState } from 'react';
import CardItem from '../cardItem/CardItem';
import styles from './CardList.module.scss';
import { RickMortyCharaterDataResult } from '../../interfaces/interfaces';
import Modal from '../modal/Modal';

interface CardListProps {
  results: RickMortyCharaterDataResult[];
}

const CardList = ({ results }: CardListProps) => {
  const [modalId, setModalId] = useState('');
  return (
    <>
      {modalId && <Modal id={modalId} setModalId={setModalId} />}
      <div
        className={
          modalId
            ? `${styles['card-list']} ${styles.modal}`
            : `${styles['card-list']}`
        }
      >
        {results.map(({ name, image, id }: RickMortyCharaterDataResult) => {
          return (
            <CardItem
              key={id}
              name={name}
              image={image}
              id={id}
              setModalId={setModalId}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardList;
