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
  <div className="tab-content">
    <div className="tab-pane deployments active">
      {membersList.length ? (
        <table className="content-block__table table" width="1170">
          <thead>
            <tr>
              <td className="td-2__membership td-3__no-paddingLeft">Name</td>
              <td className="td-2__membership td-3__no-paddingLeft">Email</td>
              <td className="td-3__no-paddingLeft">Permission</td>
              <td className="td-1" />
            </tr>
          </thead>
          <tbody>
            {membersList.map(user => {
              const { login, new_access_level: newAccessLevel } = user;
              return (
                <tr key={_.uniqueId()}>
                  <td className="td-2__membership td-3__no-paddingLeft">
                    {login}
                  </td>
                  <td className="td-2__membership td-3__no-paddingLeft">
                    {login}
                  </td>
                  <td className="td-3__no-paddingLeft td-3-flex">
                    <div>{newAccessLevel}</div>
                    {newAccessLevel !== 'owner' && (
                      <div style={{ paddingLeft: '50px' }}>
                        <i
                          className="content-block-table__more  dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{ cursor: 'pointer' }}
                        />
                        <ul
                          className="dropdown-menu dropdown-menu-right"
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
                      </div>
                    )}
                  </td>
                  <td
                    className="td-1"
                    onClick={() =>
                      newAccessLevel !== 'owner' && handleDeleteDMembers(login)
                    }
                  >
                    {newAccessLevel !== 'owner' && (
                      <div className="membership-item">
                        <i className="material-icons" role="presentation">
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
  </div>
);

export default MembershipList;
