/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import * as actionGetUserProfileByEmail from '../../actions/profileActions/getUserProfileByEmail';
import * as actionSetUserAsAdmin from '../../actions/userManagement/setUserAsAdmin';
import * as actionUnSetUserAsAdmin from '../../actions/userManagement/unSetUserAsAdmin';
import * as actionResetPasswordOfUser from '../../actions/userManagement/resetPasswordOfUser';
import {
  GET_USER_PROFILE_BY_EMAIL_INVALID,
  GET_USER_PROFILE_BY_EMAIL_REQUESTING,
  GET_USER_PROFILE_BY_EMAIL_FAILURE,
  GET_USER_PROFILE_BY_EMAIL_SUCCESS
} from '../../constants/profileConstants/getUserProfileByEmail';
import type { Dispatch, ReduxState } from '../../types';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileSidebar from '../../components/ProfileSidebar';
import DeleteAccountInfo from '../Account/DeleteAccount';
import globalStyles from '../../theme/global.scss';
import './Account.css';
import styles from './index.scss';
import { RESET_PASSWORD_OF_USER_SUCCESS } from '../../constants/userManagement/resetPasswordOfUser';

type Props = {
  match: Object,
  history: Object,
  getUserProfileByEmailReducer: Object,
  unSetUserAsAdminReducer: Object,
  setUserAsAdminReducer: Object,
  resetPasswordOfUserReducer: Object,
  fetchGetUserProfileByEmailIfNeeded: (login: string) => void,
  fetchSetUserAsAdminIfNeeded: (login: string) => void,
  fetchUnSetUserAsAdminIfNeeded: (login: string) => void,
  fetchResetPasswordOfUserIfNeeded: (login: string) => void
};

const globalClass = classNames.bind(globalStyles);
const containerClassNameSidebar = globalClass(
  'contentBlockContainer',
  'containerFluid',
  'containerNoBackground'
);

export class AccountById extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentDidMount() {
    const { match, fetchGetUserProfileByEmailIfNeeded } = this.props;
    fetchGetUserProfileByEmailIfNeeded(match.params.idUser);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getUserProfileByEmailReducer.readyStatus !==
        nextProps.getUserProfileByEmailReducer.readyStatus &&
      nextProps.getUserProfileByEmailReducer.readyStatus ===
        GET_USER_PROFILE_BY_EMAIL_SUCCESS
    ) {
      if (nextProps.getUserProfileByEmailReducer.data.role === 'admin') {
        this.setState({
          ...this.state,
          isChecked: true
        });
      }
    }
    if (
      this.props.resetPasswordOfUserReducer.readyStatus !==
        nextProps.resetPasswordOfUserReducer.readyStatus &&
      nextProps.resetPasswordOfUserReducer.readyStatus ===
        RESET_PASSWORD_OF_USER_SUCCESS
    ) {
      // console.log(nextProps.resetPasswordOfUserReducer);
    }
  }

  handleChangeCheckBox = () => {
    const {
      match,
      fetchSetUserAsAdminIfNeeded,
      fetchUnSetUserAsAdminIfNeeded
    } = this.props;
    this.setState(
      {
        ...this.state,
        isChecked: !this.state.isChecked
      },
      () => {
        if (this.state.isChecked) {
          fetchSetUserAsAdminIfNeeded(match.params.idUser);
        } else {
          fetchUnSetUserAsAdminIfNeeded(match.params.idUser);
        }
      }
    );
  };
  handleClickResetPassword = () => {
    const { match, fetchResetPasswordOfUserIfNeeded } = this.props;
    fetchResetPasswordOfUserIfNeeded(match.params.idUser);
  };

  renderProfileInfo = () => {
    const {
      match,
      getUserProfileByEmailReducer,
      unSetUserAsAdminReducer,
      setUserAsAdminReducer
    } = this.props;
    const containerClassName = globalClass(
      'contentBlockContainer',
      'containerFluid'
    );
    if (
      !getUserProfileByEmailReducer.readyStatus ||
      getUserProfileByEmailReducer.readyStatus ===
        GET_USER_PROFILE_BY_EMAIL_INVALID ||
      getUserProfileByEmailReducer.readyStatus ===
        GET_USER_PROFILE_BY_EMAIL_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/acc-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="account"
        />
      );
    }

    if (
      getUserProfileByEmailReducer.readyStatus ===
      GET_USER_PROFILE_BY_EMAIL_FAILURE
    ) {
      return <p>Oops, Failed to load data of Account!</p>;
    }

    const { data } = getUserProfileByEmailReducer;
    const { first_name: firstName } = data.data || { first_name: null };
    const { is_active: isActive } = data;
    const isFetchingAdmin =
      setUserAsAdminReducer.isFetching || unSetUserAsAdminReducer.isFetching;
    return (
      <div className={`${containerClassName} container`}>
        <ProfileInfo
          login={match.params.idUser}
          firstName={firstName}
          name={match.params.idUser}
          statusUser={isActive ? 'active' : 'inactive'}
          isChecked={this.state.isChecked}
          isDisabledCheckBox={isFetchingAdmin}
          handleChangeCheckBox={this.handleChangeCheckBox}
        />
        <DeleteAccountInfo login={match.params.idUser} type="local" />
      </div>
    );
  };
  renderProfileSideBar = () => {
    const { getUserProfileByEmailReducer } = this.props;
    if (
      !getUserProfileByEmailReducer.readyStatus ||
      getUserProfileByEmailReducer.readyStatus ===
        GET_USER_PROFILE_BY_EMAIL_INVALID ||
      getUserProfileByEmailReducer.readyStatus ===
        GET_USER_PROFILE_BY_EMAIL_REQUESTING
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

    if (
      getUserProfileByEmailReducer.readyStatus ===
      GET_USER_PROFILE_BY_EMAIL_FAILURE
    ) {
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
                    {/* {this.renderProfileSideBar()} */}
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
  ({
    getUserProfileByEmailReducer,
    unSetUserAsAdminReducer,
    setUserAsAdminReducer,
    resetPasswordOfUserReducer
  }: ReduxState) => ({
    getUserProfileByEmailReducer,
    unSetUserAsAdminReducer,
    setUserAsAdminReducer,
    resetPasswordOfUserReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetUserProfileByEmailIfNeeded: (login: string) =>
      dispatch(
        actionGetUserProfileByEmail.fetchGetUserProfileByEmailIfNeeded(login)
      ),
    fetchSetUserAsAdminIfNeeded: (login: string) =>
      dispatch(actionSetUserAsAdmin.fetchSetUserAsAdminIfNeeded(login)),
    fetchUnSetUserAsAdminIfNeeded: (login: string) =>
      dispatch(actionUnSetUserAsAdmin.fetchUnSetUserAsAdminIfNeeded(login)),
    fetchResetPasswordOfUserIfNeeded: (login: string) =>
      dispatch(
        actionResetPasswordOfUser.fetchResetPasswordOfUserIfNeeded(login)
      )
  })
);

export default connector(AccountById);
