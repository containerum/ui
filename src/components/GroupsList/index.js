import React from 'react';
import _ from 'lodash/fp';
import className from 'classnames/bind';

import globalStyles from '../../theme/global.scss';
import membershipStyles from '../../containers/Membership/index.scss';
import { routerLinks } from '../../config';

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
  membersList: Array<Object>,
  handleDeleteDMembers: (login: string) => void
};

const MembershipList = ({
  history,
  membersList,
  handleDeleteDMembers
}: Props) => {
  const handleClickGetGroup = idGroup => {
    history.push(routerLinks.getGroupLink(idGroup));
  };
  return (
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
              <td style={{ width: 450 }}>Group Name</td>
              <td style={{ width: 320 }}>Users Count</td>
              <td className={membershipStyles.td_1_Membership} />
            </tr>
          </thead>
          <tbody>
            {membersList.map(user => {
              const { username: login, id } = user;
              return (
                <tr
                  className={containerClassName}
                  style={{
                    margin: 0,
                    height: 43,
                    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                  }}
                  key={_.uniqueId()}
                  onClick={() => handleClickGetGroup(id)}
                >
                  <td className={membershipStyles.td_2_Membership}>{login}</td>
                  <td className={membershipStyles.td_3_Membership}>
                    <div className={globalStyles.overflow}>{login}</div>
                  </td>
                  <td
                    className={`${
                      membershipStyles.td_5_Membership
                    } dropdown no-arrow`}
                    onClick={e => handleDeleteDMembers(login, e)}
                  >
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
};

export default MembershipList;
