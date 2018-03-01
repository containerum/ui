/* @flow */

import React from 'react';
// import classNames from 'classnames';

// import styles from './styles.scss';

type Props = {
  handleChangeEmail: Function,
  value: string,
  id: string,
  placeholder: string
};

const InputEmail = ({ handleChangeEmail, value, placeholder, id }: Props) => (
  <input
    type="email"
    // className={classNames(styles.formControl, styles.customInput)}
    className="form-control custom-input"
    id={id}
    onChange={e => handleChangeEmail(e.target.value)}
    value={value}
    placeholder={placeholder || 'Email'}
  />
);

export default InputEmail;
