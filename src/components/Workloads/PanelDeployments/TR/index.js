import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';

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
          <th scope='row'><Link to='/Deployments/deployments_1/'>redis-django<td>1 GB / 10 GB</td></Link></th>
          <td>1 / 1</td>
          <td>redis<td>ngnix</td></td>
          <td>11 h.</td>
          <td>app: ngnix</td>
          <td className='menu_dropdown'>
            <Button />
          </td>
        </tr>
    );
  }
}
