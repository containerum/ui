/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

// import { routerLinks } from '../../config';
import deployment from '../../images/deployment.png';
import { routerLinks } from '../../config';

type Props = {
  data: Array<Object>,
  history: Object
};

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
        <table className="content-block__table dashboard-table table">
          <thead>
            <tr>
              <td className="td-1" />
              <td className="td-2 pleft">Name</td>
              <td className="td-3 pleft">RAM</td>
              <td className="td-4 pleft">CPU</td>
              <td className="td-7" />
            </tr>
          </thead>
          <tbody>
            {data.map(namespace => {
              const {
                name,
                memory_limit: memoryLimit,
                cpu_limit: cpuLimit
              } = namespace;
              const id = name;
              return (
                <tr
                  id={id}
                  key={id}
                  onClick={() => handleClickGetNamespace(name)}
                  onKeyPress={() => handleClickGetNamespace(name)}
                  className="content-block-container card-container hover-action"
                  role="link"
                  tabIndex={0}
                  style={{ margin: 0 }}
                >
                  <td className="td-1">
                    <img src={deployment} alt="deployment" />
                  </td>
                  <td className="td-2">{name}</td>
                  <td className="td-3">{memoryLimit}</td>
                  <td className="td-4">{cpuLimit}</td>
                  <td
                    className="td-7 dropdown no-arrow"
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="presentation"
                  >
                    <i
                      className="content-block-table__more ion-more dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-right"
                      role="menu"
                    >
                      <Link
                        to={`/namespace/${name}/resize`}
                        className="dropdown-item"
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
        <div className="create-depl-wrapper">
          <div className="nocreated-pod-message">
            You have no active Namespace yet.
          </div>
          <Link
            className="blue-btn depl-btn"
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
