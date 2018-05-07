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
import { externalLinks } from '../../config';
import styles from './styles.scss';

type Props = {
  getReleasesGithubReducer: Object,
  fetchGetReleasesIfNeeded: () => void
};

// Export this for unit testing more easily
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
        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={`${styles.footerContainer} container`}>
              <div className={styles.footerLogo}>Created by Exon Lab</div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={externalLinks.releasesChkit}
                className={styles.footerDownloadCli}
                // onClick={() => this.handleClickAnaliticsDownloadCLIFooter()}
              >
                Download CLI <img src={arrows} alt="" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={externalLinks.documentation}
                className={styles.footerHelp}
                // onClick={() => this.handleClickAnaliticsDocsFooter()}
              >
                Docs
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={externalLinks.helloWorld}
                className={styles.footerHelp}
                // onClick={() => this.handleClickAnaliticsHowToFooter()}
              >
                How To
              </a>
            </div>
          </div>
        </footer>
      );
    }

    if (getReleasesGithubReducer.readyStatus === GET_RELEASES_FAILURE) {
      return null;
    }

    const { linkPlatform } = getPlatform(getReleasesGithubReducer.data);
    return (
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={`${styles.footerContainer} container`}>
            <div className={styles.footerLogo}>Created by Exon Lab</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={linkPlatform}
              className={styles.footerDownloadCli}
              // onClick={() => this.handleClickAnaliticsDownloadCLIFooter()}
            >
              Download CLI <img src={arrows} alt="" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={externalLinks.documentation}
              className={styles.footerHelp}
              // onClick={() => this.handleClickAnaliticsDocsFooter()}
            >
              Docs
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={externalLinks.helloWorld}
              className={styles.footerHelp}
              // onClick={() => this.handleClickAnaliticsHowToFooter()}
            >
              How To
            </a>
          </div>
        </div>
      </footer>
    );
  };

  render() {
    return <div style={{ position: 'static' }}>{this.renderFooterInfo()}</div>;
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
