import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    var dep = this.props.item.map(function(item){
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-4'>
            <h3>{item.name}</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Namespace: {item.namespace}</li>
              <li>Labels: app: {item.labels}</li>
              <li>Annotations: Created by: {item.annotations}</li>
              <li>Creation time: {item.creationTimestamp}</li>
            </ul>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-2'>
            <Button data_id={item.id}/>
          </div>
        </div>
      </div>
    );
    })
    return (
      <div>
        {dep}
      </div>
    )
  }
}
