/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';
import className from 'classnames/bind';
import { timeago } from '../../functions/timeago';

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
  namespacesData: Array<Object>,
  data: Object,
  match: Object,
  handleDeleteDomain: (idName: string, label: string) => void
};

const DomainsList = ({
  data,
  namespacesData,
  handleDeleteDomain,
  match,
  namespacesLabels
}: Props) => {
  // const isEmptyData = Object.keys(data).find(
  //   ingress => data[ingress].ingresses.length
  // );
  const ta = timeago();
  return (
    <div style={data ? { height: 'auto' } : {}}>
      {data.length !== 0 ? (
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
              <td className={domainsStyles.td_2_Domains}>Age</td>
              <td className={domainsStyles.td_3_Domains} />
            </tr>
          </thead>
          <tbody className="domains" style={{ overflow: 'auto' }}>
            {data.map(ingress => {
              const nameIngress = ingress.name;
              const srvName = ingress.rules[0].path[0].service_name;
              const namespaceName = namespacesLabels.find(
                namespace => namespace[0] === match.params.idName
              );
              const namespaceInfo = namespacesData.find(
                namespace =>
                  namespaceName ? namespace.id === namespaceName[0] : {}
              );
              const hostName = ingress.rules[0].host;
              const linkDomain =
                ingress.rules[0].tls_secret === 'secret'
                  ? `https://${hostName}`
                  : `http://${hostName}`;
              const milliseconds = Date.parse(ingress.created_at);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              return (
                <tr
                  className={containerClassName}
                  key={_.uniqueId()}
                  style={{
                    margin: 0,
                    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
                    height: 42
                  }}
                >
                  <td className={domainsStyles.td_1_Domains}>
                    <a
                      href={linkDomain}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#29abe2' }}
                    >
                      {hostName}
                    </a>
                  </td>
                  <td className={domainsStyles.td_1_Domains}>
                    <Link
                      style={{ color: '#29abe2' }}
                      to={routerLinks.getServiceLink(
                        match.params.idName,
                        srvName
                      )}
                    >
                      {srvName}
                    </Link>
                  </td>
                  <td className={domainsStyles.td_2_Domains}>{dateValue}</td>
                  <td
                    className={`${
                      domainsStyles.td_3_Domains
                    }  dropdown no-arrow`}
                  >
                    {namespaceInfo.access !== 'read' && (
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
                    {namespaceInfo.access !== 'read' && (
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
                            handleDeleteDomain(namespaceInfo.id, nameIngress)
                          }
                        >
                          Delete
                        </li>
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
