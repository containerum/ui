import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import cookie from 'react-cookies';

import { routerLinks } from '../../config';
import Notification from '../Notification';
import AdminDeleteGroupModal from '../../components/CustomerModal/AdminDeleteUserModal';
import GlobalGroupsList from '../../components/GlobalGroupsList';
import AddGlobalUserMembershipModal from '../../components/CustomerModal/AddGlobalMembershipModal';
import type { Dispatch, ReduxState } from '../../types';
import * as actionAddGroupIfNeeded from '../../actions/globalMembership/addGroup';
import * as actionDeleteGroupIfNeeded from '../../actions/globalMembership/deleteGroup';
import * as actionGetGroupsIfNeeded from '../../actions/globalMembership/getGroups';
import {
  GET_GROUPS_FAILURE,
  GET_GROUPS_REQUESTING,
  GET_GROUPS_INVALID
} from '../../constants/globalMembershipConstants/getGroups';
import { ADD_GROUP_SUCCESS } from '../../constants/globalMembershipConstants/addGroup';
import globalStyles from '../../theme/global.scss';
import styles from '../Membership/index.scss';
import buttonsStyles from '../../theme/buttons.scss';
import { GET_PROFILE_SUCCESS } from '../../constants/profileConstants/getProfile';
import { DELETE_GROUP_SUCCESS } from '../../constants/globalMembershipConstants/deleteGroup';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockContainer',
  'contentBlockContainerMembership'
);
const menuClassName = globalClass(
  'contentBlockMenu',
  'contentBlockMenuMembership'
);
const liClassName = globalClass(
  'contentBlockMenuLi',
  'contentBlockMenuLiMembership'
);

const labelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMembership',
  'contentBlockHeaderLabelMain',
  'contentBlockHeaderLabelNamespaceInfo'
);

type Props = {
  history: Object,
  addGroupReducer: Object,
  deleteGroupReducer: Object,
  getGroupsReducer: Object,
  getProfileReducer: Object,
  fetchGetGroupsIfNeeded: () => void,
  fetchAddGroupIfNeeded: (idName: string, data: Object) => void,
  fetchDeleteGroupIfNeeded: (id: string) => void
};

class GlobalGroups extends PureComponent<Props> {
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
    const { getProfileReducer, history, fetchGetGroupsIfNeeded } = this.props;
    if (
      getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      if (nextProps.getProfileReducer.data.role !== 'admin') {
        history.push(routerLinks.namespaces);
      }
    }
    if (
      this.props.getProfileReducer.readyStatus !==
        nextProps.getProfileReducer.readyStatus &&
      nextProps.getProfileReducer.readyStatus === GET_PROFILE_SUCCESS
    ) {
      fetchGetGroupsIfNeeded();
    }
    if (
      this.props.addGroupReducer.readyStatus !==
        nextProps.addGroupReducer.readyStatus &&
      nextProps.addGroupReducer.readyStatus === ADD_GROUP_SUCCESS
    ) {
      fetchGetGroupsIfNeeded();
    }
    if (
      this.props.deleteGroupReducer.readyStatus !==
        nextProps.deleteGroupReducer.readyStatus &&
      nextProps.deleteGroupReducer.readyStatus === DELETE_GROUP_SUCCESS
    ) {
      fetchGetGroupsIfNeeded();
    }
  }
  choiceAccessNewUser = access => {
    this.setState({
      ...this.state,
      accessNewUser: access
    });
  };
  // changeAccessUser = (login, access) => {
  //   const { fetchAddGroupIfNeeded, match } = this.props;
  //   const user = this.state.membersList.find(
  //     member => member.username === login
  //   );
  //   const { access_level: newAccessLevel } = user;
  //   if (access !== newAccessLevel) {
  //     this.setState(
  //       {
  //         ...this.state,
  //         accessUser: access
  //       },
  //       () => {
  //         fetchAddGroupIfNeeded(
  //           match.params.idName,
  //           {
  //             username: login,
  //             access
  //           },
  //           'change'
  //         );
  //       }
  //     );
  //   }
  // };
  handleDeleteGroup = (idUser, e) => {
    e.stopPropagation();
    this.setState({
      ...this.state,
      idUser,
      isOpen: true
    });
  };
  handleAddGroupsAdd = () => {
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

  renderGlobalGroupsList = () => {
    const { history, getGroupsReducer } = this.props;
    if (
      !getGroupsReducer.readyStatus ||
      getGroupsReducer.readyStatus === GET_GROUPS_INVALID ||
      getGroupsReducer.readyStatus === GET_GROUPS_REQUESTING
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

    if (getGroupsReducer.readyStatus === GET_GROUPS_FAILURE) {
      return <p>Oops, Failed to load data of Groups!</p>;
    }

    return (
      <GlobalGroupsList
        history={history}
        groupsList={getGroupsReducer.data.groups}
        changeAccessUser={this.changeAccessUser}
        handleDeleteGroup={this.handleDeleteGroup}
      />
    );
  };

  render() {
    const {
      deleteGroupReducer,
      addGroupReducer,
      getProfileReducer,
      fetchAddGroupIfNeeded,
      fetchDeleteGroupIfNeeded,
      getGroupsReducer
    } = this.props;
    const {
      status: statusAdd,
      isFetching: isFetchingAdd,
      method: methodAdd
    } = addGroupReducer;
    let idNameAdd;
    if (addGroupReducer.data) {
      idNameAdd = addGroupReducer.data.label;
    }
    const {
      status: statusDelete,
      data: idNameDelete,
      err: errDelete
    } = deleteGroupReducer;
    let idDel;
    if (this.state.idUser) {
      idDel = getGroupsReducer.data.groups.find(
        group => group.id === this.state.idUser
      );
    }
    const label = getProfileReducer.data ? getProfileReducer.data.login : '';
    return (
      <div>
        <Helmet title="Groups" />
        <Notification
          status={statusDelete}
          name={idNameDelete}
          errorMessage={errDelete}
        />
        <Notification status={statusAdd} name={idNameAdd} method={methodAdd} />
        <AdminDeleteGroupModal
          type="Delete Group"
          name={this.state.inputEmailDelete}
          idName={this.state.idUser}
          isOpened={this.state.isOpen}
          typeName={idDel && idDel.label}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={fetchDeleteGroupIfNeeded}
        />
        <AddGlobalUserMembershipModal
          type="Add Group"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={fetchAddGroupIfNeeded}
          isFetchingAdd={isFetchingAdd}
          accessNewUser={this.state.accessNewUser}
          choiceAccessNewUser={this.choiceAccessNewUser}
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
                              onClick={this.handleAddGroupsAdd}
                            >
                              Add Group
                            </button>
                          </li>
                        </ul>
                      </div>

                      {this.renderGlobalGroupsList()}
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
    addGroupReducer,
    deleteGroupReducer,
    getProfileReducer,
    getGroupsReducer
  }: ReduxState) => ({
    addGroupReducer,
    deleteGroupReducer,
    getProfileReducer,
    getGroupsReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetGroupsIfNeeded: () =>
      dispatch(actionGetGroupsIfNeeded.fetchGetGroupsIfNeeded()),
    fetchAddGroupIfNeeded: (label: string) =>
      dispatch(actionAddGroupIfNeeded.fetchAddGroupIfNeeded(label)),
    fetchDeleteGroupIfNeeded: (id: string, name: string) =>
      dispatch(actionDeleteGroupIfNeeded.fetchDeleteGroupIfNeeded(id, name))
  })
);

export default connector(GlobalGroups);
