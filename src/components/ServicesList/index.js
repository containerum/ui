/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { externalLinks, routerLinks } from '../../config';
// import { timeago } from '../../functions/timeago';
import servicePng from '../../images/link.svg';
import { timeago } from '../../functions/timeago';

type Props = {
  data: Object,
  history: Object,
  idName: string,
  handleDeleteService: (idSrv: string) => void
};

const ServicesList = ({
  data,
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
  return (
    <div>
      {data.length >= 1 && (
        <table className="content-block__table table" width="1170">
          <thead>
            <tr>
              <td className="td-1" />
              <td className="td-2">Name</td>
              <td className="td-2">Type</td>
              <td className="td-2">Domain</td>
              <td className="td-6">Age</td>
              <td className="td-7" />
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
                  className="tr-table-hover"
                  id={id}
                  onClick={() => handleClickGetService(name)}
                >
                  <td className="td-1">
                    <img src={servicePng} alt="service" />
                  </td>
                  <td className="td-2">{name}</td>
                  <td className="td-2">{type}</td>
                  <td className="td-2">{domain || '-'}</td>
                  <td className="td-2">{dateValue}</td>
                  <td
                    className="td-7 dropdown no-arrow"
                    onClick={e => handleClose(e)}
                    onKeyPress={e => handleClose(e)}
                    role="presentation"
                  >
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
                      <NavLink
                        activeClassName="active"
                        to={routerLinks.resizeServiceLink(idName, name)}
                        className="dropdown-item"
                      >
                        Update
                      </NavLink>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeleteService(name)}
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
      )}
      {!data.length && (
        <div className="content-block-content full">
          <div className="tab-content">
            <div className="tab-pane deployments active">
              <table className="content-block__table table" width="1170">
                <thead>
                  <tr>
                    <td className="td-1" style={{ paddingLeft: '60px' }}>
                      Service provides internal and/or external access to a Pod.{' '}
                      <br /> <br />
                      To create a new Service use our{' '}
                      <a
                        className="documentation-link"
                        href={externalLinks.releasesChkit}
                      >
                        CLI Tool
                      </a>{' '}
                      and refer to our{' '}
                      <a
                        className="documentation-link"
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
