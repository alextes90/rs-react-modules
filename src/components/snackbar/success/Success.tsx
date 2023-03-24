import React from 'react';
import styles from './Success.module.scss';

interface SuccessMessage {
  message: string;
}

class Success extends React.Component<SuccessMessage> {
  render() {
    const { message } = this.props;
    return <div className={styles.wrapper}>{message}</div>;
  }
}

export default Success;
