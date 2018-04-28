/* @flow */

import React from 'react';
import classNames from 'classnames/bind';

import dashboardStyles from '../../containers/Dashboard/index.scss';

const dashboardClassName = classNames.bind(dashboardStyles);

const topBlock = dashboardClassName('blockContainer', 'topBlock');

const topBlockIcon = dashboardClassName(
  'topBlockIcon',
  'dashboardDeploymentIcon'
);

type Props = {
  count: Object
};

const CountDeploymentsInfo = ({ count }: Props) => (
  <div className="col-md-4">
    <div className={topBlock}>
      <div className={topBlockIcon} />
      <div>
        <div className={dashboardStyles.topBlockTitle}>Deployments</div>
        <div className={dashboardStyles.topBlockQuantity}>{count}</div>
      </div>
    </div>
  </div>
);

export default CountDeploymentsInfo;
