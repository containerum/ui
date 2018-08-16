/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import volumePng from '../../images/volume.svg';
import globalStyles from '../../theme/global.scss';
import depStyles from '../../containers/Deployments/index.scss';

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass('contentBlockTable', 'table');

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  data: Array<Object>,
  dataNamespace: Object,
  idName: string
};

const LinkedVolumesList = ({ data, dataNamespace, idName }: Props) => {
  const handleClose = e => {
    e.stopPropagation();
  };
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  return (
    <div>
      {data.length >= 1 && (
        <table className={tableClassName} width="1170">
          <thead>
            <tr>
              <td className={depStyles.td_1_Dep} />
              <td className={depStyles.td_2_Dep}>Name</td>
              <td className={depStyles.td_5_Dep}>Mount path</td>
              <td className={depStyles.td_6_Dep}>Sub path</td>
              <td className={depStyles.td_7_Dep} />
            </tr>
          </thead>
          <tbody>
            {data.map(volume => {
              const { name, mount_path: mountPath, sub_path: subPath } = volume;
              const id = `item_${name}`;
              return (
                <tr key={id} className={globalStyles.tableHover} id={id}>
                  <td className={depStyles.td_1_Dep}>
                    <img src={volumePng} alt="volume" />
                  </td>
                  <td className={depStyles.td_2_Dep}>{name}</td>
                  <td className={depStyles.td_4_Dep}>{mountPath}</td>
                  <td className={depStyles.td_6_Dep}>{subPath || '-'}</td>
                  <td
                    className={`${depStyles.td_7_Dep} dropdown no-arrow`}
                    onClick={e => handleClose(e)}
                  >
                    {accessToNamespace !== 'read' && (
                      <i
                        className={`${globalStyles.contentBlockTableMore} ${
                          globalStyles.dropdownToggle
                        }
                          ${globalStyles.ellipsisRoleMore} ion-more `}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                    )}
                    {accessToNamespace !== 'read' && (
                      <ul
                        className={` dropdown-menu dropdown-menu-right ${
                          globalStyles.dropdownMenu
                        }`}
                        role="menu"
                      >
                        <NavLink
                          activeClassName="active"
                          className={`dropdown-item  ${
                            globalStyles.dropdownItem
                          }`}
                          to={routerLinks.updateCustomVolumeLink(idName, name)}
                        >
                          Resize
                        </NavLink>
                      </ul>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!data.length && (
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane deployments active">
              <table className={tableClassName} width="1170">
                <thead>
                  <tr>
                    <td
                      className={depStyles.td_1_DepNoDep}
                      style={{ paddingLeft: '60px' }}
                    >
                      You have no active Volumes yet.
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedVolumesList;
