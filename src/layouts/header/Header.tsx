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
    return (
      <>
        <header className={styles.header}>
          <div>
            <div>
              Current Page:{' '}
              {location.pathname === LINKS.Main ? 'Main' : 'About Us'}
            </div>
            <nav>
              <ul className={styles.list}>
                {Object.entries(LINKS).map((link) => {
                  return (
                    <li key={link[0]}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? styles.active : styles.link
                        }
                        to={link[1]}
                        end
                      >
                        {link[0]}
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
