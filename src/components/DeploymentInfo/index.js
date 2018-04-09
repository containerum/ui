/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { routerLinks } from '../../config';
import r from '../../images/r.png';

type Props = {
  data: Object,
  idName: string,
  idDep: string,
  handleDeleteDeployment: (idDep: string) => void
};

const DeploymentInfo = ({
  data,
  idName,
  idDep,
  handleDeleteDeployment
}: Props) => {
  // console.log('DeploymentInfo', data);
  const { total_memory: memory, total_cpu: cpu, status } = data;
  return (
    <div className="content-block-container content-block_common-statistic container">
      <div className="content-block-header">
        <div className="content-block-header-label">
          <div className="content-block-header-label__text content-block-header-label_main">
            {idDep}
          </div>
          <div className="content-block-header-label__descript">deploy</div>
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
                to={routerLinks.resizeDeploymentLink(idName, idDep)}
              >
                Update
              </NavLink>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDeleteDeployment(idDep)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block-content collapsed">
        <div className="content-block__r-img">
          <img src={r} alt="r" />
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
          <div className="content-block__info-name">
            Status ( Available / Total ) :{' '}
          </div>
          <div className="content-block__info-text">
            {status.available_replicas} / {status.replicas}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentInfo;
