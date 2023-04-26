import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { RootState, setupStore } from './redux/store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
