/* eslint-disable import/prefer-default-export */
import { Country } from '../../interfaces/interfaces';

const BASE_URL =
  'https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones,area,capital,region,population';
export const getData = async (url: string) => {
  const data = await fetch(url);
  const result = await data.json();
  return result;
};

export const result = async () => {
  const data = await getData(BASE_URL);
  const filteredData = data.filter((el: Country, index: number) => index < 12);
  return filteredData;
};
