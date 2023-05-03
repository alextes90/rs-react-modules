import { RickMortyCharaterDataResult } from '../../interfaces/interfaces';
import styles from './ModalContent.module.scss';

interface ModalContentProps {
  results: RickMortyCharaterDataResult;
}

const ModalContent = ({ results }: ModalContentProps) => {
  const { name, status, species, type, gender, location, image } = results;
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={image} alt={name} />
      <div className={styles.text}>
        <b>Character Name: </b>
        {name}
      </div>
      <div className={styles.text}>
        <ul>
          <li>Status: {status}</li>
          <li>Species: {species}</li>
          <li>Type: {type}</li>
          <li>Gender: {gender}</li>
          <li>Location: {location.name}</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalContent;
