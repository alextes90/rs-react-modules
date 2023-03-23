/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import styles from './Forms.module.scss';
import OPTION_DATA, { GENDER_DATA } from './formsData';

interface Card {
  name: string;
  date: string;
  region: string;
  isMailing: boolean;
  gender: string;
  update: boolean;
  file: File | null;
}

interface FormStates extends Card {
  addedCard: Card[];
}

class Forms extends React.Component<Record<string, never>, FormStates> {
  nameRef: React.RefObject<HTMLInputElement> | undefined;

  dateRef: React.RefObject<HTMLInputElement> | undefined;

  regionRef: React.RefObject<HTMLSelectElement> | undefined;

  isMailingRef: React.RefObject<HTMLInputElement> | undefined;

  constructor(props: Record<string, never>) {
    super(props);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.nameRef = React.createRef();
    this.dateRef = React.createRef();
    this.regionRef = React.createRef();
    this.isMailingRef = React.createRef();
    this.state = {
      name: ' ',
      date: ' ',
      region: 'Europe',
      isMailing: false,
      gender: ' ',
      file: null,
      update: false,
      addedCard: [],
    };
  }

  componentDidUpdate() {
    const noError = Object.values(this.state).findIndex((el) => el === '');
    const { name, date, region, isMailing, gender, file, addedCard, update } =
      this.state;
    if (noError === -1 && update) {
      const newAddedCardArr = [
        ...addedCard,
        { name, date, region, isMailing, gender, file, update },
      ];
      this.setState({
        addedCard: newAddedCardArr,
        name: ' ',
        date: ' ',
        region: 'Europe',
        isMailing: false,
        gender: ' ',
        file: null,
        update: false,
      });
    }
    console.log(Object.values(this.state));
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
    this.setState({ update: true });
  }

  fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      this.setState({ file: event.target.files[0] });
    }
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: event.target.value });
  };

  render() {
    const { name, date, gender } = this.state;
    return (
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div>
            <label className={styles.label_name}>
              Personal name
              <input
                ref={this.nameRef}
                className={styles.input_name}
                type="text"
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
              Date of birth <input type="date" ref={this.dateRef} />
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
            <select ref={this.regionRef}>
              {OPTION_DATA.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <label>
            Would you like to receive our mails
            <input type="checkbox" ref={this.isMailingRef} />
          </label>
          <div>
            Chose your gender
            {GENDER_DATA.map((gen) => (
              <label key={gen} className={styles.input_radio}>
                {gen}
                <input
                  name="gen"
                  value={gen}
                  type="radio"
                  onChange={this.onChangeHandler}
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
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.fileHandler}
              capture="environment"
            />
          </label>
          <button
            onClick={this.onSubmitHandler}
            className={styles.form_button}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Forms;
