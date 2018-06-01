import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import membershipStyles from '../../containers/Membership/index.scss';

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
  changeAccessUser: (login: string, access: string) => void,
  handleDeleteDMembers: (login: string) => void
};

const MembershipList = ({
  membersList,
  changeAccessUser,
  handleDeleteDMembers
}: Props) => (
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
            <td className={membershipStyles.td_1_Membership} />
          </tr>
        </thead>
        <tbody>
          {membersList.map(user => {
            console.log('zaza', user);
            const { login, new_access_level: newAccessLevel } = user;
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
                <td className={membershipStyles.td_2_Membership}>{login}</td>
                <td className={membershipStyles.td_3_Membership}>
                  <div className={globalStyles.overflow}>{login}</div>
                </td>
                <td
                  className={membershipStyles.td_4_Membership}
                  style={{ overflow: 'initial' }}
                >
                  <span>
                    {newAccessLevel !== 'owner' ? (
                      <span style={{ display: 'inline' }}>
                        <i
                          className={`${globalStyles.membershipArrow} ${
                            globalStyles.dropdownToggleMembership
                          }  dropdown-toggle`}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{ cursor: 'pointer', fontStyle: 'normal' }}
                        >
                          {' '}
                          {newAccessLevel}
                        </i>
                        <ul
                          className={` dropdown-menu dropdown-menu-right ${
                            globalStyles.dropdownMenu
                          }`}
                          style={{ width: 160 }}
                          role="menu"
                        >
                          <button
                            className={`dropdown-item ${
                              globalStyles.dropdownItem
                            }`}
                            onClick={() => changeAccessUser(login, 'write')}
                          >
                            Write
                          </button>
                          <button
                            className={`dropdown-item ${
                              globalStyles.dropdownItem
                            }`}
                            onClick={() => changeAccessUser(login, 'read')}
                          >
                            Read
                          </button>
                        </ul>
                      </span>
                    ) : (
                      'owner'
                    )}
                  </span>
                </td>
                <td
                  className={`${
                    membershipStyles.td_5_Membership
                  } dropdown no-arrow`}
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

export default MembershipList;
