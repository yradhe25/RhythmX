import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', '90d45e1060mshc9a8cd61f10ccd3p1f4a11jsn4e5f9723681d');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/world?country_code=DZ' }),
    getSongDetails: builder.query({ query: ({ songid }) => `tracks/details?track_id=${songid}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
} = shazamCoreApi;