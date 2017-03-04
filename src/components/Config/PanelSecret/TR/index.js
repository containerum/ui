import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import setDeploymentId from '../../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.data.map(function(item){
      return (
        <tr>
          <td className='width_td'>
            <div className='checkbox'>
              <label>
                <input type='checkbox'/>
              </label>
            </div>
          </td>
          <th scope='row' onClick={setDeploymentId}><Link data-id={item.id} to='/Secrets/secrets_1/'>{item.name}</Link></th>
          <td></td>
          <td></td>
          <td></td>
          <td>{item.time}</td>
          <td className='menu_dropdown'>
            <Button />
          </td>
        </tr>
      );
    })
    return(
      <tbody>
        {dep}
      </tbody>
    );
  }
}
