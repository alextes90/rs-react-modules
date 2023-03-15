/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LINKS } from './const';
import Header from './layouts/header/Header';
import AboutUs from './pages/aboutUsPage/AboutUs';
import ErrorPage from './pages/errorPage/ErrorPage';
import MainPage from './pages/mainPage/mainPage';

const router = createBrowserRouter([
  {
    path: LINKS.Main,
    element: <Header />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: LINKS['About Us'],
        element: <AboutUs />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
