/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import s from '../../images/s.png';

import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const containerClassName = globalClass(
  'contentBlockStatistic',
  'contentBlockContainer'
);
const textLabelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMain'
);
const headerLabelClassName = globalClass(
  'contentBlockHeaderLabel',
  'contentBlockHeaderLabelDeploymentInfo'
);
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFlexService'
);

type Props = {
  data: Object,
  dataNamespace: Object,
  idName: string,
  idSrv: string,
  handleDeleteService: (idSrv: string) => void
};

const ServiceInfo = ({
  data,
  dataNamespace,
  idName,
  idSrv,
  handleDeleteService
}: Props) => {
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  const { domain, ips } = data;
  const type = domain ? 'External' : 'Internal';
  return (
    <div className={`${containerClassName} container`}>
      <div className={globalStyles.contentBlockHeader}>
        <div className={headerLabelClassName}>
          <div className={textLabelClassName}>{idSrv}</div>
          <div className={globalStyles.contentBlockHeaderLabelDescript}>
            service
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
                  to={routerLinks.resizeServiceLink(idName, idSrv)}
                >
                  Update
                </NavLink>
                <button
                  className={`dropdown-item ${
                    globalStyles.dropdownItem
                  } text-danger`}
                  onClick={() => handleDeleteService(idSrv)}
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
          <img src={s} alt="service" />
        </div>
        <div className={globalStyles.contentBlockInfoItemMargin50}>
          <div className={globalStyles.contentBlockInfoName}>Type: </div>
          <div className={globalStyles.contentBlockInfoText}>{type}</div>
        </div>
        {ips && (
          <div className={globalStyles.contentBlockInfoItemMargin50}>
            <div className={globalStyles.contentBlockInfoName}>IP: </div>
            <div className={globalStyles.contentBlockInfoText}>
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
          <div className={globalStyles.contentBlockInfoItemMargin50}>
            <div className={globalStyles.contentBlockInfoName}>Domain:</div>
            <div className={globalStyles.contentBlockInfoText}>{domain}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
