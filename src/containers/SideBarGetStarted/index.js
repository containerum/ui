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
  fetchGetStartedIfNeeded: (role: string) => void,
  getProfileReducer: () => void,
  handleClickDontShow: () => void
};

export class SideBarGetStarted extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      sideBarAdmin: [
        { id: '1-create-a-project', innerHTML: '1. Create a Project' },
        { id: '2-create-a-deployment', innerHTML: '2. Create a Deployment' },
        { id: '3-create-a-service', innerHTML: '3. Create a Service' },
        {
          id: '4-how-to-access-an-application-by-external-ip',
          innerHTML: '4. How to access an application by External IP'
        },
        {
          id: '5-how-to-add-a-new-user',
          innerHTML: '5. How to add a new user'
        },
        {
          id: '6-how-to-add-a-user-to-a-project',
          innerHTML: '6. How to add a user to a project'
        }
      ],
      sideBarUser: [
        { id: '1-create-a-deployment', innerHTML: '1. Create a Deployment' },
        { id: '2-create-a-service', innerHTML: '2. Create a Service' },
        {
          id: '3-how-to-access-an-application-by-external-ip',
          innerHTML: '3. How to access an application by External IP'
        }
      ]
    };
  }
  componentDidMount() {
    const { fetchGetStartedIfNeeded, getStartedReducer } = this.props;
    if (getStartedReducer.readyStatus !== GET_STARTED_SUCCESS) {
      fetchGetStartedIfNeeded(this.props.getProfileReducer.data.role);
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
      let text = getStartedReducer.data;
      const regexpAbsoluteWebPanelLink = /(\/web-panel\/)/gi;
      const regexpAbsoluteCliLink = /(\/cli\/)/gi;
      const regexpImgUser = /<img src="\/img\/content\/getting-started\/user\//gi;
      const regexpImg = /<img src="\/img\/content\/getting-started\/admin\//gi;
      const regexpImgAdmin = /<img src="\/img\/content\/objects\/Membership\//gi;

      const regexpImgWithOut = /" width="100%"\/>/gi;
      text = text
        .replace(
          regexpImg,
          `![](https://raw.githubusercontent.com/containerum/containerum-docs/master/static_src/img/content/getting-started/admin/`
        )
        .replace(
          regexpImgUser,
          `![](https://raw.githubusercontent.com/containerum/containerum-docs/master/static_src/img/content/getting-started/user/`
        )
        .replace(
          regexpImgAdmin,
          `![](https://raw.githubusercontent.com/containerum/containerum-docs/master/static_src/img/content/objects/Membership/`
        )
        .replace(regexpImgWithOut, ')')
        .replace(
          regexpAbsoluteWebPanelLink,
          'https://docs.containerum.com/web-panel/'
        )
        .replace(regexpAbsoluteCliLink, 'https://docs.containerum.com/cli/');
      return <Markdown>{text}</Markdown>;
    }
    return null;
  };

  render() {
    const { sideBarAdmin, sideBarUser } = this.state;
    const sideBar =
      this.props.getProfileReducer.data.role === 'admin'
        ? sideBarAdmin
        : sideBarUser;
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
    getStartedAdminReducer,
    getNamespacesReducer
  }: ReduxState) => ({
    getProfileReducer,
    getStartedReducer,
    getStartedAdminReducer,
    getNamespacesReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetStartedIfNeeded: (role: string) =>
      dispatch(actionGetStarted.fetchGetStartedIfNeeded(role))
  })
);

export default connector(SideBarGetStarted);
