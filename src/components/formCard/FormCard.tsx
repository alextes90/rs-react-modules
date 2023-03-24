import React from 'react';
import { Card } from '../../interfaces/interfaces';
import styles from './FormCard.module.scss';

interface FormCardProps {
  formData: Card;
}

class FormCard extends React.Component<FormCardProps> {
  render() {
    const { formData } = this.props;
    const { name, file, isMailing, date, gender } = formData;
    return (
      <div className={styles.wrapper}>
        <div>
          {file ? (
            <img
              className={styles.img}
              src={URL.createObjectURL(file)}
              alt="avatar"
            />
          ) : (
            <div>NO IMAGE :(</div>
          )}
        </div>
        <div>
          <div>Your name: {name}</div>
          <div>Your gender: {gender}</div>
          <div>Your birthday: {date}</div>
          <div>Mailing: {isMailing ? 'yes' : 'no'}</div>
        </div>
      </div>
    );
  }
}

export default FormCard;
