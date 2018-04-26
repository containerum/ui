import React from 'react';
import _ from 'lodash/fp';

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
        className="block-item__tokens-table content-block__table table"
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
            <td className="td-1" />
          </tr>
        </thead>
        <tbody className="domains">
          {membersList.map(user => {
            const { login, new_access_level: newAccessLevel } = user;
            return (
              <tr
                className="content-block-container card-container hover-action"
                style={{
                  margin: 0,
                  height: 43,
                  boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                key={_.uniqueId()}
              >
                <td className="td-8">{login}</td>
                <td className="td-9">
                  <div className="configmap-overflow">{login}</div>
                </td>
                <td className="td-3" style={{ overflow: 'initial' }}>
                  <span>
                    {newAccessLevel !== 'owner' ? (
                      <span style={{ display: 'inline' }}>
                        <i
                          className="content-block-table__more dropdown-toggle-membership dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{ cursor: 'pointer', fontStyle: 'normal' }}
                        >
                          {' '}
                          {newAccessLevel}
                        </i>
                        <ul
                          className="dropdown-menu dropdown-menu-right"
                          style={{ width: 160 }}
                          role="menu"
                        >
                          <button
                            className="dropdown-item"
                            onClick={() => changeAccessUser(login, 'write')}
                          >
                            Write
                          </button>
                          <button
                            className="dropdown-item"
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
                  className="td-10 dropdown no-arrow"
                  onClick={() =>
                    newAccessLevel !== 'owner' && handleDeleteDMembers(login)
                  }
                >
                  {newAccessLevel !== 'owner' && (
                    <div className="membership-item">
                      <i
                        style={{ verticalAlign: 'middle', paddingRight: 30 }}
                        className="material-icons material-icons-membership"
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
      <div className="content-block__table table" width="1170">
        You don`t have any users
      </div>
    )}
  </div>
);

export default MembershipList;
