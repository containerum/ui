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
  handleDeleteDMembers: (login: string) => void,
  handleClickDropDownAccess: (login: string) => void,
  handleMouseLeaveDropDownAccess: () => void,
  currentLoginDropDownAccess: string
};

const MembershipList = ({
  membersList,
  changeAccessUser,
  handleDeleteDMembers,
  handleClickDropDownAccess,
  handleMouseLeaveDropDownAccess,
  currentLoginDropDownAccess
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
            <td style={{ width: 310 }}>Email</td>
            <td style={{ width: 160 }}>Permission</td>
            <td className={membershipStyles.td_1_Membership} />
          </tr>
        </thead>
        <tbody>
          {membersList.map(user => {
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
                <td className={membershipStyles.td_2_Membership}>{login}</td>
                <td className={membershipStyles.td_3_Membership}>
                  <div className={globalStyles.overflow}>{login}</div>
                </td>
                <td
                  className={membershipStyles.td_4_Membership}
                  style={{ overflow: 'initial', position: 'relative' }}
                  onClick={() =>
                    newAccessLevel !== 'owner' &&
                    handleClickDropDownAccess(login)
                  }
                >
                  {newAccessLevel !== 'owner' ? (
                    <div
                      className={
                        currentLoginDropDownAccess === login
                          ? `${membershipStyles.NavDropDownWrapper} ${
                              membershipStyles.NavDropDownOpen
                            }`
                          : membershipStyles.NavDropDownClose
                      }
                      onMouseLeave={() => handleMouseLeaveDropDownAccess()}
                    >
                      <div className={membershipStyles.firstChildOfNav}>
                        {newAccessLevel}
                      </div>
                      <div
                        onClick={() =>
                          changeAccessUser(
                            login,
                            newAccessLevel === 'write' ? 'read' : 'write'
                          )
                        }
                        className={
                          currentLoginDropDownAccess === login
                            ? membershipStyles.NavItemDropDownOpen
                            : membershipStyles.NavItemDropDownClose
                        }
                      >
                        {newAccessLevel === 'write' ? 'read' : 'write'}
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '10px 0 10px 25px' }}>
                      {newAccessLevel}
                    </div>
                  )}
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
                        style={{ verticalAlign: 'middle' }}
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
