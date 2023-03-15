/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LINKS } from '../../const';
import styles from './Header.module.scss';

class Header extends React.Component {
  render() {
    return (
      <>
        <header className={styles.header}>
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
        </header>
        <Outlet />
      </>
    );
  }
}

export default Header;
