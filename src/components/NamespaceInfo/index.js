/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { routerLinks } from '../../config';
import ns from '../../images/n.png';

type Props = {
  data: Object,
  idName: string,
  handleDeleteNamespace: (idName: string) => void
};

const NamespaceInfo = ({ data, idName, handleDeleteNamespace }: Props) => {
  // console.log('NamespaceInfo', data);
  const {
    memory,
    memory_limit: memoryLimit,
    cpu,
    cpu_limit: cpuLimit,
    volume_size: volumeSize,
    volume_used: volumeUsed
  } = data;
  return (
    <div className="content-block-container content-block_common-statistic container">
      <div className="content-block-header">
        <div className="content-block-header-label">
          <div className="content-block-header-label__text content-block-header-label_main">
            {idName}
          </div>
          <div className="content-block-header-label__descript">namespace</div>
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
                to={routerLinks.resizeNamespaceLink(idName)}
              >
                Resize
              </NavLink>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDeleteNamespace(idName)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block-content">
        <div className="content-block__r-img">
          <img src={ns} alt="ns" />
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">
            RAM ( Usage / Total ) :{' '}
          </div>
          <div className="content-block__info-text">
            {memory} / {memoryLimit} MB
          </div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">
            CPU ( Usage / Total ) :{' '}
          </div>
          <div className="content-block__info-text">
            {cpu} / {cpuLimit} m
          </div>
        </div>
        <div className="content-block__info-item">
          <div className="content-block__info-name">
            Volume ( Usage / Total ) :
          </div>
          <div className="content-block__info-text">
            {volumeUsed || '-'} / {volumeSize || '-'} {volumeSize ? 'GB' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamespaceInfo;
