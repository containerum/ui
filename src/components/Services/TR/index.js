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
        <th scope='row'><Link to='Services/services_1/'>kubernetes</Link></th>
        <td></td>
        <td>10.96.01<td>provider: kubernetes</td></td>
        <td>29.01.2017</td>
        <td>component: apiserver<td>provider: kubernetes</td></td>
        <td className='menu_dropdown'>
          <Button />
        </td>
      </tr>
    );
  }
}
