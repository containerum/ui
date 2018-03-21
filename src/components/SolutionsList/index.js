/* @flow */

import React from 'react';
// import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';

import { routerLinks } from '../../config';
import getSolutionImage from '../../functions/getSolutionImage';
import githubIcon from '../../images/githubIcon.svg';

type Props = {
  data: Array<Object>,
  history: Object,
  handleClickRunSolution: (name: string) => void
};

const handleClose = e => {
  e.stopPropagation();
};

const SolutionsList = ({ data, history, handleClickRunSolution }: Props) => (
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
          <div className="content-block-container-solution">
            <div className="content-block-volume-header">
              <img
                className="volume-header-img"
                src={srcLogo}
                alt={name}
                style={{ height: logoHeight }}
              />
            </div>
            <div
              className="content-block-volume-footer"
              style={{ padding: '25px' }}
            >
              <div
                className="volume-footer-header"
                style={{ maxHeight: '30px' }}
              >
                {name}
              </div>
              <div className="volume-footer-info">
                <span className="volume-footer-info-item">CPU: {cpu}</span>
                <span className="volume-footer-info-item">RAM: {ram}</span>
              </div>

              <div
                className="volume-footer-links-wrap"
                onClick={e => handleClose(e)}
              >
                <div className="volume-footer-links-deploy">
                  <div
                    className="footer-links-deploy-btn"
                    onClick={() => handleClickRunSolution(name)}
                  >
                    deploy
                  </div>
                </div>
                <div className="volume-footer-links-github">
                  <a
                    className="footer-links-github-text"
                    href={url}
                    target="_blank"
                  >
                    Look on GitHub
                    <img
                      className="icon icons8-GitHub"
                      src={githubIcon}
                      alt="githubIcon"
                    />
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
