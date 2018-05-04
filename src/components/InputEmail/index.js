/* @flow */

import React from 'react';
// import classNames from 'classnames';

// import styles from './index.scss';

type Props = {
  handleChangeEmail: Function,
  value: string,
  id: string,
  placeholder: string,
  maxLength: number
};

const InputEmail = ({
  handleChangeEmail,
  value,
  placeholder,
  id,
  maxLength
}: Props) => (
  <input
    type="email"
    // className={classNames(styles.formControl, styles.customInput)}
    className="form-control custom-input"
    id={id}
    onChange={e => handleChangeEmail(e.target.value)}
    value={value}
    placeholder={placeholder || 'Email'}
    maxLength={maxLength || 40}
  />
);

export default InputEmail;
