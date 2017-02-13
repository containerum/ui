import React, { Component } from 'react';
import Button from './Button';

export default class TR extends Component {
  render() {
    return (
      <tr>
        <td className='width_td'>
          <img src='http://placehold.it/50x50' alt='...' className='img-rounded'/>
        </td>
        <th scope='row'>redis-django<td>1 GB / 10 GB</td></th>
        <td>1 / 1</td>
        <td>Replica Set</td>
        <td>redis<td>ngnix</td></td>
        <td>11 h.</td>
        <td>app: ngnix</td>
        <td>Active</td>
        <td className='menu_dropdown'>
          <Button />
        </td>
      </tr>
    );
  }
}
