/* @flow */

import React from 'react';

import MiniSpinner from '../MiniSpinner';

type Props = {
  isFetching: boolean,
  mini: string,
  buttonText: string,
  typeMiniSpinner: ?string,
  style: ?Object,
  baseClassButton: string,
  type: string,
  disabled: boolean
};

const LoadButton = ({
  isFetching,
  buttonText,
  typeMiniSpinner,
  mini,
  style,
  baseClassButton,
  type,
  disabled
}: Props) => {
  const currentButtonText = isFetching ? (
    <MiniSpinner type={typeMiniSpinner} />
  ) : (
    buttonText
  );
  const currentBaseClassButton = isFetching
    ? `${baseClassButton} disabled ${mini}`
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
