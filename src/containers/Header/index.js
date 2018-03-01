/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
// import _ from 'lodash/fp';

import * as actionLogout from '../../actions/logout';
import * as actionGetProfile from '../../actions/profileActions/getProfile';
import * as actionGetBalance from '../../actions/billingActions/getBalance';
import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import {
  GET_BALANCE_INVALID,
  GET_BALANCE_REQUESTING,
  GET_BALANCE_FAILURE
} from '../../constants/billingConstants/getBalance';
import type { Dispatch, ReduxState } from '../../types';
import { routerLinks } from '../../config';
import ProfileDropDown from '../../components/ProfileDropDown';
import logo from '../../images/logo.svg';
import imageLogo from '../../images/imageLogo.svg';
import profilePlace from '../../images/profilePlace.svg';

type Props = {
  getProfileReducer: Object,
  getBalanceReducer: Object,
  fetchGetBalanceIfNeeded: () => void,
  fetchGetProfileIfNeeded: () => void,
  fetchLogoutIfNeeded: () => void
};

// Export this for unit testing more easily
export class Header extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetProfileIfNeeded, fetchGetBalanceIfNeeded } = this.props;
    fetchGetProfileIfNeeded();
    fetchGetBalanceIfNeeded();
  }

  renderProfileDropDown = () => {
    const {
      getProfileReducer,
      getBalanceReducer,
      fetchLogoutIfNeeded
    } = this.props;

    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING ||
      (!getBalanceReducer.readyStatus ||
        getBalanceReducer.readyStatus === GET_BALANCE_INVALID ||
        getBalanceReducer.readyStatus === GET_BALANCE_REQUESTING)
    ) {
      return (
        <div>
          <div className="header-top-account">
            <div className="header-top-account__avatar">
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

    if (
      getProfileReducer.readyStatus === GET_PROFILE_FAILURE ||
      getBalanceReducer.readyStatus === GET_BALANCE_FAILURE
    ) {
      return <p>Oops, Failed to load data of Header!</p>;
    }

    return (
      <ProfileDropDown
        balance={getBalanceReducer.data.balance}
        email={getProfileReducer.data.login}
        handleLogout={() => fetchLogoutIfNeeded()}
      />
    );
  };

  render() {
    return (
      <div>
        <header className="header">
          <div className="header-top">
            <div className="header-top-container container">
              <div className="header__logo">
                <NavLink activeClassName="active" to={routerLinks.namespaces}>
                  <img src={logo} alt="logo" />
                </NavLink>
              </div>
              <ul className="header-top-menu nav">
                <li className="header-top-menu__li nav-item">
                  <NavLink
                    activeClassName="active"
                    to={routerLinks.namespaces}
                    className="header-top-menu__link"
                  >
                    Namespaces
                  </NavLink>
                </li>
                <li className="header-top-menu__li nav-item">
                  <NavLink
                    activeClassName="active"
                    to={routerLinks.volumes}
                    className="header-top-menu__link"
                  >
                    Volumes
                  </NavLink>
                </li>
                <li className="header-top-menu__li header-top-menu__li_last nav-item">
                  <NavLink
                    activeClassName="active"
                    to={routerLinks.support}
                    className="header-top-menu__link"
                  >
                    Support
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
  ({ getProfileReducer, getBalanceReducer }: ReduxState) => ({
    getProfileReducer,
    getBalanceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetProfileIfNeeded: () =>
      dispatch(actionGetProfile.fetchGetProfileIfNeeded()),
    fetchGetBalanceIfNeeded: () =>
      dispatch(actionGetBalance.fetchGetBalanceIfNeeded()),
    fetchLogoutIfNeeded: () => dispatch(actionLogout.fetchLogoutIfNeeded())
  })
);

export default connector(Header);
