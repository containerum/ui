import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import styles from './index.scss';

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
  groupsList: Array<Object>,
  // changeAccessUser: (login: string, access: string) => void,
  handleDeleteDMembers: (login: string) => void
};

const GroupsList = ({ groupsList, handleDeleteDMembers }: Props) => (
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
            <td style={{ width: 320 }}>Users Count</td>
            <td className={styles.td_1_Membership} />
          </tr>
        </thead>
        <tbody>
          {groupsList.map(user => {
            const { username: login, access_level: newAccessLevel } = user;
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
                <td className={styles.td_2_Membership}>{login}</td>
                <td className={styles.td_3_Membership}>
                  <div className={globalStyles.overflow}>{login}</div>
                </td>
                <td
                  className={`${styles.td_5_Membership} dropdown no-arrow`}
                  onClick={() =>
                    newAccessLevel !== 'owner' && handleDeleteDMembers(login)
                  }
                >
                  {newAccessLevel !== 'owner' && (
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

export default GroupsList;
