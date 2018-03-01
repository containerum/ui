/* @flow */

import React from 'react';

type Props = { info: Object };

const UserCard = ({ info }: Props) => (
  <div>
    <h4>User Card</h4>
    <ul>
      <li>Name: {info.name}</li>
      <li>Phone: {info.phone}</li>
      <li>Email: {info.email}</li>
      <li>Website: {info.website}</li>
    </ul>
  </div>
);

export default UserCard;
