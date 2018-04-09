/* @flow */

import React from 'react';

import styles from './styles.scss';

type Props = {
  handleChangeCheckBox: Function,
  value: boolean,
  id: string,
  labelText: string,
  labelClassName: string,
  disabled: ?boolean,
  checked: ?boolean
};
const CheckBoxControl = ({
  handleChangeCheckBox,
  value,
  id,
  labelText,
  labelClassName,
  disabled,
  checked
}: Props) => (
  <div className={styles.mdCheckbox}>
    <input
      onChange={handleChangeCheckBox}
      id={id}
      value={value}
      type="checkbox"
      disabled={disabled}
      checked={checked}
    />
    {labelText && (
      <label
        style={{ paddingLeft: '15px', paddingBottom: '8px' }}
        className={labelClassName}
        htmlFor={id}
      >
        {labelText}
      </label>
    )}
  </div>
);

export default CheckBoxControl;
