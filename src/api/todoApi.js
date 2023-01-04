import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todo',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/todos' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      providesTags: ['Todo'],
      query: () => ({
        url: '/',
        headers: { Authorization: localStorage.getItem('token') },
      }),
    }),
    getTodoById: builder.query({
      providesTags: ['Todo'],
      query: ({ id }) => ({
        url: `/${id}`,
        headers: { Authorization: localStorage.getItem('token') },
      }),
    }),
    createTodo: builder.mutation({
      invalidatesTags: ['Todo'],
      query: (todo) => ({
        url: '',
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      invalidatesTags: ['Todo'],
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }),
    }),
    updateTodo: builder.mutation({
      invalidatesTags: ['Todo'],
      query: (todo) => ({
        url: `/${todo.id}`,
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: { title: todo.title, content: todo.content },
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
