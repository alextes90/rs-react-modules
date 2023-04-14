import { Dispatch, SetStateAction } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import mortyApi from '../../redux/mortyService';
import ModalContent from '../modalContent/ModalContent';
import styles from './Modal.module.scss';

interface ModalProps {
  id: string;
  setModalId: Dispatch<SetStateAction<string>>;
}

const Modal = ({ id, setModalId }: ModalProps) => {
  const res = mortyApi.useFetchCharacterByIdQuery(id);

  const resultToShow = () => {
    if (res.status === 'pending') {
      return <div>Loading...</div>;
    }
    if (res.status === 'rejected') {
      return <div>Error occurred while fetching</div>;
    }
    return res?.data ? <ModalContent results={res.data} /> : '';
  };

  return (
    <RemoveScroll>
      <div
        data-testid="overlay"
        role="presentation"
        className={styles.overlay}
        onClick={() => setModalId('')}
      />
      <div className={styles.modal}>
        <button
          onClick={() => setModalId('')}
          type="button"
          className={styles['close-modal']}
        >
          &times;
        </button>
        <div>{resultToShow()}</div>
      </div>
    </RemoveScroll>
  );
};

export default Modal;
