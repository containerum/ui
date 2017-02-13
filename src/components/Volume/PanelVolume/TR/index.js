import React, { Component } from 'react';
import Button from './Button';
import { Link } from 'react-router';

export default class TR extends Component {
  render() {
    return (
      <tr>
        <td className='width_td'>
          <div className='checkbox'>
           <label>
             <input type='checkbox'/>
           </label>
          </div>
          <img src='http://placehold.it/50x50' alt='...' className='img-rounded'/>
        </td>
        <th scope='row'><Link to='/Volume/volume_1/'>redis-django<td>1 GB / 10 GB</td></Link></th>
        <td></td>
        <td>6</td>
        <td>11 h.</td>
        <td>app: ngnix</td>
        <td className='menu_dropdown'>
          <Button />
        </td>
      </tr>
    );
  }
}
