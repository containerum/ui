import React, { Component } from 'react';
import Button from './Button';

export default class Box extends Component {
  render() {
    return (
      <div className='col-md-13'>
        <div className='box1-deploy'>
          <div className='col-md-8'>
            <h3></h3>
            <ul className='secretvul'>
              <li>Namespace: default</li>
              <li>Annotations: kubernetes.io/service-accountname: default kubernetes.io/service-account.uid: 8af4f6b2-e22d-11e6-9cb8-fae19e571731</li>
              <li>Creation time: 2017-01-27 T 16:34</li>
            </ul>
            </div>
            <div className='col-md-3'>
              <Button data_id={this.props.item.id}/>
          </div>
        </div>
      </div>
    );
  }
}
