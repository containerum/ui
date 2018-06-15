/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';
import getSolutionImage from '../../functions/getSolutionImage';

const globalClassName = classNames.bind(globalStyles);
const btnClassName = globalClassName('btnBlue', 'btnDepl');

type Props = {
  data: Object,
  // dataNamespace: Object,
  history: Object,
  idName: string
  // handleDeleteDeployment: ?(idDep: string) => void
};

const RunningSolutionsList = ({
  data,
  // dataNamespace,
  history,
  idName
}: // dataNamespace,
// history,
// idName,
// handleDeleteDeployment
Props) => {
  const handleClickGetSolution = name => {
    history.push(routerLinks.getRunningSolutionLink(idName, name));
  };
  // const handleClickDeleteDeployment = name => {
  //   handleDeleteDeployment(name);
  // };
  // const handleClose = e => {
  //   e.stopPropagation();
  // };
  // const ta = timeago();
  // const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';

  const currentDataSolution = data.filter(
    solution => solution.namespace === idName
  );
  return (
    <div className="tab-content" id="pills-tabContent" style={{ margin: 30 }}>
      <div
        className="tab-pane fade show active"
        id="Solutions"
        role="tabpanel"
        aria-labelledby="Solutions-tab"
      >
        {currentDataSolution.length >= 1 && (
          <div className="solution-containers-wrapper">
            {currentDataSolution.map(solution => {
              const { name, branch, template } = solution;
              const { srcLogo, logoHeight } = getSolutionImage(name, '100px');
              return (
                <div
                  className="solution-container"
                  key={_.uniqueId()}
                  onClick={() => handleClickGetSolution(name)}
                >
                  <div className="solution-container-img">
                    <div className="solution-container-img-block">
                      <img
                        src={srcLogo}
                        alt={name}
                        style={{ maxHeight: logoHeight }}
                      />
                    </div>
                  </div>
                  <div className="solution-container-info">
                    <div className="solution-container-info-title">{name}</div>
                    <div className="solution-container-info-text">
                      {template}
                    </div>
                    <div className="solution-container-status">
                      branch: <span className="status-active">{branch}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!currentDataSolution.length && (
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
