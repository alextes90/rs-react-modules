/* eslint-disable import/prefer-default-export */
import { Country } from '../../interfaces/interfaces';

const BASE_URL =
  'https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones,area,capital,region,population';
const getData = async () => {
  const data = await fetch(BASE_URL);
  const result = await data.json();
  return result;
};

const result = async () => {
  const data = await getData();
  const filteredData = data.filter((el: Country, index: number) => index < 12);
  return filteredData;
};

export default result;
