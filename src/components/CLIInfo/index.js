/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import { externalLinks } from '../../config';
import type { ReduxState } from '../../types';
import getPlatform from '../../functions/getPlatform';
import arrows from '../../images/arrows.png';

type Props = {
  getReleasesGithubReducer: Object
};

const CLIInfo = ({ getReleasesGithubReducer }: Props) => {
  const { buttonPlatformContent, linkPlatform, version, size } = getPlatform(
    getReleasesGithubReducer.data
  );
  return (
    <div className="block-item" id="cli">
      <div className="block-item__title">CLI</div>
      <div className="row">
        <div className="col-md-8">
          <div className="light-text">
            You can download our CLI Tool for your operating system. For fast
            authentication use the token below.
          </div>
        </div>
        <div className="col-md-4">
          <div className="block-item__sub-title">Download</div>
          <a
            target="_blank"
            href={linkPlatform}
            className="block-item__download"
          >
            <span className="block-item__download-title">
              {buttonPlatformContent}
            </span>
            <span className="block-item__download-note">
              Version {version} / {size} MB{' '}
            </span>
            <span className="block-item__download-arrow">
              <img src={arrows} alt="" />
            </span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={externalLinks.releasesChkit}
            className="block-item__download block-item__download_alt"
          >
            <span className="block-item__download-title">or</span>
            <span className="block-item__download-note">
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
