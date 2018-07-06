/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import dashboardStyles from '../../containers/Dashboard/index.scss';

import { externalLinks, routerLinks } from '../../config';

const infoClassName = classNames.bind(dashboardStyles);

const block = infoClassName('blockContainer', 'blockH');

const DashboardBlockInfo = () => (
  <div className={`col-md-3 ${globalStyles.colInfo}`}>
    <div className={block}>
      <div className={dashboardStyles.topBlockHeader}>INFO</div>
      <div className={dashboardStyles.infoList}>
        <a
          className={dashboardStyles.infoLink}
          href={externalLinks.documentation}
          target="_blank"
          rel="noopener noreferrer"
        >
          - Documentation
        </a>
        <Link to={routerLinks.getStarted} className={dashboardStyles.infoLink}>
          - Get Started
        </Link>
        <Link className={dashboardStyles.infoLink} to={routerLinks.solutions}>
          - Solutions
        </Link>
        <a
          className={dashboardStyles.infoLink}
          href={externalLinks.blog}
          target="_blank"
          rel="noopener noreferrer"
        >
          - Blog
        </a>
      </div>
    </div>
  </div>
);

export default DashboardBlockInfo;
