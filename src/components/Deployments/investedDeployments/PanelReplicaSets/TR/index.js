import React, { Component } from 'react';
import { Link } from 'react-router';
import setDeploymentId from '../../../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <tr>
        <td className='width_td'></td>
        <th scope='row' onClick={setDeploymentId}><Link data-id={item.replicasets.id} to='/ReplicaSets/replicasets_1/'>{item.replicasets.name}</Link></th>
        <td>{item.replicasets.pods}</td>
        <td>{item.replicasets.images}</td>
        <td>{item.replicasets.created}</td>
        <td>app: {item.replicasets.labels}</td>
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
