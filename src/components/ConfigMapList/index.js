import React from 'react';
import { Link } from 'react-router-dom';

import { routerLinks } from '../../config/default';

type Props = {
  configMapsData: Array<Object>,
  handleDeleteConfigMap: (idName: string, configMapLabel: string) => void,
  isEqualGetPath: boolean,
  currentIdName: string
};
const ConfigMapList = ({
  configMapsData,
  handleDeleteConfigMap,
  isEqualGetPath,
  currentIdName
}: Props) => {
  const mainConfigMapsData = configMapsData.find(
    cnf => isEqualGetPath && currentIdName === cnf.idName
  );
  return (
    <div className="content-block">
      <div className="container no-back">
        {isEqualGetPath ? (
          <div>
            {configMapsData.length >= 1 && mainConfigMapsData ? (
              <table
                className="block-item__tokens-table content-block__table table"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px'
                }}
              >
                <thead style={{ height: '30px' }}>
                  <tr>
                    <td className="td-8">Name</td>
                    <td className="td-9">Filename</td>
                    <td className="td-3">Namespace</td>
                    <td className="td-10" />
                  </tr>
                </thead>
                <tbody className="domains">
                  {configMapsData.map(config => {
                    const { idName, configmap } = config;
                    if (isEqualGetPath && currentIdName === idName) {
                      return (
                        <tr
                          className="content-block-container card-container hover-action"
                          style={{
                            margin: 0,
                            boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                          }}
                          key={configmap.name}
                        >
                          <td className="td-8">{configmap.name}</td>
                          <td className="td-9">
                            <div className="configmap-overflow">
                              {Object.keys(configmap.data).map(file => (
                                <span key={file}>
                                  <Link
                                    style={{ color: '#29abe2' }}
                                    to={routerLinks.viewConfigMapFilesLink(
                                      idName,
                                      configmap.name,
                                      file
                                    )}
                                  >
                                    {file}
                                  </Link>
                                  <br />
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="td-3">
                            <Link
                              style={{ color: '#29abe2' }}
                              to={`/namespaces/${idName}/deployments`}
                            >
                              {idName}
                            </Link>
                          </td>
                          <td className="td-10 dropdown no-arrow">
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
                              <button
                                onClick={() =>
                                  handleDeleteConfigMap(idName, configmap.name)
                                }
                                className="dropdown-item text-danger"
                              >
                                Delete
                              </button>
                            </ul>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            ) : (
              <table
                className="content-block__table_domains dashboard-table table"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px'
                }}
              >
                <thead>
                  <tr>
                    <td className="td-2">You don`t have ConfigMaps</td>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        ) : (
          <div>
            {configMapsData.length >= 1 ? (
              <table
                className="block-item__tokens-table content-block__table table"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px'
                }}
              >
                <thead style={{ height: '30px' }}>
                  <tr>
                    <td className="td-8">Name</td>
                    <td className="td-9">Filename</td>
                    <td className="td-3">Namespace</td>
                    <td className="td-10" />
                  </tr>
                </thead>
                <tbody className="domains">
                  {configMapsData.map(config => {
                    const { idName, configmap } = config;
                    return (
                      <tr
                        className="content-block-container card-container hover-action"
                        style={{
                          margin: 0,
                          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                        }}
                        key={configmap.name}
                      >
                        <td className="td-8">{configmap.name}</td>
                        <td className="td-9">
                          <div className="configmap-overflow">
                            {Object.keys(configmap.data).map(file => (
                              <span key={file}>
                                <Link
                                  style={{ color: '#29abe2' }}
                                  to={routerLinks.viewConfigMapFilesLink(
                                    idName,
                                    configmap.name,
                                    file
                                  )}
                                >
                                  {file}
                                </Link>
                                <br />
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="td-3">
                          <Link
                            style={{ color: '#29abe2' }}
                            to={`/namespaces/${idName}/deployments`}
                          >
                            {idName}
                          </Link>
                        </td>
                        <td className="td-10 dropdown no-arrow">
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
                            <button
                              onClick={() =>
                                handleDeleteConfigMap(idName, configmap.name)
                              }
                              className="dropdown-item text-danger"
                            >
                              Delete
                            </button>
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table
                className="content-block__table_domains dashboard-table table"
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px'
                }}
              >
                <thead>
                  <tr>
                    <td className="td-2">You don`t have ConfigMaps</td>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigMapList;
