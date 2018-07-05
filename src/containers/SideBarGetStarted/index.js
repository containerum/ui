/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import _ from 'lodash/fp';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames/bind';

import styles from './index.scss';
import '../../theme/common.scss';
import scrollById from '../../functions/scrollById';
import stylesAccount from '../../containers/Account/index.scss';
import globalStyles from '../../theme/global.scss';

import type { Dispatch, ReduxState } from '../../types';
import * as actionGetStarted from '../../actions/getStarted';
import {
  GET_STARTED_INVALID,
  GET_STARTED_REQUESTING,
  GET_STARTED_FAILURE,
  GET_STARTED_SUCCESS
} from '../../constants/getStarted';

const globalClass = classNames.bind(globalStyles);
const containerClassNameSidebar = globalClass(
  'contentBlockContainer',
  'containerFluid',
  'containerNoBackground'
);
const containerClassName = globalClass(
  'contentBlockContainer',
  'containerFluid'
);

type Props = {
  match: Object,
  getStartedReducer: Object,
  fetchGetStartedIfNeeded: () => void,
  handleClickDontShow: () => void
};

export class SideBarGetStarted extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      sideBar: [
        { id: '1-registration', innerHTML: '1. Registration' },
        { id: '2-billing', innerHTML: '2. Billing' },
        { id: '3-create-a-project', innerHTML: '3. Create a Project' },
        { id: '4-create-a-deployment', innerHTML: '4. Create a Deployment' },
        { id: '5-create-a-service', innerHTML: '5. Create a Service' },
        { id: '6-create-a-domain', innerHTML: '6. Create a Domain' },
        { id: '7-go-to-the-domain-page', innerHTML: '7. Go to the domain page' }
      ]
    };
  }
  componentDidMount() {
    const { fetchGetStartedIfNeeded, getStartedReducer } = this.props;
    if (getStartedReducer.readyStatus !== GET_STARTED_SUCCESS) {
      fetchGetStartedIfNeeded();
    }
  }
  componentWillUnmount() {
    if (typeof document === 'object') {
      const getHtml = document.querySelector('html');
      getHtml.style.overflow = 'auto';
    }
  }

  renderSideBarGetStartedList = () => {
    const { getStartedReducer } = this.props;
    if (
      !getStartedReducer.readyStatus ||
      getStartedReducer.readyStatus === GET_STARTED_INVALID ||
      getStartedReducer.readyStatus === GET_STARTED_REQUESTING
    ) {
      return (
        <div className="row">
          {new Array(6).fill().map(() => (
            <div
              key={_.uniqueId()}
              className={`col-md-4  ${styles.solutionContainerPlaceholder}`}
              style={{
                display: 'inline-block',
                marginTop: 30,
                height: '307px',
                backgroundColor: '#f6f6f6'
              }}
            />
          ))}
        </div>
      );
    }
    if (getStartedReducer.readyStatus === GET_STARTED_FAILURE) {
      return <p>Oops, Failed to load data of SideBarGetStarted!</p>;
    }

    if (getStartedReducer.readyStatus === GET_STARTED_SUCCESS) {
      let text = getStartedReducer.data.substring(225);
      const regexpImg = /<img src="\/img\/content\/getting-started\/online\//gi;
      const regexpImgWithOut = /" width="100%"\/>/gi;
      text = text
        .replace(
          regexpImg,
          `![](https://raw.githubusercontent.com/containerum/containerum-docs/master/static_src/img/content/getting-started/online/`
        )
        .replace(regexpImgWithOut, ')');
      return <Markdown>{text}</Markdown>;
    }
    return null;
  };

  render() {
    const { sideBar } = this.state;
    return (
      <div>
        {this.props.match && (
          <div className={globalStyles.contentBlock}>
            <div className={`container ${globalStyles.containerNoBackground}`}>
              <div className="row double two-columns">
                <div className="col-md-3 col-lg-3 col-xl-2">
                  <div
                    className={`${globalStyles.contentBlock} ${
                      stylesAccount.accountInfo
                    }`}
                  >
                    <div
                      className={`${containerClassNameSidebar} container pl-0 pr-0`}
                      style={{ marginTop: 45 }}
                    >
                      <ul
                        className={`${stylesAccount.accountMenu} ${
                          stylesAccount.accountMenuNav
                        } nav nav-list`}
                      >
                        {sideBar.map(bar => (
                          <li
                            key={bar.id}
                            className={`${stylesAccount.navItem} nav-item`}
                          >
                            <div
                              className={`${stylesAccount.navLink} nav-link`}
                              style={{ margin: 0 }}
                              onClick={() => scrollById(bar.id)}
                            >
                              {bar.innerHTML}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 col-lg-9 col-xl-10">
                  <div className={globalStyles.contentBlock}>
                    <div className={`${containerClassName} container`}>
                      <div
                        className={`${globalStyles.blockItem} ${
                          styles.SideBarImages
                        }`}
                      >
                        {this.renderSideBarGetStartedList()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!this.props.match && (
          <div className={`modal-main-content ${styles.ModalMainContent}`}>
            <div className={styles.ModalModalList}>
              <ul className={styles.ModalModalListWrap}>
                {sideBar.map(bar => (
                  <li key={bar.id} className={`${styles.NavItem} nav-item`}>
                    <div
                      className={`${styles.NavLink} nav-link`}
                      style={{ margin: 0 }}
                      onClick={() => scrollById(bar.id)}
                    >
                      {bar.innerHTML}
                    </div>
                  </li>
                ))}
              </ul>
              {/* <Scrollspy */}
              {/* items={[ */}
              {/* '1-registration', */}
              {/* '2-billing', */}
              {/* '3-create-a-project', */}
              {/* '4-create-a-deployment', */}
              {/* '5-create-a-service', */}
              {/* '6-create-a-domain', */}
              {/* '7-go-to-the-domain-page' */}
              {/* ]} */}
              {/* id="stuckBlock" */}
              {/* className={styles.ModalModalListWrap} */}
              {/* currentClassName={styles.ModalModalListWrapNavLink} */}
              {/* > */}
              {/* </Scrollspy> */}
              <div
                className={styles.DontShowMe}
                onClick={this.props.handleClickDontShow}
              >
                <span>Don’t show widget anymore</span>
              </div>
            </div>
            <div className="main-content" style={{ marginTop: 20 }}>
              <div className={styles.GetStartedText}>
                {this.renderSideBarGetStartedList()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    getProfileReducer,
    getStartedReducer,
    getNamespacesReducer
  }: ReduxState) => ({
    getProfileReducer,
    getStartedReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetStartedIfNeeded: () =>
      dispatch(actionGetStarted.fetchGetStartedIfNeeded())
  })
);

export default connector(SideBarGetStarted);
