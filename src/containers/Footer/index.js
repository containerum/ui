/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Switch, Route, Redirect, Link } from 'react-router-dom';
import type { Connector } from 'react-redux';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetReleasesGithub from '../../actions/getReleasesGithub';
import getPlatform from '../../functions/getPlatform';
import {
  GET_RELEASES_INVALID,
  GET_RELEASES_REQUESTING,
  GET_RELEASES_FAILURE
} from '../../constants/getReleasesGithubConstants';
import arrows from '../../images/arrows.png';
import { externalLinks, sourceType, latestRelease } from '../../config';
import styles from './styles.scss';

type Props = {
  getReleasesGithubReducer: Object,
  fetchGetReleasesIfNeeded: () => void
};

const isOnline = sourceType === 'ONLINE';

export class Footer extends PureComponent<Props> {
  componentDidMount() {
    const { fetchGetReleasesIfNeeded } = this.props;
    fetchGetReleasesIfNeeded();
  }

  renderFooterInfo = () => {
    const { getReleasesGithubReducer } = this.props;

    if (
      !getReleasesGithubReducer.readyStatus ||
      getReleasesGithubReducer.readyStatus === GET_RELEASES_INVALID ||
      getReleasesGithubReducer.readyStatus === GET_RELEASES_REQUESTING ||
      getReleasesGithubReducer.readyStatus === GET_RELEASES_FAILURE
    ) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={externalLinks.releasesChkit}
          className={styles.footerDownloadCli}
          // onClick={() => this.handleClickAnaliticsDownloadCLIFooter()}
        >
          Download CLI <img src={arrows} alt="" />
        </a>
      );
    }

    if (getReleasesGithubReducer.readyStatus === GET_RELEASES_FAILURE) {
      return null;
    }

    const { linkPlatform } = getPlatform(getReleasesGithubReducer.data);
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={linkPlatform}
        className={styles.footerDownloadCli}
        // onClick={() => this.handleClickAnaliticsDownloadCLIFooter()}
      >
        Download CLI <img src={arrows} alt="" />
      </a>
    );
  };

  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={`${styles.footerContainer} container`}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLogo}
              href={externalLinks.exonLV}
            >
              &copy; Created by ExonLV
            </a>
            {!isOnline &&
              latestRelease && (
                <div
                  style={{
                    position: 'absolute',
                    top: 13,
                    right: '48%',
                    fontSize: 12
                  }}
                >
                  Version:&nbsp;
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={externalLinks.containerumReleases}
                  >
                    {latestRelease}
                  </a>
                </div>
              )}
            {this.renderFooterInfo()}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={externalLinks.documentation}
              className={styles.footerHelp}
              // onClick={() => this.handleClickAnaliticsDocsFooter()}
            >
              Docs
            </a>
            {isOnline && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={externalLinks.fastDeploy}
                className={styles.footerHelp}
                // onClick={() => this.handleClickAnaliticsHowToFooter()}
              >
                Get Started
              </a>
            )}
          </div>
        </div>
      </footer>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getReleasesGithubReducer }: ReduxState) => ({
    getReleasesGithubReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetReleasesIfNeeded: () =>
      dispatch(actionGetReleasesGithub.fetchGetReleasesIfNeeded())
  })
);

export default connector(Footer);
