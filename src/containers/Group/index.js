import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import cookie from 'react-cookies';
import isEmail from 'validator/lib/isEmail';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import AdminDeleteUserModal from '../../components/CustomerModal/AdminDeleteUserModal';
import GlobalUserListInGroup from '../../components/GlobalUserListInGroup';
import AddUserInGlobalGroupModal from '../../components/CustomerModal/AddUserInGlobalGroupModal';
import type { Dispatch, ReduxState } from '../../types';
import * as actionAddGlobalUser from '../../actions/globalMembership/addUserInGroup';
import * as actionUpdateUserInGroup from '../../actions/globalMembership/updateUserInGroup';
import * as actionfetchDeleteUserFromGroupIfNeeded from '../../actions/globalMembership/deleteUserFromGroup';
import * as actionGetGroup from '../../actions/globalMembership/getGroup';
import {
  GET_GROUP_FAILURE,
  GET_GROUP_REQUESTING,
  GET_GROUP_INVALID,
  GET_GROUP_SUCCESS
} from '../../constants/globalMembershipConstants/getGroup';
import { ADD_GLOBAL_USER_IN_GROUP_SUCCESS } from '../../constants/globalMembershipConstants/addGlobalUserInGroup';
import { UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS } from '../../constants/globalMembershipConstants/updateGlobalUserInGroup';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import globalStyles from '../../theme/global.scss';
import styles from '../Membership/index.scss';
import buttonsStyles from '../../theme/buttons.scss';
import { DELETE_USER_FROM_GROUP_SUCCESS } from '../../constants/globalMembershipConstants/deleteUserFromGroup';
import * as actionDeleteGroupIfNeeded from '../../actions/globalMembership/deleteGroup';
import BackButton from '../../components/BackButton';

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
  deleteUserFromGroupReducer: Object,
  deleteGroupReducer: Object,
  getGroupReducer: Object,
  getProfileReducer: Object,
  fetchGetGroupIfNeeded: (idGroup: string) => void,
  fetchDeleteGroupIfNeeded: (id: string, name: string) => void,
  fetchAddGlobalUserIfNeeded: (
    idGroup: string,
    members: Array<Object>,
    labelGroup: string
  ) => void,
  fetchUpdateGlobalUserIfNeeded: (
    idGroup: string,
    userName: string,
    access: string
  ) => void,
  addUserInGroupReducer: Object,
  updateUserInGroupReducer: Object,
  fetchDeleteUserFromGroupIfNeeded: (idGroup: string, username: string) => void
};

