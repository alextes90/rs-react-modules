import React from 'react';
import styles from './Forms.module.scss';
import OPTION_DATA, { GENDER_DATA } from './formsData';
import { Card } from '../../interfaces/interfaces';
import FormCard from '../formCard/FormCard';
import Success from '../snackbar/success/Success';

interface FormStates extends Card {
  isAdded: boolean;
  isUpdated: boolean;
  addedCard: Card[];
}

class Forms extends React.Component<Record<string, never>, FormStates> {
  nameRef: React.RefObject<HTMLInputElement> | undefined;

  dateRef: React.RefObject<HTMLInputElement> | undefined;

  regionRef: React.RefObject<HTMLSelectElement> | undefined;

  isMailingRef: React.RefObject<HTMLInputElement> | undefined;

  formRef: React.RefObject<HTMLFormElement>;

  constructor(props: Record<string, never>) {
    super(props);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.nameRef = React.createRef();
    this.dateRef = React.createRef();
    this.regionRef = React.createRef();
    this.isMailingRef = React.createRef();
    this.formRef = React.createRef();
    this.state = {
      name: ' ',
      date: ' ',
      region: 'Europe',
      isMailing: false,
      gender: ' ',
      file: null,
      isUpdated: false,
      id: 0,
      isAdded: false,
      addedCard: [],
    };
  }

  componentDidUpdate() {
    const noError = Object.values(this.state).findIndex((el) => el === '');
    const {
      name,
      date,
      region,
      isMailing,
      gender,
      file,
      addedCard,
      isUpdated,
      id,
    } = this.state;
    if (noError === -1 && isUpdated) {
      const newAddedCardArr = [
        ...addedCard,
        { name, date, region, isMailing, gender, file, id },
      ];
      this.setState({ isAdded: true, isUpdated: false });
      setTimeout(() => {
        this.setState({
          addedCard: newAddedCardArr,
          name: ' ',
          date: ' ',
          region: 'Europe',
          isMailing: false,
          gender: ' ',
          file: null,
          isAdded: false,
          id: Date.now(),
        });
      }, 1500);
      this.formRef.current?.reset();
    }
  }

  onSubmitHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { gender } = this.state;
    if (this.isMailingRef?.current?.checked) {
      this.setState({ isMailing: this.isMailingRef?.current?.checked });
    }
    if (this.regionRef?.current?.value) {
      this.setState({ region: this.regionRef?.current?.value });
    }
    if (this.dateRef?.current?.value) {
      this.setState({ date: this.dateRef?.current?.value });
    } else this.setState({ date: '' });
    if (
      this.nameRef &&
      typeof this.nameRef.current?.value === 'string' &&
      this.nameRef.current?.value[0] ===
        this.nameRef.current?.value[0]?.toUpperCase()
    ) {
      this.setState({ name: this.nameRef.current?.value });
    } else this.setState({ name: '' });
    if (gender === ' ') {
      this.setState({ gender: '' });
    }
    this.setState({ isUpdated: true });
  }

  fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      this.setState({ file: event.target.files[0] });
      this.setState({ isUpdated: false });
    }
  };

  onChangeHandler = (
    event: React.MouseEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => {
    this.setState({ gender: event.target.value });
    this.setState({ isUpdated: false });
  };

  render() {
    const { name, date, gender, addedCard, isAdded } = this.state;
    return (
      <>
        {isAdded && <Success message="Card was successfully added" />}
        <div className={styles.wrapper}>
          <form className={styles.form} ref={this.formRef}>
            <div>
              <label className={styles.label_name}>
                Personal name
                <input
                  disabled={isAdded}
                  ref={this.nameRef}
                  className={styles.input_name}
                  type="text"
                  placeholder="Your Name"
                />
              </label>
              {name ? (
                ''
              ) : (
                <div className={styles.error}>
                  Please start you name with Upper Case and then click submit
                  button again
                </div>
              )}
            </div>
            <div>
              <label>
                Date of birth{' '}
                <input disabled={isAdded} type="date" ref={this.dateRef} />
              </label>
              {date ? (
                ''
              ) : (
                <div className={styles.error}>
                  Please chose the date and then click submit button again
                </div>
              )}
            </div>
            <label>
              Chose the region
              <select ref={this.regionRef} disabled={isAdded}>
                {OPTION_DATA.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Would you like to receive our mails
              <input
                type="checkbox"
                ref={this.isMailingRef}
                disabled={isAdded}
              />
            </label>
            <div>
              Chose your gender
              {GENDER_DATA.map((gen) => (
                <label key={gen} className={styles.input_radio}>
                  {gen}
                  <input
                    disabled={isAdded}
                    name="gen"
                    value={gen}
                    type="radio"
                    onClick={this.onChangeHandler}
                  />
                </label>
              ))}
              {gender ? (
                ''
              ) : (
                <div className={styles.error}>
                  Please chose your gender and then click submit button again
                </div>
              )}
            </div>
            <label>
              Upload your avatar
              <input
                disabled={isAdded}
                type="file"
                accept="image/png, image/jpeg"
                onChange={this.fileHandler}
                capture="environment"
              />
            </label>
            <button
              disabled={isAdded}
              onClick={this.onSubmitHandler}
              className={styles.form_button}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className={styles['addedCard-wrapper']}>
          {addedCard.length > 0 ? (
            addedCard.map((card: Card) => (
              <FormCard key={card.id} formData={card} />
            ))
          ) : (
            <div>Please fill the form and add the card</div>
          )}
        </div>
      </>
    );
  }
}

export default Forms;
