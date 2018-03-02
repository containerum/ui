/* @flow */

import React from 'react';

const DashboardBlockInfo = () => (
  <div className="col-md-3 col-info">
    <div className="block-container block-h">
      <div className="top-block-header">INFO</div>
      <div className="info-list">
        <a
          className="info-link"
          href="https://containerum.com/documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          - Documentation
        </a>
        <a
          className="info-link"
          href="https://containerum.com/fast-deploy"
          target="_blank"
          rel="noopener noreferrer"
        >
          - How To
        </a>
        <a
          className="info-link"
          href="https://github.com/containerum"
          target="_blank"
          rel="noopener noreferrer"
        >
          - Solutions
        </a>
        <a
          className="info-link"
          href="https://blog.containerum.com/"
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
