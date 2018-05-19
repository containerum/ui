/* @flow */

import React from 'react';
import Blockies from 'react-blockies';
import className from 'classnames/bind';

import InputControl from '../InputControl';
import './Profile.css';

import globalStyles from '../../theme/global.scss';
import inputStyles from '../../components/InputControl/index.scss';

const globalClass = className.bind(globalStyles);

const formClassName = globalClass('formInputText', 'formControl');

type Props = {
  data: Object
};

const ProfileInfo = ({ data }: Props) => (
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
              <Blockies seed={data.login} size={9} scale={7} bgColor="#fff" />
            </label>
          </div>
        </div>
        {data.data && (
          <div className="col-md-5">
            <InputControl
              value={data.data.first_name}
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
            value={data.login}
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
    </form>
  </div>
);

export default ProfileInfo;
