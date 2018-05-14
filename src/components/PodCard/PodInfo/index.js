/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
// import _ from 'lodash/fp';
import { Scrollbars } from 'react-custom-scrollbars';
import className from 'classnames/bind';

import { routerLinks } from '../../../config';
import r from '../../../images/r.png';
import fullScreen from '../../../images/full-screen.svg';

import globalStyles from '../../../theme/global.scss';
import podStyles from '../../../containers/Pod/index.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockStatistic',
  'contentBlockContainer'
);
const headerLabelClassName = globalClass(
  'contentBlockHeaderLabel',
  'contentBlockHeaderLabelDeploymentInfo'
);
const textLabelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMain'
);
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFlexService'
);

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
    <div className={`${containerClassName} container`}>
      <div className={globalStyles.contentBlockHeader}>
        <div className={headerLabelClassName}>
          <div className={textLabelClassName}>{name}</div>
          <div className={globalStyles.contentBlockHeaderLabelDescript}>
            pod
          </div>
        </div>
        <div className={globalStyles.contentBlockHeaderExtraPanel}>
          <div
            className={`${
              globalStyles.contentBlockHeaderExtraPanel
            } dropdown no-arrow`}
          >
            <i
              className={`${globalStyles.contentBlockHeaderEllipsis} ${
                globalStyles.dropdownToggle
              } ${globalStyles.ellipsisRoleMore} ion-more `}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <ul
              className={` dropdown-menu dropdown-menu-right ${
                globalStyles.dropdownMenu
              }`}
              role="menu"
            >
              <button
                className={`dropdown-item ${
                  globalStyles.dropdownItem
                } text-danger`}
                onClick={() => handleClickDeleteDeployment(name)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={contentClassName}>
          <div className={globalStyles.contentClockIcon}>
            <img src={r} alt="pod" />
          </div>
          <div className={globalStyles.contentBlockInfoItemMargin50}>
            <div className={globalStyles.contentBlockInfoName}>
              RAM ( Usage ) :{' '}
            </div>
            <div className={globalStyles.contentBlockInfoText}>{memory}</div>
          </div>
          <div className={globalStyles.contentBlockInfoItemMargin50}>
            <div className={globalStyles.contentBlockInfoName}>
              CPU ( Usage ) :{' '}
            </div>
            <div className={globalStyles.contentBlockInfoText}>{cpu}</div>
          </div>
          <div className={globalStyles.contentBlockInfoItemMargin50}>
            <div className={globalStyles.contentBlockInfoName}>Status: </div>
            <div className={globalStyles.contentBlockInfoText}>
              {status.phase}
            </div>
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
        </div>
        <div>
          <div
            className={`${globalStyles.contentBlockInfoLogs} collapse ${
              podStyles.logBlock
            } pl-6`}
            id="collapseExample"
          >
            <div className={globalStyles.contentBlockInfoName}>
              Logs:{' '}
              <span className={podStyles.logFullScreen}>
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
              renderView={props => (
                <div {...props} className={podStyles.logData} />
              )}
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
          <div className={globalStyles.contentBlockMorePanel}>
            <div
              className={`${
                globalStyles.contentBlockMorePanelToggle
              } slide-down`}
              style={isLogViewed ? { display: 'none' } : {}}
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="true"
              aria-controls="collapseExample"
              onClick={handleViewLogs}
              onKeyPress={handleViewLogs}
            >
              view logs<i
                className={`${
                  globalStyles.contentBlockMorePanelToggleB
                } ion-ios-arrow-down`}
              />{' '}
            </div>
            <div
              className={`${globalStyles.contentBlockMorePanelToggle} slide-up`}
              style={isLogViewed ? { display: 'block' } : { display: 'none' }}
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="true"
              aria-controls="collapseExample"
              onClick={handleViewLogs}
              onKeyPress={handleViewLogs}
            >
              <i
                className={`${
                  globalStyles.contentBlockMorePanelToggleB
                } ion-ios-arrow-up`}
              />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodInfo;
