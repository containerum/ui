/* @flow */

import React from 'react';
import Blockies from 'react-blockies';
import className from 'classnames/bind';

import InputControl from '../InputControl';
import CheckBoxControl from '../CheckBoxControl';
import './Profile.css';

import globalStyles from '../../theme/global.scss';
import billingStyles from '../../containers/Billing/index.scss';
import inputStyles from '../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  firstName: string,
  login: string,
  statusUser: string,
  isChecked: boolean,
  isDisabledCheckBox: boolean,
  handleChangeCheckBox: () => void,
  handleOpenCloseModal: () => void,
  handleClickActivateUser: () => void
};

const ProfileInfo = ({
  firstName,
  login,
  statusUser,
  isChecked,
  isDisabledCheckBox,
  handleChangeCheckBox,
  handleOpenCloseModal,
  handleClickActivateUser
}: Props) => (
  <div className={globalStyles.blockItem} id="profile">
    <div className={globalStyles.blockItemTitle}>Profile</div>
    <form>
      <div className="row">
        <div className="col-md-2">
          <div className={`${globalStyles.formGroup} pt-0`}>
            <label
              className={globalStyles.formGroupLabelImage}
              htmlFor="avatar"
            >
              <Blockies seed={login} size={9} scale={7} bgColor="#fff" />
            </label>
          </div>
        </div>
        {firstName && (
          <div className="col-md-5">
            <InputControl
              value={firstName}
              id="name"
              type="text"
              baseClassName={`${formClassName} ${
                inputStyles.inputCustom
              } form-control`}
              baseClassNameLabel={`${globalStyles.formGroupLabel} ${
                globalStyles.formGroupLabelOnFocus
              }`}
              labelText="Name"
              disabled
            />
          </div>
        )}
        <div className="col-md-5">
          <InputControl
            value={login}
            id="email"
            type="text"
            baseClassName={`${formClassName} ${
              inputStyles.inputCustom
            } form-control`}
            baseClassNameLabel={`${globalStyles.formGroupLabel} ${
              globalStyles.formGroupLabelOnFocus
            }`}
            labelText="Email"
            disabled
          />
        </div>
      </div>
      {statusUser && (
        <div className="row" style={{ marginTop: 60 }}>
          <div className="col-md-3">
            <div className={`${globalStyles.formGroup} pt-0`}>
              <div className={billingStyles.billingContentText}>
                Status:&nbsp;
              </div>
              <div
                className={`${
                  billingStyles.billingInformationStatusInfo
                } ${statusUser !== 'active' &&
                  billingStyles.billingInformationInactiveInfo}`}
              >
                {statusUser}
              </div>
            </div>
          </div>
          <div className="col-md-4" />
          <div className="col-md-5">
            <div className={`${globalStyles.formGroup} pt-0`}>
              <div style={{ float: 'right' }}>
                {statusUser === 'active' ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleOpenCloseModal}
                  >
                    Reset Password
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ marginLeft: 20 }}
                    onClick={handleClickActivateUser}
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className={`${globalStyles.formGroup} pt-0`}>
              <CheckBoxControl
                id="admin"
                value={isChecked}
                checked={isChecked}
                disabled={isDisabledCheckBox}
                labelText="Enable Admin Status"
                labelClassName={globalStyles.labelCustom}
                handleChangeCheckBox={handleChangeCheckBox}
              />
              <div style={{ fontSize: 12, color: '#a7a7a7' }}>
                Admin status allows user to manage resource and other users
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  </div>
);

export default ProfileInfo;
