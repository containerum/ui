import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import cookie from 'react-cookies';
import queryString from 'query-string';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import AdminDeleteUserModal from '../../components/CustomerModal/AdminDeleteUserModal';
import AddGlobalUserMembershipModal from '../../components/CustomerModal/AddGlobalMembershipModal';
import GlobalMembershipList from '../../components/GlobalMembershipList';
import type { Dispatch, ReduxState } from '../../types';
import * as actionActivateUser from '../../actions/userManagement/activateUser';
import * as actionAddGlobalUserIfNeeded from '../../actions/globalMembership/addUser';
import * as actionAdminDeleteUserIfNeeded from '../../actions/globalMembership/adminDeleteUser';
import * as actionGetUserListIfNeeded from '../../actions/globalMembership/getUserList';
import {
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_REQUESTING,
  GET_USER_LIST_INVALID
} from '../../constants/globalMembershipConstants/getUserList';
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_SUCCESS
} from '../../constants/profileConstants/getProfile';

import globalStyles from '../../theme/global.scss';
import styles from '../Membership/index.scss';
import buttonsStyles from '../../theme/buttons.scss';
import { ACTIVATE_USER_SUCCESS } from '../../constants/userManagement/activateUser';
import { ADD_GLOBAL_USER_SUCCESS } from '../../constants/globalMembershipConstants/addGlobalUser';
import { ADMIN_DELETE_USER_SUCCESS } from '../../constants/globalMembershipConstants/adminDeleteUser';

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
  location: Object,
  history: Object,
  adminDeleteUserReducer: Object,
  getUserListReducer: Object,
  getProfileReducer: Object,
  addUserReducer: Object,
  activateUserReducer: Object,
  fetchGetUserListIfNeeded: (page: string, perPage: string) => void,
  fetchAddGlobalUserIfNeeded: (login: string) => void,
  fetchActivateUserIfNeeded: (login: string) => void,
  fetchAdminDeleteUserIfNeeded: (login: string) => void
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
      errAdd: null,
      currentLoginDropDownAccess: null,
      currentPage: 1,
      passwordResetView: false,
      newPassword: null,
      currentLogin: null
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { fetchGetUserListIfNeeded, location } = this.props;
    const { page } = queryString.parse(location.search);
    if (Number.isInteger(parseInt(page, 10))) {
      this.setState({
        currentPage: parseInt(page, 10)
      });
    }
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role === 'admin') {
        fetchGetUserListIfNeeded(page && page);
      } else {
        this.props.history.push(routerLinks.namespaces);
      }
      this.setState({
        ...this.state,
        currentLogin: nextProps.getProfileReducer.data.login
      });
    }
    if (
      (this.props.activateUserReducer.readyStatus !==
        nextProps.activateUserReducer.readyStatus &&
        nextProps.activateUserReducer.readyStatus === ACTIVATE_USER_SUCCESS) ||
      (this.props.adminDeleteUserReducer.readyStatus !==
        nextProps.adminDeleteUserReducer.readyStatus &&
        nextProps.adminDeleteUserReducer.readyStatus ===
          ADMIN_DELETE_USER_SUCCESS)
    ) {
      fetchGetUserListIfNeeded(page && page);
    }
    if (
      this.props.addUserReducer.readyStatus !==
        nextProps.addUserReducer.readyStatus &&
      nextProps.addUserReducer.readyStatus === ADD_GLOBAL_USER_SUCCESS
    ) {
      this.setState({
        ...this.state,
        passwordResetView: true,
        newPassword: nextProps.addUserReducer.data.password
      });
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
  handleClickGetAccount = login => {
    const { currentLogin } = this.state;
    if (currentLogin === login) {
      this.props.history.push(routerLinks.account);
    } else this.props.history.push(routerLinks.accountByIdLink(login));
  };
  changeAccessUser = login => {
    this.props.fetchActivateUserIfNeeded(login);
  };
  handleClickDropDownAccess = login => {
    this.setState({
      ...this.state,
      currentLoginDropDownAccess: login
    });
  };
  handleMouseLeaveDropDownAccess = () => {
    this.setState({
      ...this.state,
      currentLoginDropDownAccess: null
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
      errAdd: null,
      passwordResetView: false,
      newPassword: null
    });
  };
  handleClickCopyPassword = () => {
    const newPassword = document.getElementById('newPassword');
    newPassword.select();
    document.execCommand('copy');
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
  handleAdminDeleteUser = (idName, name) => {
    this.props.fetchAdminDeleteUserIfNeeded(name);
  };

  renderGlobalMembershipList = () => {
    const { match, getUserListReducer, getProfileReducer } = this.props;
    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING ||
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

    if (
      getProfileReducer.readyStatus === GET_PROFILE_FAILURE ||
      getUserListReducer.readyStatus === GET_USER_LIST_FAILURE
    ) {
      return <p>Oops, Failed to load data of Users!</p>;
    }

    return (
      <GlobalMembershipList
        idName={match.params.idName}
        currentLogin={this.state.currentLogin}
        membersList={getUserListReducer.data.users}
        handleDeleteDMembers={this.handleDeleteDMembers}
        handleClickGetAccount={this.handleClickGetAccount}
        changeAccessUser={this.changeAccessUser}
        handleClickDropDownAccess={this.handleClickDropDownAccess}
        handleMouseLeaveDropDownAccess={this.handleMouseLeaveDropDownAccess}
        currentLoginDropDownAccess={this.state.currentLoginDropDownAccess}
        countPages={getUserListReducer.data.pages}
        currentPage={this.state.currentPage}
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
      activateUserReducer
    } = this.props;
    const {
      status: statusAdd,
      data: userData,
      isFetching: isFetchingAdd,
      method: methodAdd,
      err: errAdd
    } = addUserReducer;
    const { login: loginAdd } = userData || { login: null };
    const {
      status: statusActivate,
      method: methodActivate,
      login: loginActivate,
      err: errActivate
    } = activateUserReducer;
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
          status={statusActivate}
          method={methodActivate}
          name={loginActivate}
          errorMessage={errActivate}
        />
        <Notification
          status={statusAdd}
          name={loginAdd}
          method={methodAdd}
          errorMessage={errAdd}
        />

        <AdminDeleteUserModal
          type="Deactivate User"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          idName={idUserDelete}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={this.handleAdminDeleteUser}
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
          passwordResetView={this.state.passwordResetView}
          newPassword={this.state.newPassword}
          handleClickCopyPassword={() => this.handleClickCopyPassword()}
          newUser
        />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  <div className={`${containerClassName} container`}>
                    <div className={globalStyles.contentBlockHeader}>
                      <div className={labelClassName}>Membership</div>
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
    addUserReducer,

    activateUserReducer
  }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    getProfileReducer,
    getUserListReducer,
    adminDeleteUserReducer,
    addUserReducer,
    activateUserReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetUserListIfNeeded: (page: string = 1, perPage: string = 12) =>
      dispatch(
        actionGetUserListIfNeeded.fetchGetUserListIfNeeded(page, perPage)
      ),
    fetchAddGlobalUserIfNeeded: (login: string) =>
      dispatch(actionAddGlobalUserIfNeeded.fetchAddGlobalUserIfNeeded(login)),
    fetchActivateUserIfNeeded: (login: string) =>
      dispatch(actionActivateUser.fetchActivateUserIfNeeded(login)),
    fetchAdminDeleteUserIfNeeded: (login: string) =>
      dispatch(
        actionAdminDeleteUserIfNeeded.fetchAdminDeleteUserIfNeeded(login)
      )
  })
);

export default connector(GlobalMembership);
