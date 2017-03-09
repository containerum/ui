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
              <li>Creation time: {item.creation_time}</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Selector: app: ngnix pod-template-hash: {item.selectors}</li>
              <li>Images: {item.images}</li>
            </ul>
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
