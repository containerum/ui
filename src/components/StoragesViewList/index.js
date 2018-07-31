import React from 'react';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import configmapStyles from '../../containers/ConfigMaps/index.scss';

type Props = {
  getStoragesReducer: Array<Object>,
  handleDeleteStorage: () => void
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

const StoragesViewList = ({
  getStoragesReducer,
  handleDeleteStorage
}: Props) => (
  <div className={globalStyles.blockItem} id="storages">
    <div className={globalStyles.blockItemTitle}>Storages</div>
    <div className="row">
      <div className="col-md-10">
        <div className={globalStyles.textLight}>External IP list</div>
      </div>
    </div>
    <div className="row">
      <div style={{ marginTop: 30 }}>
        {getStoragesReducer.length ? (
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
                  style={{ width: 250 }}
                >
                  Name
                </td>
                <td className={configmapStyles.td_2_Configmap}>Size</td>
                <td className={configmapStyles.td_3_Configmap}>Used</td>
                <td className={configmapStyles.td_4_Configmap} />
              </tr>
            </thead>
            <tbody>
              {getStoragesReducer.map(storage => (
                <tr
                  className={containerClassName}
                  style={{
                    margin: 0
                  }}
                  key={storage.name}
                >
                  <td className={configmapStyles.td_1_Configmap}>
                    {storage.name}
                  </td>
                  <td className={configmapStyles.td_2_Configmap}>
                    {storage.size}
                  </td>
                  <td className={configmapStyles.td_3_Configmap}>
                    {storage.used}
                  </td>
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
                        onClick={() => handleDeleteStorage(storage.name)}
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
                  You don`t have Storages
                </td>
              </tr>
            </thead>
          </table>
        )}
      </div>
    </div>
  </div>
);

export default StoragesViewList;
