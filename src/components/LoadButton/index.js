/* @flow */

import React from 'react';

import MiniSpinner from '../MiniSpinner';

type Props = {
  isFetching: boolean,
  buttonText: string,
  style: ?Object,
  baseClassButton: string,
  type: string,
  disabled: boolean
};

const LoadButton = ({
  isFetching,
  buttonText,
  style,
  baseClassButton,
  type,
  disabled
}: Props) => {
  const currentButtonText = isFetching ? <MiniSpinner /> : buttonText;
  const currentBaseClassButton = isFetching
    ? `${baseClassButton} disabled`
    : baseClassButton;
  const isActiveButton = !!isFetching || disabled;
  return (
    <button
      style={style}
      type={type || 'submit'}
      className={currentBaseClassButton}
      disabled={isActiveButton}
    >
      {currentButtonText}
    </button>
  );
};

export default LoadButton;
