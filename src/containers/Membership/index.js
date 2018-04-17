import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';

import HeaderPage from '../Header/index';
import FooterPage from '../Footer/index';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import AddUserInMembershipModal from '../../components/CustomerModal/AddUserInMembershipModal';
import type { Dispatch, ReduxState } from '../../types';
import * as actionAddNamespaceUserAccessIfNeeded from '../../actions/namespaceActions/addNamespaceUserAccess';
import { ADD_NAMESPACE_USER_ACCESS_SUCCESS } from '../../constants/namespaceConstants/addNamespaceAccess';
// import type { Namespace as NamespaceType } from "../../types";

type Props = {
  getNamespaceUsersAccessReducer: Object,
  getNamespaceReducer: Object,
  fetchAddNamespaceUserAccessIfNeeded: (idName: string, data: Object) => void
};

class Membership extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      inputEmailDelete: '',
      inputEmailAdd: '',
      isOpen: false,
      isOpenAdd: false,
      idUser: null,
      accessNewUser: 'Read or Write',
      accessUser: 'Read'
    };
  }

  onHandleAdd = () => {
    console.log('azazaza');
  };

  choiceAccessNewUserRead = () => {
    this.setState({
      ...this.state,
      accessNewUser: 'read'
    });
  };

  choiceAccessNewUserWrite = () => {
    this.setState({
      ...this.state,
      accessNewUser: 'write'
    });
  };

  changeAccessUserRead = () => {
    this.setState({
      ...this.state,
      accessUser: 'read'
    });
  };

  changeAccessUserWrite = () => {
    this.setState({
      ...this.state,
      accessUser: 'write'
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
      idUser: null
    });
  };

  handleOpenCloseModalAdd = () => {
    this.setState({
      isOpenAdd: !this.state.isOpenAdd,
      accessNewUser: 'Read or Write'
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

  renderSuccessUserAccess = () => {
    const { getNamespaceUsersAccessReducer } = this.props;

    if (
      getNamespaceUsersAccessReducer.readyStatus ===
      ADD_NAMESPACE_USER_ACCESS_SUCCESS
    ) {
      return (
        <div
          className="container"
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../images/alertAddUserMembership.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }
    return null;
  };

  render() {
    const {
      getNamespaceUsersAccessReducer,
      getNamespaceReducer,
      fetchAddNamespaceUserAccessIfNeeded
    } = this.props;
    // const alert ={getNamespaceUsersAccessReducer.data.u}
    console.log('aaaaaaaaaaaaaaaaa', getNamespaceReducer.idName);
    return (
      <div>
        {this.renderSuccessUserAccess()}
        <Helmet title="Membership [namspace]" />
        <HeaderPage />
        <DeleteModal
          type="Delete USER ACCESS"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          handleInputEmailDelete={this.handleInputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleAdd={this.handleDeleteDMembers}
        />
        <AddUserInMembershipModal
          type="Add USER"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleInputEmailAdd={this.handleInputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleAdd={this.onHandleAdd}
          accessNewUser={this.state.accessNewUser}
          choiceAccessNewUserRead={this.choiceAccessNewUserRead}
          choiceAccessNewUserWrite={this.choiceAccessNewUserWrite}
          addUserAccess={fetchAddNamespaceUserAccessIfNeeded}
          namespaceId={getNamespaceReducer.idName}
        />
        <div className="content-block">
          <div className="container no-back">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="content-block">
                  <div
                    className="content-block-container container"
                    style={{ paddingTop: '40px' }}
                  >
                    <div className="content-block-header">
                      <div className="content-block-header-label__text content-block-header-label_main__membership content-block-header-label_main content-block-header-label__text_namspace-info">
                        {getNamespaceReducer.idName}
                      </div>
                      <div className="content-block-header-nav">
                        <ul
                          className="content-block-menu nav nav-pills content-block-menu__membership"
                          role="tablist"
                          style={{ height: '50px' }}
                        >
                          <li
                            className="content-block-menu__li content-block-menu__li_membership nav-item"
                            style={{ width: 'auto' }}
                          >
                            <Link
                              to="/dashboard"
                              className="content-block-menu__link"
                            >
                              Users
                            </Link>
                          </li>
                          <li className="membership-btn-container">
                            <button
                              className="membership-btn"
                              onClick={this.handleAddMembersAdd}
                            >
                              Add Users
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div className="tab-pane deployments active">
                          <table
                            className="content-block__table table"
                            width="1170"
                          >
                            <thead>
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft">
                                  Permission
                                </td>
                                <td className="td-1" />
                              </tr>
                            </thead>
                            <tbody>
                              {getNamespaceUsersAccessReducer.data.users.map(
                                user => (
                                  <tr key={user.create_time}>
                                    <td className="td-2__membership td-3__no-paddingLeft">
                                      {user.login}
                                    </td>
                                    <td className="td-2__membership td-3__no-paddingLeft">
                                      {user.login}
                                    </td>
                                    <td className="td-3__no-paddingLeft td-3-flex">
                                      <div>{user.new_access_level}</div>
                                      <div style={{ paddingLeft: '50px' }}>
                                        <i
                                          className="content-block-table__more  dropdown-toggle"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                          style={{ cursor: 'pointer' }}
                                        />
                                        <ul
                                          className="dropdown-menu dropdown-menu-right"
                                          role="menu"
                                        >
                                          <button
                                            className="dropdown-item"
                                            onClick={this.changeAccessUserWrite}
                                          >
                                            Write
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            onClick={this.changeAccessUserRead}
                                          >
                                            Read
                                          </button>
                                        </ul>
                                      </div>
                                    </td>
                                    <td
                                      className="td-1"
                                      onClick={() =>
                                        this.handleDeleteDMembers(user.login)
                                      }
                                    >
                                      <div className="membership-item">
                                        <i
                                          className="material-icons"
                                          role="presentation"
                                        >
                                          delete
                                        </i>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getNamespaceUsersAccessReducer, getNamespaceReducer }: ReduxState) => ({
    getNamespaceUsersAccessReducer,
    getNamespaceReducer
  }),
  (dispatch: Dispatch) => ({
    fetchAddNamespaceUserAccessIfNeeded: (idName: string, date: Object) =>
      dispatch(
        actionAddNamespaceUserAccessIfNeeded.fetchAddNamespaceUserAccessIfNeeded(
          idName,
          date
        )
      )
  })
);

export default connector(Membership);
