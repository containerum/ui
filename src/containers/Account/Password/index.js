/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
// import _ from 'lodash/fp';

import * as actionChangePassword from '../../../actions/profileActions/changePassword';
import type { Dispatch, ReduxState } from '../../../types/index';
import { CHANGE_PASSWORD_SUCCESS } from '../../../constants/profileConstants/changePassword';
import Notification from '../../Notification';
import LoadButton from '../../../components/LoadButton';
import InputControl from '../../../components/InputControl';

type Props = {
  changePasswordReducer: Object,
  fetchChangePasswordIfNeeded: (
    currentPassword: string,
    newPassword: string
  ) => void
};

// Export this for unit testing more easily
export class Password extends PureComponent<Props> {
  constructor() {
    super();
    this.state = this._initialState();
  }
  componentWillUpdate(nextProps) {
    const { changePasswordReducer } = this.props;
    if (
      changePasswordReducer.readyStatus !==
        nextProps.changePasswordReducer.readyStatus &&
      nextProps.changePasswordReducer.readyStatus === CHANGE_PASSWORD_SUCCESS
    ) {
      this.setState(this._initialState());
    } else if (
      nextProps.changePasswordReducer.err &&
      (this.state.isValidCurrentPassword ||
        this.state.isValidRepeatPassword ||
        this.state.isValidNewPassword)
    ) {
      this.setState({
        ...this.state,
        isValidCurrentPassword: false,
        isValidRepeatPassword: false,
        isValidNewPassword: false
      });
    }
  }
  _initialState = () => ({
    repeatPassword: '',
    currentPassword: '',
    newPassword: '',
    isValidRepeatPassword: true,
    isValidCurrentPassword: true,
    isValidNewPassword: true
  });
  submitUpdatePasswordData = e => {
    e.preventDefault();
    const { repeatPassword, currentPassword, newPassword } = this.state;
    const { fetchChangePasswordIfNeeded } = this.props;
    if (
      currentPassword.length >= 8 &&
      currentPassword.length <= 64 &&
      (newPassword.length >= 8 && newPassword.length <= 64) &&
      (repeatPassword.length >= 8 && repeatPassword.length <= 64) &&
      newPassword === repeatPassword
    ) {
      fetchChangePasswordIfNeeded(currentPassword, newPassword);
    } else {
      this.setState({
        ...this.state,
        isValidCurrentPassword: false,
        isValidRepeatPassword: false,
        isValidNewPassword: false
      });
    }
  };
  handleChangeCurrentPassword = value => {
    this.setState({
      ...this.state,
      currentPassword: value,
      isValidCurrentPassword: true
    });
  };
  handleChangeNewPassword = value => {
    this.setState({
      ...this.state,
      newPassword: value,
      isValidNewPassword: true
    });
  };
  handleChangeRepeatPassword = value => {
    this.setState({
      ...this.state,
      repeatPassword: value,
      isValidRepeatPassword: true
    });
  };

  render() {
    const {
      repeatPassword,
      currentPassword,
      newPassword,
      isValidRepeatPassword,
      isValidCurrentPassword,
      isValidNewPassword
    } = this.state;
    const { changePasswordReducer } = this.props;
    return (
      <div>
        <Notification
          status={changePasswordReducer.status}
          method={changePasswordReducer.method}
          token={changePasswordReducer.data && changePasswordReducer.data.token}
          name="Password"
          errorMessage={changePasswordReducer.err}
        />
        <div className="block-item" id="password">
          <div className="block-item__title">Password</div>
          <form onSubmit={e => this.submitUpdatePasswordData(e)}>
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4">
                    <InputControl
                      value={currentPassword}
                      id="currentPassword"
                      type="password"
                      valid={isValidCurrentPassword}
                      baseClassName="form-group__input-text form-control"
                      baseClassNameLabel={`form-group__label ${currentPassword &&
                        'form-group__label-always-onfocus'}`}
                      labelText="Current Password"
                      handleChangeInput={e =>
                        this.handleChangeCurrentPassword(e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <InputControl
                      value={newPassword}
                      id="newPassword"
                      type="password"
                      valid={isValidNewPassword}
                      baseClassName="form-group__input-text form-control"
                      baseClassNameLabel={`form-group__label ${newPassword &&
                        'form-group__label-always-onfocus'}`}
                      labelText="New password"
                      textHelper="Password must be 8 or more characters"
                      handleChangeInput={e =>
                        this.handleChangeNewPassword(e.target.value)
                      }
                      baseClassNameHelper="form-group__helper"
                    />
                  </div>
                  <div className="col-md-4">
                    <InputControl
                      value={repeatPassword}
                      id="repeatPassword"
                      type="password"
                      valid={isValidRepeatPassword}
                      baseClassName="form-group__input-text form-control"
                      baseClassNameLabel={`form-group__label ${repeatPassword &&
                        'form-group__label-always-onfocus'}`}
                      labelText="Confirm new password"
                      handleChangeInput={e =>
                        this.handleChangeRepeatPassword(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group pt-0 text-right">
                  <LoadButton
                    style={{ width: '75px' }}
                    type="submit"
                    buttonText="Save"
                    isFetching={changePasswordReducer.isFetching}
                    baseClassButton="button_blue btn btn-outline-primary save-password"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ changePasswordReducer }: ReduxState) => ({ changePasswordReducer }),
  (dispatch: Dispatch) => ({
    fetchChangePasswordIfNeeded: (
      currentPassword: string,
      newPassword: string
    ) =>
      dispatch(
        actionChangePassword.fetchChangePasswordIfNeeded(
          currentPassword,
          newPassword
        )
      )
  })
);

export default connector(Password);
