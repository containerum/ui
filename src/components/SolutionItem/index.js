/* @flow */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import className from 'classnames/bind';

import getSolutionImage from '../../functions/getSolutionImage';
import github from '../../images/github.svg';

import solutionPageStyles from '../../containers/Solution/index.scss';
import dashboardStyle from '../../containers/Dashboard/index.scss';
import buttonsStyles from '../../theme/buttons.scss';

type Props = {
  solution: Array<Object>,
  text: string
  // handleClickRunSolution: (name: string) => void
};

const solutionClassName = className.bind(solutionPageStyles);

const navLinksClass = solutionClassName(
  'solutionNavLink',
  'solutionNavLinkActive'
);

const SolutionItem = ({
  solution,
  text
}: // handleClickRunSolution
Props) => {
  const { name, url, limits } = solution;
  const { cpu, ram } = limits;
  const { srcLogo, logoHeight } = getSolutionImage(name, '100px');
  const regexpGif = /gif\//gi;
  const regexpImage = /images\//gi;
  const regexpWithoutSlash = /\/https/gi;
  const textWithImages = text
    .replace(
      regexpGif,
      `https://github.com/containerum/${name}/raw/master/gif/`
    )
    .replace(
      regexpImage,
      `https://github.com/containerum/${name}/raw/master/images/`
    )
    .replace(regexpWithoutSlash, 'https');
  return (
    <div className={`${solutionPageStyles.solutionPageWrapper} row`}>
      <div className={`${solutionPageStyles.solutionPageLeftSide} col-md-4`}>
        <div className={solutionPageStyles.solutionPageBlockImg}>
          <img src={srcLogo} alt={name} style={{ height: logoHeight }} />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonsStyles.buttonUIFeedbackSubmit} btn`}
        >
          Deploy
        </a>
        {/* <button */}
        {/* className="left-side-btn" */}
        {/* onClick={() => handleClickRunSolution(name)} */}
        {/* > */}
        {/* Deploy */}
        {/* </button> */}
        {/* <div className="left-side-update-date">Last update: 12/12/17</div> */}
        <div className={solutionPageStyles.solutionPageResourses}>
          <div className={solutionPageStyles.solutionPageResoursesTitle}>
            Resources:
          </div>
          <div className={solutionPageStyles.solutionPageResourse}>
            CPU: {cpu}
          </div>
          <div className={solutionPageStyles.solutionPageResourse}>
            RAM: {ram}
          </div>
        </div>
        <div className={solutionPageStyles.solutionPageLeftSideLinks}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
            <img src={github} alt="github" />
          </a>
          {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer"> */}
          {/* https://github.com/githubgithubgithubgithubgithubgithubgithubgithub<img */}
          {/* src={docker} */}
          {/* alt="" */}
          {/* /> */}
          {/* </a> */}
        </div>
      </div>

      <div className={`${solutionPageStyles.solutionPageRightSide} col-md-8`}>
        <div className={solutionPageStyles.solutionPageRightSideTitle}>
          {name}
        </div>
        <div className={dashboardStyle.blockHTabs} style={{ height: 'auto' }}>
          <ul
            className={`${solutionPageStyles.solutionNavPills} nav nav-pills`}
            id="pills-tab"
            role="tablist"
            style={{ marginBottom: '0' }}
          >
            <li className="nav-item">
              <div
                className={`${navLinksClass} nav-link active`}
                style={{ fontSize: '18px' }}
                id="tour-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Solution Info
              </div>
            </li>
          </ul>
          <div
            className="tab-content"
            id="pills-tabContent"
            style={{ marginTop: '29px' }}
          >
            <div
              className="tab-pane fade show active"
              id="info"
              role="tabpanel"
              aria-labelledby="infoe-tab"
            >
              <div className={solutionPageStyles.solutionInfoText}>
                {<ReactMarkdown source={textWithImages} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionItem;
