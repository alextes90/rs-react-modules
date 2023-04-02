import React, { useEffect, useState, useRef } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import searchIcon from '../../assets/search.svg';

const STORAGE_KEY = 'ATLOCAL_INPUT';

const SearchBar = () => {
  const value = localStorage.getItem(STORAGE_KEY);
  const [inputVal, setInputVal] = useState(value || '');
  const valueRef = useRef('');

  useEffect(() => {
    valueRef.current = inputVal;
  }, [inputVal]);

  useEffect(() => {
    return () => {
      localStorage.setItem(STORAGE_KEY, valueRef.current);
    };
  }, []);

  useBeforeUnload(() => {
    localStorage.setItem(STORAGE_KEY, valueRef.current);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={searchIcon} alt="Search Icon" />
      <input
        type="text"
        placeholder="Search"
        className={styles.input}
        value={inputVal}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
