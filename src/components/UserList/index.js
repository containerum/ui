/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

type Props = { list: Array<Object> };

const UserList = ({ list }: Props) => (
  <div>
    <h4>User List</h4>
    <ul>
      {list.map(user => (
        <li key={user.id}>
          <Link to={`/UserInfo/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
