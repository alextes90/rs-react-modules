import styles from './CardItem.module.scss';

interface CardItemProps {
  name: string;
  image: string;
}

const CardItem = ({ image, name }: CardItemProps) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={image} alt={name} />
      <div className={styles.text}>
        <b>Character Name: </b>
        {name}
      </div>
    </div>
  );
};

export default CardItem;
