/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
// import _ from 'lodash/fp';
import { Scrollbars } from 'react-custom-scrollbars';

import { routerLinks } from '../../../config';
import r from '../../../images/r.png';
import fullScreen from '../../../images/full-screen.svg';

type Props = {
  data: Object,
  logs: string,
  errorMessage: string,
  idName: string,
  idDep: string,
  handleDeletePod: (idPod: string) => void,
  handleViewLogs: () => void,
  isLogViewed: boolean
};

const PodInfo = ({
  data,
  logs,
  errorMessage,
  idName,
  idDep,
  handleDeletePod,
  handleViewLogs,
  isLogViewed
}: Props) => {
  const handleClickDeleteDeployment = name => {
    handleDeletePod(name);
  };
  const { name, total_cpu: cpu, total_memory: memory, status } = data;
  // const labelsToArray = Object.keys(labels);
  return (
    <div className="content-block-container content-block_common-statistic container">
      <div className="content-block-header">
        <div className="content-block-header-label">
          <div className="content-block-header-label__text content-block-header-label_main">
            {name}
          </div>
          <div className="content-block-header-label__descript">pod</div>
        </div>
        <div className="content-block-header-extra-panel">
          <div className="content-block-header-extra-panel dropdown no-arrow">
            <i
              className="content-block-header__more ion-more dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <ul className="dropdown-menu dropdown-menu-right" role="menu">
              <button
                className="dropdown-item text-danger"
                onClick={() => handleClickDeleteDeployment(name)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block-content">
        <div className="content-block__r-img">
          <img src={r} alt="pod" />
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">RAM ( Usage ) : </div>
          <div className="content-block__info-text">{memory}</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">CPU ( Usage ) : </div>
          <div className="content-block__info-text">{cpu}</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">Status: </div>
          <div className="content-block__info-text">{status.phase}</div>
        </div>

        <div className="clearfix mt-2" />

        {/* <div className="content-block__info-item i-1"> */}
        {/* <div className="content-block__info-name">Labels: </div> */}
        {/* <div className="content-block__info-text"> */}
        {/* {labelsToArray.map( */}
        {/* item => */}
        {/* labelsToArray[labelsToArray.length - 1] === item ? ( */}
        {/* <span key={_.uniqueId()} className="padding"> */}
        {/* {item}: {labels[item]} */}
        {/* </span> */}
        {/* ) : ( */}
        {/* <span key={_.uniqueId()} className="padding"> */}
        {/* {item}: {labels[item]},{' '} */}
        {/* </span> */}
        {/* ) */}
        {/* )} */}
        {/* </div> */}
        {/* </div> */}
        <div
          className="collapse content-block__info-logs log-block i-1"
          id="collapseExample"
        >
          <div className="content-block__info-name">
            Logs:{' '}
            <span className="full-screen-btn">
              <Link to={routerLinks.getPodLogsLink(idName, idDep, name)}>
                Full Screen<img src={fullScreen} alt="full screen" />
              </Link>
            </span>
          </div>
          <Scrollbars
            universal
            autoHide
            style={{ width: '970px', height: '212px' }}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: 'rgba(246, 246, 246, 0.3)',
                  borderRadius: '4px'
                }}
              />
            )}
            renderThumbHorizontal={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: 'rgba(246, 246, 246, 0.3)',
                  borderRadius: '4px'
                }}
              />
            )}
            renderView={props => <div {...props} className="log-data" />}
          >
            <div>
              {errorMessage ? (
                <div>{errorMessage}</div>
              ) : (
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: logs
                  }}
                />
              )}
            </div>
            <div id="endOfLogs" />
          </Scrollbars>
        </div>
        <div className="content-block__more-panel">
          <div
            className="content-block__more-panel-toogle slide-down"
            style={isLogViewed ? { display: 'none' } : {}}
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="true"
            aria-controls="collapseExample"
            onClick={handleViewLogs}
            onKeyPress={handleViewLogs}
          >
            view logs<i className="content-block__more-panel-toogle-more ion-ios-arrow-down" />{' '}
          </div>
          <div
            className="content-block__more-panel-toogle slide-up"
            style={isLogViewed ? { display: 'block' } : { display: 'none' }}
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="true"
            aria-controls="collapseExample"
            onClick={handleViewLogs}
            onKeyPress={handleViewLogs}
          >
            <i className="content-block__more-panel-toogle-more ion-ios-arrow-up" />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodInfo;
