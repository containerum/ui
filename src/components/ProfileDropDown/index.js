/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Blockies from 'react-blockies';

import { routerLinks, sourceType } from '../../config';
// import deployment from '../../images/deployment.png';

import styles from '../../containers/Header/index.scss';
import globalStyles from '../../theme/global.scss';

type Props = {
  role: string,
  email: string,
  balance: string,
  handleLogout: () => void
};

const isOnline = sourceType === 'ONLINE';

const ProfileDropDown = ({ email, balance, handleLogout, role }: Props) => (
  <div>
    <div className={styles.headerTopAccount}>
      <div className={styles.headerTopAccountAvatar}>
        <Blockies seed={email} size={9} scale={3} bgColor="#fff" />
      </div>
      <div className={styles.headerTopAccountInfo}>
        <div className={`${styles.headerTopAccountName} dropdown`}>
          <a
            href="##"
            className={`${styles.customDropdownToggle} dropdown-toggle`}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={
              isOnline || role === 'admin'
                ? {}
                : {
                    marginTop: 6
                  }
            }
          >
            {email}
          </a>
          <ul
            className={`${
              globalStyles.dropdownMenu
            } dropdown-menu dropdown-menu-right`}
            style={{ zIndex: '1000' }}
            role="menu"
          >
            <NavLink
              activeClassName="active"
              className="dropdown-item"
              to={routerLinks.account}
            >
              Account
            </NavLink>
            {isOnline && (
              <NavLink
                activeClassName="active"
                className="dropdown-item"
                to={routerLinks.billing}
              >
                Billing
              </NavLink>
            )}
            {!isOnline && (
              <NavLink
                activeClassName="active"
                className="dropdown-item"
                to={routerLinks.settings}
              >
                Settings
              </NavLink>
            )}
            {role === 'admin' && (
              <NavLink
                activeClassName="active"
                className="dropdown-item"
                to={routerLinks.getGlobalMembership}
              >
                Membership
              </NavLink>
            )}
            <NavLink
              activeClassName="active"
              className="dropdown-item text-danger"
              to={routerLinks.login}
              onClick={() => handleLogout()}
            >
              Log out
            </NavLink>
          </ul>
        </div>

        {isOnline && (
          <div className={styles.headerTopAccountDeposit}>
            {balance ? parseFloat(balance).toFixed(2) : 0}$
          </div>
        )}
        {!isOnline &&
          role === 'admin' && (
            <div className={styles.headerTopAccountDeposit}>(admin)</div>
          )}
      </div>
    </div>
    <div className="clearfix" />
  </div>
);

export default ProfileDropDown;
