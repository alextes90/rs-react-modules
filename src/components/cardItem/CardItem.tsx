import React, { SetStateAction } from 'react';
import styles from './CardItem.module.scss';

interface CardItemProps {
  name: string;
  image: string;
  id: number;
  setModalId: React.Dispatch<SetStateAction<string>>;
}

const CardItem = ({ image, name, id, setModalId }: CardItemProps) => {
  return (
    <div
      role="presentation"
      className={styles.wrapper}
      onClick={() => {
        setModalId(`${id}`);
      }}
    >
      <img className={styles.img} src={image} alt={name} />
      <div className={styles.text}>
        <b>Character Name: </b>
        {name}
      </div>
    </div>
  );
};

export default CardItem;
