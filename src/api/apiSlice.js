import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users/create',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: 'users/login',
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('token'),
        },
        body: loginInfo,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = apiSlice;
