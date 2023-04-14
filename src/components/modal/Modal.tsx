import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { BASE_URL } from '../../const';
import { RickMortyCharaterDataResult } from '../../interfaces/interfaces';
import mortyApi from '../../redux/mortyService';
import getRequest from '../../utilities/apiRequest';
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
