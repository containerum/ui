/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';

import { externalLinks, routerLinks } from '../../config';
// import { timeago } from '../../functions/timeago';
import servicePng from '../../images/link.svg';
import { timeago } from '../../functions/timeago';
import globalStyles from '../../theme/global.scss';
import servicesStyles from '../../containers/Services/index.scss';

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
  handleDeleteService: (idSrv: string) => void
};

const ServicesList = ({
  data,
  dataNamespace,
  history,
  idName,
  handleDeleteService
}: Props) => {
  const handleClickGetService = name => {
    history.push(routerLinks.getServiceLink(idName, name));
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  const ta = timeago();
  const accessToNamespace = dataNamespace ? dataNamespace.access : 'read';
  return (
    <div>
      {data.length >= 1 && (
        <table className={tableClassName} width="1170">
          <thead>
            <tr>
              <td className={servicesStyles.td_1_Services} />
              <td className={servicesStyles.td_2_Services}>Name</td>
              <td className={servicesStyles.td_2_Services}>Type</td>
              <td className={servicesStyles.td_2_Services}>Domain</td>
              <td className={servicesStyles.td_7_Services}>Age</td>
              <td className={servicesStyles.td_7_Services} />
            </tr>
          </thead>
          <tbody>
            {data.map(service => {
              const { name, domain, created_at: createdAt } = service;
              const type = domain ? 'External' : 'Internal';
              const id = `service_${name}`;
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              return (
                <tr
                  key={id}
                  className={globalStyles.tableHover}
                  id={id}
                  onClick={() => handleClickGetService(name)}
                >
                  <td className={servicesStyles.td_1_Services}>
                    <img src={servicePng} alt="service" />
                  </td>
                  <td className={servicesStyles.td_2_Services}>{name}</td>
                  <td className={servicesStyles.td_2_Services}>{type}</td>
                  <td className={servicesStyles.td_2_Services}>
                    {domain || '-'}
                  </td>
                  <td className={servicesStyles.td_2_Services}>{dateValue}</td>
                  <td
                    className={`${
                      servicesStyles.td_7_Services
                    } dropdown no-arrow`}
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="presentation"
                  >
                    {handleDeleteService &&
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
                    {handleDeleteService &&
                      accessToNamespace !== 'read' && (
                        <ul
                          className={` dropdown-menu dropdown-menu-right ${
                            globalStyles.dropdownMenu
                          }`}
                          role="menu"
                        >
                          <NavLink
                            activeClassName="active"
                            to={routerLinks.resizeServiceLink(idName, name)}
                            className={`dropdown-item  ${
                              globalStyles.dropdownItem
                            }`}
                          >
                            Update
                          </NavLink>
                          <button
                            className={`dropdown-item text-danger ${
                              globalStyles.dropdownItem
                            }`}
                            onClick={() => handleDeleteService(name)}
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
      {!data.length && (
        <div className={contentClassName}>
          <div className="tab-content">
            <div className="tab-pane deployments active">
              <table className={tableClassName} width="1170">
                <thead>
                  <tr>
                    <td
                      className={servicesStyles.td_1_ServicesNoServices}
                      style={{ paddingLeft: '60px' }}
                    >
                      Service provides internal and/or external access to a Pod.{' '}
                      <br /> <br />
                      To create a new Service use our{' '}
                      <a
                        className={globalStyles.linkDocumentation}
                        href={externalLinks.releasesChkit}
                      >
                        CLI Tool
                      </a>{' '}
                      and refer to our{' '}
                      <a
                        className={globalStyles.linkDocumentation}
                        href={externalLinks.startGuide}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documentation
                      </a>{' '}
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

export default ServicesList;
