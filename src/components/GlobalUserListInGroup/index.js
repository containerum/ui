import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import membershipStyles from './index.scss';

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
  membersList: Array<Object>,
  handleDeleteDMembers: (login: string) => void
};

const GlobalMembershipList = ({ membersList, handleDeleteDMembers }: Props) => (
  <div>
    {membersList.length ? (
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
            <td style={{ width: 300 }}>Name</td>
            <td style={{ width: 320 }}>Email</td>
            <td>Permission</td>
            <td className={membershipStyles.td_1_GlobalMembership} />
          </tr>
        </thead>
        <tbody>
          {membersList.map(user => {
            const { username, access } = user;
            return (
              <tr
                className={containerClassName}
                style={{
                  margin: 0,
                  height: 43,
                  boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                key={_.uniqueId()}
              >
                <td className={membershipStyles.td_2_GlobalMembership}>
                  {username}
                </td>
                <td className={membershipStyles.td_3_GlobalMembership}>
                  <div className={globalStyles.overflow}>{username}</div>
                </td>
                <td
                  className={membershipStyles.td_4_GlobalMembership}
                  style={{ overflow: 'initial' }}
                >
                  {access}
                </td>
                <td
                  className={`${
                    membershipStyles.td_5_GlobalMembership
                  } dropdown no-arrow`}
                  onClick={() =>
                    access !== 'owner' && handleDeleteDMembers(username)
                  }
                >
                  {access !== 'owner' && (
                    <div className={globalStyles.membershipItem}>
                      <i
                        style={{ verticalAlign: 'middle', paddingRight: 30 }}
                        className={`${
                          globalStyles.membershipIcon
                        } material-icons `}
                        role="presentation"
                      >
                        delete
                      </i>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <div className={easyTableClassName} width="1170">
        You don`t have any users
      </div>
    )}
  </div>
);

export default GlobalMembershipList;
