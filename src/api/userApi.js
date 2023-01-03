import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/users/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: 'create',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: 'login',
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: loginInfo,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
