import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import searchIcon from '../../assets/search.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setValue } from '../../redux/reducers/searchReducer';

const SearchBar = () => {
  const value = useAppSelector((state) => state.searchReducer.value);
  const [inputVal, setInputVal] = useState(value);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  const onKeyDawnHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setValue(inputVal));
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <img className={styles.img} src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          value={inputVal}
          onChange={handleChange}
          onKeyDown={onKeyDawnHandler}
        />
      </div>
      <div className={styles.tip__wrapper}>
        Type the name of character and hit &quot;Enter&quot;: Rick, Morty, Uncle
      </div>
    </>
  );
};

export default SearchBar;
