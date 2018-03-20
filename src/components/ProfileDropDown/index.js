/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Blockies from 'react-blockies';

import { routerLinks } from '../../config';
// import deployment from '../../images/deployment.png';

type Props = {
  email: string,
  balance: string,
  handleLogout: () => void
};

const ProfileDropDown = ({ email, balance, handleLogout }: Props) => (
  <div>
    <div className="header-top-account">
      <div className="header-top-account__avatar">
        <Blockies seed={email} size={9} scale={3} bgColor="#fff" />
      </div>
      <div className="header-top-account__info">
        <div className="header-top-account__name dropdown">
          <a
            href="##"
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {email}
          </a>
          <ul className="dropdown-menu dropdown-menu-right" role="menu">
            <NavLink
              activeClassName="active"
              className="dropdown-item"
              to="/account"
            >
              Account
            </NavLink>
            <NavLink
              activeClassName="active"
              className="dropdown-item"
              to="/billing"
            >
              Billing
            </NavLink>
            <NavLink
              activeClassName="active"
              className="dropdown-item"
              to="/settings"
            >
              Settings
            </NavLink>
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
        <div className="header-top-account__deposit">
          {balance ? parseFloat(balance).toFixed(2) : 0}$
        </div>
      </div>
    </div>
    <div className="clearfix" />
  </div>
);

export default ProfileDropDown;
