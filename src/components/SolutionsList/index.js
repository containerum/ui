/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { routerLinks, sourceType } from '../../config';
import githubIcon from '../../images/githubIcon.svg';
import styles from '../../containers/Solutions/index.scss';
import globalStyles from '../../theme/global.scss';
import '../../theme/common.scss';

const isOnline = sourceType === 'ONLINE';

type Props = {
  data: Array<Object>,
  role: string,
  history: Object,
  handleClickRunSolution: (name: string) => void,
  handleDeleteSolutionTemplate: (name: string) => void
};

const handleClose = e => {
  e.stopPropagation();
};

const styleSolutions = classNames.bind(styles);
const iconClassName = styleSolutions('icon', 'iconGitHub');
const SolutionsList = ({
  data,
  role,
  history,
  handleClickRunSolution,
  handleDeleteSolutionTemplate
}: Props) => (
  <div className="row">
    {!isOnline &&
      role === 'admin' && (
        <Link
          to={routerLinks.addSolution}
          className={`col-md-4 ${styles.AddSolutionLink}`}
          key={_.uniqueId()}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.AddSolutionWrapper}>
            <i className={styles.AddSolutionPlus}>+</i> Add a Solution
          </div>
        </Link>
      )}
    {data.map(solution => {
      const { name, url, limits } = solution;
      const { cpu, ram } = limits;
      const imageHref = `${url}/master/${url.substring(
        url.lastIndexOf('/') + 1
      )}.png`.replace('github.com', 'raw.githubusercontent.com');
      return (
        <div
          className="col-md-4"
          key={_.uniqueId()}
          onClick={() => history.push(routerLinks.solutionLink(name))}
          style={{ cursor: 'pointer' }}
        >
          <button
            type="button"
            className="close"
            style={{
              position: 'absolute',
              top: 40,
              right: 30
            }}
            onClick={e => handleDeleteSolutionTemplate(e, name)}
            // onClick={() => handleCloseModal()}
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className={globalStyles.contentBlockContainerSolution}>
            <div className={globalStyles.contentBlockVolumeHeader}>
              <img
                className={styles.volumeHeaderImg}
                src={imageHref}
                alt={name}
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
                  {/* <a */}
                  {/* href={url} */}
                  {/* target="_blank" */}
                  {/* rel="noopener noreferrer" */}
                  {/* className={styles.volumeFooterLinksDeployBtn} */}
                  {/* > */}
                  {/* Deploy */}
                  {/* </a> */}
                  <div
                    className="footer-links-deploy-btn"
                    onClick={() => handleClickRunSolution(name)}
                  >
                    deploy
                  </div>
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
