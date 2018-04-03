/* @flow */

import React from 'react';

import Scrollspy from 'react-scrollspy';
import { HashLink } from 'react-router-hash-link';
import scrollById from '../../functions/scrollById';

type Props = {
  type: string
};

const ProfileSidebar = ({ type }: Props) => (
  <ul className="account-menu nav nav-list">
    <li>
      <div className="nav-root-item">Account</div>
      <Scrollspy
        items={['profile', 'password', 'delete-account']}
        style={{
          padding: '20px 0 0 20px'
        }}
        currentClassName="active"
      >
        <li className="nav-item">
          {type === 'account' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('profile')}
              onKeyPress={() => scrollById('profile')}
              role="presentation"
            >
              Profile
            </div>
          ) : (
            <HashLink to="/account#profile" className="nav-link">
              Profile
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'account' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('password')}
              onKeyPress={() => scrollById('password')}
              role="presentation"
            >
              Password
            </div>
          ) : (
            <HashLink to="/account#password" className="nav-link">
              Password
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'account' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('cli')}
              onKeyPress={() => scrollById('cli')}
              role="presentation"
            >
              CLI
            </div>
          ) : (
            <HashLink to="/account#cli" className="nav-link">
              CLI
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'account' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('delete-account')}
              onKeyPress={() => scrollById('delete-account')}
              role="presentation"
            >
              Delete Account
            </div>
          ) : (
            <HashLink to="/account#delete-account" className="nav-link">
              Delete Account
            </HashLink>
          )}
        </li>
      </Scrollspy>
    </li>
    <li>
      <div className="nav-root-item">Billing</div>
      <Scrollspy
        items={['information', 'add-funds', 'coupon', 'history']}
        style={{
          padding: '20px 0 0 20px'
        }}
        currentClassName="active"
      >
        <li className="nav-item">
          {type === 'billing' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('information')}
              onKeyPress={() => scrollById('information')}
              role="presentation"
            >
              Information
            </div>
          ) : (
            <HashLink to="/billing#information" className="nav-link">
              Information
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'billing' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('add-funds')}
              onKeyPress={() => scrollById('add-funds')}
              role="presentation"
            >
              Payment method
            </div>
          ) : (
            <HashLink to="/billing#add-funds" className="nav-link">
              Payment method
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'billing' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('coupon')}
              onKeyPress={() => scrollById('coupon')}
              role="presentation"
            >
              Promo code
            </div>
          ) : (
            <HashLink to="/billing#coupon" className="nav-link">
              Coupon
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          {type === 'billing' ? (
            <div
              className="nav-link"
              onClick={() => scrollById('history')}
              onKeyPress={() => scrollById('history')}
              role="presentation"
            >
              History
            </div>
          ) : (
            <HashLink to="/billing#history" className="nav-link">
              History
            </HashLink>
          )}
        </li>
      </Scrollspy>
    </li>
  </ul>
);

export default ProfileSidebar;
