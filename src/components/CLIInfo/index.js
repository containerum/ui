/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import classNames from 'classnames/bind';

import { externalLinks } from '../../config';
import type { ReduxState } from '../../types';
import getPlatform from '../../functions/getPlatform';
import arrows from '../../images/arrows.png';

import globalStyles from '../../theme/global.scss';

type Props = {
  getReleasesGithubReducer: Object
};

const globalClassName = classNames.bind(globalStyles);

const downloadAltClassName = globalClassName(
  'blockItemDownload',
  'blockItemDownloadAlt'
);

const CLIInfo = ({ getReleasesGithubReducer }: Props) => {
  const { buttonPlatformContent, linkPlatform, version, size } = getPlatform(
    getReleasesGithubReducer.data
  );
  return (
    <div className={globalStyles.blockItem} id="cli">
      <div className={globalStyles.blockItemTitle}>CLI</div>
      <div className="row">
        <div className="col-md-8">
          <div className={globalStyles.textLight}>
            You can download our CLI Tool for your operating system.
          </div>
        </div>
        <div className="col-md-4">
          <div className={globalStyles.blockItemSubTitle}>Download</div>
          <a
            target="_blank"
            href={linkPlatform}
            className={globalStyles.blockItemDownload}
          >
            <span>{buttonPlatformContent}</span>
            <span className={globalStyles.blockItemDownloadNote}>
              Version {version} / {size} MB{' '}
            </span>
            <span className={globalStyles.blockItemDownloadArrow}>
              <img src={arrows} alt="" />
            </span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={externalLinks.releasesChkit}
            className={downloadAltClassName}
          >
            <span>or</span>
            <span className={globalStyles.blockItemDownloadNote}>
              CLI for other platform
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const connector: Connector<{}, Props> = connect(
  ({ getReleasesGithubReducer }: ReduxState) => ({ getReleasesGithubReducer })
);

export default connector(CLIInfo);
