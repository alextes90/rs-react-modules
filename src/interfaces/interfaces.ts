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
