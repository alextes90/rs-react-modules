/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LINKS } from '../../const';
import styles from './Header.module.scss';
import withRouterHOC from './withRouterHOC';
import { WithRouterProps } from '../../interfaces/interfaces';

class Header extends React.Component<WithRouterProps> {
  render() {
    const { location } = this.props;
    const pageToDisplay =
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
            <div>Current Page: {pageToDisplay[0] || '404'}</div>
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
  }
}

export default withRouterHOC(Header);
