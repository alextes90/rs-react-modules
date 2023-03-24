/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CountryName from '../countryItem/CountryName';

class Forms extends React.Component {
  render() {
    return (
      <form>
        <CountryName />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Forms;
