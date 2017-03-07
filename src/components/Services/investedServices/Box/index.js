import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
            <div className='col-md-5'>
              <h3>{this.props.item.name}</h3>
              <ul className='servul'>
              <li>Namespace:</li>
              <li>Labels: components: apiserver provider: {this.props.item.endpoints.host}</li>
              <li>Label selector: {this.props.item.labels}</li>
              <li>Creation time: {this.props.item.creation_time}</li>
              </ul>
            </div>
            <div className='col-md-4'>
            <ul>
              <li>Cluster {this.props.item.ip}</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <Button data_id={this.props.item.uid}/>
          </div>
        </div>
      </div>
    );
  }
}
