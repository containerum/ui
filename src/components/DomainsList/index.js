/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import { routerLinks } from '../../config';

import domainsStyles from '../../containers/Domains/index.scss';
import globalStyles from '../../theme/global.scss';

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass(
  'blockItemTokensTable',
  'table',
  'contentBlockTable'
);
const containerClassName = globalClass(
  'contentBlcokContainer',
  'containerCard',
  'hoverAction'
);
type Props = {
  namespacesLabels: Object,
  data: Object,
  handleDeleteDomain: (idName: string, label: string) => void
};

const DomainsList = ({ data, handleDeleteDomain, namespacesLabels }: Props) => {
  const isEmptyData = Object.keys(data).find(
    ingress => data[ingress].ingresses.length
  );
  return (
    <div style={isEmptyData ? { height: 'auto' } : {}}>
      {isEmptyData ? (
        <table
          className={`${tableClassName} table`}
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
              <td className={domainsStyles.td_1_Domains}>Domain</td>
              <td className={domainsStyles.td_1_Domains}>Service</td>
              <td className={domainsStyles.td_2_Domains}>Namespace</td>
              <td className={domainsStyles.td_3_Domains} />
            </tr>
          </thead>
          <tbody className="domains" style={{ overflow: 'auto' }}>
            {Object.keys(data).map(ingressName => {
              const checkArrIngressess = data[ingressName];
              const namespaceName = namespacesLabels.find(
                namespace => namespace[0] === ingressName
              );
              return Object.keys(checkArrIngressess).map(ingress =>
                checkArrIngressess[ingress].map(ing => {
                  const { name, type } = ing;
                  const srvName = ing.rules[0].path[0].service_name;
                  const { host } = ing.rules[0];
                  const linkDomain = type
                    ? `https://${host}`
                    : `http://${host}`;
                  return (
                    <tr
                      className={containerClassName}
                      key={_.uniqueId()}
                      style={{
                        margin: 0,
                        boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <td className={domainsStyles.td_1_Domains}>
                        <a
                          href={linkDomain}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#29abe2' }}
                        >
                          {host}
                        </a>
                      </td>
                      <td className={domainsStyles.td_1_Domains}>
                        <Link
                          style={{ color: '#29abe2' }}
                          to={routerLinks.getServiceLink(ingressName, srvName)}
                        >
                          {srvName}
                        </Link>
                      </td>
                      <td className={domainsStyles.td_2_Domains}>
                        <Link
                          style={{ color: '#29abe2' }}
                          to={routerLinks.namespaceLink(ingressName)}
                        >
                          {namespaceName[1]}
                        </Link>
                      </td>
                      <td
                        className={`${
                          domainsStyles.td_3_Domains
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
                          <li
                            className={`dropdown-item text-danger ${
                              globalStyles.dropdownItem
                            }`}
                            onClick={() =>
                              handleDeleteDomain(ingressName, name)
                            }
                          >
                            Delete
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })
              );
            })}
          </tbody>
        </table>
      ) : (
        <table
          className={`${domainsStyles.domainsTable} table`}
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
              <td
                className={domainsStyles.td_1_Domains}
                style={{ borderTop: 'none' }}
              >
                You don`t have Domains
              </td>
            </tr>
          </thead>
        </table>
      )}
    </div>
  );
};

export default DomainsList;
