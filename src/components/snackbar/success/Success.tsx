import React, { SetStateAction } from 'react';
import styles from './Success.module.scss';

interface SuccessMessage {
  message: string;
  setIsAdded: React.Dispatch<SetStateAction<boolean>>;
  reset: () => void;
}

const Success = ({ message, setIsAdded, reset }: SuccessMessage) => {
  const onAnimationEnd = () => {
    setIsAdded(false);
    reset();
  };
  return (
    <div onAnimationEnd={onAnimationEnd} className={styles.wrapper}>
      {message}
    </div>
  );
};

export default Success;
