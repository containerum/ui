/* @flow */

import React from 'react';
import classNames from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import dashboardStyles from '../../containers/Dashboard/index.scss';

import { externalLinks } from '../../config';

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
        <a
          className={dashboardStyles.infoLink}
          href={externalLinks.fastDeploy}
          target="_blank"
          rel="noopener noreferrer"
        >
          - How To
        </a>
        <a
          className={dashboardStyles.infoLink}
          href={externalLinks.solutions}
          target="_blank"
          rel="noopener noreferrer"
        >
          - Solutions
        </a>
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
