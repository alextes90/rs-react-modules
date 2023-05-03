import { RickMortyCharaterDataResult } from '../interfaces/interfaces';

const MOCK_CARD: RickMortyCharaterDataResult = {
  id: 1,
  name: 'RICK',
  status: 'status',
  species: 'species',
  type: 'type',
  gender: 'gender',
  origin: { name: 'origin.name', url: 'origin.url' },
  location: { name: 'location.name', url: 'location.url' },
  image: 'image',
  episode: ['string', 'string'],
  url: 'url',
  created: 'created',
};

export const MOCK_CARD_MORTY: RickMortyCharaterDataResult = {
  id: 2,
  name: 'MORTY',
  status: 'status2',
  species: 'species2',
  type: 'type2',
  gender: 'gender2',
  origin: { name: 'origin.name2', url: 'origin.url' },
  location: { name: 'location.name2', url: 'location.url' },
  image: 'image2',
  episode: ['string', 'string'],
  url: 'url',
  created: 'created',
};

export default MOCK_CARD;
