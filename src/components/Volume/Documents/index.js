import React, { Component } from 'react';

export default class Documents extends Component {
  render() {
    return (
      <div className='col-md-3'>
        <ul className='text_center'>
          <h4 className='text_left'>Related Documentation</h4>
          <li><h4>Documentation</h4></li>
          <li className='text_right'>How to Deploy</li>
          <li className='text_right'>How to make a pod</li>
          <li className='text_right'>How to create a Replica set</li>
          <li className='text_right'>How to get Image</li>
          <li><h4>Glossary</h4></li>
          <li className='text_right'>Deployment</li>
          <li className='text_right'>Pods</li>
          <li className='text_right'>Labels</li>
          <li className='text_right'>Images</li>
        </ul>
      </div>
    );
  }
}
