import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-2'>
            <h3>redis-django</h3>
            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
          </div>
          <div className='col-md-2'>
            <ul>
              <li>Status:</li>
              <li>1 updated</li>
              <li>1 total</li>
              <li>1 available</li>
              <li>0 unavailable</li>
            </ul>
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
              <li>Strategy:</li>
              <li>Min ready seconds: 0</li>
              <li>Revision history limit: Not set</li>
              <li>Rolling update strategy: Max surge: 1, Max unavailable: 1</li>
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
