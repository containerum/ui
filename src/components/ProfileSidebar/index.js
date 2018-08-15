/* @flow */

import React from 'react';

import Scrollspy from 'react-scrollspy';
import { HashLink } from 'react-router-hash-link';

import { routerLinks, sourceType } from '../../config';
import scrollById from '../../functions/scrollById';

import accountStyles from '../../containers/Account/index.scss';

type Props = {
  type: string
};

const ProfileSidebar = ({ type }: Props) => (
  <ul
    className={`${accountStyles.accountMenu} ${
      accountStyles.accountMenuNav
    } nav nav-list`}
  >
    <li>
      <div className={`${accountStyles.navRootItem} nav-root-item`}>
        Account
      </div>
      <Scrollspy
        items={['profile', 'password', 'delete-account']}
        style={{
          padding: '20px 0 0 20px'
        }}
        currentClassName={accountStyles.accountMenuNavActive}
      >
        <li className={`${accountStyles.navItem} nav-item`}>
          {type === 'account' ? (
            <div
              className={`${accountStyles.navLink} nav-link`}
              onClick={() => scrollById('profile')}
              onKeyPress={() => scrollById('profile')}
              role="presentation"
            >
              Profile
            </div>
          ) : (
            <HashLink
              to={`${routerLinks.account}#profile`}
              className={`${accountStyles.navLink} nav-link`}
            >
              Profile
            </HashLink>
          )}
        </li>
        <li className={`${accountStyles.navItem} nav-item`}>
          {type === 'account' ? (
            <div
              className={`${accountStyles.navLink} nav-link`}
              onClick={() => scrollById('password')}
              onKeyPress={() => scrollById('password')}
              role="presentation"
            >
              Password
            </div>
          ) : (
            <HashLink
              to={`${routerLinks.account}#password`}
              className={`${accountStyles.navLink} nav-link`}
            >
              Password
            </HashLink>
          )}
        </li>
        <li className={`${accountStyles.navItem} nav-item`}>
          {type === 'account' ? (
            <div
              className={`${accountStyles.navLink} nav-link`}
              onClick={() => scrollById('cli')}
              onKeyPress={() => scrollById('cli')}
              role="presentation"
            >
              CLI
            </div>
          ) : (
            <HashLink
              to={`${routerLinks.account}#cli`}
              className={`${accountStyles.navLink} nav-link`}
            >
              CLI
            </HashLink>
          )}
        </li>
        <li className={`${accountStyles.navItem} nav-item`}>
          {type === 'account' ? (
            <div
              className={`${accountStyles.navLink} nav-link`}
              onClick={() => scrollById('delete-account')}
              onKeyPress={() => scrollById('delete-account')}
              role="presentation"
            >
              Delete Account
            </div>
          ) : (
            <HashLink
              to={`${routerLinks.account}#delete-account`}
              className={`${accountStyles.navLink} nav-link`}
            >
              Delete Account
            </HashLink>
          )}
        </li>
      </Scrollspy>
    </li>
    {sourceType !== 'ONLINE' && (
      <li>
        <div className={`${accountStyles.navRootItem} nav-root-item`}>
          Settings
        </div>
        <Scrollspy
          items={['ips', 'storages']}
          style={{
            padding: '20px 0 0 20px'
          }}
          currentClassName={accountStyles.accountMenuNavActive}
        >
          <li className={`${accountStyles.navItem} nav-item`}>
            {type === 'settings' ? (
              <div
                className={`${accountStyles.navLink} nav-link`}
                onClick={() => scrollById('ips')}
                onKeyPress={() => scrollById('ips')}
                role="presentation"
              >
                IP`s
              </div>
            ) : (
              <HashLink
                to={`${routerLinks.settings}#ips`}
                className={`${accountStyles.navLink} nav-link`}
              >
                IP`s
              </HashLink>
            )}
          </li>
          <li className={`${accountStyles.navItem} nav-item`}>
            {type === 'settings' ? (
              <div
                className={`${accountStyles.navLink} nav-link`}
                onClick={() => scrollById('storages')}
                onKeyPress={() => scrollById('storages')}
                role="presentation"
              >
                Storages
              </div>
            ) : (
              <HashLink
                to={`${routerLinks.settings}#storages`}
                className={`${accountStyles.navLink} nav-link`}
              >
                Storages
              </HashLink>
            )}
          </li>
        </Scrollspy>
      </li>
    )}
  </ul>
);

export default ProfileSidebar;
