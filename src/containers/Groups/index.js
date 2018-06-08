import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import DeleteUserGroupModal from '../../components/CustomerModal/DeleteMembershipModal';
import AddUserInGroupModal from '../../components/CustomerModal/AddMembershipModal';
import GroupList from '../../components/GroupsList';
import type { Dispatch, ReduxState } from '../../types';
import * as actionGetNamespace from '../../actions/namespaceActions/getNamespace';
import * as actionGetNamespaceUsersAccess from '../../actions/namespaceActions/getNamespaceUsersAccess';
import * as actionAddNamespaceUserAccessIfNeeded from '../../actions/namespaceActions/addNamespaceUserAccess';
import * as actionDeleteNamespaceUserAccessIfNeeded from '../../actions/namespaceActions/deleteNamespaceUserAccess';
import {
  GET_NAMESPACE_USERS_ACCESS_INVALID,
  GET_NAMESPACE_USERS_ACCESS_FAILURE,
  GET_NAMESPACE_USERS_ACCESS_REQUESTING,
  GET_NAMESPACE_USERS_ACCESS_SUCCESS
} from '../../constants/namespaceConstants/getNamespaceUsersAccess';
import {
  ADD_NAMESPACE_USER_ACCESS_FAILURE,
  ADD_NAMESPACE_USER_ACCESS_SUCCESS
} from '../../constants/namespaceConstants/addNamespaceUserAccess';
import { DELETE_NAMESPACE_USER_ACCESS_SUCCESS } from '../../constants/namespaceConstants/deleteNamespaceUserAccess';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';

import globalStyles from '../../theme/global.scss';
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
  getNamespaceUsersAccessReducer: Object,
  addNamespaceUserAccessReducer: Object,
  deleteNamespaceUserAccessReducer: Object,
  getProfileReducer: Object,
  fetchGetNamespaceIfNeeded: (idName: string) => void,
  fetchGetNamespaceUsersAccessIfNeeded: (idName: string) => void,
  fetchAddNamespaceUserAccessIfNeeded: (idName: string, data: Object) => void,
  fetchDeleteNamespaceUserAccessIfNeeded: (
    idName: string,
    username: string
  ) => void
};

