import React, { Component } from 'react';
import { Link } from 'react-router';
import setDeploymentId from '../../../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.item.replicasets.map(function(item){
    return (
      <tr>
        <td className='width_td'></td>
        <th scope='row' onClick={setDeploymentId}><Link data-id={item.id} to='/ReplicaSets/replicasets_1/'>{item.name}</Link></th>
        <td>{item.pods}</td>
        <td>{item.images}</td>
        <td>{item.created}</td>
        <td>app: {item.labels}</td>
        <td></td>
        <td className='menu_dropdown'></td>
      </tr>
    );
    })
    return (
      <tbody>
        {dep}
      </tbody>
    )
  }
}
