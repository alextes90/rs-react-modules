import React from 'react';
import styles from './ErrorPage.module.scss';

class ErrorPage extends React.Component {
  render() {
    return <div className={styles.error}>404 Page not Found</div>;
  }
}

export default ErrorPage;
