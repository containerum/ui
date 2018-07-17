import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import AdminDeleteUserModal from '../../components/CustomerModal/AdminDeleteUserModal';
import AddGlobalUserMembershipModal from '../../components/CustomerModal/AddGlobalMembershipModal';
import GlobalMembershipList from '../../components/GlobalMembershipList';
import type { Dispatch, ReduxState } from '../../types';
import * as actionAddGlobalUserIfNeeded from '../../actions/globalMembership/addUser';
import * as actionAdminDeleteUserIfNeeded from '../../actions/globalMembership/adminDeleteUser';
import * as actionGetUserListIfNeeded from '../../actions/globalMembership/getUserList';
import {
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_REQUESTING,
  GET_USER_LIST_INVALID
} from '../../constants/globalMembershipConstants/getUserList';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import globalStyles from '../../theme/global.scss';
import styles from '../Membership/index.scss';
import buttonsStyles from '../../theme/buttons.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockContainer',
  'contentBlockContainerMembership'
);
const labelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMembership',
  'contentBlockHeaderLabelMain',
  'contentBlockHeaderLabelNamespaceInfo'
);
const menuClassName = globalClass(
  'contentBlockMenu',
  'contentBlockMenuMembership'
);
const liClassName = globalClass(
  'contentBlockMenuLi',
  'contentBlockMenuLiMembership'
);

type Props = {
  match: Object,
  history: Object,
  adminDeleteUserReducer: Object,
  getUserListReducer: Object,
  getProfileReducer: Object,
  addUserReducer: Object,
  fetchGetUserListIfNeeded: () => void,
  fetchAddGlobalUserIfNeeded: (login: string) => void,
  fetchAdminDeleteUserIfNeeded: (username: string) => void
};

