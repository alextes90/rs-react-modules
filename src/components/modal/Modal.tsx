import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { BASE_URL } from '../../const';
import { RickMortyCharaterDataResult } from '../../interfaces/interfaces';
import getRequest from '../../utilities/apiRequest';
import ModalContent from '../modalContent/ModalContent';
import styles from './Modal.module.scss';

interface ModalProps {
  id: string;
  setModalId: Dispatch<SetStateAction<string>>;
}

type DataFetching = 'error' | 'pending' | RickMortyCharaterDataResult | '';

const Modal = ({ id, setModalId }: ModalProps) => {
  const [getResults, setGetResults] = useState<DataFetching>('');

  useEffect(() => {
    (async () => {
      setGetResults('pending');
      try {
        const response = await getRequest(`${BASE_URL}/${id}`);
        const results = response as RickMortyCharaterDataResult;
        setGetResults(results);
      } catch (err) {
        setGetResults('error');
      }
    })();
  }, [id]);

  const resultToShow = () => {
    switch (getResults) {
      case 'error':
        return <div>Error occurred while fetching</div>;
      case 'pending':
        return <div>Loading...</div>;
      case '':
        return <div> </div>;
      default:
        return <ModalContent results={getResults} />;
    }
  };

  return (
    <RemoveScroll>
      <div
        role="presentation"
        className={styles.overlay}
        onClick={() => setModalId('')}
      >
        {' '}
      </div>
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
