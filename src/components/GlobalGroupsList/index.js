import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';
import groupshipStyles from './index.scss';

const globalClass = className.bind(globalStyles);

const tableClassName = globalClass(
  'blockItemTokensTable',
  'table',
  'contentBlockTable'
);

const easyTableClassName = globalClass('table', 'contentBlockTable');

const containerClassName = globalClass(
  'contentBlockContainer',
  'containerCard',
  'hoverAction'
);

type Props = {
  history: Array<Object>,
  groupsList: Array<Object>,
  handleDeleteGroup: (id: string, e: Object) => void
};

const GlobalMembershipList = ({
  history,
  groupsList,
  handleDeleteGroup
}: Props) => {
  const handleClickGetGroup = idGroup => {
    history.push(routerLinks.getGroupLink(idGroup));
  };
  return (
    <div>
      {groupsList.length ? (
        <table
          className={tableClassName}
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
              <td style={{ width: 300 }}>Group Name</td>
              <td style={{ width: 460 }}>Users Count</td>
              <td className={groupshipStyles.td_1_GlobalMembership} />
            </tr>
          </thead>
          <tbody>
            {groupsList.map(group => {
              const { id, label, members_count: membersCount } = group;
              return (
                <tr
                  id={id}
                  className={containerClassName}
                  style={{
                    margin: 0,
                    height: 43,
                    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                  }}
                  key={_.uniqueId()}
                  onClick={() => handleClickGetGroup(id)}
                >
                  <td className={groupshipStyles.td_2_GlobalMembership}>
                    {label}
                  </td>
                  <td className={groupshipStyles.td_3_GlobalMembership}>
                    <div className={globalStyles.overflow}>{membersCount}</div>
                  </td>
                  <td
                    className={`${
                      groupshipStyles.td_5_GlobalMembership
                    } dropdown no-arrow`}
                    onClick={e => handleDeleteGroup(id, e)}
                  >
                    <div className={globalStyles.groupshipItem}>
                      <i
                        style={{ verticalAlign: 'middle', paddingRight: 30 }}
                        className={`${
                          globalStyles.groupshipIcon
                        } material-icons `}
                        role="presentation"
                      >
                        delete
                      </i>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={easyTableClassName} width="1170">
          You don`t have any groups
        </div>
      )}
    </div>
  );
};

export default GlobalMembershipList;
