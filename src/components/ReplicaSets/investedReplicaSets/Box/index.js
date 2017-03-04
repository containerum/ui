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
              <li>Namespace: default</li>
              <li>Labels: app: ngnix</li>
              <li>app: ngnix</li>
              <li>Creation time: 2017-01-27 T 16:34</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <ul>
              <li>Selector: app: ngnix pod-template-hash: 2920923595</li>
              <li>Images: redis, ngnix</li>
            </ul>
          </div>
          <div className='col-md-2'>
            <Button />
          </div>
        </div>
      </div>
    );
  }
}
