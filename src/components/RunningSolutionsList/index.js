/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';

const globalClassName = classNames.bind(globalStyles);
const btnClassName = globalClassName('btnBlue', 'btnDepl');

type Props = {
  data: Object,
  history: Object,
  idName: string
};

const RunningSolutionsList = ({ data, history, idName }: Props) => {
  const handleClickGetSolution = name => {
    history.push(routerLinks.getRunningSolutionLink(idName, name));
  };
  const handleClose = e => {
    e.stopPropagation();
  };

  return (
    <div className="tab-content" id="pills-tabContent" style={{ margin: 30 }}>
      <div
        className="tab-pane fade show active"
        id="Solutions"
        role="tabpanel"
        aria-labelledby="Solutions-tab"
      >
        {data.length >= 1 && (
          <div className="solution-containers-wrapper">
            {data.map(solution => {
              const { name, branch, template, url } = solution;
              const imageHref = `${url}/${template}.png`
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('/tree', '');
              return (
                <div
                  className="solution-container"
                  key={_.uniqueId()}
                  onClick={() => handleClickGetSolution(name)}
                >
                  <div className="solution-container-img">
                    <div className="solution-container-img-block">
                      <img src={imageHref} alt={name} />
                    </div>
                  </div>
                  <div className="solution-container-info">
                    <div className="solution-container-info-title">{name}</div>
                    <div className="solution-container-info-text">
                      {template}
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      className="solution-container-status"
                      onClick={handleClose}
                    >
                      branch: <span className="status-active">{branch}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!data.length && (
          <div>
            <div className={globalStyles.createDeploymentWrapper}>
              <div className={globalStyles.noCreatedPodMessage}>
                You have no active Solutions yet.<br />Create your 1st Solution
              </div>
              <NavLink
                className={btnClassName}
                data-toggle="modal"
                to={routerLinks.createSolutionLink(idName)}
              >
                Create Solution
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningSolutionsList;
