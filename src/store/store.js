import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from 'api/todoApi';
import { userApi } from 'api/userApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, todoApi.middleware]),
});
