/* @flow */

import React from 'react';

import styles from './styles.scss';

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
    className={`form-control ${styles.formControl} ${styles.customInput}`}
    id={id}
    onChange={e => handleChangeEmail(e.target.value)}
    value={value}
    placeholder={placeholder || 'Email'}
    maxLength={maxLength || 40}
  />
);

export default InputEmail;
