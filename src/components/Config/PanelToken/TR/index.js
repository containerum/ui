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
        </td>
        <th scope='row'><Link to='/Tokens/tokens_1/'>default-token-1sss</Link></th>
        <td></td>
        <td></td>
        <td></td>
        <td>29.01.2017</td>
        <td className='menu_dropdown'>
          <Button />
        </td>
      </tr>
    );
  }
}
