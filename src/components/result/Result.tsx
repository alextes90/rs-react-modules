import { useEffect, useState } from 'react';
import styles from './Result.module.scss';
import { useAppSelector } from '../../hooks/redux';
import mortyApi from '../../redux/mortyService';
import CardList from '../cardList/CardList';

const Result = () => {
  const [searchVal, setSearchVal] = useState('');
  const inputVal = useAppSelector((state) => state.searchReducer.value);
  const res = mortyApi.useFetchCharactersByNameQuery(searchVal);

  useEffect(() => {
    setSearchVal(inputVal);
  }, [inputVal]);

  const resultToShow = () => {
    if (res.status === 'pending') {
      return <div className={styles['text-output']}>Loading...</div>;
    }
    if (res.status === 'rejected') {
      return <div className={styles['text-output']}>Try another request</div>;
    }
    return res?.data?.results ? <CardList results={res?.data?.results} /> : '';
  };
  return <>{resultToShow()}</>;
};

export default Result;