class Group extends PureComponent<Props> {
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
  componentDidMount() {
    const {
      fetchGetNamespaceIfNeeded,
      fetchGetNamespaceUsersAccessIfNeeded,
      match
    } = this.props;
    fetchGetNamespaceIfNeeded(match.params.idName);
    fetchGetNamespaceUsersAccessIfNeeded(match.params.idName);
  }
  componentWillUpdate(nextProps) {
    const {
      history,
      match,
      fetchGetNamespaceUsersAccessIfNeeded,
      getNamespaceUsersAccessReducer,
      addNamespaceUserAccessReducer,
      deleteNamespaceUserAccessReducer
    } = this.props;
    if (
      getNamespaceUsersAccessReducer.readyStatus !==
        nextProps.getNamespaceUsersAccessReducer.readyStatus &&
      nextProps.getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_SUCCESS &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      const { users, access } = nextProps.getNamespaceUsersAccessReducer.data;
      if (access === 'owner') {
        let concatUsers;
        if (users) {
          concatUsers = users.concat([
            {
              username: nextProps.getProfileReducer.data.login,
              access_level: access
            }
          ]);
        } else {
          concatUsers = [
            {
              username: nextProps.getProfileReducer.data.login,
              access_level: access
            }
          ];
        }
        this.setState({
          ...this.state,
          membersList: concatUsers.sort(
            (a, b) => a.access_level === 'owner' || b.access_level === 'owner'
          )
        });
      } else {
        history.push(routerLinks.namespaceLink(match.params.idName));
      }
    }
    if (
      (addNamespaceUserAccessReducer.readyStatus !==
        nextProps.addNamespaceUserAccessReducer.readyStatus &&
        nextProps.addNamespaceUserAccessReducer.readyStatus ===
          ADD_NAMESPACE_USER_ACCESS_SUCCESS) ||
      (deleteNamespaceUserAccessReducer.readyStatus !==
        nextProps.deleteNamespaceUserAccessReducer.readyStatus &&
        nextProps.deleteNamespaceUserAccessReducer.readyStatus ===
          DELETE_NAMESPACE_USER_ACCESS_SUCCESS)
    ) {
      this.setState({
        ...this.state,
        isOpen: false,
        idUser: null,
        inputEmailDelete: '',
        isOpenAdd: false,
        inputEmailAdd: '',
        errAdd: null
      });
      fetchGetNamespaceUsersAccessIfNeeded(match.params.idName);
    }
    if (
      addNamespaceUserAccessReducer.readyStatus !==
        nextProps.addNamespaceUserAccessReducer.readyStatus &&
      nextProps.addNamespaceUserAccessReducer.readyStatus ===
        ADD_NAMESPACE_USER_ACCESS_FAILURE
    ) {
      const { err: errAdd } = nextProps.addNamespaceUserAccessReducer;
      this.setState({
        errAdd
      });
    }
  }
  choiceAccessNewUser = access => {
    this.setState({
      ...this.state,
      accessNewUser: access
    });
  };
  changeAccessUser = (login, access) => {
    const { fetchAddNamespaceUserAccessIfNeeded, match } = this.props;
    const user = this.state.membersList.find(
      member => member.username === login
    );
    const { access_level: newAccessLevel } = user;
    if (access !== newAccessLevel) {
      this.setState(
        {
          ...this.state,
          accessUser: access
        },
        () => {
          fetchAddNamespaceUserAccessIfNeeded(
            match.params.idName,
            {
              username: login,
              access
            },
            'change'
          );
        }
      );
    }
  };
  handleDeleteDMembers = (idUser, e) => {
    e.stopPropagation();
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

  renderGroupList = () => {
    const { getNamespaceUsersAccessReducer, history, match } = this.props;
    if (
      !getNamespaceUsersAccessReducer.readyStatus ||
      getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_INVALID ||
      getNamespaceUsersAccessReducer.readyStatus ===
        GET_NAMESPACE_USERS_ACCESS_REQUESTING
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
      getNamespaceUsersAccessReducer.readyStatus ===
      GET_NAMESPACE_USERS_ACCESS_FAILURE
    ) {
      return <p>Oops, Failed to load data of Groups!</p>;
    }

    return (
      <GroupList
        history={history}
        idName={match.params.idName}
        membersList={this.state.membersList}
        changeAccessUser={this.changeAccessUser}
        handleDeleteDMembers={this.handleDeleteDMembers}
      />
    );
  };

  render() {
    const {
      match,
      getNamespaceUsersAccessReducer,
      deleteNamespaceUserAccessReducer,
      addNamespaceUserAccessReducer,
      fetchAddNamespaceUserAccessIfNeeded,
      fetchDeleteNamespaceUserAccessIfNeeded
    } = this.props;
    const {
      status: statusAdd,
      idName: idNameAdd,
      isFetching: isFetchingAdd,
      method: methodAdd
    } = addNamespaceUserAccessReducer;
    const {
      status: statusDelete,
      idName: idNameDelete,
      err: errDelete
    } = deleteNamespaceUserAccessReducer;
    const { idName } = match.params;
    const label = getNamespaceUsersAccessReducer.data
      ? getNamespaceUsersAccessReducer.data.label
      : idName;
    return (
      <div>
        <Helmet title={`Group of ${label}`} />
        <Notification
          status={statusDelete}
          name={idNameDelete}
          errorMessage={errDelete}
        />
        <Notification status={statusAdd} name={idNameAdd} method={methodAdd} />
        <DeleteUserGroupModal
          type="Delete User access"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          idName={idName}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteNamespaceUserAccessIfNeeded}
        />
        <AddUserInGroupModal
          type="Add Group"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={fetchAddNamespaceUserAccessIfNeeded}
          isFetchingAdd={isFetchingAdd}
          accessNewUser={this.state.accessNewUser}
          choiceAccessNewUser={this.choiceAccessNewUser}
          namespaceId={idName}
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
                      <div className={labelClassName}>{label}</div>
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
                                to={routerLinks.getMembershipLink(idName)}
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
                                to={routerLinks.getGroupsLink(idName)}
                              >
                                Groups
                              </NavLink>
                            </li>
                          </li>
                          <li>
                            <button
                              className={`${
                                buttonsStyles.buttonUIAddMembership
                              } btn btn-outline-primary fancybox`}
                              onClick={this.handleAddMembersAdd}
                            >
                              Add Group
                            </button>
                          </li>
                        </ul>
                      </div>

                      {this.renderGroupList()}
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
    deleteNamespaceUserAccessReducer,
    getProfileReducer
  }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer,
    addNamespaceUserAccessReducer,
    deleteNamespaceUserAccessReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetNamespaceIfNeeded: (idName: string) =>
      dispatch(actionGetNamespace.fetchGetNamespaceIfNeeded(idName)),
    fetchGetNamespaceUsersAccessIfNeeded: (idName: string) =>
      dispatch(
        actionGetNamespaceUsersAccess.fetchGetNamespaceUsersAccessIfNeeded(
          idName
        )
      ),
    fetchAddNamespaceUserAccessIfNeeded: (
      idName: string,
      date: Object,
      access: string
    ) =>
      dispatch(
        actionAddNamespaceUserAccessIfNeeded.fetchAddNamespaceUserAccessIfNeeded(
          idName,
          date,
          access
        )
      ),
    fetchDeleteNamespaceUserAccessIfNeeded: (
      idName: string,
      username: string
    ) =>
      dispatch(
        actionDeleteNamespaceUserAccessIfNeeded.fetchDeleteNamespaceUserAccessIfNeeded(
          idName,
          username
        )
      )
  })
);

export default connector(Group);
