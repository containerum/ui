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
              <li>Namespace: default</li>
              <li>Labels: components: apiserver provider: kubernetes</li>
              <li>Label selector: none</li>
              <li>Creation time: 2017-01-27 T 16:34</li>
              </ul>
            </div>
            <div className='col-md-4'>
            <ul>
              <li>Cluster IP: 10.96.01</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <Button />
          </div>
        </div>
      </div>
    );
  }
}
