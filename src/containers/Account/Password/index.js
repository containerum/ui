/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import type { Connector } from 'react-redux';
import className from 'classnames/bind';

// import _ from 'lodash/fp';

import * as actionChangePassword from '../../../actions/profileActions/changePassword';
import type { Dispatch, ReduxState } from '../../../types';
import { CHANGE_PASSWORD_SUCCESS } from '../../../constants/profileConstants/changePassword';
import Notification from '../../Notification';
import LoadButton from '../../../components/LoadButton';
import InputControl from '../../../components/InputControl';

import globalStyles from '../../../theme/global.scss';
import buttonsStyles from '../../../theme/buttons.scss';
import inputStyles from '../../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

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
    isValidNewPassword: true,
    newPasswordEquals: true
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
    if (newPassword === repeatPassword) {
      this.setState({
        ...this.state,
        newPasswordEquals: true
      });
    } else {
      this.setState({
        ...this.state,
        newPasswordEquals: false
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
        <div className={globalStyles.blockItem} id="password">
          <div className={globalStyles.blockItemTitle}>Password</div>
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
                      baseClassName={`${formClassName} ${
                        inputStyles.inputCustom
                      } `}
                      baseClassNameLabel={`${
                        globalStyles.formGroupLabel
                      } ${currentPassword &&
                        globalStyles.formGroupLabelOnFocus}`}
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
                      baseClassName={`${!this.state.newPasswordEquals &&
                        globalStyles.errorPassword} ${formClassName} ${
                        inputStyles.inputCustom
                      } `}
                      baseClassNameLabel={` ${!this.state.newPasswordEquals &&
                        globalStyles.errorPassword} ${
                        globalStyles.formGroupLabel
                      } ${newPassword && globalStyles.formGroupLabelOnFocus} `}
                      labelText="New password"
                      textHelper="Password must be 8 or more characters"
                      handleChangeInput={e =>
                        this.handleChangeNewPassword(e.target.value)
                      }
                      baseClassNameHelper={globalStyles.formGroupHelper}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputControl
                      value={repeatPassword}
                      id="repeatPassword"
                      type="password"
                      valid={isValidRepeatPassword}
                      baseClassName={` ${!this.state.newPasswordEquals &&
                        globalStyles.errorPassword} ${formClassName} ${
                        inputStyles.inputCustom
                      } `}
                      baseClassNameLabel={` ${!this.state.newPasswordEquals &&
                        globalStyles.errorPassword} ${
                        globalStyles.formGroupLabel
                      } ${repeatPassword &&
                        globalStyles.formGroupLabelOnFocus} `}
                      labelText="Confirm new password"
                      handleChangeInput={e =>
                        this.handleChangeRepeatPassword(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className={`${globalStyles.formGroup} pt-0 text-right`}>
                  <LoadButton
                    style={{ width: '75px' }}
                    type="submit"
                    buttonText="Save"
                    isFetching={changePasswordReducer.isFetching}
                    baseClassButton={`${buttonsStyles.buttonUICreate} ${
                      globalStyles.marginLeft_10
                    } btn btn-outline-primary`}
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
