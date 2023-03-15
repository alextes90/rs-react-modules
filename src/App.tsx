/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LINKS } from './const';
import Header from './layouts/header/Header';
import AboutUs from './pages/aboutUs/AboutUs';
import ErrorPage from './pages/errorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: LINKS.Main,
    element: <Header />,
    children: [
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
