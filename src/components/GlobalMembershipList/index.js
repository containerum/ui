import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import { routerLinks } from '../../config';
import globalStyles from '../../theme/global.scss';
import membershipStyles from './index.scss';
import Paginator from '../Paginator';
import globalMembershipStyles from '../../containers/Membership/index.scss';

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
  handleDeleteDMembers: (login: string) => void,
  handleClickGetAccount: (login: string) => void,
  changeAccessUser: (login: string, isActive: string) => void,
  handleClickDropDownAccess: (login: string) => void,
  handleMouseLeaveDropDownAccess: () => void,
  currentLoginDropDownAccess: string,
  countPages: number,
  currentPage: number
};

const GlobalMembershipList = ({
  membersList,
  handleDeleteDMembers,
  handleClickGetAccount,
  changeAccessUser,
  handleClickDropDownAccess,
  handleMouseLeaveDropDownAccess,
  currentLoginDropDownAccess,
  countPages,
  currentPage
}: Props) => {
  const handleClose = e => {
    e.stopPropagation();
  };
  return (
    <div>
      {membersList.length ? (
        <div>
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
                <td style={{ width: 270 }}>Name</td>
                <td style={{ width: 270 }}>Email</td>
                <td style={{ width: 100 }}>Role</td>
                <td>Status</td>
                <td className={membershipStyles.td_1_GlobalMembership} />
              </tr>
            </thead>
            <tbody>
              {membersList.map(user => {
                const {
                  login,
                  access: newAccessLevel,
                  is_active: isActive,
                  data
                } = user;
                const { first_name: firstName } = data || { first_name: login };
                return (
                  <tr
                    className={containerClassName}
                    style={{
                      margin: 0,
                      height: 43,
                      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                    }}
                    key={_.uniqueId()}
                    onClick={() => handleClickGetAccount(login)}
                  >
                    <td className={membershipStyles.td_2_GlobalMembership}>
                      {firstName}
                    </td>
                    <td className={membershipStyles.td_3_GlobalMembership}>
                      <div className={globalStyles.overflow}>{login}</div>
                    </td>
                    <td
                      className={membershipStyles.td_4_GlobalMembership}
                      style={{ overflow: 'initial' }}
                    >
                      {user.role}
                    </td>
                    <td
                      className={globalMembershipStyles.td_4_Membership}
                      style={{ overflow: 'initial', position: 'relative' }}
                      onClick={e => {
                        handleClose(e);
                        handleClickDropDownAccess(login);
                      }}
                    >
                      {!isActive ? (
                        <div
                          className={
                            currentLoginDropDownAccess === login
                              ? `${globalMembershipStyles.NavDropDownWrapper} ${
                                  globalMembershipStyles.NavDropDownOpen
                                }`
                              : globalMembershipStyles.NavDropDownClose
                          }
                          onMouseLeave={() => handleMouseLeaveDropDownAccess()}
                        >
                          <div
                            className={globalMembershipStyles.firstChildOfNav}
                          >
                            {isActive ? 'active' : 'inactive'}
                          </div>
                          <div
                            onClick={() =>
                              changeAccessUser(
                                login,
                                !isActive ? 'active' : 'inactive'
                              )
                            }
                            className={
                              currentLoginDropDownAccess === login
                                ? globalMembershipStyles.NavItemDropDownOpen
                                : globalMembershipStyles.NavItemDropDownClose
                            }
                          >
                            {!isActive ? 'active' : 'inactive'}
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '10px 0 10px 25px' }}>
                          active
                        </div>
                      )}
                    </td>
                    <td
                      className={`${
                        membershipStyles.td_5_GlobalMembership
                      } dropdown no-arrow`}
                      onClick={e => {
                        newAccessLevel !== 'owner' &&
                          handleDeleteDMembers(login);
                        handleClose(e);
                      }}
                    >
                      {newAccessLevel !== 'owner' && (
                        <div className={globalStyles.membershipItem}>
                          <i
                            style={{
                              verticalAlign: 'middle',
                              paddingRight: 30
                            }}
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
          <br />
          {countPages > 1 && (
            <Paginator
              countPage={countPages > 25 ? 25 : countPages}
              currentPage={currentPage}
              routeTo={routerLinks.getGlobalMembership}
            />
          )}
        </div>
      ) : (
        <div className={easyTableClassName} width="1170">
          You don`t have any users
        </div>
      )}
    </div>
  );
};

export default GlobalMembershipList;
