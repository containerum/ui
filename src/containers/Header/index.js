/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';

import styles from './index.scss';

import * as actionLogout from '../../actions/logout';
import * as actionGetProfile from '../../actions/profileActions/getProfile';
import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import ProfileDropDown from '../../components/ProfileDropDown';
import logo from '../../images/logo.svg';
import imageLogo from '../../images/imageLogo.svg';
import profilePlace from '../../images/profilePlace.svg';

type Props = {
  getProfileReducer: Object,
  fetchGetProfileIfNeeded: () => void,
  fetchLogoutIfNeeded: () => void
};

export class Header extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetProfileIfNeeded } = this.props;
    fetchGetProfileIfNeeded();
  }

  renderProfileDropDown = () => {
    const { getProfileReducer, fetchLogoutIfNeeded } = this.props;

    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <div>
          <div className={styles.headerTopAccount}>
            <div className={styles.headerTopAccountAvatar}>
              <img src={imageLogo} alt="ava" />
            </div>
            <span style={{ marginLeft: '10px' }}>
              <img src={profilePlace} alt="profile" />
            </span>
          </div>
          <div className="clearfix" />
        </div>
      );
    }

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Header!</p>;
    }

    return (
      <ProfileDropDown
        role={getProfileReducer.data.role}
        balance={null}
        email={getProfileReducer.data.login}
        handleLogout={() => fetchLogoutIfNeeded()}
      />
    );
  };

  render() {
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={`container ${styles.headerTopContainer}`}>
              <div className={styles.headerLogo}>
                <NavLink activeClassName="active" to={routerLinks.dashboard}>
                  <img src={logo} alt="logo" />
                </NavLink>
              </div>
              <ul className={`${styles.headerTopMenu} nav`}>
                <li className={`${styles.headerTopMenuLi} nav-item`}>
                  <NavLink
                    activeClassName={styles.headerTopMenuLiActive}
                    to={routerLinks.dashboard}
                    className={styles.headerTopMenuLink}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className={`${styles.headerTopMenuLi} nav-item`}>
                  <NavLink
                    activeClassName={styles.headerTopMenuLiActive}
                    to={routerLinks.namespaces}
                    className={styles.headerTopMenuLink}
                  >
                    Projects
                  </NavLink>
                </li>
                <li className={`${styles.headerTopMenuLi} nav-item`}>
                  <NavLink
                    activeClassName={styles.headerTopMenuLiActive}
                    to={routerLinks.solutions}
                    className={styles.headerTopMenuLink}
                  >
                    Solutions
                  </NavLink>
                </li>
                <li className={`${styles.headerTopMenuLi} nav-item`}>
                  <NavLink
                    activeClassName={styles.headerTopMenuLiActive}
                    to={routerLinks.tools}
                    className={styles.headerTopMenuLink}
                  >
                    Tools
                  </NavLink>
                </li>
              </ul>
              {/* <div className="header-top-admin-mode"> */}
              {/* <div className="header-top-admin-mode__label">Admin<br />mode</div> */}
              {/* <div className="header-top-admin-mode__switcher "></div> */}
              {/* </div> */}
              {this.renderProfileDropDown()}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer }: ReduxState) => ({
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetProfileIfNeeded: () =>
      dispatch(actionGetProfile.fetchGetProfileIfNeeded()),
    fetchLogoutIfNeeded: () => dispatch(actionLogout.fetchLogoutIfNeeded())
  })
);

export default connector(Header);
