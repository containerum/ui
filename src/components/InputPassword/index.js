/* @flow */

import React from 'react';
// import classNames from 'classnames';

// import styles from './index.scss';

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
    // className={classNames(styles.formControl, styles.customInput)}
    className="form-control custom-input"
    id={id}
    onChange={e => handleChangePassword(e.target.value)}
    value={value}
    disabled={disabled}
    placeholder={placeholder || 'Password'}
  />
);

export default InputPassword;
