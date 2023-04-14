import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './Forms.module.scss';
import OPTION_DATA, { GENDER_DATA } from './formsData';
import { Card } from '../../interfaces/interfaces';
import FormCard from '../../components/formCard/FormCard';
import Success from '../../components/snackbar/success/Success';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFormResult } from '../../redux/reducers/formReducer';

interface FormValues {
  Name: string;
  ['Date of Birth']: string;
  Region: string;
  isMailReceived: boolean;
  gender: string;
}

const Forms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const [isAdded, setIsAdded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isFileErr, setIsFileErr] = useState(false);
  const dispatch = useAppDispatch();
  const cardList = useAppSelector((state) => state.formReducer.formResult);

  console.log(cardList);

  const onSubmit = (data: FormValues) => {
    if (file) {
      const { Name, Region, isMailReceived, gender } = data;
      dispatch(
        setFormResult({
          name: Name,
          date: data['Date of Birth'],
          region: Region,
          isMailing: isMailReceived,
          gender,
          file,
          id: Date.now(),
        })
      );
      setFile(null);
      setIsAdded(true);
      setIsFileErr(false);
    } else setIsFileErr(true);
  };

  const onError = () => {
    if (!file) setIsFileErr(true);
  };

  const onFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      (event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpeg')
    ) {
      setFile(event.target.files[0]);
    }
  };

  const dateValidation = (date: string) => {
    const pickedDate = new Date(date);
    const currentDay = new Date();
    return (
      pickedDate.getTime() < currentDay.getTime() ||
      'Please chose the day that is not in future'
    );
  };

  return (
    <>
      {isAdded && (
        <Success
          reset={reset}
          setIsAdded={setIsAdded}
          message="Card was successfully added"
        />
      )}
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <label className={styles.label_name}>
              Personal name
              <input
                {...register('Name', {
                  required: 'This input must be filed',
                  validate: {
                    isFirstLetterBig: (letter: string) => {
                      return (
                        letter[0] === letter[0].toUpperCase() ||
                        'First letter have to be UpperCase'
                      );
                    },
                  },
                })}
                className={styles.input_name}
                type="text"
                placeholder="Your Name"
              />
            </label>
            <p className={styles.error}>{errors.Name?.message}</p>
          </div>
          <div>
            <label>
              Date of birth
              <input
                {...register('Date of Birth', {
                  required: 'Please chose the date',
                  validate: {
                    isBeforeToday: dateValidation,
                  },
                })}
                type="date"
              />
            </label>
            <p className={styles.error}>{errors['Date of Birth']?.message}</p>
          </div>
          <div>
            <label>
              Chose the region
              <select
                defaultValue=""
                {...register('Region', {
                  validate: {
                    isChosen: (variant) =>
                      variant !== '' || 'Please chose the region',
                  },
                })}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                {OPTION_DATA.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </label>
            <p className={styles.error}>{errors.Region?.message}</p>
          </div>
          <div>
            <label>
              Would you like to receive our mails
              <input
                type="checkbox"
                {...register('isMailReceived', {
                  required: 'Please select this option',
                })}
              />
            </label>
            <p className={styles.error}>{errors.isMailReceived?.message}</p>
          </div>
          <div>
            Chose your gender
            {GENDER_DATA.map((gen) => (
              <label key={gen} className={styles.input_radio}>
                {gen}
                <input
                  {...register('gender', { required: 'please select one' })}
                  value={gen}
                  type="radio"
                />
              </label>
            ))}
            <p className={styles.error}>{errors.gender?.message}</p>
          </div>
          <div>
            <label>
              Upload your avatar
              <input
                type="file"
                accept="image/png, image/jpeg"
                capture="environment"
                onChange={onFileHandler}
              />
            </label>
            {isFileErr ? (
              <p className={styles.error}>Please upload jpg or png</p>
            ) : (
              ''
            )}
          </div>
          <button className={styles.form_button} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles['addedCard-wrapper']}>
        {cardList.length > 0 ? (
          cardList.map((card: Card) => (
            <FormCard key={card.id} formData={card} />
          ))
        ) : (
          <p>Please fill the form and add the card</p>
        )}
      </div>
    </>
  );
};
export default Forms;
