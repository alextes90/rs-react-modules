import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formReducer';
import searchReducer from './reducers/searchReducer';
import mortyApi from './mortyService';

export const store = configureStore({
  reducer: {
    formReducer,
    searchReducer,
    [mortyApi.reducerPath]: mortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      mortyApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
