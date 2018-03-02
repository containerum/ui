/* @flow */

import React from 'react';

type Props = {
  count: Object
};

const CountDeploymentsInfo = ({ count }: Props) => (
  <div className="col-md-4">
    <div className="block-container top-block">
      <div className="top-block-icon deployments-icon" />
      <div className="top-block-info">
        <div className="top-block-title">Deployments</div>
        <div className="top-block-quantity">{count}</div>
      </div>
    </div>
  </div>
);

export default CountDeploymentsInfo;
