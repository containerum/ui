/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import type { ReduxState } from '../../types';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileSidebar from '../../components/ProfileSidebar';
import ProfilePassword from './Password';
import DeleteAccountInfo from './DeleteAccount';
import CLI from '../../components/CLIInfo';
import globalStyles from '../../theme/global.scss';
import './Account.css';
import styles from './index.scss';

type Props = {
  history: Object,
  getProfileReducer: Object
};

const globalClass = classNames.bind(globalStyles);
const containerClassNameSidebar = globalClass(
  'contentBlockContainer',
  'containerFluid',
  'containerNoBackground'
);

export class Account extends PureComponent<Props> {
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  renderProfileInfo = () => {
    const { getProfileReducer } = this.props;
    const containerClassName = globalClass(
      'contentBlockContainer',
      'containerFluid'
    );
    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/acc-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="account"
        />
      );
    }

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Account!</p>;
    }

    return (
      <div className={`${containerClassName} container`}>
        <ProfileInfo
          firstName={getProfileReducer.data.data.first_name}
          login={getProfileReducer.data.login}
        />
        <ProfilePassword />
        <CLI />
        <DeleteAccountInfo login={getProfileReducer.data.login} />
      </div>
    );
  };
  renderProfileSideBar = () => {
    const { getProfileReducer } = this.props;
    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <div>
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ width: '100%' }}
            alt="sidebar"
          />
          {new Array(7)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ marginTop: '30px', width: '100%' }}
            alt="sidebar"
          />
          {new Array(4)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
        </div>
      );
    }

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Account!</p>;
    }

    return <ProfileSidebar type="account" />;
  };

  render() {
    return (
      <div>
        <Helmet title="Account" />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <div
                  className={`${globalStyles.contentBlock} ${
                    styles.accountInfo
                  }`}
                >
                  <div
                    className={`${containerClassNameSidebar} container pl-0 pr-0`}
                  >
                    {this.renderProfileSideBar()}
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  {this.renderProfileInfo()}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer }: ReduxState) => ({ getProfileReducer })
);

export default connector(Account);
