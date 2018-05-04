/* @flow */

import React from 'react';
// import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { routerLinks } from '../../config';
import getSolutionImage from '../../functions/getSolutionImage';
import githubIcon from '../../images/githubIcon.svg';

import styles from '../../containers/Solutions/index.scss';
import globalStyles from '../../theme/global.scss';
import '../../theme/common.scss';

type Props = {
  data: Array<Object>,
  history: Object
  // handleClickRunSolution: (name: string) => void
};

const handleClose = e => {
  e.stopPropagation();
};

const styleSolutions = classNames.bind(styles);
const iconClassName = styleSolutions('icon', 'iconGitHub');
const SolutionsList = ({
  data,
  history
}: // handleClickRunSolution
Props) => (
  <div className="row">
    {data.map(solution => {
      const { Name: name, URL: url, CPU: cpu, RAM: ram } = solution;
      const { srcLogo, logoHeight } = getSolutionImage(name, '100px');
      return (
        <div
          className="col-md-4"
          key={_.uniqueId()}
          onClick={() => history.push(routerLinks.solutionLink(name))}
          style={{ cursor: 'pointer' }}
        >
          <div className={globalStyles.contentBlockContainerSolution}>
            <div className={globalStyles.contentBlockVolumeHeader}>
              <img
                className={styles.volumeHeaderImg}
                src={srcLogo}
                alt={name}
                style={{ height: logoHeight }}
              />
            </div>
            <div className={globalStyles.contentBlockVolumeFooter}>
              <div className={styles.volumeFooterHeader}>{name}</div>
              <div className={styles.volumeFooterInfo}>
                <span className={styles.volumeFooterInfoItem}>CPU: {cpu}</span>
                <span className={styles.volumeFooterInfoItem}>RAM: {ram}</span>
              </div>

              <div onClick={e => handleClose(e)}>
                <div className={styles.volumeFooterLinksDeploy}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.volumeFooterLinksDeployBtn}
                  >
                    Deploy
                  </a>
                  {/* <div */}
                  {/* className="footer-links-deploy-btn" */}
                  {/* onClick={() => handleClickRunSolution(name)} */}
                  {/* > */}
                  {/* deploy */}
                  {/* </div> */}
                </div>
                <div className={styles.volumeFooterLinksGithub}>
                  <a
                    className={styles.volumeFooterLinksGithubText}
                    href={url}
                    target="_blank"
                  >
                    <img
                      className={iconClassName}
                      src={githubIcon}
                      alt="githubIcon"
                    />
                    Look on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default SolutionsList;
