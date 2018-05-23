/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import r from '../../images/r.png';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);
// const namespaceClass = className.bind(namespaceStyles);

const containerClassName = globalClass(
  'contentBlockStatistic',
  'contentBlockContainer'
);
const textLabelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMain'
);
// const contentClassName = globalClass(
//   'contentBlockContent',
//   'contentBlockContentCollapsed'
// );
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFlex',
  'contentBlockContentCollapsed'
);
const headerLabelClassName = globalClass(
  'contentBlockHeaderLabel',
  'contentBlockHeaderLabelDeploymentInfo'
);

type Props = {
  data: Object,
  dataNamespace: Object,
  idName: string,
  idDep: string,
  handleDeleteDeployment: (idDep: string) => void
};

const DeploymentInfo = ({
  data,
  dataNamespace,
  idName,
  idDep,
  handleDeleteDeployment
}: Props) => {
  // console.log('DeploymentInfo', data);
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  const { total_memory: memory, total_cpu: cpu, status } = data;
  return (
    <div className={`${containerClassName} container`}>
      <div className={globalStyles.contentBlockHeader}>
        <div className={headerLabelClassName}>
          <div className={textLabelClassName}>{idDep}</div>
          <div className={globalStyles.contentBlockHeaderLabelDescript}>
            deploy
          </div>
        </div>
        <div className={globalStyles.contentBlockHeaderExtraPanel}>
          {accessToNamespace !== 'read' && (
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
                <NavLink
                  activeClassName="active"
                  className={`dropdown-item ${globalStyles.dropdownItem}`}
                  to={routerLinks.resizeDeploymentLink(idName, idDep)}
                >
                  Update
                </NavLink>
                <button
                  className={`dropdown-item ${
                    globalStyles.dropdownItem
                  } text-danger`}
                  onClick={() => handleDeleteDeployment(idDep)}
                >
                  Delete
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={contentClassName}>
        <div className={globalStyles.contentClockIcon}>
          <img src={r} alt="r" />
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
          <div className={globalStyles.contentBlockInfoName}>
            Status ( Available / Total ) :{' '}
          </div>
          <div className={globalStyles.contentBlockInfoText}>
            {status.available_replicas} / {status.replicas}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentInfo;
