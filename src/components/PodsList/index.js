/* @flow */

import React from 'react';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import { timeago } from '../../functions/timeago';
import podPng from '../../images/pod-3.png';

import globalStyles from '../../theme/global.scss';
import podsStyles from '../../containers/Pods/index.scss';

type Props = {
  data: Object,
  dataNamespace: Object,
  history: Object,
  idName: string,
  idDep: string,
  handleDeletePod: (idPod: string) => void
};

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass('contentBlockTable', 'table');

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

const PodsList = ({
  data,
  dataNamespace,
  history,
  idName,
  idDep,
  handleDeletePod
}: Props) => {
  const handleClickGetDeployment = name => {
    history.push(routerLinks.getPodLink(idName, idDep, name));
  };
  const handleClickDeleteDeployment = name => {
    handleDeletePod(name);
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
              <td className={podsStyles.td_1_Pods} />
              <td className={podsStyles.td_2_Pods}>Name</td>
              <td className={podsStyles.td_3_Pods}>Status</td>
              <td className={podsStyles.td_4_Pods}>Restarts</td>
              <td className={podsStyles.td_5_Pods}>Containers</td>
              <td className={podsStyles.td_6_Pods}>Age</td>
              <td className={podsStyles.td_7_Pods} />
            </tr>
          </thead>
          <tbody>
            {data.map(deploy => {
              const {
                name,
                status,
                containers,
                created_at: createdAt
              } = deploy;
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              const id = `pod_${name}`;
              return (
                <tr
                  key={id}
                  className={globalStyles.tableHover}
                  id={id}
                  onClick={() => handleClickGetDeployment(name)}
                >
                  <td className={podsStyles.td_1_Pods}>
                    <img src={podPng} alt="pod" />
                  </td>
                  <td className={podsStyles.td_2_Pods}>{name}</td>
                  <td className={podsStyles.td_3_Pods}>{status.phase}</td>
                  <td className={podsStyles.td_4_Pods}>
                    {status.restart_count} restarts
                  </td>
                  <td className={podsStyles.td_5_Pods}>{containers.length}</td>
                  <td className={podsStyles.td_6_Pods}>{dateValue}</td>
                  <td className={podsStyles.td_7_Pods}>
                    {/* <div className="warning"> </div> */}
                  </td>
                  <td
                    className={`${podsStyles.td_7_Pods} dropdown no-arrow`}
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="presentation"
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
                        <button
                          className={`dropdown-item text-danger ${
                            globalStyles.dropdownItem
                          }`}
                          onClick={() => handleClickDeleteDeployment(name)}
                        >
                          Delete
                        </button>
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
                      className={podsStyles.td_1_PodsNoPods}
                      style={{ paddingLeft: '60px' }}
                    >
                      At the moment the Pod is rebooting
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

export default PodsList;
