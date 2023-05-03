import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from './layouts/header/Header';

const routes = [
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '',
        element: <div>Main Page</div>,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
      {
        path: '/forms',
        element: <div>Forms</div>,
      },
      {
        path: '*',
        element: <div>Error</div>,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/about'],
});

const badRout = createMemoryRouter(routes, {
  initialEntries: ['/badrout'],
});

describe('Router', () => {
  it('Renders about page', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Current Page: About Us/i)).toBeInTheDocument();
  });
  it('Render 404 if wrong path', async () => {
    render(<RouterProvider router={badRout} />);
    expect(await screen.findByText(/Current Page: 404/i)).toBeInTheDocument();
  });
});
