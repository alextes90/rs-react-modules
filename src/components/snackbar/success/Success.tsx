import styles from './Success.module.scss';

interface SuccessMessage {
  message: string;
}

const Success = ({ message }: SuccessMessage) => {
  return <div className={styles.wrapper}>{message}</div>;
};

export default Success;
