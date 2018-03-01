/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as actionDeleteAccount from '../../../actions/profileActions/deleteAccount';
import type { Dispatch, ReduxState } from '../../../types/index';

import Notification from '../../Notification';
import DeleteModal from '../../../components/CustomerModal/DeleteModal';

type Props = {
  getProfileReducer: Object,
  deleteAccountReducer: Object,
  fetchDeleteAccountIfNeeded: () => void
};

// Export this for unit testing more easily
export class DeleteAccount extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      inputName: ''
    };
  }
  onHandleDelete = () => {
    this.props.fetchDeleteAccountIfNeeded();
  };
  handleClickDeleteAccount = () => {
    this.setState({
      ...this.state,
      isOpened: true
    });
  };
  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpened: !this.state.isOpened,
      inputName: ''
    });
  };
  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };
  render() {
    const { getProfileReducer, deleteAccountReducer } = this.props;
    const { isOpened, inputName } = this.state;
    return (
      <div>
        <Notification
          status={deleteAccountReducer.status}
          errorMessage={deleteAccountReducer.err}
        />
        <DeleteModal
          type="Account"
          name={inputName}
          typeName={getProfileReducer.data.login}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={() => this.onHandleDelete()}
        />
        <div className="block-item" id="delete-account">
          <div className="block-item__title">Delete Account</div>
          <div className="light-text">
            This action will delete your Apps and Data
          </div>
          <div className="block-item__buttons">
            <button
              className="button_red btn btn-outline-primary"
              onClick={() => this.handleClickDeleteAccount()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer, deleteAccountReducer }: ReduxState) => ({
    getProfileReducer,
    deleteAccountReducer
  }),
  (dispatch: Dispatch) => ({
    fetchDeleteAccountIfNeeded: () =>
      dispatch(actionDeleteAccount.fetchDeleteAccountIfNeeded())
  })
);

export default connector(DeleteAccount);