class GlobalMembership extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      inputEmailDelete: '',
      inputEmailAdd: '',
      inputEmailDeleteGroup: '',
      isOpenDeleteGroup: false,
      isOpen: false,
      isOpenAdd: false,
      idUser: null,
      accessNewUsers: 'read',
      currentLoginDropDownAccess: null,
      newUsers: [],
      membersList: [],
      errAdd: null,
      isEmailValid: true
    };
  }
  componentWillMount() {
    const accessToken = cookie.load('accessToken');
    if (!accessToken) {
      this.props.history.push(routerLinks.login);
    }
  }
  componentWillUpdate(nextProps) {
    const { fetchGetGroupIfNeeded, match, history } = this.props;
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role === 'admin') {
        fetchGetGroupIfNeeded(match.params.idGroup);
      } else {
        history.push(routerLinks.namespaces);
      }
    }
    if (
      (this.props.addUserInGroupReducer.readyStatus !==
        nextProps.addUserInGroupReducer.readyStatus &&
        nextProps.addUserInGroupReducer.readyStatus ===
          ADD_GLOBAL_USER_IN_GROUP_SUCCESS) ||
      (this.props.updateUserInGroupReducer.readyStatus !==
        nextProps.updateUserInGroupReducer.readyStatus &&
        nextProps.updateUserInGroupReducer.readyStatus ===
          UPDATE_GLOBAL_USER_IN_GROUP_SUCCESS)
    ) {
      fetchGetGroupIfNeeded(match.params.idGroup);
    }
    if (
      this.props.deleteUserFromGroupReducer.readyStatus !==
        nextProps.deleteUserFromGroupReducer.readyStatus &&
      nextProps.deleteUserFromGroupReducer.readyStatus ===
        DELETE_USER_FROM_GROUP_SUCCESS
    ) {
      fetchGetGroupIfNeeded(match.params.idGroup);
    }
  }

  choiceAccessNewUser = access => {
    const newUsers = this.state.newUsers.map(user => {
      const refresh = {
        username: user.username,
        access
      };
      return refresh;
    });
    this.setState({
      ...this.state,
      accessNewUsers: access,
      newUsers
    });
  };
  handleDeleteNewUser = username => {
    const newUsers = this.state.newUsers.map(user => user);
    const index = newUsers.findIndex(newUser => newUser.username === username);
    newUsers.splice(index, 1);
    this.setState({
      ...this.state,
      newUsers
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
  handleOpenCloseModalDeleteGroup = () => {
    this.setState({
      ...this.state,
      isOpenDeleteGroup: !this.state.isOpenDeleteGroup,
      idUser: null,
      inputEmailDeleteGroup: ''
    });
  };
  handleOpenCloseModalAdd = () => {
    this.setState({
      isOpenAdd: !this.state.isOpenAdd,
      accessNewUsers: 'read',
      inputEmailAdd: '',
      errAdd: null,
      newUsers: [],
      isEmailValid: true
    });
  };
  handleInputEmailDelete = inputEmailDelete => {
    this.setState({
      ...this.state,
      inputEmailDelete
    });
  };
  handleInputEmailDeleteGroup = inputEmailDeleteGroup => {
    this.setState({
      ...this.state,
      inputEmailDeleteGroup
    });
  };
  handleInputEmailAdd = inputEmailAdd => {
    this.setState({
      ...this.state,
      inputEmailAdd,
      isEmailValid: true
    });
  };
  handleAddNewUsers = newUsers => {
    const sameUser = this.state.newUsers.find(
      newUser => newUser.username === this.state.inputEmailAdd
    );
    if (
      isEmail(this.state.inputEmailAdd) &&
      !sameUser &&
      this.state.newUsers.length < 9
    ) {
      const user = {
        username: this.state.inputEmailAdd,
        access: this.state.accessNewUsers
      };
      newUsers.push(user);
      this.setState({
        ...this.state,
        newUsers,
        inputEmailAdd: '',
        isEmailValid: true
      });
    } else {
      this.setState({
        ...this.state,
        isEmailValid: false
      });
    }
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
  changeAccessUser = (login, access) => {
    const { fetchUpdateGlobalUserIfNeeded, match } = this.props;
    fetchUpdateGlobalUserIfNeeded(match.params.idGroup, login, access);
    // const user = this.state.membersList.find(
    //   member => member.username === login
    // );
    // const { access_level: newAccessLevel } = user;
    // if (access !== newAccessLevel) {
    //   this.setState(
    //     {
    //       ...this.state,
    //       accessUser: access
    //     },
    //     () => {
    //       fetchAddNamespaceUserAccessIfNeeded(
    //         match.params.idName,
    //         {
    //           username: login,
    //           access
    //         },
    //         'change'
    //       );
    //     }
    //   );
    // }
  };

  renderGlobalMembershipList = () => {
    const { match, getGroupReducer } = this.props;
    if (
      !getGroupReducer.readyStatus ||
      getGroupReducer.readyStatus === GET_GROUP_INVALID ||
      getGroupReducer.readyStatus === GET_GROUP_REQUESTING
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

    if (getGroupReducer.readyStatus === GET_GROUP_FAILURE) {
      return <p>Oops, Failed to load data of Namespaces!</p>;
    }
    return (
      <GlobalUserListInGroup
        idName={match.params.idName}
        membersList={getGroupReducer.data.members}
        changeAccessUser={this.changeAccessUser}
        handleDeleteDMembers={this.handleDeleteDMembers}
        handleClickDropDownAccess={this.handleClickDropDownAccess}
        handleMouseLeaveDropDownAccess={this.handleMouseLeaveDropDownAccess}
        currentLoginDropDownAccess={this.state.currentLoginDropDownAccess}
      />
    );
  };
  render() {
    const {
      match,
      deleteUserFromGroupReducer,
      getGroupReducer,
      addUserInGroupReducer,
      updateUserInGroupReducer,
      deleteGroupReducer,
      fetchAddGlobalUserIfNeeded,
      fetchDeleteGroupIfNeeded,
      fetchDeleteUserFromGroupIfNeeded
    } = this.props;
    const { isEmailValid } = this.state;
    const {
      status: statusAdd,
      isFetching: isFetchingAdd,
      labelGroup: labelGroupAdd,
      method: methodAdd,
      err: errAdd
    } = addUserInGroupReducer;
    const {
      status: statusUpdate,
      members: labelGroupUpdate,
      method: methodUpdate,
      err: errUpdate
    } = updateUserInGroupReducer;
    const {
      status: statusDelete,
      username: idNameDelete,
      err: errDelete
    } = deleteUserFromGroupReducer;
    const {
      status: statusDeleteGroup,
      data: idNameDeleteGroup,
      err: errDeleteGroup
    } = deleteGroupReducer;
    const label =
      getGroupReducer.readyStatus === GET_GROUP_SUCCESS
        ? getGroupReducer.data.label
        : match.params.idGroup;
    const idGroup =
      getGroupReducer.readyStatus === GET_GROUP_SUCCESS
        ? getGroupReducer.data.id
        : match.params.idGroup;
    return (
      <div style={{ position: 'relative' }}>
        <Helmet title={`Users of ${label}`} />
        <Notification
          status={statusDelete}
          name={idNameDelete}
          errorMessage={errDelete}
        />
        <Notification
          status={statusDeleteGroup}
          name={idNameDeleteGroup}
          errorMessage={errDeleteGroup}
        />
        <Notification
          status={statusAdd}
          name={labelGroupAdd}
          method={methodAdd}
          errorMessage={errAdd}
        />
        <Notification
          status={statusUpdate}
          name={labelGroupUpdate}
          method={methodUpdate}
          errorMessage={errUpdate}
        />

        <AdminDeleteUserModal
          type="Delete User from Group"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          idGroup={idGroup}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteUserFromGroupIfNeeded}
        />
        <AdminDeleteUserModal
          type="Delete Group"
          name={this.state.inputEmailDeleteGroup}
          isOpened={this.state.isOpenDeleteGroup}
          typeName={label}
          idName={idGroup}
          handleInputEmailDelete={this.handleInputEmailDeleteGroup}
          handleOpenCloseModal={this.handleOpenCloseModalDeleteGroup}
          onHandleDelete={fetchDeleteGroupIfNeeded}
        />
        <AddUserInGlobalGroupModal
          type="Add Users"
          accessNewUsers={this.state.accessNewUsers}
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleAddNewUsers={this.handleAddNewUsers}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={fetchAddGlobalUserIfNeeded}
          isFetchingAdd={isFetchingAdd}
          newUsers={this.state.newUsers}
          choiceAccessNewUser={this.choiceAccessNewUser}
          err={this.state.errAdd}
          idGroup={idGroup}
          labelGroup={label}
          isEmailValid={isEmailValid}
          handleDeleteNewUser={this.handleDeleteNewUser}
        />
        <BackButton path={routerLinks.getGlobalGroups} />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className={globalStyles.contentBlock}>
                  <div className={`${containerClassName} container`}>
                    <div className={globalStyles.contentBlockHeader}>
                      <NavLink
                        to={routerLinks.getGlobalGroups}
                        className={labelClassName}
                        style={{
                          textTransform: 'lowercase',
                          display: 'inline-block'
                        }}
                      >
                        {label}
                      </NavLink>
                      <div
                        style={{
                          float: 'right',
                          display: 'inline-block',
                          cursor: 'pointer'
                        }}
                        className={`${
                          globalStyles.contentBlockHeaderLabelDescript
                        } ${globalStyles.hoverActionDelete}`}
                        onClick={this.handleOpenCloseModalDeleteGroup}
                      >
                        Delete Group
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
                                to={routerLinks.getGroupLink(
                                  match.params.idGroup
                                )}
                                activeClassName={
                                  globalStyles.contentBlockMenuLiActive
                                }
                              >
                                Users
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
                              Add Users
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
    getGroupReducer,
    adminDeleteUserReducer,
    addUserReducer,
    addUserInGroupReducer,
    updateUserInGroupReducer,
    deleteUserFromGroupReducer,
    deleteGroupReducer
  }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    getProfileReducer,
    getGroupReducer,
    adminDeleteUserReducer,
    addUserReducer,
    addUserInGroupReducer,
    updateUserInGroupReducer,
    deleteUserFromGroupReducer,
    deleteGroupReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetGroupIfNeeded: (idGroup: string) =>
      dispatch(actionGetGroup.fetchGetGroupIfNeeded(idGroup)),
    fetchAddGlobalUserIfNeeded: (
      idGroup: string,
      members: Array<Object>,
      labelGroup: string
    ) =>
      dispatch(
        actionAddGlobalUser.fetchAddGlobalUserIfNeeded(
          idGroup,
          members,
          labelGroup
        )
      ),
    fetchUpdateGlobalUserIfNeeded: (
      idGroup: string,
      userName: string,
      access: string
    ) =>
      dispatch(
        actionUpdateUserInGroup.fetchUpdateGlobalUserIfNeeded(
          idGroup,
          userName,
          access
        )
      ),
    fetchDeleteUserFromGroupIfNeeded: (idGroup: string, username: string) =>
      dispatch(
        actionfetchDeleteUserFromGroupIfNeeded.fetchDeleteUserFromGroupIfNeeded(
          idGroup,
          username
        )
      ),
    fetchDeleteGroupIfNeeded: (id: string, name: string) =>
      dispatch(actionDeleteGroupIfNeeded.fetchDeleteGroupIfNeeded(id, name))
  })
);

export default connector(GlobalMembership);
