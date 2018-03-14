/* @flow */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { externalLinks, routerLinks } from '../../config';
import { timeago } from '../../functions/timeago';
import deployPng from '../../images/deployments.svg';

type Props = {
  data: Object,
  history: Object,
  idName: string,
  handleDeleteDeployment: ?(idDep: string) => void
};

const DeploymentsList = ({
  data,
  history,
  idName,
  handleDeleteDeployment
}: Props) => {
  const handleClickGetDeployment = name => {
    history.push(routerLinks.getDeploymentLink(idName, name));
  };
  const handleClickDeleteDeployment = name => {
    handleDeleteDeployment(name);
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
              <td className="td-3">Pods</td>
              <td className="td-4">RAM (MB)</td>
              <td className="td-5">CPU (m)</td>
              <td className="td-6">Age</td>
              <td className="td-7" />
              <td className="td-7" />
            </tr>
          </thead>
          <tbody>
            {data.map(deploy => {
              const {
                cpu,
                name,
                pods_active: podsActive,
                pods_limit: podsLimit,
                created_at: createdAt,
                ram
              } = deploy;
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              const id = `item_${name}`;
              return (
                <tr
                  key={id}
                  className="tr-table-hover"
                  id={id}
                  onClick={() => handleClickGetDeployment(name)}
                >
                  <td className="td-1">
                    <img src={deployPng} alt="deploy" />
                  </td>
                  <td className="td-2">{name}</td>
                  <td className="td-3">
                    {podsActive} / {podsLimit}
                  </td>
                  <td className="td-4">{ram}</td>
                  <td className="td-5">{cpu}</td>
                  <td className="td-6">{dateValue}</td>
                  <td className="td-7">
                    {/* <div className="warning"> </div> */}
                  </td>
                  {handleDeleteDeployment && (
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
                          className="dropdown-item"
                          to={routerLinks.resizeDeploymentLink(idName, name)}
                        >
                          Update
                        </NavLink>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleClickDeleteDeployment(name)}
                        >
                          Delete
                        </button>
                      </ul>
                    </td>
                  )}
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
                      Deployment is a controller that contains one or several
                      containers, united into Pods. <br /> <br />
                      To create a new Deployment use our{' '}
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
                      </a>
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

export default DeploymentsList;
