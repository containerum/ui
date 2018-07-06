import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';

import { routerLinks } from '../../config/default';
import globalStyles from '../../theme/global.scss';
import configmapStyles from '../../containers/ConfigMaps/index.scss';

type Props = {
  configMapsData: Array<Object>,
  dataNamespace: Object,
  handleDeleteConfigMap: (idName: string, configMapLabel: string) => void,
  isEqualGetPath: boolean,
  currentIdName: string
};

const globalClass = className.bind(globalStyles);

const itemClassName = globalClass(
  'blockItemTokensTable',
  'contentBlockTable',
  'table'
);

const containerClassName = globalClass(
  'contentBlcokContainer',
  'containerCard',
  'hoverAction'
);

const ConfigMapList = ({
  configMapsData,
  handleDeleteConfigMap,
  isEqualGetPath,
  dataNamespace,
  currentIdName
}: Props) => {
  const mainConfigMapsData = configMapsData.find(
    cnf => isEqualGetPath && currentIdName === cnf.idName
  );

  const currentDataOfNamespace = dataNamespace.find(
    namespace => namespace.id === currentIdName
  );
  const accessToNamespace = currentDataOfNamespace
    ? currentDataOfNamespace.access
    : 'read';
  return (
    <div
      className={`${globalStyles.contentBlock}  ${
        globalStyles.contentBlockContent
      }`}
      style={{ marginBottom: 0, marginLeft: '-15px', marginRight: '-15px' }}
    >
      <div
        className={`container ${globalStyles.containerNoBackground}`}
        style={{
          paddingRight: 0,
          paddingLeft: 0
        }}
      >
        {isEqualGetPath ? (
          <div>
            {configMapsData.length >= 1 && mainConfigMapsData ? (
              <table
                className={itemClassName}
                style={{
                  tableLayout: 'fixed',
                  width: '100%',
                  border: 0,
                  cellspacing: 0,
                  cellpadding: 0,
                  marginTop: '30px',
                  marginBottom: 0
                }}
              >
                <thead style={{ height: '30px' }}>
                  <tr>
                    <td className={configmapStyles.td_1_Configmap}>Name</td>
                    <td className={configmapStyles.td_2_Configmap}>Filename</td>
                    <td className={configmapStyles.td_3_Configmap}>Project</td>
                    <td className={configmapStyles.td_4_Configmap} />
                  </tr>
                </thead>
                <tbody>
                  {configMapsData.map(config => {
                    const { idName, configmap } = config;
                    if (isEqualGetPath && currentIdName === idName) {
                      return (
                        <tr
                          className={containerClassName}
                          style={{
                            margin: 0
                          }}
                          key={configmap.name}
                        >
                          <td className={configmapStyles.td_1_Configmap}>
                            {configmap.name}
                          </td>
                          <td className={configmapStyles.td_2_Configmap}>
                            <div className={configmapStyles.configmapOverflow}>
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
                          <td className={configmapStyles.td_3_Configmap}>
                            <Link
                              style={{ color: '#29abe2' }}
                              to={routerLinks.getDeploymentsLink(idName)}
                            >
                              {currentDataOfNamespace.label}
                            </Link>
                          </td>
                          <td
                            className={`${
                              configmapStyles.td_4_Configmap
                            }  dropdown no-arrow`}
                          >
                            {accessToNamespace !== 'read' && (
                              <i
                                className={`${
                                  globalStyles.contentBlockTableMore
                                } ${globalStyles.dropdownToggle}
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
                                  onClick={() =>
                                    handleDeleteConfigMap(
                                      idName,
                                      configmap.name
                                    )
                                  }
                                  className={`dropdown-item text-danger ${
                                    globalStyles.dropdownItem
                                  }`}
                                >
                                  Delete
                                </button>
                              </ul>
                            )}
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
                className={itemClassName}
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
                    <td className={configmapStyles.td_5_Configmap}>
                      You don`t have ConfigMaps
                    </td>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        ) : (
          <div style={{ marginBottom: 47 }}>
            {configMapsData.length >= 1 ? (
              <table
                className={itemClassName}
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
                    <td className={configmapStyles.td_1_Configmap}>Name</td>
                    <td className={configmapStyles.td_2_Configmap}>Filename</td>
                    <td className={configmapStyles.td_3_Configmap}>Project</td>
                    <td className={configmapStyles.td_4_Configmap} />
                  </tr>
                </thead>
                <tbody>
                  {configMapsData.map(config => {
                    const { idName, configmap } = config;
                    const checkDataOfNamespace = dataNamespace.find(
                      namespace => namespace.id === idName
                    );
                    const accessToCurrentNamespace = checkDataOfNamespace
                      ? checkDataOfNamespace.access
                      : 'read';
                    const label = checkDataOfNamespace
                      ? checkDataOfNamespace.label
                      : idName;
                    return (
                      <tr
                        className={containerClassName}
                        style={{
                          margin: 0,
                          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                        }}
                        key={configmap.name}
                      >
                        <td className={configmapStyles.td_1_Configmap}>
                          {configmap.name}
                        </td>
                        <td className={configmapStyles.td_2_Configmap}>
                          <div className={configmapStyles.configmapOverflow}>
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
                        <td className={configmapStyles.td_3_Configmap}>
                          <Link
                            style={{ color: '#29abe2' }}
                            to={routerLinks.getDeploymentsLink(idName)}
                          >
                            {label}
                          </Link>
                        </td>
                        <td
                          className={`${
                            configmapStyles.td_4_Configmap
                          } dopdown no-arrow`}
                        >
                          {accessToCurrentNamespace !== 'read' && (
                            <i
                              className={`${
                                globalStyles.contentBlockTableMore
                              } ${globalStyles.dropdownToggle}
                          ${globalStyles.ellipsisRoleMore} ion-more `}
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            />
                          )}
                          {accessToCurrentNamespace !== 'read' && (
                            <ul
                              className={` dropdown-menu dropdown-menu-right ${
                                globalStyles.dropdownMenu
                              }`}
                              role="menu"
                            >
                              <button
                                onClick={() =>
                                  handleDeleteConfigMap(idName, configmap.name)
                                }
                                className={`dropdown-item  text-danger ${
                                  globalStyles.dropdownItem
                                }`}
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
            ) : (
              <table
                className={itemClassName}
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
                    <td className={configmapStyles.td_5_Configmap}>
                      You don`t have ConfigMaps
                    </td>
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
