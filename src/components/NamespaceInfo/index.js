/* @flow */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import ns from '../../images/n.png';

import globalStyles from '../../theme/global.scss';
import namespaceStyles from '../../containers/Namespaces/index.scss';

const globalClass = className.bind(globalStyles);
const namespaceClass = className.bind(namespaceStyles);

const containerClassName = globalClass(
  'contentBlockStatistic',
  'contentBlockContainer'
);
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFlex'
);
const manageTeamClassName = globalClass(
  'contentBlockInfoItemMargin50',
  'contentBlockInfoItemMargin50Team'
);
const headerLabelClassName = globalClass(
  'contentBlockHeaderLabel',
  'contentBlockHeaderLabelNamespaceInfo'
);
const textLabelClassName = globalClass(
  'contentBlockHeaderLabelText',
  'contentBlockHeaderLabelMain',
  'contentBlockHeaderLabelTextNamespaceInfo'
);
const infoNameClassName = globalClass(
  'contentBlockInfoName',
  'contentBlockInfoNameNamespace'
);
const manageTeamTextClassName = globalClass(
  'contentBlockInfoText',
  'contentBlockInfoTextNamespace'
);

type Props = {
  data: Object,
  idName: string,
  handleDeleteNamespace: (idName: string) => void
};

const NamespaceInfo = ({ data, idName, handleDeleteNamespace }: Props) => {
  const { memory, cpu } = data.resources.used;
  const { memory: memoryLimit, cpu: cpuLimit } = data.resources.hard;
  const newAccessLevel = data.access;
  const newAccessLevelClassName =
    data.access[0].toUpperCase() + data.access.slice(1);
  const classNameBadge = namespaceClass({
    [`namespaceInfoBadge${newAccessLevelClassName}`]: true
  });
  const ownerPermissions = newAccessLevel === 'owner';
  return (
    <div className={`${containerClassName} container`}>
      <div className={globalStyles.contentBlockHeader}>
        <div className={headerLabelClassName}>
          <div className={textLabelClassName}>{idName}</div>
          <div className={globalStyles.contentBlockHeaderLabelDescript}>
            namespace
          </div>
          <div
            style={{ display: 'inline-block' }}
            className={`badge ${
              namespaceStyles.namespaceInfoBadge
            } ${classNameBadge} `}
          >
            access: {newAccessLevel}
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
              <NavLink
                activeClassName="active"
                className={`dropdown-item ${globalStyles.dropdownItem}`}
                to={routerLinks.resizeNamespaceLink(idName)}
              >
                Resize
              </NavLink>
              <button
                className={`dropdown-item ${
                  globalStyles.dropdownItem
                } text-danger`}
                onClick={() => handleDeleteNamespace(idName)}
              >
                Delete
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className={contentClassName}>
        <div className={globalStyles.contentClockIcon}>
          <img src={ns} alt="ns" />
        </div>
        <div className={globalStyles.contentBlockInfoItemMargin50}>
          <div className={infoNameClassName}>RAM ( Usage / Total ) : </div>
          <div className={globalStyles.contentBlockInfoText}>
            {memory} / {memoryLimit}
          </div>
        </div>
        <div className={globalStyles.contentBlockInfoItemMargin50}>
          <div className={infoNameClassName}>CPU ( Usage / Total ) : </div>
          <div className={globalStyles.contentBlockInfoText}>
            {cpu} / {cpuLimit}
          </div>
        </div>
        <div className={globalStyles.contentBlockInfoItemMargin50}>
          <div className={infoNameClassName}>Volume ( Usage / Total ) :</div>
          <div className={globalStyles.contentBlockInfoText}>- / -</div>
        </div>
        {ownerPermissions && (
          <div className={manageTeamClassName} style={{ paddingLeft: 80 }}>
            <Link to={routerLinks.getMembershipLink(idName)}>
              <div className={manageTeamTextClassName}>Manage Team</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NamespaceInfo;
