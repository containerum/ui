import React, { Component } from 'react';
import Button from './Button';
import { Link } from 'react-router';

export default class TR extends Component {
  render() {
    return (
      <tr>
        <td className='width_td'>
          <img src='http://placehold.it/50x50' alt='...' className='img-rounded'/>
        </td>
        <th scope='row'><Link to='/Pods/pods_1/'>redis-django-123456789-7fns<td>1 GB / 10 GB</td></Link></th>
        <td></td>
        <td></td>
        <td>11 h.</td>
        <td></td>
        <td></td>
        <td className='menu_dropdown'>
          <Button />
        </td>
      </tr>
    );
  }
}
