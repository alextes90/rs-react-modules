import { useState } from 'react';
import CardList from '../../components/cardList/CardList';
import SearchBar from '../../components/searchBar/SearchBar';
import { DataFetching } from '../../interfaces/interfaces';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const [getResults, setGetResults] = useState<DataFetching>([]);

  const resultToShow = () => {
    switch (getResults) {
      case 'error':
        return (
          <div className={styles['text-output']}>
            Error occurred while fetching
          </div>
        );
      case 'pending':
        return <div className={styles['text-output']}>Loading...</div>;
      case 'not found':
        return (
          <div className={styles['text-output']}>
            There is no characters with such name. Please try another one. Rick
            for example
          </div>
        );
      default:
        return <CardList results={getResults} />;
    }
  };

  return (
    <div>
      <SearchBar setGetResults={setGetResults} />
      {resultToShow()}
    </div>
  );
};

export default MainPage;
