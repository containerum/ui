/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import volumePng from '../../images/volume.svg';
import globalStyles from '../../theme/global.scss';
import depStyles from '../../containers/Deployments/index.scss';
import { timeago } from '../../functions/timeago';

const globalClass = className.bind(globalStyles);
const tableClassName = globalClass('contentBlockTable', 'table');
const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  data: Array<Object>,
  dataNamespace: Object,
  idName: string,
  role: string,
  handleDeleteVolume: (idVol: string) => void
};

const VolumesList = ({
  data,
  dataNamespace,
  idName,
  role,
  handleDeleteVolume
}: Props) => {
  const handleClickDeleteVolume = name => {
    handleDeleteVolume(name);
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  const ta = timeago();
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  return (
    <div>
      {data.length >= 1 && (
        <table className={tableClassName} width="1170">
          <thead>
            <tr>
              <td className={depStyles.td_1_Dep} />
              <td className={depStyles.td_2_Dep}>Name</td>
              <td className={depStyles.td_3_Dep}>Storage</td>
              <td className={depStyles.td_5_Dep}>Total (GB)</td>
              <td className={depStyles.td_6_Dep}>Age</td>
              <td className={depStyles.td_7_Dep} />
              <td className={depStyles.td_7_Dep} />
            </tr>
          </thead>
          <tbody>
            {data.map(volume => {
              const {
                name,
                created_at: createdAt,
                capacity,
                storage_name: storageName
              } = volume;
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              const id = `item_${name}`;
              return (
                <tr key={id} className={globalStyles.tableHover} id={id}>
                  <td className={depStyles.td_1_Dep}>
                    <img src={volumePng} alt="volume" />
                  </td>
                  <td className={depStyles.td_2_Dep}>{name}</td>
                  <td className={depStyles.td_3_Dep}>{storageName}</td>
                  <td className={depStyles.td_4_Dep}>{capacity}</td>
                  <td className={depStyles.td_6_Dep}>{dateValue}</td>
                  <td className={depStyles.td_7_Dep}>
                    {/* <div className="warning"> </div> */}
                  </td>
                  <td
                    className={`${depStyles.td_7_Dep} dropdown no-arrow`}
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="presentation"
                  >
                    {((handleClickDeleteVolume && role === 'admin') ||
                      accessToNamespace === 'owner') && (
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
                    {((handleClickDeleteVolume && role === 'admin') ||
                      accessToNamespace === 'owner') && (
                      <ul
                        className={` dropdown-menu dropdown-menu-right ${
                          globalStyles.dropdownMenu
                        }`}
                        role="menu"
                      >
                        {role === 'admin' && (
                          <NavLink
                            activeClassName="active"
                            className={`dropdown-item  ${
                              globalStyles.dropdownItem
                            }`}
                            to={routerLinks.updateCustomVolumeLink(
                              idName,
                              name
                            )}
                          >
                            Resize
                          </NavLink>
                        )}
                        {role === 'admin' && (
                          <button
                            className={`dropdown-item text-danger ${
                              globalStyles.dropdownItem
                            }`}
                            onClick={() => handleClickDeleteVolume(name)}
                          >
                            Delete
                          </button>
                        )}
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

export default VolumesList;
