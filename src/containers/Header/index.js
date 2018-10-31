/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import cloneDeep from 'clone-deep';

import styles from './index.scss';

import * as actionLogout from '../../actions/logout';
import * as actionGetProfile from '../../actions/profileActions/getProfile';
import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import type {
  Dispatch,
  Namespaces as NamespacesType,
  ReduxState
} from '../../types';
import { routerLinks } from '../../config';
import ProfileDropDown from '../../components/ProfileDropDown';
import logo from '../../images/logo.svg';
import imageLogo from '../../images/imageLogo.svg';
import profilePlace from '../../images/profilePlace.svg';
import eventsLogo from '../../images/notification.svg';
import { GET_NAMESPACES_SUCCESS } from '../../constants/namespacesConstants/getNamespaces';
import getEventList from '../../functions/WS/getEventList';
import EventsSidebar from '../NamespacesSidebar';

type Props = {
  getProfileReducer: Object,
  getNamespacesReducer: NamespacesType,
  fetchGetProfileIfNeeded: () => void,
  fetchLogoutIfNeeded: () => void
};

export class Header extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
      events: [],
      displayedNamespaces: []
    };
  }

  componentDidMount() {
    const { fetchGetProfileIfNeeded } = this.props;
    fetchGetProfileIfNeeded();
    this.clientSocket = getEventList();
    if (this.clientSocket) {
      this.clientSocket.onerror = () => this.onMessageFailure();
      this.clientSocket.onmessage = evt => {
        const resultString = JSON.parse(evt.data);
        this.onMessageReceived(resultString);
      };
    } else {
      this.clientSocket.onerror = () => this.onMessageFailure();
    }
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getNamespacesReducer.readyStatus !==
        nextProps.getNamespacesReducer.readyStatus &&
      nextProps.getNamespacesReducer.readyStatus === GET_NAMESPACES_SUCCESS
    ) {
      this.setState({
        ...this.state,
        displayedNamespaces: nextProps.getNamespacesReducer.data
      });
    }
  }

  onMessageReceived = data => {
    const nextEvents = cloneDeep(this.state.events);
    if (nextEvents.length >= 200) {
      nextEvents.splice(-data.length, data.length);
    }
    const result = data.concat(nextEvents);
    this.setState({ ...this.state, events: result });
  };
  onMessageFailure = () => {
    this.setState({
      ...this.state,
      errorMessage: 'Failed to connect to server'
    });
  };
  clientSocket = socket => socket;
  handleCloseSidebar = () => {
    this.setState({
      isSidebarOpen: false
    });
  };
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
        email={getProfileReducer.data.login}
        handleLogout={() => fetchLogoutIfNeeded()}
      />
    );
  };

  render() {
    const { isSidebarOpen, events } = this.state;
    const namespaceToProps = this.state.displayedNamespaces.map(namespace => {
      const result = { id: namespace.id, label: namespace.label };
      return result;
    });
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
              <img
                src={eventsLogo}
                alt="events"
                className={styles.headerTopEventButton}
                onClick={() => {
                  this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
                }}
              />
              {/* <div className="header-top-admin-mode"> */}
              {/* <div className="header-top-admin-mode__label">Admin<br />mode</div> */}
              {/* <div className="header-top-admin-mode__switcher "></div> */}
              {/* </div> */}
              {this.renderProfileDropDown()}
              {isSidebarOpen && (
                <EventsSidebar
                  handleCloseSidebar={this.handleCloseSidebar}
                  isSidebarOpen={isSidebarOpen}
                  eventsArray={events}
                  namespacesArray={namespaceToProps}
                />
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer, getNamespacesReducer }: ReduxState) => ({
    getProfileReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetProfileIfNeeded: () =>
      dispatch(actionGetProfile.fetchGetProfileIfNeeded()),
    fetchLogoutIfNeeded: () => dispatch(actionLogout.fetchLogoutIfNeeded())
  })
);

export default connector(Header);
