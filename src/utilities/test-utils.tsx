import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { RootState } from '../redux/store';
import formReducer from '../redux/reducers/formReducer';
import searchReducer from '../redux/reducers/searchReducer';
import mortyApi from '../redux/mortyService';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = undefined,
    store = configureStore({
      reducer: {
        formReducer,
        searchReducer,
        [mortyApi.reducerPath]: mortyApi.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
          mortyApi.middleware
        ),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
