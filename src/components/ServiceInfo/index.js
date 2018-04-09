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
  const { domain, ips } = data;
  const type = domain ? 'External' : 'Internal';
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
        {ips && (
          <div className="content-block__info-item">
            <div className="content-block__info-name">IP: </div>
            <div className="content-block__info-text">
              {ips &&
                ips.map(
                  ip =>
                    ips[ips.length - 1] === ip ? (
                      <span key={_.uniqueId()}>{ip}</span>
                    ) : (
                      <span key={_.uniqueId()}>
                        <span>{ip},</span>
                        <br />
                      </span>
                    )
                )}
            </div>
          </div>
        )}
        {domain && (
          <div className="content-block__info-item">
            <div className="content-block__info-name">Domain:</div>
            <div className="content-block__info-text">{domain}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
