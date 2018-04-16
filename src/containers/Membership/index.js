import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import HeaderPage from '../Header/index';
import FooterPage from '../Footer/index';
import DeleteModal from '../../components/CustomerModal/DeleteModal';
import AddUserInMembershipModal from '../../components/CustomerModal/AddUserInMembershipModal';

class Membership extends PureComponent {
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

  onHandleDelete = () => {
    console.log('azazaza');
  };

  choiceAccessNewUserRead = () => {
    this.setState({
      ...this.state,
      accessNewUser: 'Read'
    });
  };

  choiceAccessNewUserWrite = () => {
    this.setState({
      ...this.state,
      accessNewUser: 'Write'
    });
  };

  changeAccessUserRead = () => {
    this.setState({
      ...this.state,
      accessUser: 'Read'
    });
  };

  changeAccessUserWrite = () => {
    this.setState({
      ...this.state,
      accessUser: 'Write'
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

  handleinputEmailDelete = inputEmailDelete => {
    this.setState({
      ...this.state,
      inputEmailDelete
    });
  };

  handleinputEmailAdd = inputEmailAdd => {
    this.setState({
      ...this.state,
      inputEmailAdd
    });
  };

  render() {
    // validating variables
    const name1 = 'example@domain.com';
    const name2 = 'exxxxxample@domain.com';
    const name3 = 'exzzzample@domain.com';

    return (
      <div>
        <Helmet title="Membership [namspace]" />
        <HeaderPage />
        <DeleteModal
          type="Delete USER ACCESS"
          name={this.state.inputEmailDelete}
          isOpened={this.state.isOpen}
          typeName={this.state.idUser}
          handleinputEmailDelete={this.handleinputEmailDelete}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={this.handleDeleteDMembers}
        />
        <AddUserInMembershipModal
          type="Add USER"
          name={this.state.inputEmailAdd}
          isOpened={this.state.isOpenAdd}
          handleinputEmailDelete={this.handleinputEmailAdd}
          handleOpenCloseModal={this.handleOpenCloseModalAdd}
          onHandleDelete={this.handleAddMembersAdd}
          accessNewUser={this.state.accessNewUser}
          choiceAccessNewUserRead={this.choiceAccessNewUserRead}
          choiceAccessNewUserWrite={this.choiceAccessNewUserWrite}
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
                        [NAMSPACE_NAME]
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
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>{this.state.accessUser}</div>
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
                                    this.handleDeleteDMembers(name1)
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
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>{this.state.accessUser}</div>
                                  <div style={{ paddingLeft: '50px' }}>
                                    <i
                                      className="content-block-table__more  dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
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
                                    this.handleDeleteDMembers(name2)
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
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft" />
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>{this.state.accessUser}</div>
                                  <div style={{ paddingLeft: '50px' }}>
                                    <i
                                      className="content-block-table__more  dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
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
                                    this.handleDeleteDMembers(name3)
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

export default Membership;
