/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash/fp';

import { routerLinks } from '../../config';

type Props = {
  data: Object,
  handleDeleteDomain: (idName: string, label: string) => void
};

const DomainsList = ({ data, handleDeleteDomain }: Props) => {
  const isEmptyData = Object.keys(data).find(
    ingress => data[ingress].ingresses.length
  );
  return (
    <div style={isEmptyData ? { height: '150px' } : {}}>
      {isEmptyData ? (
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
          <thead style={{ height: '30px' }}>
            <tr>
              <td className="td-1-domains">Domain</td>
              <td className="td-2-domains">Service</td>
              <td className="td-3-domains">Namespace</td>
              <td className="td-4-domains" />
            </tr>
          </thead>
          <tbody className="domains">
            {Object.keys(data).map(ingressName => {
              const checkArrIngressess = data[ingressName];
              return Object.keys(checkArrIngressess).map(ingress =>
                checkArrIngressess[ingress].map(ing => {
                  const { name } = ing;
                  const srvName = ing.rules[0].path[0].service_name;
                  const { host } = ing.rules[0];
                  const ssl = ing.rules[0].tls_secret;
                  const linkDomain = ssl ? `https://${host}` : `http://${host}`;
                  return (
                    <tr
                      className="content-block-container card-container hover-action"
                      key={_.uniqueId()}
                      style={{ margin: 0 }}
                    >
                      <td className="td-1-domains">
                        <a
                          href={linkDomain}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#29abe2' }}
                        >
                          {host}
                        </a>
                      </td>
                      <td className="td-2-domains">
                        <Link
                          style={{ color: '#29abe2' }}
                          to={routerLinks.getServiceLink(ingressName, srvName)}
                        >
                          {srvName}
                        </Link>
                      </td>
                      <td className="td-3-domains">
                        <Link
                          style={{ color: '#29abe2' }}
                          to={routerLinks.namespaceLink(ingressName)}
                        >
                          {ingressName}
                        </Link>
                      </td>
                      <td className="td-4-domains dropdown no-arrow">
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
                          <li
                            className="dropdown-item text-danger"
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
              <td className="td-1-domains">You don`t have Domains</td>
            </tr>
          </thead>
        </table>
      )}
    </div>
  );
};

export default DomainsList;
