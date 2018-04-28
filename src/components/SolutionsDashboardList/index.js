/* @flow */

import React from 'react';
import _ from 'lodash/fp';
import classNames from 'classnames/bind';

import { routerLinks } from '../../config';
import getSolutionImage from '../../functions/getSolutionImage';

import solutionStyles from '../../containers/Solutions/index.scss';
import globalStyles from '../../theme/global.scss';

type Props = {
  data: Array<Object>,
  history: Object
  // handleClickRunSolution: (name: string) => void
};

const handleClose = e => {
  e.stopPropagation();
};

const solutionClassName = classNames.bind(solutionStyles);
const globalClassName = classNames.bind(globalStyles);

const solutionContainer = solutionClassName(
  'solutionContainer',
  'preSolutionContainer'
);

const solutionImg = solutionClassName(
  'solutionContainerImgBlock',
  'preSolutionContainerImgBlock'
);

const solutionBtn = globalClassName('button', 'buttonBlue', 'btn');

const SolutionsDashboardList = ({
  data,
  history
}: // handleClickRunSolution
Props) => (
  <div
    className={`${solutionStyles.solutionContainerWrapper} ${
      globalStyles.marginTop30
    }`}
  >
    {data.map(solution => {
      const { Name: name, URL: url } = solution;
      const { srcLogo, logoHeight } = getSolutionImage(name, '85px');
      return (
        <div
          key={_.uniqueId()}
          className={solutionContainer}
          onClick={() => history.push(routerLinks.solutionLink(name))}
          style={{ cursor: 'pointer' }}
        >
          <div className={solutionImg}>
            <img src={srcLogo} alt={name} style={{ maxHeight: logoHeight }} />
          </div>
          <div className={solutionStyles.preSolutionContainerInfo}>{name}</div>
          <div onClick={e => handleClose(e)}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${solutionBtn} btn btn-outline-primary`}
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
