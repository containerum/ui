/* @flow */

import React from 'react';
import _ from 'lodash/fp';

// import { routerLinks } from '../../config';
import deployPng from '../../images/deployments.svg';

type Props = {
  data: Object
};

const PortsList = ({ data }: Props) => {
  // console.log(data);
  const { ports, labels, domain_hosts: domainHosts } = data;
  const type = labels.external.toString() === 'true';
  const firstDomainHost = domainHosts[0] ? domainHosts[0] : 'x1.containerum.io';
  return (
    <table className="content-block__table table" width="1170">
      <thead>
        <tr>
          <td className="td-1" />
          <td className="td-2">Name</td>
          <td className="td-3">Port</td>
          <td className="td-4">Protocol</td>
          {type && <td className="td-5">Link</td>}
          <td className="td-7" />
          <td className="td-7" />
        </tr>
      </thead>
      <tbody>
        {ports.map(currentPort => {
          const { name, port, targetPort, protocol } = currentPort;
          const linkSrv = `http://p${port}.${firstDomainHost}`;
          const viewLinkSrv = `p${port}.${firstDomainHost}`;
          return (
            <tr className="tr-table-hover" key={_.uniqueId()}>
              <td className="td-1">
                <img src={deployPng} alt="" />
              </td>
              <td className="td-2">{name}</td>
              <td className="td-3">
                {port}:{targetPort}
              </td>
              <td className="td-4">{protocol}</td>
              {type && (
                <td className="td-5">
                  <a target="_blank" href={linkSrv}>
                    {viewLinkSrv}
                  </a>
                </td>
              )}
              <td className="td-7" />
              <td className="td-7">{/* <div className="warning"> </div> */}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PortsList;
