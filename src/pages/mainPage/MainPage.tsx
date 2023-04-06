import { useState } from 'react';
import CardList from '../../components/cardList/CardList';
import SearchBar from '../../components/searchBar/SearchBar';
import { DataFetching } from '../../interfaces/interfaces';

const MainPage = () => {
  const [getResults, setGetResults] = useState<DataFetching>([]);

  const resultToShow = () => {
    switch (getResults) {
      case 'error':
        return <div>Error occurred while fetching</div>;
      case 'pending':
        return <div>Loading</div>;
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
