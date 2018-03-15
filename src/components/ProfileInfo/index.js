/* @flow */

import React from 'react';
import Blockies from 'react-blockies';

import InputControl from '../InputControl';
import './Profile.css';

type Props = {
  email: string,
  name: string
};

const ProfileInfo = ({ email, name }: Props) => (
  <div className="block-item" id="profile">
    <div className="block-item__title">Profile</div>
    <form>
      <div className="row">
        <div className="col-md-2">
          <div className="form-group pt-0">
            <label className="form-group__label-image" htmlFor="avatar">
              <Blockies seed={email} size={9} scale={7} bgColor="#fff" />
            </label>
          </div>
        </div>
        {name && (
          <div className="col-md-5">
            <InputControl
              value={name}
              id="name"
              type="text"
              baseClassName="form-group__input-text form-control"
              baseClassNameLabel="form-group__label form-group__label-always-onfocus"
              labelText="Name"
              disabled
            />
          </div>
        )}
        <div className="col-md-5">
          <InputControl
            value={email}
            id="email"
            type="text"
            baseClassName="form-group__input-text form-control"
            baseClassNameLabel="form-group__label form-group__label-always-onfocus"
            labelText="Email"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
);

export default ProfileInfo;
