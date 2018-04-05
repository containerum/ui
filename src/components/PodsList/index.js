/* @flow */

import React from 'react';

import { routerLinks } from '../../config';
import { timeago } from '../../functions/timeago';
import podPng from '../../images/pod-3.png';

type Props = {
  data: Object,
  history: Object,
  idName: string,
  idDep: string,
  handleDeletePod: (idPod: string) => void
};

const PodsList = ({ data, history, idName, idDep, handleDeletePod }: Props) => {
  const handleClickGetDeployment = name => {
    history.push(routerLinks.getPodLink(idName, idDep, name));
  };
  const handleClickDeleteDeployment = name => {
    handleDeletePod(name);
  };
  const handleClose = e => {
    e.stopPropagation();
  };
  const ta = timeago();
  console.log(data);
  return (
    <div>
      {data.length >= 1 && (
        <table className="content-block__table table" width="1170">
          <thead>
            <tr>
              <td className="td-1" />
              <td className="td-2">Name</td>
              <td className="td-3">Status</td>
              <td className="td-4">Restarts</td>
              <td className="td-5">Containers</td>
              <td className="td-6">Age</td>
              <td className="td-7" />
            </tr>
          </thead>
          <tbody>
            {data.map(deploy => {
              const {
                name,
                status,
                containers,
                created_at: createdAt
              } = deploy;
              const milliseconds = Date.parse(createdAt);
              const dateHours = new Date(milliseconds);
              const dateValue = ta.ago(dateHours, true);
              const id = `pod_${name}`;
              return (
                <tr
                  key={id}
                  className="tr-table-hover"
                  id={id}
                  onClick={() => handleClickGetDeployment(name)}
                >
                  <td className="td-1">
                    <img src={podPng} alt="pod" />
                  </td>
                  <td className="td-2">{name}</td>
                  <td className="td-3">{status.phase}</td>
                  <td className="td-4">{status.restart_count} restarts</td>
                  <td className="td-5">{containers.length}</td>
                  <td className="td-6">{dateValue}</td>
                  <td className="td-7">
                    {/* <div className="warning"> </div> */}
                  </td>
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
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleClickDeleteDeployment(name)}
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
                      At the moment the Pod is rebooting
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

export default PodsList;
