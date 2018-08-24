/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { routerLinks } from '../../config';
import deployment from '../../images/deployment.png';
import globalStyles from '../../theme/global.scss';
import dashboardStyles from '../../containers/Dashboard/index.scss';

type Props = {
  data: Array<Object>,
  role: string,
  history: Object
};

const globalClassName = classNames.bind(globalStyles);

const tableClassName = globalClassName('contentBlockTable', 'table');

const btnClassName = globalClassName('btnBlue', 'btnDepl');

const NamespacesDashboardList = ({ data, role, history }: Props) => {
  const handleClickGetNamespace = idName => {
    history.push(routerLinks.namespaceLink(idName));
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  return (
    <div>
      {data.length >= 1 && (
        <table
          className={`${tableClassName} ${dashboardStyles.dashboardTable}`}
          style={{
            tableLayout: 'fixed',
            width: '100%',
            border: 0,
            cellSpacing: 0,
            cellPadding: 0
          }}
        >
          <thead style={{ height: '30px', display: 'block' }}>
            <tr style={{ cursor: 'pointer' }}>
              <td className={dashboardStyles.td_1_Dashboard} />
              <td className={dashboardStyles.td_2_Dashboard}>Name</td>
              <td className={dashboardStyles.td_3_Dashboard}>RAM</td>
              <td className={dashboardStyles.td_4_Dashboard}>CPU</td>
              <td className={dashboardStyles.td_4_Dashboard}>
                {role !== 'admin' && <div>Permission</div>}
              </td>
              <td className={dashboardStyles.td_7_Dashboard} />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(namespace => {
                const { access, label, resources, id } = namespace;
                const { memory, cpu } = resources.hard;
                return (
                  <tr
                    id={id}
                    key={id}
                    onClick={() => handleClickGetNamespace(id)}
                    onKeyPress={() => handleClickGetNamespace(id)}
                    role="link"
                    tabIndex={0}
                    style={{ margin: 0, cursor: 'pointer' }}
                  >
                    <td
                      className={dashboardStyles.td_1_Dashboard}
                      // style={{ verticalAlign: 'top', width: '75%' }}
                    >
                      <img src={deployment} alt="deployment" />
                    </td>
                    <td className={dashboardStyles.td_2_Dashboard}>{label}</td>
                    <td className={dashboardStyles.td_3_Dashboard}>{memory}</td>
                    <td className={dashboardStyles.td_4_Dashboard}>{cpu}</td>
                    <td className={dashboardStyles.td_4_Dashboard}>
                      {role !== 'admin' && <div>{access}</div>}
                    </td>
                    <td
                      className={`${
                        dashboardStyles.td_7_Dashboard
                      } dropdown no-arrow`}
                      onClick={e => handleClose(e)}
                      onKeyPress={e => handleClose(e)}
                      role="presentation"
                    >
                      {role === 'admin' && (
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
                      {role === 'admin' && (
                        <ul
                          className={` dropdown-menu dropdown-menu-right ${
                            globalStyles.dropdownMenu
                          }`}
                          role="menu"
                        >
                          <Link
                            to={routerLinks.resizeCustomNamespaceLink(id)}
                            className={`dropdown-item ${
                              globalStyles.dropdownItem
                            }`}
                          >
                            Resize
                          </Link>
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
        <div>
          {role === 'admin' && (
            <div className={globalStyles.createDeploymentWrapper}>
              <div className={globalStyles.noCreatedPodMessage}>
                You have no active projects yet.
              </div>
              <Link
                className={btnClassName}
                data-toggle="modal"
                to={routerLinks.createCustomNamespace}
              >
                Create Project
              </Link>
            </div>
          )}
        </div>
      )}
      {!data.length &&
        role === 'user' && (
          <div className={globalStyles.createDeploymentWrapper}>
            <div className={globalStyles.noCreatedPodMessage}>
              You don`t have permission to projects. <br />
              Contact the administrator to obtain permission.
            </div>
          </div>
        )}
    </div>
  );
};

export default NamespacesDashboardList;
