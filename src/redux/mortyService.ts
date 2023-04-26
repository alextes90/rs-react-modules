import * as ToolkitRaw from '@reduxjs/toolkit/dist/query/react/index.js';
import { BASE_URL_QUERY } from '../const';
import {
  RickMortyCharaterDataResult,
  RickMortyRes,
} from '../interfaces/interfaces';
import createApi from './createApi';

type TypeQuery = typeof ToolkitRaw & { default?: unknown };
const { fetchBaseQuery } = ((ToolkitRaw as TypeQuery).default ??
  ToolkitRaw) as typeof ToolkitRaw;

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
