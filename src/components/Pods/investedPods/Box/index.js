import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-4'>
            <h3>{this.props.item.name}</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Namespace: {this.props.item.namespace}</li>
              <li>Labels: app: {this.props.item.labels}</li>
              <li>Annotations: Created by: {this.props.item.annotations}</li>
              <li>Creation time: {this.props.item.creationTimestamp}</li>
            </ul>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-2'>
            <Button data_id={this.props.item.id}/>
          </div>
        </div>
      </div>
    );
  }
}
