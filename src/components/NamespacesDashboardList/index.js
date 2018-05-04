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
  history: Object
};

const globalClassName = classNames.bind(globalStyles);

const tableClassName = globalClassName('contentBlockTable', 'table');

const btnClassName = globalClassName('btnBlue', 'btnDepl');

const NamespacesDashboardList = ({ data, history }: Props) => {
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
          <thead style={{ height: '30px' }}>
            <tr>
              <td className={dashboardStyles.td_1_Dashboard} />
              <td className={dashboardStyles.td_2_Dashboard}>Name</td>
              <td className={dashboardStyles.td_3_Dashboard}>RAM</td>
              <td className={dashboardStyles.td_4_Dashboard}>CPU</td>
              <td className={dashboardStyles.td_4_Dashboard}>Permission</td>
              <td className={dashboardStyles.td_7_Dashboard} />
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(namespace => {
                const { label, access } = namespace;
                const {
                  memory: memoryLimit,
                  cpu: cpuLimit
                } = namespace.resources.hard;
                const id = label;
                return (
                  <tr
                    id={id}
                    key={id}
                    onClick={() => handleClickGetNamespace(label)}
                    onKeyPress={() => handleClickGetNamespace(label)}
                    className="content-block-container card-container hover-action"
                    role="link"
                    tabIndex={0}
                    style={{ margin: 0 }}
                  >
                    <td
                      className={dashboardStyles.td_1_Dashboard}
                      // style={{ verticalAlign: 'top', width: '75%' }}
                    >
                      <img src={deployment} alt="deployment" />
                    </td>
                    <td className={dashboardStyles.td_2_Dashboard}>{label}</td>
                    <td className={dashboardStyles.td_3_Dashboard}>
                      {memoryLimit}
                    </td>
                    <td className={dashboardStyles.td_4_Dashboard}>
                      {cpuLimit}
                    </td>
                    <td className={dashboardStyles.td_4_Dashboard}>{access}</td>
                    <td
                      className={`${
                        dashboardStyles.td_7_Dashboard
                      } dropdown no-arrow`}
                      onClick={e => handleClose(e)}
                      onKeyPress={e => handleClose(e)}
                      role="presentation"
                    >
                      <i
                        className={`${globalStyles.contentBlockTableMore} ${
                          globalStyles.dropdownToggle
                        }
                          ${globalStyles.ellipsisRoleMore} ion-more `}
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
                        <Link
                          to={`/namespace/${label}/resize`}
                          className={`dropdown-item ${
                            globalStyles.dropdownItem
                          }`}
                        >
                          Resize
                        </Link>
                      </ul>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      {!data.length && (
        <div className={globalStyles.createDeploymentWrapper}>
          <div className={globalStyles.noCreatedPodMessage}>
            You have no active Namespace yet.
          </div>
          <Link
            className={btnClassName}
            data-toggle="modal"
            to="/createNamespace"
          >
            Create NAMESPACE
          </Link>
        </div>
      )}
    </div>
  );
};

export default NamespacesDashboardList;
