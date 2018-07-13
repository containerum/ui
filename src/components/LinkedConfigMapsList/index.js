import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import _ from 'lodash/fp';

import { routerLinks } from '../../config/default';
import globalStyles from '../../theme/global.scss';
import configmapStyles from '../../containers/ConfigMaps/index.scss';

type Props = {
  configMapsData: Array<Object>,
  dataNamespace: Object,
  // idDep: string,
  displayedContainers: Object,
  handleDeleteConfigMap: (configMapLabel: string) => void
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

const LinkedConfigMapsList = ({
  configMapsData,
  handleDeleteConfigMap,
  // idDep,
  displayedContainers,
  dataNamespace
}: Props) => (
  <div className={globalStyles.contentBlock}>
    <div className={`container ${globalStyles.containerNoBackground}`}>
      <div>
        {configMapsData.length >= 1 && displayedContainers.length >= 1 ? (
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
                <td className={configmapStyles.td_3_Configmap}>Mount Path</td>
                <td className={configmapStyles.td_4_Configmap} />
              </tr>
            </thead>
            <tbody>
              {configMapsData.map(config => {
                const { name, data } = config;
                const filtredContainers = displayedContainers.filter(
                  container => container.name === name
                );
                const accessToCurrentNamespace = dataNamespace
                  ? dataNamespace.access
                  : 'read';
                if (
                  displayedContainers.find(container => container.name === name)
                ) {
                  return (
                    <tr
                      className={containerClassName}
                      style={{
                        margin: 0,
                        boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                      }}
                      key={_.uniqueId()}
                    >
                      <td className={configmapStyles.td_1_Configmap}>{name}</td>
                      <td className={configmapStyles.td_2_Configmap}>
                        <div className={configmapStyles.configmapOverflow}>
                          {Object.keys(data).map(file => (
                            <span key={file}>
                              <Link
                                style={{ color: '#29abe2' }}
                                to={routerLinks.viewConfigMapFilesLink(
                                  dataNamespace.id,
                                  name,
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
                        {filtredContainers.map(filtredContainer => (
                          <div key={_.uniqueId()}>
                            {filtredContainer.mount_path}
                          </div>
                        ))}
                      </td>
                      <td
                        className={`${
                          configmapStyles.td_4_Configmap
                        } dopdown no-arrow`}
                      >
                        {accessToCurrentNamespace !== 'read' && (
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
                        {accessToCurrentNamespace !== 'read' && (
                          <ul
                            className={` dropdown-menu dropdown-menu-right ${
                              globalStyles.dropdownMenu
                            }`}
                            role="menu"
                          >
                            <button
                              onClick={() => handleDeleteConfigMap(name)}
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
    </div>
  </div>
);

export default LinkedConfigMapsList;
