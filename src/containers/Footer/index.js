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
      getReleasesGithubReducer.readyStatus === GET_RELEASES_REQUESTING
    ) {
      return (
        <footer className="footer">
          <div className="footer-wrapper">
            <div className="footer-container container">
              <div className="footer__logo">Created by Exon Lab</div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer__download_cli"
                href="https://github.com/containerum/chkit/releases"
              >
                Download CLI <img src={arrows} alt="cli" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://containerum.com/documentation"
                className="footer__help"
              >
                Docs
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://containerum.com/fast-deploy/hello-world"
                className="footer__help"
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
      <footer className="footer">
        <div className="footer-wrapper">
          <div className="footer-container container">
            <div className="footer__logo">Created by Exon Lab</div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={linkPlatform}
              className="footer__download_cli"
              // onClick={() => this.handleClickAnaliticsDownloadCLIFooter()}
            >
              Download CLI <img src={arrows} alt="" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://containerum.com/documentation"
              className="footer__help"
              // onClick={() => this.handleClickAnaliticsDocsFooter()}
            >
              Docs
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://containerum.com/fast-deploy/hello-world"
              className="footer__help"
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
    return <div>{this.renderFooterInfo()}</div>;
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
