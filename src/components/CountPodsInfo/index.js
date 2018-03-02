/* @flow */

import React from 'react';

type Props = {
  count: Object
};

const CountPodsInfo = ({ count }: Props) => (
  <div className="col-md-4">
    <div className="block-container top-block">
      <div className="top-block-icon pods-icon" />
      <div className="top-block-info">
        <div className="top-block-title">PODS</div>
        <div className="top-block-quantity">{count}</div>
      </div>
    </div>
  </div>
);

export default CountPodsInfo;
