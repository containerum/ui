/* @flow */

import React from 'react';
import ReactMarkdown from 'react-markdown';

import getSolutionImage from '../../functions/getSolutionImage';
import github from '../../images/github.svg';

type Props = {
  solution: Array<Object>,
  text: string
  // handleClickRunSolution: (name: string) => void
};

const SolutionItem = ({
  solution,
  text
}: // handleClickRunSolution
Props) => {
  const { Name: name, URL: url, CPU: cpu, RAM: ram } = solution[0];
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
    <div className="row page-wrapper">
      <div className="col-md-4 page-left-side">
        <div className="block-img">
          <img src={srcLogo} alt={name} style={{ height: logoHeight }} />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="feedback-form__submit btn"
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
        <div className="resources-block">
          <div className="resources-title">Resources:</div>
          <div className="resource">CPU: {cpu}</div>
          <div className="resource">RAM: {ram}</div>
        </div>
        <div className="left-side-links">
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

      <div className="col-md-8 page-right-side">
        <div className="page-right-side-title">{name}</div>
        <div className="block-h-tabs" style={{ height: 'auto' }}>
          <ul
            className="nav nav-pills"
            id="pills-tab"
            role="tablist"
            style={{ marginBottom: '0' }}
          >
            <li className="nav-item">
              <div
                className="nav-link active"
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
            style={{ marginTop: '40px' }}
          >
            <div
              className="tab-pane fade show active"
              id="info"
              role="tabpanel"
              aria-labelledby="infoe-tab"
            >
              <div className="info-text">
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
