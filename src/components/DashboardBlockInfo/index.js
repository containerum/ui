/* @flow */

import React from 'react';

import { externalLinks } from '../../config';

const DashboardBlockInfo = () => (
  <div className="col-md-3 col-info">
    <div className="block-container block-h">
      <div className="top-block-header">INFO</div>
      <div className="info-list">
        <a
          className="info-link"
          href={externalLinks.documentation}
          target="_blank"
          rel="noopener noreferrer"
        >
          - Documentation
        </a>
        <a
          className="info-link"
          href={externalLinks.fastDeploy}
          target="_blank"
          rel="noopener noreferrer"
        >
          - How To
        </a>
        <a
          className="info-link"
          href={externalLinks.solutions}
          target="_blank"
          rel="noopener noreferrer"
        >
          - Solutions
        </a>
        <a
          className="info-link"
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
