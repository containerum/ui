/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import { routerLinks } from '../../config';
import getSolutionImage from '../../functions/getSolutionImage';

type Props = {
  data: Array<Object>,
  history: Object
  // handleClickRunSolution: (name: string) => void
};

const handleClose = e => {
  e.stopPropagation();
};

const SolutionsDashboardList = ({
  data,
  history
}: // handleClickRunSolution
Props) => (
  <div className="solution-containers-wrapper mt-30">
    {data.map(solution => {
      const { Name: name, URL: url } = solution;
      const { srcLogo, logoHeight } = getSolutionImage(name, '85px');
      return (
        <div
          key={_.uniqueId()}
          className="solution-container pre-solution-container"
          onClick={() => history.push(routerLinks.solutionLink(name))}
          style={{ cursor: 'pointer' }}
        >
          <div className="solution-container-img-block pre-solution-container-img-block">
            <img src={srcLogo} alt={name} style={{ maxHeight: logoHeight }} />
          </div>
          <div className="pre-solution-container-info">{name}</div>
          <div onClick={e => handleClose(e)}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="button button_blue btn btn-outline-primary"
            >
              Deploy
            </a>
          </div>
          {/* <div onClick={e => handleClose(e)}> */}
          {/* <div */}
          {/* onClick={() => handleClickRunSolution(name)} */}
          {/* className="button button_blue btn btn-outline-primary" */}
          {/* > */}
          {/* Deploy */}
          {/* </div> */}
          {/* </div> */}
        </div>
      );
    })}
  </div>
);

export default SolutionsDashboardList;
