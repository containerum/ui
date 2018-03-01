/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';

import { routerLinks } from '../../config';
import s from '../../images/s.png';

type Props = {
  data: Object,
  idName: string,
  idSrv: string,
  handleDeleteService: (idSrv: string) => void
};

const ServiceInfo = ({ data, idName, idSrv, handleDeleteService }: Props) => {
  const { cluster_ip: clusterIp, domain_hosts: domainHosts, labels } = data;
  const type = labels.external.toString() === 'true' ? 'External' : 'Internal';
  const labelsToArray = Object.keys(labels);
  return (
    <div className="content-block-container content-block_common-statistic container">
      <div className="content-block-header">
        <div className="content-block-header-label">
          <div className="content-block-header-label__text content-block-header-label_main">
            {idSrv}
          </div>
          <div className="content-block-header-label__descript">service</div>
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
              <NavLink
                activeClassName="active"
                className="dropdown-item"
                to={routerLinks.resizeServiceLink(idName, idSrv)}
              >
                Update
              </NavLink>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDeleteService(idSrv)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block-content">
        <div className="content-block__r-img">
          <img src={s} alt="service" />
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">Type: </div>
          <div className="content-block__info-text">{type}</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">IP: </div>
          <div className="content-block__info-text">{clusterIp}</div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">Domain:</div>
          <div className="content-block__info-text">
            {domainHosts.length
              ? domainHosts.map(domain => (
                  <span key={_.uniqueId()}>{domain}</span>
                ))
              : '-'}
          </div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">Labels:</div>
          <div className="content-block__info-text">
            {labelsToArray.map(
              label =>
                labelsToArray[labelsToArray.length - 1] === label ? (
                  <span key={_.uniqueId()} className="padding">
                    {label}: {labels[label]}
                  </span>
                ) : (
                  <span key={_.uniqueId()} className="padding">
                    {label}: {labels[label]},{' '}
                  </span>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
