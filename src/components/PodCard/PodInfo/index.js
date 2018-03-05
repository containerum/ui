/* @flow */

import React from 'react';
import _ from 'lodash/fp';

import r from '../../../images/r.png';
import fullScreen from '../../../images/full-screen.svg';

type Props = {
  data: Object,
  handleDeletePod: (idPod: string) => void
};

const PodInfo = ({ data, handleDeletePod }: Props) => {
  const handleClickDeleteDeployment = name => {
    handleDeletePod(name);
  };
  const { name, labels, ram, cpu, status } = data;
  const labelsToArray = Object.keys(labels);
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
          <div className="content-block__info-text">{ram} MB</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">CPU ( Usage ) : </div>
          <div className="content-block__info-text">{cpu} m</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">Status: </div>
          <div className="content-block__info-text">{status}</div>
        </div>

        <div className="clearfix mt-2" />

        <div className="content-block__info-item i-1">
          <div className="content-block__info-name">Labels: </div>
          <div className="content-block__info-text">
            {labelsToArray.map(
              item =>
                labelsToArray[labelsToArray.length - 1] === item ? (
                  <span key={_.uniqueId()} className="padding">
                    {item}: {labels[item]}
                  </span>
                ) : (
                  <span key={_.uniqueId()} className="padding">
                    {item}: {labels[item]},{' '}
                  </span>
                )
            )}
          </div>
        </div>
        <div
          className="collapse content-block__info-logs log-block i-1"
          id="collapseExample"
        >
          <div className="content-block__info-name">
            Logs:{' '}
            <span className="full-screen-btn">
              <div
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="true"
                aria-controls="collapseExample"
              >
                Full Screen<img src={fullScreen} alt="full screen" />
              </div>
            </span>
          </div>
          <div className="log-data">
            error: Unable to update build status: resource name may not be empty<br />Registry
            server Address:<br />Registry server User Name: serviceaccount<br />Registry
            server Email: serviceaccount@example.org<br />Registry server
            Password: non-empty<br />error: Unable to update build status:
            resource name may not be empty resource name may not be empty
            resource name may not be empty resource name mama<br />error: build
            error: Failed to push image: unauthorized: authentication required<br />error:
            Unable to update build status: resource name may not be empty<br />error:
            build error: Failed to push image: unauthorized: authentication
            required<br />error: Unable to update build status: resource name
            may not be empty
          </div>
        </div>
        <div className="content-block__more-panel">
          <div
            className="content-block__more-panel-toogle slide-down"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="true"
            aria-controls="collapseExample"
          >
            view logs<i className="content-block__more-panel-toogle-more ion-ios-arrow-down" />{' '}
          </div>
          <div className="content-block__more-panel-toogle slide-up">
            <i className="content-block__more-panel-toogle-more ion-ios-arrow-up" />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodInfo;
