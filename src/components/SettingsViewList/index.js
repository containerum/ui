import React from 'react';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import configmapStyles from '../../containers/ConfigMaps/index.scss';

type Props = {
  getDomainsReducer: Array<Object>,
  handleDeleteIP: () => void
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

const ConfigMapList = ({ getDomainsReducer, handleDeleteIP }: Props) => (
  <div className={globalStyles.blockItem} id="settings">
    <div className={globalStyles.blockItemTitle}>Settings</div>
    <div className="row">
      <div className="col-md-10">
        <div className={globalStyles.textLight}>External IP list</div>
      </div>
    </div>
    <div className="row">
      <div style={{ marginTop: 30 }}>
        {getDomainsReducer.length ? (
          <table
            className={itemClassName}
            style={{
              tableLayout: 'fixed',
              width: '100%',
              border: 0,
              cellspacing: 0,
              cellpadding: 0,
              marginBottom: 0
            }}
          >
            <thead style={{ height: '30px' }}>
              <tr>
                <td
                  className={configmapStyles.td_1_Configmap}
                  style={{ width: 300 }}
                >
                  Your IP
                </td>
                <td className={configmapStyles.td_2_Configmap} />
                <td className={configmapStyles.td_3_Configmap} />
                <td className={configmapStyles.td_4_Configmap} />
              </tr>
            </thead>
            <tbody>
              {getDomainsReducer.map(domain => (
                <tr
                  className={containerClassName}
                  style={{
                    margin: 0
                  }}
                  key={domain._id}
                >
                  <td className={configmapStyles.td_1_Configmap}>
                    {domain.ip.join()}
                  </td>
                  <td className={configmapStyles.td_2_Configmap} />
                  <td className={configmapStyles.td_3_Configmap} />
                  <td
                    className={`${
                      configmapStyles.td_4_Configmap
                    }  dropdown no-arrow`}
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
                      <button
                        onClick={() =>
                          handleDeleteIP(domain._id, domain.ip.join())
                        }
                        className={`dropdown-item text-danger ${
                          globalStyles.dropdownItem
                        }`}
                      >
                        Delete
                      </button>
                    </ul>
                  </td>
                </tr>
              ))}
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
              marginLeft: 20
            }}
          >
            <thead>
              <tr>
                <td className={configmapStyles.td_5_Configmap}>
                  You don`t have Domains
                </td>
              </tr>
            </thead>
          </table>
        )}
      </div>
    </div>
  </div>
);

export default ConfigMapList;
