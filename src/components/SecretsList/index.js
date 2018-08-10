/* @flow */

import React from 'react';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
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
  handleDeleteSecret: ?(idDep: string) => void
};

const SecretsList = ({
  data,
  dataNamespace,
  history,
  idName,
  handleDeleteSecret
}: Props) => {
  const handleClickGetDeployment = name => {
    history.push(routerLinks.getSecretLink(idName, name));
  };
  const handleClickDeleteDeployment = name => {
    handleDeleteSecret(name);
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  const ta = timeago();
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  return (
    <div>
      {data &&
        data.length >= 1 && (
          <table className={tableClassName} width="1170">
            <thead>
              <tr>
                <td className={depStyles.td_1_Dep} />
                <td
                  className={depStyles.td_2_Dep}
                  style={{ width: '400px !important' }}
                >
                  Name
                </td>
                <td className={depStyles.td_6_Dep}>Age</td>
                <td className={depStyles.td_6_Dep} />
                <td className={depStyles.td_7_Dep} />
              </tr>
            </thead>
            <tbody>
              {data.map(secret => {
                const { name, created_at: createdAt } = secret;
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
                    <td className={depStyles.td_6_Dep}>{dateValue}</td>
                    <td className={depStyles.td_6_Dep} />
                    <td className={depStyles.td_7_Dep} />
                    <td
                      className={`${depStyles.td_7_Dep} dropdown no-arrow`}
                      onClick={e => handleClose(e)}
                      onKeyPress={e => handleClose(e)}
                      role="presentation"
                    >
                      {handleDeleteSecret &&
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
                      {handleDeleteSecret &&
                        accessToNamespace !== 'read' && (
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
      {(!data || !data.length) && (
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
                      You don`t have Secrets
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

export default SecretsList;
