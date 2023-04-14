import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../const';

const mortyApi = createApi({
  reducerPath: 'mortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  }
});

export default mortyApi;
