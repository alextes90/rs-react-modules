export interface Country {
  flags: { png: string; svg: string; alt: string };
  name: { common: string; official: string };
  currencies: { name: string; symbol: string };
  capital: string[];
  region: string;
  area: number;
  population: number;
  timezones: string[];
}
