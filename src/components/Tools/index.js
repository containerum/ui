import classNames from 'classnames/bind';

import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { routerLinks } from '../../config';
import styles from './index.scss';
import globalStyles from '../../theme/global.scss';

const globalStylesTools = classNames.bind(globalStyles);
const stylesTools = classNames.bind(styles);

const containerGlobalClassName = globalStylesTools(
  'contentBlockContainer',
  'hoverAction'
);
const containerClassName = stylesTools(
  'contentBlockContainerTools',
  'toolsCardContainer'
);

const containerClassNameWebhooks = stylesTools(
  'contentBlockContainerTools',
  'toolsCardContainer',
  'toolsCardContainerNotActive'
);

const configmapImgClassName = stylesTools(
  'contentBlockHeaderImgTools',
  'contentBlockHeaderImgToolsConfigmap'
);

const domainsImgClassName = stylesTools(
  'contentBlockHeaderImgTools',
  'contentBlockHeaderImgToolsDomains'
);

const webhooksImgClassName = stylesTools(
  'contentBlockHeaderImgTools',
  'contentBlockHeaderImgToolsWebhooks'
);

const contentClassName = globalStylesTools(
  'contentBlockContent',
  'contentBlockContentCardBlock'
);

const infoClassName = globalStylesTools(
  'contentBlockInfoName',
  'contentBlockHeaderLabelTextCenter'
);

const infoClassNameWebhooks = stylesTools(
  'contentBlockInfoNameTools',
  'contentBlockInfoNameToolsWebhooks'
);
const Tools = () => (
  <div>
    <Helmet title="Tools" />
    <div
      className={`container ${styles.containerTools} ${
        globalStyles.containerNoBackground
      }`}
    >
      <Link to={routerLinks.configmap}>
        <div className={`col-md-12 ${styles.toolsCard}`}>
          <div className={`${containerGlobalClassName} ${containerClassName}`}>
            <div className={globalStyles.contentBlockHeader}>
              <div
                className={`${globalStyles.contentBlockHeaderLabel} ${
                  styles.contentBlockHeaderLabelTools
                }`}
              >
                <div className={configmapImgClassName} />
                <div className={globalStyles.contentBlockHeaderLabelMain}>
                  CONFIGMAPS
                </div>
              </div>
            </div>
            <div
              className={`card-block ${contentClassName} ${
                styles.contentBlockContentTools
              }`}
            >
              <div className={globalStyles.contentBlockInfoItem}>
                <div
                  className={`${
                    styles.contentBlockInfoNameTools
                  } ${infoClassName} `}
                >
                  ConfigMaps allow you to decouple configuration artifacts from
                  image content to keep containerized applications portable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Link to={routerLinks.domains}>
        <div className={`col-md-12 ${styles.toolsCard}`}>
          <div className={`${containerGlobalClassName} ${containerClassName}`}>
            <div className={globalStyles.contentBlockHeader}>
              <div
                className={`${globalStyles.contentBlockHeaderLabel} ${
                  styles.contentBlockHeaderLabelTools
                }`}
              >
                <div className={domainsImgClassName} />
                <div className={globalStyles.contentBlockHeaderLabelMain}>
                  DOMAINS
                </div>
              </div>
            </div>

            <div
              className={`card-block ${contentClassName} ${
                styles.contentBlockContentTools
              }`}
            >
              <div className={globalStyles.contentBlockInfoItem}>
                <div
                  className={`${
                    styles.contentBlockInfoNameTools
                  } ${infoClassName} `}
                >
                  Domains help you to manage external access to the services.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div>
        {/* Link to="/webhook" */}
        <div className={`col-md-12 ${styles.toolsCard}`}>
          <div
            style={{ backgroundColor: '#fafafa' }}
            className={`${containerGlobalClassName} ${containerClassNameWebhooks}`}
          >
            <div className={globalStyles.contentBlockHeader}>
              <div
                className={`${globalStyles.contentBlockHeaderLabel} ${
                  styles.contentBlockHeaderLabelTools
                }`}
              >
                <div className={webhooksImgClassName} />
                <div className={globalStyles.contentBlockHeaderLabelMain}>
                  CD WEBHOOKS
                </div>
              </div>
            </div>

            <div
              className={`card-block ${contentClassName} ${
                styles.contentBlockContentTools
              }`}
            >
              <div className={globalStyles.contentBlockInfoItem}>
                <div className={`${infoClassNameWebhooks} ${infoClassName} `}>
                  CD WebHooks allow you to automate updating images in
                  containers.
                  <br />
                  <br />
                  <span style={{ color: '#29abe2' }}>Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Tools;
