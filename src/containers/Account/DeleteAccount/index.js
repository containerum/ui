/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as actionDeleteAccount from '../../../actions/profileActions/deleteAccount';
import type { Dispatch, ReduxState } from '../../../types';

import Notification from '../../Notification';
import DeleteModal from '../../../components/CustomerModal/DeleteModal';

import globalStyles from '../../../theme/global.scss';
import buttonsStyles from '../../../theme/buttons.scss';

type Props = {
  login: string,
  type: string,
  deleteAccountReducer: Object,
  fetchDeleteAccountIfNeeded: () => void
};

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
    const { deleteAccountReducer, login, type } = this.props;
    const { isOpened, inputName } = this.state;
    return (
      <div>
        <Notification
          status={deleteAccountReducer.status}
          errorMessage={deleteAccountReducer.err}
        />
        <DeleteModal
          type="Account"
          inputName={inputName}
          name={inputName}
          typeName={login}
          isOpened={isOpened}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={() => this.onHandleDelete()}
        />
        <div className={globalStyles.blockItem} id="delete-account">
          <div className={globalStyles.blockItemTitle}>Delete Account</div>
          <div className={globalStyles.textLight}>
            This action will delete {type === 'local' ? 'user' : 'your'} Apps
            and Data
          </div>
          <div className={globalStyles.blockItemButtons}>
            <button
              className={`${
                buttonsStyles.buttonUICreateDelete
              } btn btn-outline-primary`}
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
  ({ deleteAccountReducer }: ReduxState) => ({
    deleteAccountReducer
  }),
  (dispatch: Dispatch) => ({
    fetchDeleteAccountIfNeeded: () =>
      dispatch(actionDeleteAccount.fetchDeleteAccountIfNeeded())
  })
);

export default connector(DeleteAccount);
