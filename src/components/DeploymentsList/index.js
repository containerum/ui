/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { externalLinks, routerLinks } from '../../config';
import { timeago } from '../../functions/timeago';
import deployPng from '../../images/deployments.svg';

import globalStyles from '../../theme/global.scss';
import depStyles from '../../containers/Deployments/index.scss';

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass('contentBlockTable', 'table');

const contentClassName = globalClass(
  'contentBlockContent',
  'contentBlockContentFull'
);

type Props = {
  data: Object,
  dataNamespace: Object,
  history: Object,
  idName: string,
  handleDeleteDeployment: ?(idDep: string) => void
};

const DeploymentsList = ({
  data,
  dataNamespace,
  history,
  idName,
  handleDeleteDeployment
}: Props) => {
  const handleClickGetDeployment = name => {
    history.push(routerLinks.getDeploymentLink(idName, name));
  };
  const handleClickDeleteDeployment = name => {
    handleDeleteDeployment(name);
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
              <td className={depStyles.td_3_Dep}>Pods</td>
              <td className={depStyles.td_4_Dep}>RAM (MB)</td>
              <td className={depStyles.td_5_Dep}>CPU (m)</td>
              <td className={depStyles.td_6_Dep}>Age</td>
              <td className={depStyles.td_7_Dep} />
              <td className={depStyles.td_7_Dep} />
            </tr>
          </thead>
          <tbody>
            {data.map(deploy => {
              const { name } = deploy;
              const {
                available_replicas: podsActive,
                replicas: podsLimit,
                created_at: createdAt
              } = deploy.status;
              const cpu = deploy.containers
                .map(container => parseInt(container.limits.cpu, 10))
                .reduce((a, b) => a + b, 0);
              const memory = deploy.containers
                .map(container => parseInt(container.limits.memory, 10))
                .reduce((a, b) => a + b, 0);
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              const id = `item_${name}`;
              return (
                <tr
                  key={id}
                  className={globalStyles.tableHover}
                  id={id}
                  onClick={() => handleClickGetDeployment(name)}
                >
                  <td className={depStyles.td_1_Dep}>
                    <img src={deployPng} alt="deploy" />
                  </td>
                  <td className={depStyles.td_2_Dep}>{name}</td>
                  <td className={depStyles.td_3_Dep}>
                    {podsActive} / {podsLimit}
                  </td>
                  <td className={depStyles.td_4_Dep}>{memory}</td>
                  <td className={depStyles.td_5_Dep}>{cpu}</td>
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
                    {handleDeleteDeployment &&
                      accessToNamespace !== 'read' && (
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
                    {handleDeleteDeployment &&
                      accessToNamespace !== 'read' && (
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
                            to={routerLinks.resizeDeploymentLink(idName, name)}
                          >
                            Update
                          </NavLink>
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
                      className={depStyles.td_1_DepNoDep}
                      style={{ paddingLeft: '60px' }}
                    >
                      Deployment is a controller that contains one or several
                      containers, united into Pods. <br /> <br />
                      To create a new Deployment use our{' '}
                      <a
                        className={globalStyles.linkDocumentation}
                        href={externalLinks.releasesChkit}
                      >
                        CLI Tool
                      </a>{' '}
                      and refer to our{' '}
                      <a
                        className={globalStyles.linkDocumentation}
                        href={externalLinks.startGuide}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documentation
                      </a>
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

export default DeploymentsList;
