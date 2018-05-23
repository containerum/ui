/* @flow */

import React from 'react';
import globalStyles from '../../theme/global.scss';
import styles from './index.scss';

type Props = {
  handleChangeInput: Function,
  value: string,
  id: string,
  labelId: string,
  labelText: string,
  required: ?string,
  pattern: ?string,
  type: string,
  title: ?string,
  valid: boolean,
  baseClassName: string,
  baseClassNameLabel: string,
  textHelper: ?string,
  baseClassNameHelper: ?string,
  disabled: ?boolean,
  placeholder: ?string,
  min: ?number,
  max: ?number,
  subPath: ?boolean,
  alwaysVisiblePlaceholder: ?string,
  maxLength: number
};
const InputControl = ({
  handleChangeInput,
  value,
  placeholder,
  id,
  required,
  pattern,
  type,
  title,
  valid = true,
  labelId,
  baseClassName,
  baseClassNameLabel,
  textHelper,
  baseClassNameHelper,
  disabled,
  labelText,
  min,
  max,
  subPath,
  alwaysVisiblePlaceholder,
  maxLength
}: Props) => (
  <div
    className={`${globalStyles.formGroup} ${!valid && globalStyles.formError}`}
  >
    {subPath && <span className={styles.inputSubpath}>/</span>}
    <input
      className={baseClassName}
      id={id}
      value={value}
      type={type}
      title={title}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
      disabled={disabled}
      onChange={e => handleChangeInput(e)}
      min={min}
      max={max}
      maxLength={maxLength || 35}
    />
    {labelText && (
      <label className={baseClassNameLabel} htmlFor={id} id={labelId}>
        {labelText}
      </label>
    )}
    {alwaysVisiblePlaceholder && <span className={alwaysVisiblePlaceholder} />}
    {textHelper && <div className={baseClassNameHelper}>{textHelper}</div>}
  </div>
);

export default InputControl;
