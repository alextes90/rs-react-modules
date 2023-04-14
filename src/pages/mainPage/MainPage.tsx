import CardList from '../../components/cardList/CardList';
import SearchBar from '../../components/searchBar/SearchBar';
import { useAppSelector } from '../../hooks/redux';
import mortyApi from '../../redux/mortyService';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const inputVal = useAppSelector((state) => state.searchReducer.value);
  const res = mortyApi.useFetchCharactersByNameQuery(inputVal);

  const resultToShow = () => {
    if (res.status === 'pending') {
      return <div className={styles['text-output']}>Loading...</div>;
    }
    if (res.status === 'rejected') {
      return <div className={styles['text-output']}>Try another request</div>;
    }
    return res?.data?.results ? <CardList results={res?.data?.results} /> : '';
  };

  return (
    <div>
      <SearchBar />
      {resultToShow()}
    </div>
  );
};

export default MainPage;
