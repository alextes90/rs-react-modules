/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './SearchBar.module.scss';
import searchIcon from '../../assets/search.svg';

interface SearchBarProps {
  [key: string]: string;
}

const STORAGE_KEY = 'ATLOCAL_INPUT';

class SearchBar extends React.Component<SearchBarProps, { inputVal: string }> {
  constructor(props: SearchBarProps) {
    super(props);
    const value = localStorage.getItem(STORAGE_KEY);
    this.state = { inputVal: value || '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    const { inputVal } = this.state;
    localStorage.setItem(STORAGE_KEY, inputVal);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputVal: event.target.value });
  }

  render() {
    const { inputVal } = this.state;
    return (
      <div className={styles.wrapper}>
        <img className={styles.img} src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          value={inputVal}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
