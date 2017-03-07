import React, { Component } from 'react'
import { Link } from 'react-router';
import Button from './Button';
import setDeploymentId from '../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.data.map(function(item){
      return (
        <tr>
          <td className='width_td'></td>
          <th scope='row' onClick={setDeploymentId}><Link data-id={item.uid} to='/Secrets/secrets_1/'>{item.name}</Link></th>
          <td></td>
          <td></td>
          <td></td>
          <td>{item.created}</td>
          <td className='menu_dropdown'>
            <Button data_id={item.uid}/>
          </td>
        </tr>
        );
    })
    return (
      <tbody>
        {dep}
      </tbody>
    );
  }
}
