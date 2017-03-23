import React, { Component } from 'react';
import { Link } from 'react-router';
import setDeploymentId from '../../../../../index';

export default class TR extends Component {
  render() {
    var dep = this.props.item.replicasets.map(function(item){
    return (
      <tr>
        <td className='width_td'></td>
        <th scope='row' onClick={setDeploymentId}><Link data-id={item.id} to={`/ReplicaSets/${item.name}`}>{item.name}</Link></th>
        <td>{item.pods_active} / {item.pods_limit}</td>
        {item.images.map(function(item){
          return (
            <div>
            {item}
            </div>
        )
        })}
        <td>{item.created}</td>
        {item.labels.map(function(item){
          return (
            <div>
            app: {item}
            </div>
        )
        })}
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
