/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CardList from '../../components/cardList/CardList';
import SearchBar from '../../components/searchBar/SearchBar';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <CardList />
      </div>
    );
  }
}

export default MainPage;
