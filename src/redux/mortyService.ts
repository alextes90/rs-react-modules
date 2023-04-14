import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_QUERY } from '../const';
import {
  RickMortyCharaterDataResult,
  RickMortyRes,
} from '../interfaces/interfaces';

const mortyApi = createApi({
  reducerPath: 'mortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_QUERY }),
  endpoints: (build) => ({
    fetchCharactersByName: build.query<RickMortyRes, string>({
      query: (name) => ({
        url: `/character/`,
        params: {
          name,
        },
      }),
    }),
    fetchCharacterById: build.query<RickMortyCharaterDataResult, string>({
      query: (id) => ({ url: `/character/${id}` }),
    }),
  }),
});

export default mortyApi;
