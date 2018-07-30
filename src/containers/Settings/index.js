/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames/bind';
import _ from 'lodash/fp';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import {
  GET_DOMAINS_INVALID,
  GET_DOMAINS_REQUESTING,
  GET_DOMAINS_FAILURE
} from '../../constants/domainsConstants/getDomains';
import * as actionGetDomains from '../../actions/DomainsActions/getDomains';
import type { Dispatch, ReduxState } from '../../types';
// import Notification from '../Notification';
import ProfileSidebar from '../../components/ProfileSidebar';
import globalStyles from '../../theme/global.scss';
import accountStyles from '../Account/index.scss';

type Props = {
  history: Object,
  getDomainsReducer: Object,
  fetchGetDomainsIfNeeded: () => void
};

const globalClassName = classNames.bind(globalStyles);

export class Settings extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { fetchGetDomainsIfNeeded } = this.props;
    fetchGetDomainsIfNeeded();
  }
  // componentWillUpdate(nextProps) {
  // }

  renderProfileSideBar = () => {
    const { getDomainsReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING
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

    return <ProfileSidebar type="settings" />;
  };
  renderProfileInfo = () => {
    const { getDomainsReducer } = this.props;

    if (
      !getDomainsReducer.readyStatus ||
      getDomainsReducer.readyStatus === GET_DOMAINS_INVALID ||
      getDomainsReducer.readyStatus === GET_DOMAINS_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/billing-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="billing"
        />
      );
    }

    if (getDomainsReducer.readyStatus === GET_DOMAINS_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    const containerClassName = globalClassName(
      'contentBlockContainer',
      'containerFluid'
    );

    return (
      <div className={`${containerClassName} container`}>
        <div className={globalStyles.blockItem} id="information">
          <div className={globalStyles.blockItemTitle}>Settings</div>
          <div className="row">
            <div className="col-md-4">qwer</div>

            <div className="col-md-8">
              <div className="row">rewq</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const containerClassNameSidebar = globalClassName(
      'contentBlockContainer',
      'containerFluid',
      'containerNoBackground'
    );

    return (
      <div>
        <Helmet title="Settings" />
        <div className={globalStyles.contentBlock}>
          <div
            className={`container ${
              globalStyles.containerNoBackground
            } pl-0 pr-0`}
          >
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <div
                  className={`${globalStyles.contentBlock} ${
                    accountStyles.accountInfo
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
  ({ getDomainsReducer }: ReduxState) => ({
    getDomainsReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetDomainsIfNeeded: () =>
      dispatch(actionGetDomains.fetchGetDomainsIfNeeded())
  })
);

export default connector(Settings);
