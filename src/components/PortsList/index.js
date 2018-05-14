/* @flow */

import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

// import { routerLinks } from '../../config';
import portPng from '../../images/port.svg';

import globalStyles from '../../theme/global.scss';
import portsStyles from '../../containers/Ports/index.scss';

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass('contentBlockTable', 'table');

// const contentClassName = globalClass(
//   'contentBlockContent',
//   'contentBlockContentFull'
// );

type Props = {
  data: Object
};

const PortsList = ({ data }: Props) => {
  const { ports, domain } = data;
  return (
    <table className={tableClassName} width="1170">
      <thead>
        <tr>
          <td className={portsStyles.td_1_Ports} />
          <td className={portsStyles.td_2_Ports}>Name</td>
          <td className={portsStyles.td_3_Ports}>Port</td>
          <td className={portsStyles.td_4_Ports}>Protocol</td>
          {domain && <td className={portsStyles.td_5_Ports}>Link</td>}
          <td className={portsStyles.td_7_Ports} />
          <td className={portsStyles.td_7_Ports} />
        </tr>
      </thead>
      <tbody>
        {ports.map(currentPort => {
          const { name, port, target_port: targetPort, protocol } = currentPort;
          const linkSrv = `${domain}:${port}`;
          return (
            <tr className={globalStyles.tableHover} key={_.uniqueId()}>
              <td className={portsStyles.td_1_Ports}>
                <img src={portPng} alt="port" />
              </td>
              <td className={portsStyles.td_2_Ports}>{name}</td>
              <td className={portsStyles.td_3_Ports}>
                {port}:{targetPort}
              </td>
              <td className={portsStyles.td_4_Ports}>{protocol}</td>
              {domain && (
                <td className={portsStyles.td_5_Ports}>
                  <a target="_blank" href={`http://${linkSrv}`}>
                    {linkSrv}
                  </a>
                </td>
              )}
              <td className={portsStyles.td_7_Ports} />
              <td className={portsStyles.td_7_Ports}>
                {/* <div className="warning"> </div> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PortsList;
