import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import searchIcon from '../../assets/search.svg';
import { DataFetching, RickMortyRes } from '../../interfaces/interfaces';
import getRequest from '../../utilities/apiRequest';
import { BASE_URL } from '../../const';

const STORAGE_KEY = 'ATLOCAL_INPUT';

interface SearchBarProps {
  setGetResults: React.Dispatch<SetStateAction<DataFetching>>;
}

const SearchBar = ({ setGetResults }: SearchBarProps) => {
  const value = localStorage.getItem(STORAGE_KEY);
  const [inputVal, setInputVal] = useState(value || '');

  const getSearchData = useCallback(
    async (searchValue: string) => {
      const searchStr = `?name=${searchValue}`;
      setGetResults('pending');
      try {
        const response = await getRequest(`${BASE_URL}${searchStr}`);
        if (response === 'failed to fetch data') {
          setGetResults('not found');
        } else {
          const { results } = response as RickMortyRes;
          setGetResults(results);
        }
      } catch (err) {
        setGetResults('error');
      }
    },
    [setGetResults]
  );

  useEffect(() => {
    (async () => {
      getSearchData(value || '');
    })();
  }, [getSearchData, value]);

  useBeforeUnload(() => {
    localStorage.setItem(STORAGE_KEY, inputVal);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  const onKeyDawnHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      await getSearchData(inputVal);
      localStorage.setItem(STORAGE_KEY, inputVal);
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
