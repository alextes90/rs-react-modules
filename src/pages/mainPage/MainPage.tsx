import React from 'react';
import CardList from '../../components/cardList/CardList';
import SearchBar from '../../components/searchBar/SearchBar';

const MainPage = () => {
  return (
    <div>
      <SearchBar />
      <CardList />
    </div>
  );
};

export default MainPage;