class GlobalMembership extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      inputEmailDelete: '',
      inputEmailAdd: '',
      isOpen: false,
      isOpenAdd: false,
      idUser: null,
      accessNewUser: 'read',
      accessUser: 'read',
      membersList: [],
      errAdd: null
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { fetchGetUserListIfNeeded } = this.props;
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      fetchGetUserListIfNeeded();
    }
  }

  choiceAccessNewUser = access => {
    this.setState({
      ...this.state,
      accessNewUser: access
    });
  };

  handleDeleteDMembers = idUser => {
    this.setState({
      ...this.state,
      idUser,
      isOpen: true
    });
  };
  handleAddMembersAdd = () => {
    this.setState({
      ...this.state,
      isOpenAdd: true
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
      idUser: null,
      inputEmailDelete: ''
    });
  };
  handleOpenCloseModalAdd = () => {
    this.setState({
      isOpenAdd: !this.state.isOpenAdd,
      accessNewUser: 'read',
      inputEmailAdd: '',
      errAdd: null
    });
  };
  handleInputEmailDelete = inputEmailDelete => {
    this.setState({
      ...this.state,
      inputEmailDelete
    });
  };
  handleInputEmailAdd = inputEmailAdd => {
    this.setState({
      ...this.state,
      inputEmailAdd
    });
  };

  renderGlobalMembershipList = () => {
    const { match, getUserListReducer } = this.props;
    if (
      !getUserListReducer.readyStatus ||
      getUserListReducer.readyStatus === GET_USER_LIST_INVALID ||
      getUserListReducer.readyStatus === GET_USER_LIST_REQUESTING
    ) {
      return (
        <div
          style={{
            height: '200px',
            margin: '10px 0',
            borderRadius: '2px',
            backgroundColor: '#f6f6f6'
          }}
        />
      );
    }

    if (getUserListReducer.readyStatus === GET_USER_LIST_FAILURE) {
      return <p>Oops, Failed to load data of Users!</p>;
    }

    return (
      <GlobalMembershipList
        idName={match.params.idName}
        membersList={getUserListReducer.data.users}
        changeAccessUser={this.changeAccessUser}
        handleDeleteDMembers={this.handleDeleteDMembers}
      />
    );
  };

  render() {
    const {
      getUserListReducer,
      adminDeleteUserReducer,
      getProfileReducer,
      addUserReducer,
      fetchAddGlobalUserIfNeeded,
      fetchAdminDeleteUserIfNeeded
    } = this.props;
    const {
      status: statusAdd,
      login: loginAdd,
      isFetching: isFetchingAdd,
      method: methodAdd,
      err: errAdd
    } = addUserReducer;
    const {
      status: statusDelete,
      idName: idNameDelete,
      err: errDelete
    } = adminDeleteUserReducer;
    let userDelete;
    if (getUserListReducer.data.users) {
      userDelete = getUserListReducer.data.users.find(
        user => user.login === this.state.inputEmailDelete
      );
    }
    let idUserDelete;
    if (userDelete) {
      idUserDelete = userDelete.id;
    }
    const label = getProfileReducer.data
      ? getProfileReducer.data.login
      : idUserDelete;
    return (
      <div>
        <Helmet title={`Users of ${label}`} />
        <Notification
          status={statusDelete}
          name={idNameDelete}
          errorMessage={errDelete}
        />

        <Notification
          status={statusAdd}
          name={loginAdd}
          method={methodAdd}
          errorMessage={errAdd}
        />

        <AdminDeleteUserModal
          type="Delete User"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          idName={idUserDelete}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchAdminDeleteUserIfNeeded}
        />
        <AddGlobalUserMembershipModal
          type="Add User"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={fetchAddGlobalUserIfNeeded}
          isFetchingAdd={isFetchingAdd}
          namespaceId={idUserDelete}
          err={this.state.errAdd}
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  <div className={`${containerClassName} container`}>
                    <div className={globalStyles.contentBlockHeader}>
                      <div
                        className={labelClassName}
                        style={{ textTransform: 'lowercase' }}
                      >
                        {label}
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <ul
                          className={`${menuClassName} nav nav-pills`}
                          role="tablist"
                          style={{ height: '50px' }}
                        >
                          <li style={{ display: 'flex' }}>
                            <li
                              className={`${liClassName} nav-item`}
                              style={{ width: 'auto' }}
                            >
                              <NavLink
                                activeClassName={
                                  globalStyles.contentBlockMenuLiActive
                                }
                                to={routerLinks.getGlobalMembership}
                              >
                                Users
                              </NavLink>
                            </li>
                            <li
                              className={`${liClassName} nav-item`}
                              style={{ width: 'auto' }}
                            >
                              <NavLink
                                activeClassName={
                                  globalStyles.contentBlockMenuLiActive
                                }
                                to={routerLinks.getGlobalGroups}
                              >
                                Groups
                              </NavLink>
                            </li>
                          </li>
                          <li className={styles.membershipBtnContainer}>
                            <button
                              className={`${
                                buttonsStyles.buttonUIAddMembership
                              } btn btn-outline-primary fancybox`}
                              onClick={this.handleAddMembersAdd}
                            >
                              Add User
                            </button>
                          </li>
                        </ul>
                      </div>

                      {this.renderGlobalMembershipList()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    getProfileReducer,
    getUserListReducer,
    adminDeleteUserReducer,
    addUserReducer
  }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    getProfileReducer,
    getUserListReducer,
    adminDeleteUserReducer,
    addUserReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetUserListIfNeeded: () =>
      dispatch(actionGetUserListIfNeeded.fetchGetUserListIfNeeded()),
    fetchAddGlobalUserIfNeeded: (login: string) =>
      dispatch(actionAddGlobalUserIfNeeded.fetchAddGlobalUserIfNeeded(login)),
    fetchAdminDeleteUserIfNeeded: (idName: string, username: string) =>
      dispatch(
        actionAdminDeleteUserIfNeeded.fetchAdminDeleteUserIfNeeded(
          idName,
          username
        )
      )
  })
);

export default connector(GlobalMembership);
