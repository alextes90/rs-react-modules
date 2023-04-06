import { useLocation, useNavigate } from 'react-router-dom';

export interface Country {
  flags: { png: string; svg: string; alt: string };
  name: string;
  currencies: { name: string; symbol: string };
  capital: string[];
  region: string;
  area: number;
  population: number;
  timezones: string[];
}

export interface WithRouterProps {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}

export interface Card {
  name: string;
  date: string;
  region: string;
  isMailing: boolean;
  gender: string;
  file: File | null;
  id: number;
}

export interface RickMortyRes {
  info: Info;
  results: RickMortyCharaterDataResult[];
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null | string;
}

export interface RickMortyCharaterDataResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Location {
  name: string;
  url: string;
}

export type DataFetching = 'error' | 'pending' | RickMortyCharaterDataResult[];
