import { PreloadedState } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';

import formReducer from './reducers/formReducer';
import searchReducer from './reducers/searchReducer';
import mortyApi from './mortyService';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { configureStore, combineReducers } = ((toolkitRaw as TypeToolkitRaw)
  .default ?? toolkitRaw) as typeof toolkitRaw;

const rootReducer = combineReducers({
  formReducer,
  searchReducer,
  [mortyApi.reducerPath]: mortyApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        mortyApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
