/* @flow */

import React from 'react';
// import classNames from 'classnames';

import styles from '../InputEmail/styles.scss';

type Props = {
  handleChangePassword: Function,
  value: string,
  id: string,
  disabled: string,
  placeholder: string
};

const InputPassword = ({
  handleChangePassword,
  value,
  disabled,
  placeholder,
  id
}: Props) => (
  <input
    type="password"
    className={`form-control ${styles.formControl} ${styles.customInput}`}
    id={id}
    onChange={e => handleChangePassword(e.target.value)}
    value={value}
    disabled={disabled}
    placeholder={placeholder || 'Password'}
  />
);

export default InputPassword;
