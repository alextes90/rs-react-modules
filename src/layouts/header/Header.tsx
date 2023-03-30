import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LINKS } from '../../const';
import styles from './Header.module.scss';
import withRouterHOC from '../../hoc/withRouterHOC';
import { WithRouterProps } from '../../interfaces/interfaces';

const Header = ({ location }: WithRouterProps) => {
  const [pageToDisplay] =
    Object.entries(LINKS).find(([, val]) => {
      let checker = val;
      if (val.length > 1) {
        checker = `/${val}`;
      }
      return location.pathname === checker;
    }) || '';
  return (
    <>
      <header className={styles.header}>
        <div>
          <div>Current Page: {pageToDisplay || '404'}</div>
          <nav>
            <ul className={styles.list}>
              {Object.entries(LINKS).map(([key, val]) => {
                return (
                  <li key={key}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? styles.active : styles.link
                      }
                      to={val}
                      end
                    >
                      {key}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default withRouterHOC(Header);
